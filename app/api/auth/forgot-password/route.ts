import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "../../../../lib/prisma";
import { sendEmail } from "../../../../lib/email";
import { renderBaseEmail } from "../../../../lib/emailTemplates";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email(),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = forgotPasswordSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { email } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return a generic response to avoid leaking which emails exist
    const genericResponse = NextResponse.json({ success: true });

    if (!user) {
      return genericResponse;
    }

    // Invalidate previous tokens for this user
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        token: tokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    const origin = request.headers.get("origin") || process.env.APP_BASE_URL || "http://localhost:3000";
    const resetUrl = `${origin}/reset-password?token=${encodeURIComponent(rawToken)}`;

    const subject = "Reset your Royal Star Cafe password";

    const html = renderBaseEmail({
      language: "en",
      title: "Reset your password",
      introHtml: `<p>Hello ${user.name || ""},</p>`,
      bodyHtml: `
        <p>We received a request to reset the password for your Royal Star Cafe account.</p>
        <p>You can reset your password by clicking the button below:</p>
        <p style="margin:14px 0;">
          <a href="${resetUrl}" target="_blank" rel="noreferrer"
             style="display:inline-block;background:#b91c1c;color:#ffffff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px;">
            Reset Password
          </a>
        </p>
        <p>If you did not request this, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    try {
      await sendEmail({
        to: user.email,
        subject,
        html,
      });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      // Still return success to the client to avoid leaking information.
    }

    return genericResponse;
  } catch (error) {
    console.error("Error in forgot-password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
