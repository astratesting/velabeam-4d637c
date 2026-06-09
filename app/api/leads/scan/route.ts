import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSeededLeads } from "@/lib/leads";

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

    const result = await generateSeededLeads(user.agencyId, 10);

    const leads = await prisma.localBusiness.findMany({
      where: { agencyId: user.agencyId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { count: result.count, leads },
      { status: 200 }
    );
  } catch (error) {
    console.error("Scan leads error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
