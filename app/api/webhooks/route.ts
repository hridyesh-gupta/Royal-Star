import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../lib/prisma";
import { sendEmail } from "../../../lib/email";

export const runtime = "nodejs";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const OWNER_EMAIL = process.env.OWNER_EMAIL;

const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2023-08-16",
    })
  : null;

type LanguageCode = "en" | "fr";

type CheckoutCartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  category: string;
};

function normalizeLanguage(value: string | null | undefined): LanguageCode {
  if (value && value.toLowerCase() === "fr") return "fr";
  return "en";
}

function formatZurichDate(date: Date, language: LanguageCode): string {
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

function buildOrderItemsHtmlFromDb(
  items: { name: string; quantity: number; unitPrice: any }[],
  language: LanguageCode
): string {
  const rows = items
    .map((item) => {
      const unitPrice = Number(item.unitPrice);
      const lineTotal = unitPrice * item.quantity;
      return `<tr><td>${item.name}</td><td style="text-align:center;">${item.quantity}</td><td style="text-align:right;">CHF ${unitPrice
        .toFixed(2)
        .replace(".00", ".-")}</td><td style="text-align:right;">CHF ${lineTotal
        .toFixed(2)
        .replace(".00", ".-")}</td></tr>`;
    })
    .join("");

  return `
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left;">${language === "fr" ? "Article" : "Item"}</th>
          <th style="text-align:center;">${language === "fr" ? "Qté" : "Qty"}</th>
          <th style="text-align:right;">${language === "fr" ? "Prix" : "Price"}</th>
          <th style="text-align:right;">${language === "fr" ? "Total" : "Total"}</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function buildOrderEmailHtmlFromDb(params: {
  orderNumber: string;
  items: { name: string; quantity: number; unitPrice: any }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: Date;
  paymentMethod: "stripe" | "cod";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryMethod: string;
  addressStreet?: string | null;
  addressCity?: string | null;
  addressPostalCode?: string | null;
  deliveryZone?: string | null;
  specialInstructions?: string | null;
  language: LanguageCode;
  forCustomer: boolean;
}): string {
  const {
    orderNumber,
    items,
    subtotal,
    deliveryFee,
    total,
    createdAt,
    paymentMethod,
    customerName,
    customerEmail,
    customerPhone,
    deliveryMethod,
    addressStreet,
    addressCity,
    addressPostalCode,
    deliveryZone,
    specialInstructions,
    language,
    forCustomer,
  } = params;

  const receivedAt = formatZurichDate(createdAt, language);
  const expectedDeliveryBy = formatZurichDate(
    new Date(createdAt.getTime() + 45 * 60 * 1000),
    language
  );

  const timingBlock = forCustomer
    ? `<p><strong>${language === "fr" ? "Heure de livraison estimée" : "Estimated delivery time"} (Europe/Zurich):</strong> ${expectedDeliveryBy}</p>`
    : `<p><strong>${language === "fr" ? "Heure de réception" : "Received at"} (Europe/Zurich):</strong> ${receivedAt}</p>
       <p><strong>${language === "fr" ? "Livraison attendue avant" : "Expected delivery before"} (Europe/Zurich):</strong> ${expectedDeliveryBy}</p>`;

  const greeting = forCustomer
    ? language === "fr"
      ? `Bonjour ${customerName},`
      : `Dear ${customerName},`
    : language === "fr"
    ? "Bonjour,"
    : "Hello,";

  const intro = forCustomer
    ? language === "fr"
      ? paymentMethod === "stripe"
        ? "Merci pour votre commande. Votre paiement par carte a été accepté."
        : "Merci pour votre commande. Vous pourrez payer en espèces à la livraison."
      : paymentMethod === "stripe"
      ? "Thank you for your order. Your card payment has been accepted."
      : "Thank you for your order. You can pay by cash on delivery."
    : language === "fr"
    ? "Une nouvelle commande a été passée sur le site."
    : "A new order has been placed on the website.";

  const paymentLabel =
    language === "fr"
      ? paymentMethod === "stripe"
        ? "Carte (Stripe)"
        : "Paiement à la livraison"
      : paymentMethod === "stripe"
      ? "Card (Stripe)"
      : "Cash on Delivery";

  const itemsTable = buildOrderItemsHtmlFromDb(items, language);

  const addressBlock =
    deliveryMethod === "DELIVERY"
      ? `
        <p><strong>${language === "fr" ? "Adresse de livraison" : "Delivery address"}:</strong><br/>
        ${addressStreet || ""}<br/>
        ${addressPostalCode || ""} ${addressCity || ""}<br/>
        ${deliveryZone ? `(${deliveryZone})` : ""}</p>
      `
      : "";

  const instructionsBlock = specialInstructions
    ? `
        <p><strong>${language === "fr" ? "Instructions spéciales" : "Special instructions"}:</strong><br/>
        ${specialInstructions.replace(/\n/g, "<br/>")}</p>
      `
    : "";

  const etaText =
    language === "fr"
      ? "Votre commande sera prête dans environ 30 à 45 minutes."
      : "Your order will be ready in approximately 30–45 minutes.";

  const closing = language === "fr" ? "Cordialement,<br/>Royal Star Café" : "Best regards,<br/>Royal Star Cafe";

  return `
    <div>
      <p>${greeting}</p>
      <p>${intro}</p>
      <p><strong>${language === "fr" ? "Numéro de commande" : "Order number"}:</strong> ${orderNumber}</p>
      <p><strong>${language === "fr" ? "Méthode de paiement" : "Payment method"}:</strong> ${paymentLabel}</p>
      <p><strong>${language === "fr" ? "Client" : "Customer"}:</strong> ${customerName} (${customerEmail}, ${customerPhone})</p>
      ${addressBlock}
      ${itemsTable}
      <p><strong>${language === "fr" ? "Sous-total" : "Subtotal"}:</strong> CHF ${subtotal
        .toFixed(2)
        .replace(".00", ".-")}</p>
      <p><strong>${language === "fr" ? "Frais de livraison" : "Delivery fee"}:</strong> CHF ${deliveryFee
        .toFixed(2)
        .replace(".00", ".-")}</p>
      <p><strong>${language === "fr" ? "Total" : "Total"}:</strong> CHF ${total
        .toFixed(2)
        .replace(".00", ".-")}</p>
      ${instructionsBlock}
      ${timingBlock}
      ${forCustomer ? `<p>${etaText}</p>` : ""}
      <p>${closing}</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Stripe is not configured", { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Error verifying Stripe webhook", err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const metadata = session.metadata || {};
      const orderIdRaw = metadata.orderId as string | undefined;
      const langRaw = metadata.language as string | undefined;
      const language = normalizeLanguage(langRaw);

      let order = null as any;

      if (orderIdRaw) {
        const orderId = parseInt(orderIdRaw, 10);
        if (!Number.isNaN(orderId)) {
          order = await prisma.order.update({
            where: { id: orderId },
            data: {
              paymentStatus: "PAID",
              status: "CONFIRMED",
              stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
            },
            include: {
              items: true,
            },
          });
        }
      }

      if (!order && session.id) {
        order = await prisma.order.update({
          where: { stripeSessionId: session.id },
          data: {
            paymentStatus: "PAID",
            status: "CONFIRMED",
            stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
          },
          include: {
            items: true,
          },
        });
      }

      if (order) {
        const subtotal = Number(order.subtotal);
        const deliveryFee = Number(order.deliveryFee);
        const total = Number(order.total);

        const items = order.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }));

        const paymentMethod: "stripe" | "cod" = "stripe";

        if (OWNER_EMAIL) {
          const ownerHtml = buildOrderEmailHtmlFromDb({
            orderNumber: order.orderNumber,
            items,
            subtotal,
            deliveryFee,
            total,
            createdAt: order.createdAt,
            paymentMethod,
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            customerPhone: order.customerPhone,
            deliveryMethod: order.deliveryMethod,
            addressStreet: order.addressStreet,
            addressCity: order.addressCity,
            addressPostalCode: order.addressPostalCode,
            deliveryZone: order.deliveryZone,
            specialInstructions: order.specialInstructions || null,
            language,
            forCustomer: false,
          });

          await sendEmail({
            to: OWNER_EMAIL,
            subject:
              language === "fr"
                ? `Nouvelle commande payée (Stripe) - ${order.orderNumber}`
                : `New paid order (Stripe) - ${order.orderNumber}`,
            html: ownerHtml,
            replyTo: order.customerEmail,
          });
        }

        const customerHtml = buildOrderEmailHtmlFromDb({
          orderNumber: order.orderNumber,
          items,
          subtotal,
          deliveryFee,
          total,
          createdAt: order.createdAt,
          paymentMethod,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerPhone: order.customerPhone,
          deliveryMethod: order.deliveryMethod,
          addressStreet: order.addressStreet,
          addressCity: order.addressCity,
          addressPostalCode: order.addressPostalCode,
          deliveryZone: order.deliveryZone,
          specialInstructions: order.specialInstructions || null,
          language,
          forCustomer: true,
        });

        await sendEmail({
          to: order.customerEmail,
          subject:
            language === "fr"
              ? `Royal Star Café – Confirmation de commande ${order.orderNumber}`
              : `Royal Star Cafe – Order confirmation ${order.orderNumber}`,
          html: customerHtml,
        });
      }
    }
  } catch (error) {
    console.error("Error handling Stripe webhook event", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
