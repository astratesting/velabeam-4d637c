import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.agencyId) {
      return NextResponse.json(
        { error: "No agency found for user" },
        { status: 404 }
      );
    }

    const site = await prisma.site.findFirst({
      where: {
        id,
        agencyId: user.agencyId,
      },
      include: { lead: true },
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    // Update site status to LIVE and set publishedAt
    const updatedSite = await prisma.site.update({
      where: { id },
      data: {
        status: "LIVE",
        publishedAt: new Date(),
      },
    });

    // Parse site data to get business info
    let siteData: Record<string, unknown> = {};
    try {
      siteData = JSON.parse(site.data);
    } catch {
      // ignore
    }

    // Create client if one doesn't exist for this site
    const existingClient = await prisma.client.findFirst({
      where: { siteId: id },
    });

    if (!existingClient) {
      const businessName = (siteData.heroTitle as string) || site.lead?.name || "Unknown Business";
      const contactEmail = (siteData.email as string) || site.lead?.email || null;
      const contactName = site.lead?.name || null;

      const client = await prisma.client.create({
        data: {
          businessName,
          contactName,
          contactEmail,
          agencyId: user.agencyId,
          siteId: id,
          mrr: 29,
          status: "ACTIVE",
          renewalAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      return NextResponse.json({ site: updatedSite, client }, { status: 200 });
    }

    return NextResponse.json({ site: updatedSite, client: existingClient }, { status: 200 });
  } catch (error) {
    console.error("Publish site error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
