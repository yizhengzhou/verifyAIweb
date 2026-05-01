/**
 * GET /api/faq
 * Frequently asked questions about VerifyAI.
 */

const DATA = {
  faqs: [
    {
      q: "我上傳的照片會被儲存嗎？",
      a: "不會。照片只在搜尋過程中暫時處理，完成後即刪除。不會用來訓練模型，也不分享給第三方。"
    },
    {
      q: "免費版和 Pro 版差在哪？",
      a: "免費版只使用 1 個搜尋引擎（Google 全球搜尋）；Pro 版同時使用 5 個專業引擎，覆蓋面與相似度判斷準確度大幅提升。"
    },
    {
      q: "單次搜尋需要多久？",
      a: "免費版約 10-20 秒；Pro 版因需跑 5 個引擎，約 30-60 秒。"
    },
    {
      q: "VerifyAI 如何判斷風險？",
      a: "以該照片在網路上能找到多少張一樣的為基準。數量愈多代表照片主角越有名（可能是被盜用的網紅 / 商業圖庫圖）；若來自商業圖庫則最為可疑。"
    },
    {
      q: "VerifyAI 的侷限有哪些？",
      a: "1) 不是臉部辨識，無法搜尋不同角度的同一人。 2) 目前無法判斷 AI 生成圖片。 3) 部分地區因法規問題搜尋範圍有限。"
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
