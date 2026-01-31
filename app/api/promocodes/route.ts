import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/prisma";
import { getUserFromToken } from "../../../lib/auth";

async function requireAdmin(request: NextRequest) {
  const cookie = request.cookies.get("auth_token");
  const token = cookie?.value;
  const user = await getUserFromToken(token ?? null);

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const promoCodes = await prisma.promoCode.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ promoCodes });
}

const createSchema = z.object({
  code: z.string().trim().min(3).max(32),
  percentage: z.number().int().min(1).max(90),
  active: z.boolean().optional().default(true),
  isNewcomer: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { code, percentage, active, isNewcomer } = parsed.data;
  const normalizedCode = code.trim().toUpperCase();

  try {
    if (isNewcomer) {
      await prisma.promoCode.updateMany({
        where: { isNewcomer: true },
        data: { isNewcomer: false },
      });
    }

    const promo = await prisma.promoCode.create({
      data: {
        code: normalizedCode,
        percentage,
        active,
        isNewcomer,
      },
    });

    return NextResponse.json({ promoCode: promo }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating promo code:", error);
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "Promo code already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
