// Cloudflare Pages Function: GET /api/admin/resend-status
// Read-only diagnostic. Returns Resend audience size + domain verification status.
// Auth: Authorization: Bearer ${BROADCAST_AUTH_TOKEN}
// Required env vars: RESEND_API_KEY, RESEND_AUDIENCE_ID, BROADCAST_AUTH_TOKEN

const RESEND_BASE = "https://api.resend.com";

function json(status, payload) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;

  const auth = request.headers.get("authorization") || "";
  const expected = `Bearer ${env.BROADCAST_AUTH_TOKEN || ""}`;
  if (!env.BROADCAST_AUTH_TOKEN || auth !== expected) {
    return json(401, { error: "unauthorized" });
  }

  if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
    return json(500, { error: "RESEND_API_KEY or RESEND_AUDIENCE_ID missing" });
  }

  const headers = {
    Authorization: `Bearer ${env.RESEND_API_KEY}`,
    "Content-Type": "application/json",
  };

  const [domainsRes, contactsRes, audienceRes] = await Promise.allSettled([
    fetch(`${RESEND_BASE}/domains`, { headers }),
    fetch(`${RESEND_BASE}/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, { headers }),
    fetch(`${RESEND_BASE}/audiences/${env.RESEND_AUDIENCE_ID}`, { headers }),
  ]);

  async function parse(settled) {
    if (settled.status !== "fulfilled") return { error: String(settled.reason) };
    try {
      const body = await settled.value.json();
      return { status: settled.value.status, body };
    } catch (e) {
      return { status: settled.value.status, parse_error: String(e) };
    }
  }

  return json(200, {
    audience_id: env.RESEND_AUDIENCE_ID,
    domains: await parse(domainsRes),
    audience: await parse(audienceRes),
    contacts: await parse(contactsRes),
  });
}
