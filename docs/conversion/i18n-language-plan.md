# VerifyAI 語言 URL 策略 ADR (R0.4)

## 提案記錄 (R0.4 ADR)
- **提案日期**：2026-07-16
- **文件定位**：本文件為「語言 URL 策略架構決策記錄 (Architecture Decision Record, ADR)」，作為方案評估與候選方案提報，並非執行計劃。本提案需提交至 R0.4 審查核准後方可實施。
- **候選方案**：Browser-based i18n + 單一 URL (不拆分 locale URLs) + 4 語系完整對齊（zh-TW / en / ja / ko） + `hreflang` 宣告。
- **方案內容**：
  - 採用「單一 URL + `?lang=` 參數 + `hreflang` 宣告」的混合架構。
  - 所有翻譯由 AI Agent 執行，無須人工介入提供。

---

## 語言解析一致性規範 (Canonical Language Resolver)

為解決 Codex 審查發現的「語言判定來源不一致（Worker vs client vs tracking）」衝突，本方案定義並實作唯一的 **Canonical Language Resolver**。所有涉及語言判定的模組必須使用完全相同的解析邏輯與結果：

1. **判定優先順序**：
   1. 網址參數 `?lang=` (支援 `en`, `zh-TW`, `ja`, `ko`)
   2. Cookie `preferredLanguage`
   3. 瀏覽器或系統語系 (`navigator.language` / `Accept-Language` 標頭)
   4. 預設語系 `en`

2. **強制一致性元件**：
   - **Cloudflare Worker**：邊緣節點重寫 HTML 語言標籤與 Meta 資訊。
   - **Client-side i18n**：React Context ([I18nContext.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/context/I18nContext.jsx)) 進行畫面語系渲染。
   - **Tracking Helper**：在追蹤事件中上報正確且一致的 `language` 參數。
   - **App Store 導向邏輯**：[`getAppStoreUrl.js`](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/utils/getAppStoreUrl.js) 需依此結果計算對應 Storefront。

上述所有元件必須共用相同的語系判定順序與邏輯，確保同一次造訪中，各端判定之語系 100% 一致。

---

## 現狀分析

VerifyAI 目前已具備基本的多語系架構，但存在嚴重的 SEO 語系訊號衝突，且部分的內容生成機制與語系檔案尚未完整對齊。

### 1. 已實作部分 (Existing Infrastructure)
- **i18n 核心機制**：主站已建立 [I18nContext.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/context/I18nContext.jsx)，採用「瀏覽器語言偵測 + URL `?lang=` 參數 + `localStorage` 記憶」的偵測順序。
- **語系檔案**：存在 4 個語系 JSON 檔（`en.json`, `zh-TW.json`, `ja.json`, `ko.json`），存放於 `/public/locales/` 目錄。

### 2. 斷裂與未對齊部分 (i18n Gaps)
- **HTML 語系訊號衝突**：
  - [index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html) 中 `<html lang="zh-TW">` 為硬寫（Hardcoded），然而頁面中的 `<title>`、`<meta name="description">`、`<meta property="og:title">`、OG 描述等全為英文。
  - 這導致搜尋引擎爬蟲（Crawler）解析時收到衝突的語系訊號（宣告為繁中，內容卻為英文），嚴重損害 SEO 排名。
- **Guide 指南頁面未納入 i18n**：
  - 現有的 6 個 SEO 指南頁面（Guides）僅有英文版本。
  - 其靜態生成腳本 [scripts/generate-seo-guides.cjs](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/scripts/generate-seo-guides.cjs) 中，HTML 樣板與英文文案高度耦合，且完全不支援語系參數。
- **韓文翻譯缺失 (ko.json 殘缺)**：
  - 相較於 `en.json` (418行) 與 `zh-TW.json` (419行)，[ko.json](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/locales/ko.json) 僅有 223 行，缺漏了近一半的翻譯 Key，會導致韓文使用者介面出現大量未翻譯的 Raw Key。
- **缺失 `hreflang` 宣告**：
  - 網頁中沒有 any `<link rel="alternate" hreflang="..." />` 宣告，搜尋引擎無法識別該單一 URL 支援多語系，亦無法在不同國別的搜尋結果中配對正確的語言版本。

---

## 工作項目

### P0：Server-side 語言訊號修正
- **目的**：消除 `index.html` 靜態 Raw HTML 的語系訊號衝突，並在 Server-side / 邊緣節點提供動態的語系與社交 Meta Tags。
- **執行方案**：
  1. **預設 HTML 語系信號統一**：將靜態 [index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html) 的預設 `<html lang="en">` 改為英文，以與目前硬寫的英文 Title/Description/OG 保持一致。
  2. **邊緣節點（Cloudflare Workers）重寫**：
     - 在 Cloudflare Workers（或中轉 Server）中，當收到造訪首頁的請求時，先讀取 `?lang=` 參數、Cookie（`preferredLanguage`）或 `Accept-Language` 標頭以識別使用者語系。
     - 透過 Workers 的 HTMLRewriter 動態修改返回的 HTML：
       - 重寫 `<html lang="...">` 為對應語系（如 `zh-TW`、`ja`、`ko`）。
       - 依據 `/public/locales/${lang}.json` 的 `"meta"` 節點，動態替換 `<title>`、`<meta name="description">`、Open Graph (og:title, og:description, og:locale) 及 JSON-LD 中的欄位。
     - **優點**：確保搜尋引擎爬蟲在不執行 JavaScript 的情況下，也能讀取到 100% 一致且對應語系的 Raw HTML 標籤。

### P0：hreflang 宣告
- **目的**：向搜尋引擎宣告單一 URL 架構下所支援的 4 種語言變體。
- **執行方案**：
  - 在 [index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html) 的 `<head>` 區塊加上 `hreflang` 的宣告，將 URL 參數型態（`?lang=`）作為 alternate 地址提供給爬蟲：
    ```html
    <link rel="alternate" hreflang="x-default" href="https://verifyai.fork.work/" />
    <link rel="alternate" hreflang="en" href="https://verifyai.fork.work/?lang=en" />
    <link rel="alternate" hreflang="zh-Hant" href="https://verifyai.fork.work/?lang=zh-TW" />
    <link rel="alternate" hreflang="ja" href="https://verifyai.fork.work/?lang=ja" />
    <link rel="alternate" hreflang="ko" href="https://verifyai.fork.work/?lang=ko" />
    ```
  - **優點**：即使主站為單一 URL，搜尋引擎也能透過 hreflang 自動爬取各語系版本，並在對應語系的搜尋引擎中呈現正確語言的網頁快照與 snippet。

### P1：Guides 多語化與納入 i18n 系統
- **目的**：將 6 個 SEO guide 頁面全面擴展為 4 語系，並在單一 URL 下實現語言切換與 SEO 優化。
- **執行方案**：
  1. **Guides 翻譯多語化**：
     - 將 6 個指南的內容（`title`, `answer`, `why`, `steps`, `caution`）翻譯為繁中、日文與韓文。
     - 為了結構清晰且不使主語系 JSON 過於臃腫，建議在現有 JSON 檔案中新增 `"guides"` 分支，或在 `/public/locales/` 下建立對應的 `guides_${lang}.json` 供 Client-side 動態載入。
  2. **單一 URL 與載入機制**：
     - 指南頁 URL 依然保持單一（如 `/guides/find-image-source/`）。
     - **Client-side 載入**：在 Guides 頁面的 JavaScript 中，執行與首頁相同的 `detectLanguage()` 邏輯，並透過 fetch 動態載入該語言的 guide 內容，即時渲染至 DOM 中。
     - **Server-side 重寫 (SEO 友善)**：為了確保搜尋引擎 Crawler 能爬到完整、靜態且正確語系的 HTML 指南內容，Cloudflare Worker 應在收到 `/guides/${slug}/?lang=${lang}` 請求時，直接在邊緣節點以 HTMLRewriter 替換對應語系的靜態內容（由 i18n 改造後的 generator 預先產出的各語言靜態片段或檔案），返回 100% 渲染完成的 HTML。

### P1：ko.json 補完
- **目的**：將 `ko.json` 缺漏的約 195 行翻譯對齊，消滅 Raw Key 的出現。
- **執行方案**：
  - 由 AI Agent 讀取完整的 `en.json` 或 `zh-TW.json`，對齊所有 Key 的架構，並將缺失的翻譯全部補齊為高品質韓文。
  - 確保變數插值（例如 `%s`）與 Key 階層結構 100% 對應。

### P2：Guides generator i18n 改造
- **目的**：改造靜態指南生成器，使 HTML 樣板與文案徹底解耦，支援多語系生成。
- **執行方案**：
  - 重構 [scripts/generate-seo-guides.cjs](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/scripts/generate-seo-guides.cjs)：
    - 抽離 HTML 樣板，並將 "Quick answer"、"How to use" 等介面通用字串移入語系設定檔中。
    - 讓腳本支援 `--lang` 參數，或在單次執行中自動遍歷 4 個語系，從各語系的 JSON 檔案中讀取指南數據。
    - 產出各語系的靜態 HTML 檔案（例如預設英文輸出為 `index.html`，繁中輸出為 `index-zh-TW.html`，供 Cloudflare Worker 進行 Server-side 內部讀取與重寫）。

---

## 與主企劃的相容性

本多語方案完全對照與相容於 [主企劃](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/VERIFYAI_DOWNLOAD_CONVERSION_MASTER_PLAN-2026-07-15.md) 與 [量測計畫](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/conversion/measurement-plan.md)。

### 1. 不影響 Tracking 事件規格
- 主企劃與量測計畫定義了 `view_landing`、`view_guide`、`click_app_store` 等 6 個 Canonical 事件。
- 本方案無須為不同語系建立互不相容之自訂事件（如 `click_app_store_zh`）。所有語系均上報相同的 Canonical 事件，僅透過參數區分。

### 2. 不影響 Measurement Plan 的參數定義
- 量測計畫中已規範 `language` 參數為必填，且範例值與允許值為 `'zh-TW'`, `'en'`, `'ja'`, `'ko'`。
- 本方案的瀏覽器動態語系偵測值與此規範 100% 一致。當事件上報時，會將當前 i18n context 中的 `lang` 直接寫入 `language` 參數，符合量測計畫要求。

### 3. 不影響 CTA Helper 與 Download Inventory
- **下載清冊對照**：主站首頁與指南頁的物理按鈕其 `cta_id`（如 `rt_home_hero`、`rt_guide_find_source_bottom`）在 4 語系下保持唯一，無須因語言不同而拆分，這與 [下載路徑清冊](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/conversion/download-route-inventory.md) 完美契合。
- **storefront 語系對齊**：CTA 下載跳轉使用的 [getAppStoreUrl.js](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/utils/getAppStoreUrl.js) 會自動依據 i18n 提供的 `lang`，動態計算並跳轉至正確國別的 App Store Storefront（例如繁中導向台灣區 storefront `/tw/`，韓文導向 `/kr/`），這與本方案的語系切換完全連動。

### 4. 不影響 Baseline / Experiment 的執行
- **單一 URL 優勢**：因為採用單一 URL，流量在 GA4 等分析工具中不會因語系路徑（如 `/zh/`、`/ja/`）而被拆散，簡化了主企劃中有關「新版量測起點與舊資料隔離」的數據處理流程。
- **A/B 測試相容性**：在進行 A/B 測試（如 Hero 標題實驗 `Task 3.1`）時，不同語系的使用者會同時在各自語系下看到 Control 與 Variant 文案，分析時亦可藉由同時載入 `page_variant` 與 `language` 參數進行精確的交叉分析。

---

## 執行條件與 Phase Gate 順序

本多語方案之實施必須嚴格遵守主企劃之 Phase gate 規範，不得跳過任何 Release 控制節點：

- **啟動與核准條件**：
  1. **R0.1–R0.3 完成**：必須完成所有下載路徑清冊 (Task 0.1)、確認 legacy route 移除 (Task 0.2) 以及現行 baseline 的保存與封存 (Task 0.3)。
  2. **R0.4 核准**：本「語言 URL 策略 ADR」提案必須獲得核准。
  3. **R1 Quality Gate 通過**：必須通過 R1 (Phase 1) 的量測與歸因品質驗收 (包含 Measurement Plan 建立、CTA tracking helper 實作、UTM 規範及 Dashboard 建立)。
- **部署時機**：上述條件皆達成後，方可將 i18n 相關代碼與語系檔部署至正式環境。

---

## Baseline 隔離與部署要求

為避免多語系上線對現有數據基線造成污染，必須遵守以下部署與隔離規範：

1. **Baseline 隔離**：
   - 多語系 (i18n) 的 Production 部署必須在**目前已定義的 Baseline 封存**之後，始得執行。
   - 多語系部署完成後，必須**另行開啟新的 Baseline 窗口**進行數據觀測，不得與舊的 Baseline 窗口數據混合計算。

2. **部署記錄規範**：
   - 多語系部署的 commit message 或發布記錄中，必須明確記錄**部署時的時間與時區**（例如：`2026-07-16T10:00:00+08:00`）。
   - 此時間點將作為新舊 Baseline 的數據切分時間界線。
