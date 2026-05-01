/**
 * GET /api/pricing
 * VerifyAI pricing: free tier + IAP credits.
 */

const DATA = {
  model: "free + IAP credits",
  free_tier: {
    name: "免費版",
    engines: 1,
    note: "僅使用 Google 全球搜尋",
    duration_per_search_seconds: "10-20"
  },
  pro_tier: {
    name: "Pro 搜尋",
    engines: 5,
    note: "Google + Google Lens + Yandex + 商用圖庫 + pHash 指紋",
    duration_per_search_seconds: "30-60"
  },
  iap_skus: [
    {
      sku: "credits_3_value",
      type: "consumable",
      credits: 3,
      retail_price_twd: 60,
      developer_proceeds_twd: 39,
      note: "3 次 Pro 搜尋"
    }
  ],
  currency: "TWD",
  primary_market: "Taiwan",
  platform: "iOS App Store",
  no_subscription_yet: true
};

export async function onRequestGet() {
  return new Response(JSON.stringify(DATA, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
