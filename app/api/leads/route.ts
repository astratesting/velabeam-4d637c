import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = { agencyId: user.agencyId };

    if (category && category !== "All") {
      where.category = category;
    }

    if (status && status !== "All") {
      where.status = status;
    }

    const leads = await prisma.localBusiness.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    console.error("Get leads error:", error);
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
    const { name, category, address, city, lat, lng, phone, email } = body;

    if (!name || !category || !address || !city) {
      return NextResponse.json(
        { error: "Name, category, address, and city are required" },
        { status: 400 }
      );
    }

    const lead = await prisma.localBusiness.create({
      data: {
        name,
        category,
        address,
        city,
        lat: lat ?? 0,
        lng: lng ?? 0,
        phone,
        email,
        agencyId: user.agencyId,
        hasWebsite: false,
        source: "manual",
        status: "NEW",
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("Create lead error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
