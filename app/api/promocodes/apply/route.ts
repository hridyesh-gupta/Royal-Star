import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getUserFromToken } from "../../../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null as unknown);

    const rawCode = typeof (body as any)?.code === "string" ? (body as any).code : "";

    const code = rawCode.trim();

    if (!code) {
      return NextResponse.json({ error: "Promo code is required." }, { status: 400 });
    }

    const cookie = request.cookies.get("auth_token");
    const token = cookie?.value ?? null;
    const user = await getUserFromToken(token);

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to apply a promo code." },
        { status: 401 }
      );
    }

    const normalizedCode = code.toUpperCase();

    const promo = await prisma.promoCode.findUnique({ where: { code: normalizedCode } });

    if (!promo || !promo.active) {
      return NextResponse.json(
        { error: "Invalid or inactive promo code." },
        { status: 400 }
      );
    }

    const existingRedemption = await prisma.promoCodeRedemption.findFirst({
      where: {
        promoCodeId: promo.id,
        OR: [
          { userId: user.id },
          { email: user.email },
        ],
      },
    });

    if (existingRedemption) {
      return NextResponse.json(
        { error: "You have already used this promo code." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      promoCode: {
        code: promo.code,
        percentage: promo.percentage,
      },
    });
  } catch (error) {
    console.error("Error applying promo code:", error);
    return NextResponse.json(
      { error: "Unable to apply promo code at the moment." },
      { status: 500 }
    );
  }
}
