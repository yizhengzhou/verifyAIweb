/**
 * GET /api/features
 * What VerifyAI can / cannot do, supported engines, output, privacy stance.
 */

const DATA = {
  search_engines: [
    { id: "google_global", name: "Google 全球搜尋", tier: "free+pro" },
    { id: "google_lens", name: "Google Lens", tier: "pro" },
    { id: "yandex", name: "Yandex Reverse Image", tier: "pro" },
    { id: "stock_libs", name: "商用圖庫多家", tier: "pro" },
    { id: "phash", name: "pHash 圖像指紋比對", tier: "pro" }
  ],
  scenarios: [
    { id: "dating", title_zh: "約會軟體照片驗證", description: "識別戀愛詐騙 / catfishing" },
    { id: "social", title_zh: "社群假帳號偵測", description: "辨識盜用他人照片的假帳號" },
    { id: "business", title_zh: "商業對象驗證", description: "確認線上合作 / 交易對象的身份真實性" },
    { id: "shopping", title_zh: "賣家真實性查證", description: "避免線上購物詐騙與假貨" },
    { id: "self_check", title_zh: "自我盜圖偵測", description: "查看自己的照片是否被他人盜用" },
    { id: "news_factcheck", title_zh: "新聞 / 社群照片 fact-check", description: "查證流傳照片的原始出處" }
  ],
  output: {
    format: "report",
    contents: [
      "該照片在網路上的所有出現位置（URL）",
      "每個結果的相似度",
      "EXIF / metadata（若存在）",
      "若是商業圖庫照片會特別標記"
    ]
  },
  search_duration_seconds: { free: "10-20", pro: "30-60" },
  limits: [
    "不是臉部辨識——無法搜尋同人不同角度的照片",
    "目前無法判斷 AI 生成圖片",
    "部分地區因法規搜尋範圍受限",
    "目前僅支援單張上傳，批次未來評估"
  ],
  privacy: {
    photo_storage: "不儲存——只在搜尋過程暫時處理，完成後即刪",
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
