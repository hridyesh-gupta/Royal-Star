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
    const body = await request.json();

    const date = (body.date ?? "").toString().trim();
    const time = (body.time ?? "").toString().trim();
    const name = (body.name ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim();
    const phone = (body.phone ?? "").toString().trim();
    const guestsRaw = (body.guests ?? "").toString().trim();
    const requests = (body.requests ?? "").toString().trim();
    const rawLanguage = (body.language ?? null) as string | null;

    const language = normalizeLanguage(rawLanguage);
    const prismaLanguage = language === "fr" ? "FR" : "EN";

    const guests = parseInt(guestsRaw || "0", 10);

    if (!date || !time || !name || !email || !phone || !guests || Number.isNaN(guests) || guests <= 0) {
      return NextResponse.json({ error: "Invalid reservation data" }, { status: 400 });
    }

    const reservation = await prisma.reservation.create({
      data: {
        name,
        email,
        phone,
        reservationDate: date,
        reservationTime: time,
        guests,
        specialRequests: requests || null,
        timezone: "Europe/Zurich",
        language: prismaLanguage,
      },
    });

    const receivedAt = formatZurichDate(new Date(), language);

    const ownerEmail = OWNER_EMAIL;

    if (ownerEmail) {
      const ownerSubject =
        language === "fr"
          ? `Nouvelle réservation - ${date} ${time}`
          : `New reservation - ${date} ${time}`;

      const ownerHtml = `
        <p>${language === "fr" ? "Vous avez reçu une nouvelle demande de réservation." : "You have received a new reservation request."}</p>
        <p><strong>${language === "fr" ? "Nom" : "Name"}:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>${language === "fr" ? "Téléphone" : "Phone"}:</strong> ${phone}</p>
        <p><strong>${language === "fr" ? "Date" : "Date"}:</strong> ${date}</p>
        <p><strong>${language === "fr" ? "Heure" : "Time"}:</strong> ${time} (Europe/Zurich)</p>
        <p><strong>${language === "fr" ? "Reçu le" : "Received at"} (Europe/Zurich):</strong> ${receivedAt}</p>
        <p><strong>${language === "fr" ? "Nombre de convives" : "Number of guests"}:</strong> ${guests}</p>
        <p><strong>${language === "fr" ? "Demandes particulières" : "Special requests"}:</strong> ${requests || "-"}</p>
      `;

      try {
        await sendEmail({
          to: ownerEmail,
          subject: ownerSubject,
          html: ownerHtml,
          replyTo: email,
        });
      } catch (error) {
        console.error("Failed to send reservation notification to owner", error);
      }
    }

    const customerSubject =
      language === "fr"
        ? "Royal Star Café – Demande de réservation reçue"
        : "Royal Star Cafe – Reservation request received";

    const customerHtml =
      language === "fr"
        ? `
          <p>Bonjour ${name},</p>
          <p>Merci pour votre demande de réservation. Nous l'avons bien reçue et nous vous contacterons pour la confirmer.</p>
          <p><strong>Date :</strong> ${date}</p>
          <p><strong>Heure :</strong> ${time} (Europe/Zurich)</p>
          <p><strong>Nombre de convives :</strong> ${guests}</p>
          <p><strong>Demandes particulières :</strong> ${requests || "-"}</p>
          <p>Cordialement,<br/>Royal Star Café</p>
        `
        : `
          <p>Dear ${name},</p>
          <p>Thank you for your reservation request. We have received it and will contact you to confirm.</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time} (Europe/Zurich)</p>
          <p><strong>Number of guests:</strong> ${guests}</p>
          <p><strong>Special requests:</strong> ${requests || "-"}</p>
          <p>Best regards,<br/>Royal Star Cafe</p>
        `;

    try {
      await sendEmail({
        to: email,
        subject: customerSubject,
        html: customerHtml,
      });
    } catch (error) {
      console.error("Failed to send reservation confirmation to customer", error);
    }

    return NextResponse.json({ success: true, id: reservation.id });
  } catch (error) {
    console.error("Error handling reservation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
