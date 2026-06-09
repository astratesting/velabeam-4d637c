import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-12-18.acacia" as any,
    })
  : null;

export const STRIPE_PLANS = {
  agency_monthly: {
    name: "Agency Monthly",
    price: 129,
    interval: "month" as const,
  },
  agency_annual: {
    name: "Agency Annual",
    price: 1290,
    interval: "year" as const,
  },
  business_hosting: {
    name: "Business Hosting",
    price: 29,
    interval: "month" as const,
  },
};
