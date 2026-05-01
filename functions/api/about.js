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
  one_liner_en: "Reverse-image search to verify any photo's online history",
  mission: "反詐騙——透過反向圖片搜尋技術讓人能查證網路上對方的照片真實性，識別戀愛詐騙、假帳號、盜圖、新聞造假。",
  target_users: [
    "遇到陌生人邀請聊天卻不確定對方真假的人",
    "受戀愛詐騙風險群（中老年、初次網交者）",
    "想保護長輩免於詐騙的家屬",
    "想驗證購物賣家、商業合作對象身份的人",
    "想查看自己的照片是否被盜用的創作者 / 模特 / 一般用戶",
    "新聞 / 社群 fact-check 需求者"
  ],
  primary_market: "Taiwan (zh-TW)",
  platform: "iOS only",
  pricing_model: "Free (1 engine) + IAP credits (Pro, 5 engines)",
  founding_context: "創辦團隊一位朋友的長輩遭戀愛詐騙導致對人的信任崩潰。團隊決定做一支只做一件事的 app：一張照片進、一份報告出，讓非技術用戶也能自己查證對方傳來的照片是不是被盜用。"
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
