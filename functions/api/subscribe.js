// Cloudflare Pages Function: POST /api/subscribe
// Subscribe to fork inc newsletter: adds contact to Resend audience + sends welcome email.
//
// Required env vars: RESEND_API_KEY, RESEND_AUDIENCE_ID
// Optional env vars: RESEND_SUBSCRIBE_FROM (default "fork inc <newsletter@fork.work>")
//
// Request: { email: string, lang?: "zh-TW"|"en"|"ja", website?: string (honeypot) }

const RESEND_API_BASE = "https://api.resend.com";
const SUPPORT_EMAIL = "yizheng@fork.work";
const APP_URL = "https://verifyai.fork.work";
const LOGO_URL = "https://verifyai.fork.work/logov2.png";

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { success: false, message: "Invalid JSON" });
  }

  const email = String(body?.email || "").trim().toLowerCase();
  const honeypot = String(body?.website || "");
  const lang = String(body?.lang || "zh-TW").trim();

  // Honeypot: silently accept if filled (bot)
  if (honeypot) {
    return jsonResponse(200, { success: true });
  }

  if (!isValidEmail(email)) {
    return jsonResponse(400, { success: false, message: "Invalid email address" });
  }

  if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
    console.error("RESEND_API_KEY or RESEND_AUDIENCE_ID env var missing");
    return jsonResponse(500, { success: false, message: "Server not configured" });
  }

  // --- Step 1: Add contact to audience ---
  const contactRes = await fetch(
    `${RESEND_API_BASE}/audiences/${env.RESEND_AUDIENCE_ID}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    },
  ).catch((err) => {
    console.error("Resend contact fetch failed:", err);
    return null;
  });

  // Treat 422 (already exists) as success — still send welcome
  const alreadySubscribed = contactRes?.status === 422;
  if (!contactRes || (!contactRes.ok && !alreadySubscribed)) {
    const errPayload = contactRes ? await contactRes.json().catch(() => ({})) : {};
    console.error("Resend contact error", contactRes?.status, errPayload);
    return jsonResponse(502, { success: false, message: "Subscription service error" });
  }

  // --- Step 2: Send welcome email ---
  const fromEmail = env.RESEND_SUBSCRIBE_FROM || "fork inc <newsletter@fork.work>";
  const welcome = localizedWelcome(lang);
  const { subject, html, text } = welcome;

  const emailRes = await fetch(`${RESEND_API_BASE}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject: alreadySubscribed
        ? `✨ ${subject}`  // slight signal for re-subscribes
        : subject,
      html,
      text,
      tags: [
        { name: "campaign", value: "newsletter-welcome" },
        { name: "lang", value: lang },
        { name: "action", value: alreadySubscribed ? "re-subscribe" : "subscribe" },
      ],
    }),
  }).catch((err) => {
    console.error("Resend send email failed:", err);
    return null;
  });

  if (!emailRes || !emailRes.ok) {
    const errPayload = emailRes ? await emailRes.json().catch(() => ({})) : {};
    console.error("Resend welcome email error", emailRes?.status, errPayload);
    // Contact was added; email failure is non-fatal
    return jsonResponse(200, {
      success: true,
      warning: "已加入訂閱名單，但歡迎信寄送暫失敗，請聯絡 " + SUPPORT_EMAIL,
    });
  }

  return jsonResponse(200, { success: true });
}

// --- Welcome Email Templates ---

function localizedWelcome(lang) {
  switch (lang) {
    case "en":
      return welcomeEN();
    case "ja":
      return welcomeJA();
    case "zh-TW":
    default:
      return welcomeZH();
  }
}

function welcomeZH() {
  return {
    subject: "感謝訂閱 fork inc 電子報",
    html: renderWrapper("zh-TW", `
      <h1 style="color:#3CB39B;font-size:22px;margin-top:0;">感謝訂閱 fork inc 電子報</h1>

      <p>你好，歡迎加入！在這裡，你會收到：</p>

      <ul>
        <li><strong>反詐騙知識</strong> — 最新詐騙手法拆解、識別技巧</li>
        <li><strong>VerifyAI 動態</strong> — 產品更新、新功能通知</li>
        <li><strong>線上安全趨勢</strong> — 從亞洲觀點看全球數位安全</li>
      </ul>

      <p>每週一封、不超過 5 分鐘閱讀時間、隨時可退訂。</p>

      <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
        <tr>
          <td style="background:#3CB39B;border-radius:6px;text-align:center;">
            <a href="${APP_URL}" style="display:inline-block;padding:12px 28px;color:#fff;text-decoration:none;font-weight:bold;font-size:15px;">前往 VerifyAI</a>
          </td>
        </tr>
      </table>

      <p style="font-size:13px;color:#666;">有任何問題或建議？直接回這封信即可。</p>
    `),
    text: `感謝訂閱 fork inc 電子報\n\n你好，歡迎加入！在這裡，你會收到：\n\n- 反詐騙知識 — 最新詐騙手法拆解、識別技巧\n- VerifyAI 動態 — 產品更新、新功能通知\n- 線上安全趨勢 — 從亞洲觀點看全球數位安全\n\n每週一封、隨時可退訂。\n\n前往 VerifyAI：${APP_URL}\n\n— fork inc.`,
  };
}

function welcomeEN() {
  return {
    subject: "Welcome to the fork inc newsletter",
    html: renderWrapper("en", `
      <h1 style="color:#3CB39B;font-size:22px;margin-top:0;">Welcome to the fork inc newsletter</h1>

      <p>Thanks for subscribing! You'll receive regular updates on:</p>

      <ul>
        <li><strong>Scam awareness</strong> — deep dives into emerging online fraud tactics</li>
        <li><strong>VerifyAI product updates</strong> — new features, improvements</li>
        <li><strong>Digital safety trends</strong> — from an Asia-Pacific perspective</li>
      </ul>

      <p>One email per week, ~5 min read. Unsubscribe anytime.</p>

      <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
        <tr>
          <td style="background:#3CB39B;border-radius:6px;text-align:center;">
            <a href="${APP_URL}" style="display:inline-block;padding:12px 28px;color:#fff;text-decoration:none;font-weight:bold;font-size:15px;">Visit VerifyAI</a>
          </td>
        </tr>
      </table>

      <p style="font-size:13px;color:#666;">Questions or feedback? Just reply to this email.</p>
    `),
    text: `Welcome to the fork inc newsletter\n\nThanks for subscribing! You'll receive regular updates on:\n\n- Scam awareness: deep dives into emerging online fraud tactics\n- VerifyAI product updates: new features, improvements\n- Digital safety trends: from an Asia-Pacific perspective\n\nOne email per week, ~5 min read. Unsubscribe anytime.\n\nVisit VerifyAI: ${APP_URL}\n\n— fork inc.`,
  };
}

function welcomeJA() {
  return {
    subject: "fork inc ニュースレターへのご登録ありがとうございます",
    html: renderWrapper("ja", `
      <h1 style="color:#3CB39B;font-size:22px;margin-top:0;">fork inc ニュースレターへのご登録ありがとうございます</h1>

      <p>購読いただきありがとうございます！以下の情報をお届けします：</p>

      <ul>
        <li><strong>詐欺対策知識</strong> — 最新のオンライン詐欺の手口と見分け方</li>
        <li><strong>VerifyAI アップデート</strong> — 新機能、改善情報</li>
        <li><strong>デジタルセキュリティ動向</strong> — アジア太平洋地域の視点から</li>
      </ul>

      <p>週に1回、5分以内で読める内容です。いつでも購読解除できます。</p>

      <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
        <tr>
          <td style="background:#3CB39B;border-radius:6px;text-align:center;">
            <a href="${APP_URL}" style="display:inline-block;padding:12px 28px;color:#fff;text-decoration:none;font-weight:bold;font-size:15px;">VerifyAI を見る</a>
          </td>
        </tr>
      </table>

      <p style="font-size:13px;color:#666;">ご質問やご意見がございましたら、このメールに返信してください。</p>
    `),
    text: `fork inc ニュースレターへのご登録ありがとうございます\n\n購読いただきありがとうございます！以下の情報をお届けします：\n\n- 詐欺対策知識：最新のオンライン詐欺の手口と見分け方\n- VerifyAI アップデート：新機能、改善情報\n- デジタルセキュリティ動向：アジア太平洋地域の視点から\n\n週に1回、いつでも購読解除できます。\n\nVerifyAI を見る：${APP_URL}\n\n— fork inc.`,
  };
}

function renderWrapper(lang, bodyHtml) {
  const dir = lang === "ja" ? "ltr" : "ltr";
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang TC','Noto Sans JP','Helvetica Neue',sans-serif;line-height:1.7;color:#222;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;">
  <table cellpadding="0" cellspacing="0" style="width:100%;background:#fff;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:40px 32px 32px;">
        <div style="text-align:center;margin-bottom:24px;">
          <img src="${LOGO_URL}" alt="VerifyAI" style="width:48px;height:48px;border-radius:10px;">
          <p style="color:#3CB39B;font-weight:600;font-size:16px;margin:8px 0 0;">fork inc</p>
        </div>
        ${bodyHtml}
      </td>
    </tr>
  </table>
  <p style="font-size:12px;color:#999;text-align:center;margin-top:24px;">
    fork inc. · ${APP_URL}
  </p>
</body>
</html>`;
}

// --- Utilities ---

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;
}

function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
