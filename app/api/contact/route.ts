import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { sendEmail } from "../../../lib/email";

const OWNER_EMAIL = process.env.OWNER_EMAIL;

function normalizeLanguage(value: string | null): "en" | "fr" {
  if (value && value.toLowerCase() === "fr") return "fr";
  return "en";
}

function formatZurichDate(date: Date, language: "en" | "fr"): string {
  const locale = language === "fr" ? "fr-CH" : "en-CH";
  return date.toLocaleString(locale, {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const subject = formData.get("subject")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";
    const rawLanguage = formData.get("language")?.toString() ?? null;

    const language = normalizeLanguage(rawLanguage);
    const prismaLanguage = language === "fr" ? "FR" : "EN";

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const created = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        language: prismaLanguage,
      },
    });

    const receivedAt = formatZurichDate(new Date(), language);

    const ownerEmail = OWNER_EMAIL;

    if (ownerEmail) {
      const ownerSubject =
        language === "fr"
          ? `Nouveau message de contact : ${subject}`
          : `New contact message: ${subject}`;

      const ownerHtml = `
        <p>${language === "fr" ? "Vous avez reçu un nouveau message via le formulaire de contact." : "You have received a new message from the contact form."}</p>
        <p><strong>${language === "fr" ? "Nom" : "Name"}:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>${language === "fr" ? "Téléphone" : "Phone"}:</strong> ${phone || "-"}</p>
        <p><strong>${language === "fr" ? "Reçu le" : "Received at"} (Europe/Zurich):</strong> ${receivedAt}</p>
        <p><strong>${language === "fr" ? "Sujet" : "Subject"}:</strong> ${subject}</p>
        <p><strong>${language === "fr" ? "Message" : "Message"}:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `;

      await sendEmail({
        to: ownerEmail,
        subject: ownerSubject,
        html: ownerHtml,
        replyTo: email,
      });
    }

    const customerSubject =
      language === "fr"
        ? "Royal Star Café – Nous avons bien reçu votre message"
        : "Royal Star Cafe – We have received your message";

    const customerHtml =
      language === "fr"
        ? `
          <p>Bonjour ${name},</p>
          <p>Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p><strong>Message :</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
          <p>Cordialement,<br/>Royal Star Café</p>
        `
        : `
          <p>Dear ${name},</p>
          <p>Thank you for reaching out. We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
          <p>Best regards,<br/>Royal Star Cafe</p>
        `;

    await sendEmail({
      to: email,
      subject: customerSubject,
      html: customerHtml,
    });

    return NextResponse.json({ success: true, id: created.id });
  } catch (error) {
    console.error("Error handling contact form:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
