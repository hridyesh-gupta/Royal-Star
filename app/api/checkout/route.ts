import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../lib/prisma";
import { sendEmail } from "../../../lib/email";

const OWNER_EMAIL = process.env.OWNER_EMAIL;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
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

const DELIVERY_ZONES = [
  {
    name: "Zone 1",
    zipCodes: ["1211", "1217"],
    minOrder: 20,
    deliveryFee: 10,
  },
  {
    name: "Zone 2",
    zipCodes: ["1214", "1215", "1216", "1218", "1220", "1242"],
    minOrder: 40,
    deliveryFee: 15,
  },
  {
    name: "Zone 3",
    zipCodes: ["1201", "1202", "1203", "1209", "1219", "1239", "1292", "1293", "1294"],
    minOrder: 60,
    deliveryFee: 20,
  },
  {
    name: "Zone 4",
    zipCodes: ["1213", "1232", "1233", "1236", "1237", "1281", "1283", "1288", "1290", "1291", "1295", "1296"],
    minOrder: 80,
    deliveryFee: 25,
  },
  {
    name: "Zone 5",
    zipCodes: ["1204", "1205", "1206", "1207", "1208", "1212", "1227", "1228", "1258", "1285", "1286", "1287"],
    minOrder: 100,
    deliveryFee: 30,
  },
];

function normalizeLanguage(value: string | null | undefined): LanguageCode {
  if (value && value.toLowerCase() === "fr") return "fr";
  return "en";
}

function findDeliveryZone(postalCode: string | null | undefined): {
  name: string;
  zipCodes: string[];
  minOrder: number;
  deliveryFee: number;
} | null {
  if (!postalCode) return null;
  const zone = DELIVERY_ZONES.find((z) => z.zipCodes.includes(postalCode));
  return zone ?? null;
}

function parsePrice(price: string): number {
  const cleaned = price.replace("CHF", "").replace("chf", "").replace(" ", "");
  const value = parseFloat(cleaned);
  if (Number.isNaN(value) || value < 0) {
    throw new Error(`Invalid price value: ${price}`);
  }
  return value;
}

function generateOrderNumber(): string {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const randomPart = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `RR-${datePart}-${randomPart}`;
}

function buildOrderItemsHtml(items: CheckoutCartItem[], language: LanguageCode): string {
  const rows = items
    .map((item) => {
      const unitPrice = parsePrice(item.price);
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

function buildOrderEmailHtml(params: {
  orderNumber: string;
  items: CheckoutCartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
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
        : "Merci pour votre commande. Vous pourrez payer en espèces / carte à la livraison."
      : paymentMethod === "stripe"
      ? "Thank you for your order. Your card payment has been accepted."
      : "Thank you for your order. You can pay by cash / card on delivery."
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

  const itemsTable = buildOrderItemsHtml(items, language);

  const addressBlock =
    deliveryMethod === "delivery"
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

  const closing = language === "fr" ? "Cordialement,<br/>Royal Restro" : "Best regards,<br/>Royal Restro";

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
      ${forCustomer ? `<p>${etaText}</p>` : ""}
      <p>${closing}</p>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const deliveryMethod: string = body.deliveryMethod || "delivery";
    const customerInfo = body.customerInfo || {};
    const address = body.address || {};
    const specialInstructions: string = body.specialInstructions || "";
    const paymentMethod: "stripe" | "cod" =
      body.paymentMethod === "cod" ? "cod" : "stripe";
    const cartItems: CheckoutCartItem[] = body.cartItems || [];
    const language = normalizeLanguage(body.language);

    if (!cartItems.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const customerName: string = customerInfo.fullName || "";
    const customerEmail: string = customerInfo.email || "";
    const customerPhone: string = customerInfo.phone || "";

    if (!customerName || !customerEmail || !customerPhone) {
      return NextResponse.json({ error: "Missing customer information" }, { status: 400 });
    }

    let postalCode: string | undefined = address.postalCode;
    if (typeof postalCode !== "string") {
      postalCode = String(postalCode || "");
    }

    let selectedZone = null as
      | {
          name: string;
          zipCodes: string[];
          minOrder: number;
          deliveryFee: number;
        }
      | null;

    if (deliveryMethod === "delivery") {
      selectedZone = findDeliveryZone(postalCode);
      if (!selectedZone) {
        return NextResponse.json(
          { error: "Invalid delivery postal code" },
          { status: 400 }
        );
      }
    }

    let subtotal = 0;
    for (const item of cartItems) {
      const unitPrice = parsePrice(item.price);
      subtotal += unitPrice * item.quantity;
    }

    let deliveryFee = 0;
    if (deliveryMethod === "delivery" && selectedZone) {
      deliveryFee = selectedZone.deliveryFee;
      if (subtotal < selectedZone.minOrder) {
        return NextResponse.json(
          { error: "Minimum order not reached for selected zone" },
          { status: 400 }
        );
      }
    }

    const total = subtotal + deliveryFee;

    const orderNumber = generateOrderNumber();

    const prismaLanguage = language === "fr" ? "FR" : "EN";

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: "PENDING",
        paymentMethod: paymentMethod === "stripe" ? "STRIPE" : "COD",
        paymentStatus: paymentMethod === "stripe" ? "PENDING" : "PENDING",
        customerName,
        customerEmail,
        customerPhone,
        deliveryMethod: "DELIVERY",
        addressStreet: deliveryMethod === "delivery" ? address.street || null : null,
        addressCity: deliveryMethod === "delivery" ? address.city || null : null,
        addressPostalCode: deliveryMethod === "delivery" ? postalCode || null : null,
        deliveryZone: deliveryMethod === "delivery" && selectedZone ? selectedZone.name : null,
        subtotal,
        deliveryFee,
        total,
        currency: "CHF",
        specialInstructions: specialInstructions || null,
        language: prismaLanguage,
        items: {
          create: cartItems.map((item) => {
            const unitPrice = parsePrice(item.price);
            const lineTotal = unitPrice * item.quantity;
            return {
              menuItemId: item.id,
              name: item.name,
              category: item.category,
              unitPrice,
              quantity: item.quantity,
              totalPrice: lineTotal,
            };
          }),
        },
      },
      include: {
        items: true,
      },
    });

    if (paymentMethod === "cod") {
      if (OWNER_EMAIL) {
        const ownerHtml = buildOrderEmailHtml({
          orderNumber,
          items: cartItems,
          subtotal,
          deliveryFee,
          total,
          paymentMethod,
          customerName,
          customerEmail,
          customerPhone,
          deliveryMethod,
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
              ? `Nouvelle commande (paiement à la livraison) - ${orderNumber}`
              : `New order (COD) - ${orderNumber}`,
          html: ownerHtml,
          replyTo: customerEmail,
        });
      }

      const customerHtml = buildOrderEmailHtml({
        orderNumber,
        items: cartItems,
        subtotal,
        deliveryFee,
        total,
        paymentMethod,
        customerName,
        customerEmail,
        customerPhone,
        deliveryMethod,
        addressStreet: order.addressStreet,
        addressCity: order.addressCity,
        addressPostalCode: order.addressPostalCode,
        deliveryZone: order.deliveryZone,
        specialInstructions: order.specialInstructions || null,
        language,
        forCustomer: true,
      });

      await sendEmail({
        to: customerEmail,
        subject:
          language === "fr"
            ? `Royal Restro – Confirmation de commande ${orderNumber}`
            : `Royal Restro – Order confirmation ${orderNumber}`,
        html: customerHtml,
      });

      return NextResponse.json({ success: true, orderId: order.id, orderNumber });
    }

    if (!stripe || !STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured on the server" },
        { status: 500 }
      );
    }

    const origin = request.headers.get("origin") || "https://royal-star.ch";

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map(
      (item) => {
        const unitPrice = parsePrice(item.price);
        return {
          price_data: {
            currency: "chf",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(unitPrice * 100),
          },
          quantity: item.quantity,
        };
      }
    );

    if (deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: "chf",
          product_data: {
            name: language === "fr" ? "Frais de livraison" : "Delivery fee",
          },
          unit_amount: Math.round(deliveryFee * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: customerEmail,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=1`,
      metadata: {
        orderId: String(order.id),
        language,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripeSessionId: session.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error in checkout:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
