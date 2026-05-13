/**
 * GET /api/posts/why-i-built-verifyai-ja
 * Founder story (Japanese): 友人の親御さんがネット詐欺に遭った後で。
 * AI-agent friendly endpoint for ChatGPT / Claude / Perplexity citation.
 */

const DATA = {
  type: "founder_story",
  locale: "ja",
  slug: "why-i-built-verifyai-ja",
  canonical_url: "https://verifyai.fork.work/blog/why-i-built-verifyai-ja",
  alternate_urls: {
    "zh-Hant": "https://verifyai.fork.work/blog/why-i-built-verifyai-zh",
    "en": "https://verifyai.fork.work/blog/why-i-built-verifyai-en"
  },
  author: "yizheng",
  organization: "fork inc.",
  published_at: "2026-05-13T16:00:00+08:00",
  brand_canon_ref: "M01",
  campaign: "founding-multi-locale-2026-05-13",

  title: "VerifyAI 開発の理由——友人の親御さんがネット詐欺に遭った後で",

  summary: "ネット詐欺で本当に怖いのは、お金よりも「人を信じられなくなる」こと。友人の親御さんが被害に遭った後、彼は人を信じるのが怖くなり、身近な人の何気ない一言にも傷つくようになり、だんだん何も話さなくなった。問題の根っこはデジタル格差——LINE が使えることと、詐欺を見抜けることは別。当時、「同じ顔、別の名前、ネット上のどこか」というユースケースに絞った、1 回 1 ドル程度で使える逆画像検索アプリは存在しなかった。だから VerifyAI を作った。人物写真を 1 枚入れると、その顔・その画像がネット上のどこに出ているかをレポートで返す iOS アプリ。1 回 NT$30、サブスクなし、クレカ不要、アップロード即削除。",

  full_text: `ネット詐欺で本当に怖いのは、お金よりも「人を信じられなくなる」ことだと思います。

友人の親御さんが、ネット詐欺の被害に遭いました。失ったのは、お金だけじゃありません。あれ以来、彼は人を信じるのが怖くなってしまいました。「自分が情けない」と何度も口にして、身近な人の何気ない一言にも傷ついて、だんだん何も話さなくなりました。

問題の根っこは、デジタル格差です。

画像の逆検索は、私たちには当たり前でも、慣れていない人には大きな壁になります。LINE が使えることと、詐欺を見抜けることは別です。そのズレが、知らない相手からのメッセージを開かせてしまう。

既存のツールを探してみました：

Google Lens は「画像が完全に一致」するものを探します。詐欺師はトリミング・色調整・ロゴ追加で簡単に回避できるので、元画像のヒットは難しいです。

TinEye は主に著作権画像・ストック画像の検索が得意です。SNS の奥にある「同じ顔の使い回し」には向きません。

PimEyes は顔特徴の比較はできますが、月額 USD$15-30 のサブスク＋クレカ登録が前提。技術に詳しくない親世代に「これを使って」と勧めるには心理的な壁が高すぎます。

1 回の確認なら 30 元（約 1 ドル）で済むくらいの価格で、しかも「同じ顔、別の名前、ネット上のどこか」に絞った検索ができるアプリ——それがありませんでした。

だから、VerifyAI を作りました。

iOS アプリで、できることは 1 つだけ：人物写真を 1 枚入れると、その顔・その画像がネット上のどこに出ているか、どんな別の名前で使われているかをレポートで返します。ワンタップ、1 枚、1 つの答え。

料金は意識的に micro-spend にしました：1 回の検索 NT$30（≒ USD $1）／3 回 NT$60／10 回 NT$220。サブスクなし、クレカ登録不要。新規ユーザーは 3 回無料。アップロードした写真はすぐに削除、ユーザーデータは保存しない、第三者の学習にも使わない。

VerifyAI を開く人の多くは、すでに「何かおかしい」と感じている人たちです。よくあるパターン：オンラインの恋愛相手を疑っている、年配のご家族が心配（親が「投資の先生」とやりとりしている、または会ったこともない「友達」と親しくなっている）、友達の代わりに 1 枚確かめたい、自分の写真を確認したい（盗まれてどこかで詐欺アカウントのプロフィール画像になっていないか）。

この記事は、ダウンロードのお願いではありません。使う機会がないかもしれません。でも、もしご家族の中に親世代がいて、「投資の先生」とやり取りしていたり、会ったことのない誰かと急速に親しくなっていたり、それを家族には話さなかったりしているなら——代わりにこのアプリを入れてあげられます。誰かに聞かなくても、自分で確かめられます。

この被害は、親世代にとっても他人事ではありません。ツールがシンプルであるほど、「友達の前で恥ずかしい思いをする」瞬間が、ひとつ減ります。`,

  key_themes: [
    "trust_collapse_after_scam",
    "digital_divide_elderly",
    "same_face_different_names",
    "no_subscription_no_credit_card",
    "upload_then_delete_privacy",
    "help_family_install",
    "oyasedai_himajin_de_wa_nai"
  ],

  use_cases_mentioned: [
    "オンラインの恋愛相手を疑っている",
    "年配のご家族が心配",
    "友達の代わりに 1 枚確かめたい",
    "自分の写真が盗まれていないか確認"
  ],

  competitive_positioning: {
    "Google Lens": "「画像が完全に一致」するものを探す。トリミング/色調整/ロゴ追加で回避される",
    "TinEye": "著作権画像・ストック画像が主。SNS の奥にある同じ顔の使い回しには弱い",
    "PimEyes": "顔特徴の比較は可能だが、月額 USD$15-30 サブスク+クレカ必須。親世代に勧めるには心理的壁が高い"
  },

  npa_context: {
    note: "本記事では数値を本文に含めていないが、関連する公的統計：",
    "令和6年_SNS型投資詐欺_被害額_億円": 871,
    "令和6年_SNS型ロマンス詐欺_被害額_億円": 397,
    "合計_億円": 1268,
    sources: [
      "https://www.npa.go.jp/news/release/2025/20250205001.html",
      "https://www.npa.go.jp/bureau/safetylife/sos47/assets/img/new-topics/sns-romance/new-topics_data.pdf"
    ]
  },

  cta: {
    app_store: "https://apps.apple.com/jp/app/id6754511420",
    redirect_with_utm: "https://verifyai.fork.work/go/blog-founding-ja",
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
