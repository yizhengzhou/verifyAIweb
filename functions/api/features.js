/**
 * GET /api/features
 * What VerifyAI can / cannot do, supported engines, output, privacy stance.
 *
 * Aligned to PRODUCT_FACTS.md: face-required input, exact-match focus,
 * out-of-scope flagged explicitly.
 */

const DATA = {
  what_it_does: "比對你上傳的人像照片，在網路上是否存在相同（或輕微裁切）的副本，並回報每個出現位置。",
  input_requirements: [
    "照片必須含有人臉（無人臉照片會被拒絕）",
    "支援 JPG / PNG / HEIC",
    "建議用未經大幅後製的原始照片，比對命中率較高"
  ],
  search_engines: [
    { id: "google_global", name: "Google 全球搜尋", tier: "free+pro" },
    { id: "google_lens", name: "Google Lens", tier: "pro" },
    { id: "yandex", name: "Yandex Reverse Image", tier: "pro" },
    { id: "stock_libs", name: "商用圖庫多家", tier: "pro" },
    { id: "phash", name: "pHash 圖像指紋比對", tier: "pro" }
  ],
  scenarios: [
    { id: "dating", title_zh: "約會 / 交友對象人像驗證", description: "識別戀愛詐騙 / catfishing — 對方傳來的自拍" },
    { id: "social", title_zh: "社群假帳號偵測", description: "辨識盜用他人人像的假帳號" },
    { id: "self_check", title_zh: "替自己查盜用", description: "查看自己的頭像是否被別人拿去當其他帳號的 profile" },
    { id: "elderly_protection", title_zh: "家屬代查保護長輩", description: "晚輩查驗長輩接收到的人像照片真實性" },
    { id: "professional_meetup", title_zh: "面試 / 商業合作前查驗", description: "確認對方 LinkedIn / 名片大頭照是真人" }
  ],
  output: {
    format: "report",
    contents: [
      "該照片在網路上的所有出現位置（URL）",
      "每個結果的相似度（exact / similar 區分）",
      "EXIF / metadata（若存在）",
      "若是商業圖庫照片會特別標記",
      "風險等級判定（high_risk / suspicious / uncertain / original_capture / clean）",
      "若有 EXIF + 人臉會啟用 short-circuit：直接顯示『原始相機資訊』綠色低風險，不扣 credit"
    ]
  },
  search_duration_seconds: { free: "10-20", pro: "30-60" },
  limits: [
    "不接受沒有人臉的照片（商品照、風景照、寵物照、食物照都會被拒絕）",
    "不是人臉辨識 — 無法搜尋同人不同角度、不同造型的照片",
    "比對基本上只能 100% 相同（含輕微裁切），大幅裁切或大幅後製的照片找不到原圖",
    "不做身分辨識 — 不會告訴你照片裡的人是誰",
    "搜尋引擎標記為『相似』的結果通常是構圖 / 背景 / 顏色相近，不是臉部相似，僅作次要訊號",
    "AI 生成偵測作為附註訊號（false positive 約 21%），不參與風險判定",
    "部分地區因法規搜尋範圍受限",
    "目前僅支援單張上傳"
  ],
  privacy: {
    photo_storage: "不儲存 — 只在搜尋過程暫時處理，完成後即刪",
    model_training: "不用於訓練模型",
    third_party_share: "不分享給第三方",
    account_required: false
  }
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
