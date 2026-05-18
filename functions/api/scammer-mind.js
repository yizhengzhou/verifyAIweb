// Cloudflare Pages Function: POST /api/scammer-mind
// Lead magnet subscription: adds email to Resend audience + sends PDF download link.
//
// Required env vars:
//   RESEND_API_KEY                  - Resend API key
//   RESEND_AUDIENCE_ID              - Resend audience to add contacts to
//   SCAMMER_MIND_PDF_URL            - Public URL to the PDF (set after PDF ships)
//   SCAMMER_MIND_FROM_EMAIL         - Sender email (e.g. "VerifyAI <hello@fork.work>")
//
// Honeypot field: `website` (must be empty; non-empty silently 200s)

const RESEND_API_BASE = "https://api.resend.com";

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

  if (honeypot) return jsonResponse(200, { success: true });

  if (!isValidEmail(email)) {
    return jsonResponse(400, { success: false, message: "請輸入有效的電子郵件地址" });
  }

  if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
    console.error("Missing RESEND_API_KEY / RESEND_AUDIENCE_ID");
    return jsonResponse(500, { success: false, message: "Server not configured" });
  }

  const pdfUrl = env.SCAMMER_MIND_PDF_URL || "https://verifyai.fork.work/lead-magnets/scammer-mind-v0.1.pdf";
  const fromEmail = env.SCAMMER_MIND_FROM_EMAIL || "VerifyAI <hello@fork.work>";

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

  if (!contactRes || (!contactRes.ok && contactRes.status !== 422)) {
    const errPayload = contactRes ? await contactRes.json().catch(() => ({})) : {};
    console.error("Resend contact create error", contactRes?.status, errPayload);
    return jsonResponse(502, { success: false, message: "訂閱服務暫時無法回應、請稍後再試" });
  }

  const subject = "VerifyAI 反詐手冊註解版 — 下載連結";
  const html = renderEmailHtml({ pdfUrl });
  const text = renderEmailText({ pdfUrl });

  const emailRes = await fetch(`${RESEND_API_BASE}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject,
      html,
      text,
      tags: [{ name: "campaign", value: "scammer-mind" }],
    }),
  }).catch((err) => {
    console.error("Resend send email failed:", err);
    return null;
  });

  if (!emailRes || !emailRes.ok) {
    const errPayload = emailRes ? await emailRes.json().catch(() => ({})) : {};
    console.error("Resend send email error", emailRes?.status, errPayload);
    return jsonResponse(200, { success: true, warning: "已加入名單、但寄信暫失敗、請聯絡 support@fork.work" });
  }

  return jsonResponse(200, { success: true });
}

function renderEmailHtml({ pdfUrl }) {
  const link = `<a href="${pdfUrl}" style="display:inline-block;background:#3CB39B;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:bold;">下載 PDF</a>`;
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'PingFang TC','Helvetica Neue',sans-serif;line-height:1.7;color:#222;max-width:600px;margin:0 auto;padding:24px;">
<h1 style="color:#3CB39B;font-size:22px;">謝謝你訂閱 VerifyAI 反詐電子報</h1>

<p>附上你索取的內容：</p>

<p><strong>《Sugar-Baby Riri 操作手冊註解版：給目標族群的識別指南》</strong></p>

<p>裡面是日本年入 1000 万詐騙女子渡辺真衣 2022 年自費出版的教戰手冊、我們逐句拆給你看詐騙者怎麼想、怎麼挑目標、怎麼建立信任、怎麼把錢「請」出來。讀完你會：</p>
<ul>
<li>認得詐騙者怎麼編「悲慘背景」騙保護慾</li>
<li>認得他們把目標分三類的判斷邏輯</li>
<li>認得 7 階段金錢索取話術</li>
<li>有一份「我是不是正在被鎖定」紅旗清單</li>
</ul>

${link}

<p style="font-size:13px;color:#666;margin-top:32px;">這份註解版引用原書篇幅不超過 5%、評論為主、引用為從、屬於評論性合理使用。</p>

<p style="font-size:13px;color:#666;">我們之後每週寄一封反詐電子報、你可以隨時退訂（每封信底部有退訂連結）。</p>

<p style="font-size:13px;color:#666;">有問題、直接回這封信即可。</p>

<p style="margin-top:24px;">— YZ / VerifyAI<br>
<a href="https://verifyai.fork.work" style="color:#3CB39B;">verifyai.fork.work</a></p>
</body></html>`;
}

function renderEmailText({ pdfUrl }) {
  const linkLine = `下載 PDF：${pdfUrl}`;
  return `謝謝你訂閱 VerifyAI 反詐電子報

附上你索取的內容：
《Sugar-Baby Riri 操作手冊註解版：給目標族群的識別指南》

裡面是日本年入 1000 万詐騙女子渡辺真衣 2022 年自費出版的教戰手冊、
我們逐句拆給你看詐騙者怎麼想、怎麼挑目標、怎麼建立信任、怎麼把錢「請」出來。

讀完你會：
- 認得詐騙者怎麼編「悲慘背景」騙保護慾
- 認得他們把目標分三類的判斷邏輯
- 認得 7 階段金錢索取話術
- 有一份「我是不是正在被鎖定」紅旗清單

${linkLine}

這份註解版引用原書篇幅不超過 5%、評論為主、引用為從、屬於評論性合理使用。
我們之後每週寄一封反詐電子報、你可以隨時退訂（每封信底部有退訂連結）。

有問題、直接回這封信即可。

— YZ / VerifyAI
https://verifyai.fork.work`;
}

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;
}

function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
