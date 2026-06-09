import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

    const existingRequest = await prisma.changeRequest.findFirst({
      where: {
        id,
        agencyId: user.agencyId,
      },
    });

    if (!existingRequest) {
      return NextResponse.json(
        { error: "Change request not found" },
        { status: 404 }
      );
    }

    const changeRequest = await prisma.changeRequest.update({
      where: { id },
      data: {
        status: "DONE",
        resolvedAt: new Date(),
      },
    });

    return NextResponse.json(changeRequest, { status: 200 });
  } catch (error) {
    console.error("Resolve change request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
