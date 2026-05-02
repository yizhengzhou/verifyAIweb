/**
 * GET /api/faq
 * Frequently asked questions about VerifyAI.
 * Aligned to PRODUCT_FACTS.md.
 */

const DATA = {
  faqs: [
    {
      q: "VerifyAI 到底做什麼？",
      a: "比對你上傳的人像照片在網路上是否有相同副本。不是人臉辨識（不會找『這個人是誰』），也不是身分查詢。重點在『這張照片』有沒有被盜用、出現在哪裡。"
    },
    {
      q: "我上傳沒有人臉的照片可以嗎？",
      a: "不可以。VerifyAI 只接受含人臉的照片。商品照、風景照、寵物照、無人臉的新聞照都會被拒絕。設計上是為了專注在反詐騙最有效的場景：人像盜用。"
    },
    {
      q: "我上傳的照片會被儲存嗎？",
      a: "不會。照片只在搜尋過程中暫時處理，完成後即刪除。不會用來訓練模型，也不分享給第三方。"
    },
    {
      q: "免費版和 Pro 版差在哪？",
      a: "免費版只使用 1 個搜尋引擎（Google 全球搜尋）；Pro 版同時使用 5 個專業引擎，覆蓋面與相似度判斷準確度大幅提升。"
    },
    {
      q: "為什麼我上傳自己的自拍會收到風險訊號？",
      a: "VerifyAI 判斷的是『這張照片』在網路上的散布狀態，不是『你這個人』。如果你的自拍被別人盜下來當作其他帳號頭像，這就是真實的訊號。從相簿直接傳的自拍（保有 EXIF）會走 short-circuit 直接顯示『原始相機資訊』綠色低風險、不扣 credit；社群轉傳後 EXIF 已被 strip 的版本會走完整搜尋。"
    },
    {
      q: "VerifyAI 如何判斷風險？",
      a: "以該照片在網路上能找到多少張完全相同的為基準。商業圖庫照片（盜圖大宗）會被特別標記。搜尋引擎判定為『相似』而非『相同』的結果僅作次要訊號，因為相似通常是構圖 / 背景 / 顏色相近，不是臉部相似。"
    },
    {
      q: "單次搜尋需要多久？",
      a: "免費版約 10-20 秒；Pro 版因需跑 5 個引擎，約 30-60 秒。EXIF + 人臉的自拍會 short-circuit 不跑搜尋，幾秒內回傳。"
    },
    {
      q: "VerifyAI 的侷限有哪些？",
      a: "1) 不接受沒有人臉的照片。 2) 不是人臉辨識，無法搜尋同人不同角度。 3) 比對只能對 100% 相同（含輕微裁切）的副本，大幅裁切或大幅後製找不到。 4) 不做身分辨識。 5) AI 生成偵測作為附註訊號（false positive 約 21%），不參與風險判定。"
    },
    {
      q: "可以一次上傳多張照片嗎？",
      a: "目前僅支援單張上傳，批次上傳功能未來評估。"
    },
    {
      q: "VerifyAI 支援 Android 嗎？",
      a: "目前僅 iOS。Android 版本未排定時程。"
    },
    {
      q: "需要註冊帳號嗎？",
      a: "不需要。直接下載 App 即可使用，無需建立帳號。"
    },
    {
      q: "VerifyAI 跟 Google 反向搜圖直接用差在哪？",
      a: "Google 反向搜圖只是 5 個引擎中的 1 個。VerifyAI 在 Pro 模式下同時跑 Google + Google Lens + Yandex + 多個商用圖庫 + pHash 指紋比對，不同引擎覆蓋的網路範圍互補；單獨用 Google 會錯過 Yandex 對俄語 / 東歐網域的覆蓋、會錯過商業圖庫的盜用偵測、也錯過 pHash 對裁切 / 微調照片的辨識。"
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
