/**
 * GET /api/about
 * VerifyAI product positioning, target users, founding context.
 * AI-agent friendly: stable JSON schema for query / cite.
 */

const DATA = {
  name: "VerifyAI",
  bundle_id: "com.zhyz.verifyai",
  app_store_id: "6754511420",
  app_store_url: "https://apps.apple.com/tw/app/verifyai-%E5%BD%B1%E5%83%8F%E6%90%9C%E5%B0%8B/id6754511420",
  homepage: "https://verifyai.fork.work",
  contact: "contact@verifyai.app",
  one_liner_zh: "深度反向圖片搜尋，讓信任有依據",
  one_liner_en: "Reverse-image search to verify any face photo's online history",
  scope: "VerifyAI 只處理含人臉的照片，比對該張照片在網路上是否有相同副本。不接受沒有人臉的照片（商品 / 風景 / 寵物 / 新聞照都會被拒絕），也不做身分辨識。",
  mission: "反詐騙 — 透過反向圖片搜尋技術，讓人能查證對方傳來的人像照片，識別戀愛詐騙、假帳號頭像、人像盜用。",
  target_users: [
    "遇到陌生人邀請聊天卻不確定對方真假的人",
    "受戀愛詐騙風險群（中老年、初次網交者）",
    "想保護長輩免於詐騙的家屬",
    "想查驗求職 / 商業合作對方 LinkedIn 大頭照真實性的人",
    "想替自己查頭像有沒有被別人拿去當其他帳號 profile 的用戶"
  ],
  primary_market: "Taiwan (zh-TW)",
  platform: "iOS only",
  pricing_model: "Free (welcome 1 credit, EXIF 自拍不扣 credit) + IAP credits (Pro, 5 engines)",
  founding_context: "創辦團隊一位朋友的長輩遭戀愛詐騙導致對人的信任崩潰。團隊決定做一支只做一件事的 app：一張人像照片進、一份報告出，讓非技術用戶也能自己查證對方傳來的人像是不是被盜用。"
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
