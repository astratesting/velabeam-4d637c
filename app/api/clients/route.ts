import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

    const clients = await prisma.client.findMany({
      where: { agencyId: user.agencyId },
      include: { site: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.error("Get clients error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
