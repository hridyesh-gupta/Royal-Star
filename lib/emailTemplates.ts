import type { SupportedLanguage } from "./email";

export type EmailLanguage = SupportedLanguage;

interface BaseEmailOptions {
  language: EmailLanguage;
  title: string;
  introHtml?: string;
  bodyHtml: string;
  footerHtml?: string;
}

export function renderBaseEmail(options: BaseEmailOptions): string {
  const { language, title, introHtml, bodyHtml, footerHtml } = options;
  const isFr = language === "fr";

  const defaultFooter = isFr
    ? "Cordialement,<br/>Royal Star Café"
    : "Best regards,<br/>Royal Star Cafe";

  const footer = footerHtml ?? `<p>${defaultFooter}</p>`;

  return `
  <div style="background:linear-gradient(135deg,#fff5f5,#fffaf0);padding:24px 16px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1f2933;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);border:1px solid #fee2e2;">
      <div style="background:radial-gradient(circle at top left,#b91c1c,#7f1d1d);padding:16px 24px;color:#ffffff;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:40px;height:40px;border-radius:999px;background:#fee2e2;display:flex;align-items:center;justify-content:center;color:#b91c1c;font-weight:700;font-size:18px;">
            RS
          </div>
          <div>
            <div style="margin:0;font-size:18px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Royal Star Cafe</div>
            <div style="margin:2px 0 0;font-size:11px;opacity:0.9;">
              ${isFr ? "Cuisine et hospitalité à Meyrin, Genève" : "Authentic cuisine & hospitality in Meyrin, Geneva"}
            </div>
          </div>
        </div>
      </div>
      <div style="padding:24px 24px 20px;font-size:14px;line-height:1.6;">
        <h2 style="margin:0 0 12px;font-size:18px;color:#7f1d1d;">${title}</h2>
        ${introHtml ?? ""}
        <div style="margin-top:12px;">
          ${bodyHtml}
        </div>
        <div style="margin-top:18px;">
          ${footer}
        </div>
      </div>
      <div style="padding:10px 24px 16px;background:#fef2f2;border-top:1px solid #fee2e2;font-size:11px;color:#6b7280;">
        <p style="margin:0 0 2px;">
          ${isFr
            ? "Vous recevez cet email car vous avez interagi avec Royal Star Cafe."
            : "You are receiving this email because you interacted with Royal Star Cafe."}
        </p>
        <p style="margin:0;">
          ${isFr
            ? "Merci pour votre confiance."
            : "Thank you for your trust."}
        </p>
      </div>
    </div>
  </div>
  `;
}
