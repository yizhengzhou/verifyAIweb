// VerifyAI Measurement Protocol Worker — deployed 2026-07-16

const MEASUREMENT_ENDPOINT =
  "https://www.google-analytics.com/mp/collect?api_secret=YBU8QxXNRXKWP-MJisocYA&measurement_id=G-6NKBS3S31J";
const UPSTREAM_TIMEOUT_MS = 2_000;
const START_TIME = new Date().toISOString();

let eventCount = 0;
let lastEventTime = null;
let lastErrorTime = null;
let lastErrorMessage = null;

/**
 * GET /api/track/status
 * Return the health and in-memory event state for this Worker instance.
 */
export async function onRequestGet(context) {
  return jsonResponse({
    ok: true,
    status: "healthy",
    since: START_TIME,
    events_received: eventCount,
    last_event_at: lastEventTime,
    last_error_at: lastErrorTime,
    last_error: lastErrorMessage,
  });
}

/**
 * POST /api/track
 * 接收前端事件後立即回應，並由 Cloudflare waitUntil 在背景送往 GA4。
 * Accept a browser event, respond immediately, and forward it through GA4 in the background.
 */
export async function onRequestPost(context) {
  const { request, waitUntil } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    recordError("Invalid JSON");
    return jsonResponse({ ok: false, error: "Invalid JSON" }, 400);
  }

  const eventName =
    typeof body?.event_name === "string" ? body.event_name.trim() : "";
  if (!eventName) {
    recordError("event_name is required");
    return jsonResponse({ ok: false, error: "event_name is required" }, 400);
  }

  eventCount += 1;
  lastEventTime = new Date().toISOString();

  const params = isPlainObject(body.params) ? body.params : {};
  const clientId =
    typeof body.client_id === "string" && body.client_id.trim()
      ? body.client_id.trim()
      : crypto.randomUUID();

  const requests = [sendMeasurementEvent(clientId, eventName, params)];

  if (eventName === "click_app_store") {
    // Google Ads 轉換由已連結的 GA4 property 匯入；第二筆事件保留明確的轉換信號。
    // Google Ads imports this conversion from the linked GA4 property.
    requests.push(
      sendMeasurementEvent(clientId, "conversion", {
        ...params,
        _npa: 0,
        conversion: true,
        send_to: "AW-18226736945/tHpKCJrLtr0cELHel_ND",
        value: 1.0,
        currency: "USD",
        source_event: "click_app_store",
      }),
    );
  }

  // 不等待上游回應；即使 Analytics 失敗，也不影響使用者流程。
  // Do not await upstream analytics; failures must never delay the client.
  waitUntil(
    Promise.allSettled(requests).then((results) => {
      results.forEach((result) => {
        if (result.status === "rejected") {
          recordError(result.reason);
          console.error("VerifyAI measurement forwarding failed", result.reason);
        }
      });
    }),
  );

  return jsonResponse({ ok: true });
}

function recordError(error) {
  lastErrorTime = new Date().toISOString();
  lastErrorMessage = error instanceof Error ? error.message : String(error);
}

async function sendMeasurementEvent(clientId, eventName, params) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(MEASUREMENT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name: eventName, params }],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Measurement Protocol returned ${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
