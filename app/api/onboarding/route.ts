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

    const { step, data } = await req.json();

    if (typeof step !== "number" || step < 1) {
      return NextResponse.json(
        { error: "Invalid step number" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { agency: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user onboarding step and name
    const userUpdateData: Record<string, unknown> = { onboardingStep: step };
    if (data?.name) userUpdateData.name = data.name;
    await prisma.user.update({
      where: { id: session.user.id },
      data: userUpdateData,
    });

    // If agency data is provided, update the agency
    if (data && user.agencyId) {
      const agencyUpdateData: Record<string, unknown> = {};

      if (data.agencyName) agencyUpdateData.name = data.agencyName;
      if (data.logoUrl) agencyUpdateData.logoUrl = data.logoUrl;
      if (data.accentColor) agencyUpdateData.accentColor = data.accentColor;
      if (data.fromName) agencyUpdateData.fromName = data.fromName;
      if (data.fontPair) agencyUpdateData.fontPair = data.fontPair;
      if (data.customDomain) agencyUpdateData.customDomain = data.customDomain;
      if (step === 3) agencyUpdateData.profileComplete = true;

      if (Object.keys(agencyUpdateData).length > 0) {
        await prisma.agency.update({
          where: { id: user.agencyId },
          data: agencyUpdateData,
        });
      }
    }

    // If step is 3, generate seeded leads
    if (step === 3 && user.agencyId) {
      await generateSeededLeads(user.agencyId, 10);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
