import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slug";

export async function GET() {
  try {
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

    const sites = await prisma.site.findMany({
      where: { agencyId: user.agencyId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(sites, { status: 200 });
  } catch (error) {
    console.error("Get sites error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
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

    const body = await req.json();
    const { templateKey, data, brand, leadId } = body;

    if (!templateKey || !data) {
      return NextResponse.json(
        { error: "Template key and data are required" },
        { status: 400 }
      );
    }

    const dataStr = typeof data === "string" ? data : JSON.stringify(data);
    const brandStr = typeof brand === "string" ? brand : JSON.stringify(brand || {});

    // Extract business name from data for slug
    let siteName = "site";
    try {
      const parsed = typeof data === "string" ? JSON.parse(data) : data;
      siteName = parsed.heroTitle || "site";
    } catch {
      // ignore
    }

    const slug = await generateUniqueSlug(siteName);

    const site = await prisma.site.create({
      data: {
        templateKey,
        data: dataStr,
        brand: brandStr,
        slug,
        agencyId: user.agencyId,
        leadId: leadId || null,
        status: "DRAFT",
      },
    });

    return NextResponse.json(site, { status: 201 });
  } catch (error) {
    console.error("Create site error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
