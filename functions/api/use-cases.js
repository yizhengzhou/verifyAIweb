/**
 * GET /api/use-cases
 * Concrete scenarios with sample VerifyAI usage and likely output.
 */

const DATA = {
  cases: [
    {
      id: "catfishing",
      title_zh: "感情詐騙偵測",
      title_en: "Romance scam detection",
      situation: "對象在交友軟體 / LINE 認識，從未見過面，傳了幾張自拍給你",
      verifyai_action: "上傳對方傳來的自拍",
      likely_outcome: "若該照片在網路上有多筆其他出現位置（特別是社群 profile 或商業圖庫），高機率是被盜用",
      audience: "戀愛詐騙風險群、家屬"
    },
    {
      id: "fake_seller",
      title_zh: "賣家身份驗證",
      title_en: "Seller identity verification",
      situation: "蝦皮 / FB 社團遇到的賣家附了一張產品照",
      verifyai_action: "上傳產品照",
      likely_outcome: "若照片直接從淘寶 / 京東 / 商業圖庫盜用而非自家拍，可能是代購或釣魚賣家",
      audience: "線上購物者"
    },
    {
      id: "news_factcheck",
      title_zh: "新聞 / 社群照片 fact-check",
      title_en: "News photo fact-check",
      situation: "社群媒體流傳一張『最新』事件的照片",
      verifyai_action: "上傳該照片",
      likely_outcome: "若實際是 2 年前其他事件的照片，VerifyAI 會找到原始出處網頁",
      audience: "媒體素養關注者、記者"
    },
    {
      id: "self_pirate",
      title_zh: "自己照片被盜用",
      title_en: "Self image piracy detection",
      situation: "懷疑自己的自拍 / 工作照被別人盜去當交友 profile",
      verifyai_action: "上傳自己的照片",
      likely_outcome: "若搜出 catfishing profile 引用該照片，可進一步申訴",
      audience: "創作者、模特、一般用戶"
    },
    {
      id: "elderly_protection",
      title_zh: "家屬代查保護長輩",
      title_en: "Family-led elder protection",
      situation: "家中長輩在 LINE 收到陌生人訊息與照片",
      verifyai_action: "晚輩拿過長輩的手機，把對方傳來的照片丟進 VerifyAI",
      likely_outcome: "找出該照片其實是國外網紅 profile，藉此跟長輩溝通該對象不是真實人",
      audience: "中老年人家屬"
    }
  ]
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
