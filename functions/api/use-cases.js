/**
 * GET /api/use-cases
 * Concrete scenarios with sample VerifyAI usage and likely output.
 *
 * Aligned to PRODUCT_FACTS.md (ad-hub repo): VerifyAI accepts ONLY photos containing
 * a human face, and only finds copies that are exact (or lightly cropped) matches.
 * Out of scope: product photos, news photos without faces, identity recognition,
 * heavy edits / generated images.
 */

const DATA = {
  scope_note: "VerifyAI 僅處理含人臉的照片，比對該張照片在網路上是否有相同副本。不接受商品 / 風景 / 寵物等無人臉照片，也不做身分辨識或『找這個人是誰』。",
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
      id: "elderly_protection",
      title_zh: "家屬代查保護長輩",
      title_en: "Family-led elder protection",
      situation: "家中長輩在 LINE 收到陌生人訊息與人像照片",
      verifyai_action: "晚輩拿過長輩的手機，把對方傳來的照片丟進 VerifyAI",
      likely_outcome: "若該人像出現在多個交友 profile 或國外網紅頁面，可作為跟長輩溝通該對象不真實的依據",
      audience: "中老年人家屬"
    },
    {
      id: "self_check",
      title_zh: "替自己查 — 我的頭像有被盜用嗎",
      title_en: "Self check — has my profile photo been stolen",
      situation: "懷疑自己的自拍 / 大頭照被別人拿去當交友 profile 或詐騙工具",
      verifyai_action: "上傳自己的社群媒體頭像",
      likely_outcome: "若該照片出現在某個不是你的帳號上，可作為下架申訴或進一步處理的依據",
      audience: "創作者、有公開社群帳號的一般用戶"
    },
    {
      id: "professional_meetup",
      title_zh: "面對面前查驗對方",
      title_en: "Pre-meeting professional verification",
      situation: "求職面試、商業合作前，想先確認對方 LinkedIn / 名片上的大頭照是真人",
      verifyai_action: "上傳對方公開的大頭照",
      likely_outcome: "若該照片實際是 stock 圖庫或他人社群頭像，可重新評估該機會",
      audience: "求職者、業務、自由工作者"
    },
    {
      id: "media_subject_check",
      title_zh: "媒體報導前查驗受訪者照片",
      title_en: "Pre-publication subject verification",
      situation: "記者準備報導前，想確認受訪者提供的個人照不是借來的",
      verifyai_action: "上傳受訪者個人照（含人臉）",
      likely_outcome: "若該照片已大量散布在其他人物相關頁面，需進一步查證身分",
      audience: "媒體工作者、編輯"
    }
  ],
  out_of_scope: [
    "商品 / 賣家照（無人臉）",
    "新聞配圖（無人臉的事件照、戰場照、地震照）",
    "風景 / 寵物 / 食物照",
    "找出某人所有照片或身分（這不是 VerifyAI 的功能）",
    "AI 生成圖判定（VerifyAI 有附帶 AI 識別訊號但 false positive 約 21%，不參與風險判定）",
    "大幅裁切或重後製的照片（找不到原圖）"
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
