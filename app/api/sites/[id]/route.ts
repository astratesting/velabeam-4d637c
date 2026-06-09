import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
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
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    return NextResponse.json(site, { status: 200 });
  } catch (error) {
    console.error("Get site error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

    const existingSite = await prisma.site.findFirst({
      where: {
        id,
        agencyId: user.agencyId,
      },
    });

    if (!existingSite) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    const body = await req.json();
    const { data, brand, templateKey, status, customDomain, slug } = body;

    const site = await prisma.site.update({
      where: { id },
      data: {
        ...(data !== undefined && { data: typeof data === "string" ? data : JSON.stringify(data) }),
        ...(brand !== undefined && { brand: typeof brand === "string" ? brand : JSON.stringify(brand) }),
        ...(templateKey !== undefined && { templateKey }),
        ...(status !== undefined && { status }),
        ...(customDomain !== undefined && { customDomain }),
        ...(slug !== undefined && { slug }),
      },
    });

    return NextResponse.json(site, { status: 200 });
  } catch (error) {
    console.error("Update site error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
