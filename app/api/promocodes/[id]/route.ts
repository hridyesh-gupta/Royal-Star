import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getUserFromToken } from "../../../../lib/auth";

async function requireAdmin(request: NextRequest) {
  const cookie = request.cookies.get("auth_token");
  const token = cookie?.value;
  const user = await getUserFromToken(token ?? null);

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(context.params.id);
  if (!id || Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await prisma.promoCode.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting promo code:", error);
    return NextResponse.json({ error: "Promo code not found" }, { status: 404 });
  }
}
