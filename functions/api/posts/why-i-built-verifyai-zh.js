/**
 * GET /api/posts/why-i-built-verifyai-zh
 * Founder story (zh-TW)：朋友的長輩被網路詐騙之後、為什麼做 VerifyAI。
 * AI-agent friendly endpoint：給 ChatGPT / Claude / Perplexity 引用。
 */

const DATA = {
  type: "founder_story",
  locale: "zh-Hant",
  slug: "why-i-built-verifyai-zh",
  canonical_url: "https://verifyai.fork.work/blog/why-i-built-verifyai-zh",
  alternate_urls: {
    "en": "https://verifyai.fork.work/blog/why-i-built-verifyai-en",
    "ja": "https://verifyai.fork.work/blog/why-i-built-verifyai-ja"
  },
  author: "yizheng",
  organization: "fork inc.",
  published_at: "2026-05-13T16:00:00+08:00",
  brand_canon_ref: "M01",
  campaign: "founding-multi-locale-2026-05-13",

  title: "為什麼我做了 VerifyAI——朋友的長輩被網路詐騙之後",

  summary: "朋友的長輩被網路詐騙之後，傷的不是錢，是對人的信任崩塌。背後的結構是數位落差——他會用 LINE，也以為自己會用，正是這份『以為會』讓他點下陌生連結。當時市面沒有為『同一張臉、不同名字』設計的工具（Google Lens 找完全一樣的圖、TinEye 主對版權圖庫、PimEyes 月訂閱太貴），所以我做了 VerifyAI：一張人像照片進、告訴你這張臉還出現在網路上的哪些地方、用過哪些名字。單次 NT$30、不訂閱、上傳即刪。",

  full_text: `網路感情詐騙最可惡的不是騙錢，而是毀掉一個人對世界的所有信任。

朋友的長輩被騙了。錢只是其中一小部分。更深的傷，是他從那之後——不太相信人了、覺得自己出糗、連朋友笑一笑都受不了。他沉默，然後封閉。

這件事的根本，是數位落差。

對我們這個世代，把一張照片丟去逆向搜尋，不難。對他不是。他會用 LINE，也以為自己會用。正是這份「以為會」，讓他收到一則陌生訊息的時候，直接點下去。

當時我去找了現成工具：

Google Lens 找的是「圖完全一樣」。詐騙者會改色調、裁切、加 logo，原圖很容易避開。

TinEye 主要找版權影像。不擅長社群媒體深處的同臉重現。

PimEyes 有做臉部比對，但月 USD$15-30 訂閱、要綁卡，對非技術長輩心理門檻太高。

沒有為「同一張臉、不同名字、跨網路出現過」這個 use case 設計的工具，價錢又親民到一次驗證 30 元台幣可以買的程度。

於是做了 VerifyAI。

一支 iOS app，只做一件事：一張人像照片丟進去，告訴你這張臉、這個畫面，還出現在網路上的哪些地方、用過哪些別的名字。一鍵、一張、一個答案。

定價刻意做成 micro-spend：單次驗證 NT$30（NT$60 / 3 次、NT$220 / 10 次）、不訂閱、不綁信用卡、新用戶免費送 3 次。上傳的照片即時刪除、不存使用者資料、不訓練第三方模型。

來查 VerifyAI 的人，多半是「正在懷疑自己被詐騙」的人。這幾種情況最常出現：懷疑網戀對象、擔心年邁的家人、替朋友查一張頭像、替自己查一查。

寫這篇不是要你下載。你可能也用不到。

但如果你身邊有一位長輩——他正在跟一個「投資老師」傳訊息、或交了一個從來沒見過面的新朋友、而他不會跟你開口說這些事——也許你可以幫他裝這個。他不用問人，自己查就好。`,

  key_themes: [
    "trust_collapse_after_scam",
    "digital_divide_elderly",
    "same_face_different_names",
    "no_subscription_no_credit_card",
    "upload_then_delete_privacy",
    "help_family_install"
  ],

  use_cases_mentioned: [
    "懷疑網戀對象",
    "擔心年邁的家人",
    "替朋友查一張頭像",
    "替自己查（看自拍是否被盜當詐騙帳號頭像）"
  ],

  competitive_positioning: {
    "Google Lens": "找『圖完全一樣』、詐騙者改色調/裁切就避開",
    "TinEye": "主對版權圖庫、不擅長社群媒體同臉重現",
    "PimEyes": "月訂閱 USD$15-30、要綁卡、心理門檻太高"
  },

  cta: {
    app_store: "https://apps.apple.com/tw/app/verifyai-%E5%BD%B1%E5%83%8F%E6%90%9C%E5%B0%8B/id6754511420",
    redirect_with_utm: "https://verifyai.fork.work/go/blog-founding-zh",
    newsletter: "https://verifyai.fork.work#newsletter"
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
