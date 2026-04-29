/**
 * Cloudflare Pages Function: POST /api/subscribe
 *
 * Receives newsletter signup, forwards to Loops.
 * The Loops API key MUST be set as an env var (LOOPS_API_KEY) in
 * Cloudflare Pages > Settings > Environment variables.
 */

const LOOPS_ENDPOINT = "https://app.loops.so/api/v1/contacts/create";

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { success: false, message: "Invalid JSON" });
  }

  const email = String(body?.email || "").trim().toLowerCase();
  const lang = String(body?.lang || "").slice(0, 16) || "unknown";
  const honeypot = String(body?.website || "");

  if (honeypot) {
    return jsonResponse(200, { success: true });
  }

  if (!isValidEmail(email)) {
    return jsonResponse(400, { success: false, message: "Invalid email address" });
  }

  if (!env.LOOPS_API_KEY) {
    console.error("LOOPS_API_KEY env var missing");
    return jsonResponse(500, { success: false, message: "Server not configured" });
  }

  let loopsRes;
  try {
    loopsRes = await fetch(LOOPS_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.LOOPS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: "verifyai-website",
        userGroup: "website-signup",
        lang,
      }),
    });
  } catch (err) {
    console.error("Loops fetch failed:", err);
    return jsonResponse(502, { success: false, message: "Upstream unavailable" });
  }

  if (loopsRes.ok || loopsRes.status === 409) {
    return jsonResponse(200, { success: true });
  }

  const errBody = await loopsRes.text().catch(() => "");
  console.error("Loops error", loopsRes.status, errBody);
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
