import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "../../../../lib/prisma";
import { createSessionToken, hashPassword } from "../../../../lib/auth";

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(6).max(100),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = resetPasswordSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { token, password } = parsed.data;

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const existingToken = await prisma.passwordResetToken.findUnique({
      where: { token: tokenHash },
    });

    if (!existingToken || existingToken.usedAt || existingToken.expiresAt < new Date()) {
      return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: existingToken.userId } });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 });
    }

    const newPasswordHash = hashPassword(password);

    const updatedUser = await prisma.$transaction(async (tx) => {
      const userUpdate = await tx.user.update({
        where: { id: user.id },
        data: {
          passwordHash: newPasswordHash,
        },
      });

      await tx.passwordResetToken.update({
        where: { id: existingToken.id },
        data: {
          usedAt: new Date(),
        },
      });

      return userUpdate;
    });

    const sessionToken = createSessionToken({
      userId: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
    });

    const response = NextResponse.json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });

    response.cookies.set("auth_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Error in reset-password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
