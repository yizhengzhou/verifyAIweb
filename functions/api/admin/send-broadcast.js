// Cloudflare Pages Function: POST /api/admin/send-broadcast
// Creates a Resend Broadcast against the verifyai-website audience and (optionally) sends it.
// Auth: Authorization: Bearer ${BROADCAST_AUTH_TOKEN}
// Body: { subject: string, html: string, from?: string (default "fork inc <newsletter@fork.work>"),
//         send?: boolean (default false — dry-run unless explicit), name?: string }
// Returns: { broadcast_id, status, audience_size, scheduled }
//
// Safety:
//  - If audience contact count is 0, refuses to send (still creates draft if send=false)
//  - If send=false: only creates the draft (no recipients receive anything)
//  - send=true requires explicit boolean true in body

const RESEND_BASE = "https://api.resend.com";

function json(status, payload) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const auth = request.headers.get("authorization") || "";
  if (!env.BROADCAST_AUTH_TOKEN || auth !== `Bearer ${env.BROADCAST_AUTH_TOKEN}`) {
    return json(401, { error: "unauthorized" });
  }
  if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
    return json(500, { error: "RESEND_API_KEY or RESEND_AUDIENCE_ID missing" });
  }

  let body;
  try { body = await request.json(); } catch { return json(400, { error: "invalid json" }); }
  const { subject, html, from, send, name } = body || {};
  if (!subject || !html) return json(400, { error: "subject and html required" });

  const sender = from || "fork inc <newsletter@fork.work>";
  const headers = {
    Authorization: `Bearer ${env.RESEND_API_KEY}`,
    "Content-Type": "application/json",
  };

  const contactsRes = await fetch(
    `${RESEND_BASE}/audiences/${env.RESEND_AUDIENCE_ID}/contacts`,
    { headers }
  );
  const contactsBody = await contactsRes.json().catch(() => ({}));
  const audienceSize = Array.isArray(contactsBody?.data) ? contactsBody.data.length : null;

  const createRes = await fetch(`${RESEND_BASE}/broadcasts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      audience_id: env.RESEND_AUDIENCE_ID,
      from: sender,
      subject,
      html,
      name: name || `broadcast-${new Date().toISOString().slice(0, 10)}`,
    }),
  });
  const createBody = await createRes.json().catch(() => ({}));
  if (!createRes.ok) {
    return json(createRes.status, { error: "broadcast create failed", detail: createBody });
  }
  const broadcastId = createBody.id;

  if (send !== true) {
    return json(200, {
      broadcast_id: broadcastId,
      status: "draft",
      audience_size: audienceSize,
      scheduled: false,
      note: "Pass send:true in body to actually send. Draft created — no recipients notified.",
    });
  }

  if (audienceSize === 0) {
    return json(409, {
      broadcast_id: broadcastId,
      status: "draft",
      audience_size: 0,
      scheduled: false,
      error: "audience is empty; refusing to send",
    });
  }

  const sendRes = await fetch(`${RESEND_BASE}/broadcasts/${broadcastId}/send`, {
    method: "POST",
    headers,
    body: JSON.stringify({}),
  });
  const sendBody = await sendRes.json().catch(() => ({}));
  if (!sendRes.ok) {
    return json(sendRes.status, {
      broadcast_id: broadcastId,
      status: "send_failed",
      audience_size: audienceSize,
      detail: sendBody,
    });
  }

  return json(200, {
    broadcast_id: broadcastId,
    status: "sent",
    audience_size: audienceSize,
    scheduled: true,
    detail: sendBody,
  });
}
