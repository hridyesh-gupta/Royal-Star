import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { createSessionToken, hashPassword } from "../../../../lib/auth";
import { sendEmail } from "../../../../lib/email";
import { renderBaseEmail } from "../../../../lib/emailTemplates";

const registerSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  email: z.string().trim().email(),
  password: z.string().min(6).max(100),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = registerSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        passwordHash,
        role: "CUSTOMER",
      },
    });

    let newcomerEmailSent = false;

    try {
      const newcomerPromo = await prisma.promoCode.findFirst({
        where: { active: true, isNewcomer: true },
        orderBy: { createdAt: "desc" },
      });

      if (newcomerPromo) {
        const subject = `Welcome to Royal Star Cafe – Your ${newcomerPromo.percentage}% promo code`;
        const code = newcomerPromo.code;

        const html = renderBaseEmail({
          language: "en",
          title: "Welcome to Royal Star Cafe",
          introHtml: `<p>Dear ${name || email},</p>`,
          bodyHtml: `
            <p>Thank you for creating an account at Royal Star Cafe.</p>
            <p>As a newcomer, you can enjoy a <strong>${newcomerPromo.percentage}%</strong> discount on your next online order.</p>
            <p>Please use the promo code below while checking out to receive your discount:</p>
            <p style="font-size:18px;font-weight:700;letter-spacing:0.08em;margin:12px 0;">
              <span style="display:inline-block;padding:8px 14px;border-radius:999px;background:#fef2f2;color:#b91c1c;font-family:monospace;">
                ${code}
              </span>
            </p>
            <p>This promo code is <strong>valid for a single use per customer</strong>. Please use it as soon as possible to avoid any potential expiry issues.</p>
            <p>We look forward to welcoming you and serving you soon.</p>
          `,
        });

        await sendEmail({
          to: email,
          subject,
          html,
        });

        newcomerEmailSent = true;
      }
    } catch (error) {
      console.error("Error sending newcomer promo email:", error);
    }

    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      newcomerEmailSent,
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Error in register:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
