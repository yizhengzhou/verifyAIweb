// Cloudflare Pages Function: POST /api/subscribe
// Required env vars: RESEND_API_KEY, RESEND_AUDIENCE_ID

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

  const endpoint = `${RESEND_API_BASE}/audiences/${env.RESEND_AUDIENCE_ID}/contacts`;

  let resendRes;
  try {
    resendRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
  } catch (err) {
    console.error("Resend fetch failed:", err);
    return jsonResponse(502, { success: false, message: "Upstream unavailable" });
  }

  if (resendRes.ok) {
    return jsonResponse(200, { success: true });
  }

  // 422 = contact already exists; treat as idempotent success.
  const errPayload = await resendRes.json().catch(() => ({}));
  if (resendRes.status === 422) {
    return jsonResponse(200, { success: true });
  }

  console.error("Resend error", resendRes.status, errPayload);
  return jsonResponse(502, { success: false, message: "Subscription service error" });
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
