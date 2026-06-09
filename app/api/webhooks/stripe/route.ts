import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 400 }
      );
    }

    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "Missing stripe signature" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const agencyId = session.metadata?.agencyId;

        if (agencyId) {
          const plan = session.metadata?.plan || "AGENCY";
          const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

          await prisma.agency.update({
            where: { id: agencyId },
            data: {
              stripeCustomerId: session.customer as string,
              planRenewsAt: periodEnd,
              plan,
            },
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        if (customerId) {
          const agency = await prisma.agency.findFirst({
            where: { stripeCustomerId: customerId },
          });

          if (agency) {
            const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            await prisma.agency.update({
              where: { id: agency.id },
              data: {
                planRenewsAt: periodEnd,
              },
            });

            // Create invoice record
            await prisma.invoice.create({
              data: {
                agencyId: agency.id,
                amount: (invoice.amount_paid || 0) / 100,
                currency: invoice.currency || "usd",
                status: "paid",
                stripeInvoiceId: invoice.id,
                paidAt: new Date(),
              },
            });
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const agency = await prisma.agency.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (agency) {
          const periodEnd = (subscription as any).current_period_end
            ? new Date((subscription as any).current_period_end * 1000)
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

          await prisma.agency.update({
            where: { id: agency.id },
            data: {
              planRenewsAt: periodEnd,
              plan: subscription.metadata?.plan || agency.plan,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const agency = await prisma.agency.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (agency) {
          await prisma.agency.update({
            where: { id: agency.id },
            data: {
              plan: "TRIAL",
              planRenewsAt: null,
            },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
