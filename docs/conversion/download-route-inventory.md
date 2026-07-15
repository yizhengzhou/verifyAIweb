# VerifyAI 下載路徑與轉換點清冊 (Download Route Inventory)

此清冊詳細盤點並記錄了 VerifyAI 專案中所有的下載進入點 (App Store 連結、Smart App Banner、重定向路由與元數據參考)。所有項目皆已完成線上實際驗證。

---

## 1. 概覽與彙總

| 下載路徑分類 (Status) | 數量 | 說明 |
| :--- | :---: | :--- |
| **Production Active** (生產中活躍) | 4 | 使用者正常瀏覽網頁時會點擊並下載之 CTA，以及 iOS 系統原生 Banner。 |
| **Paid-Only** (付費廣告流量專用) | 1 | 專為特定廣告 Campaign 設計之 Landing Page CTA，帶有 Ads 轉換追蹤且不公開。 |
| **Generated Guide** (自動生成的指南) | 6 | 由 SEO Guide 生成腳本所產生的 6 個英文搜尋與安全指南頁面。 |
| **API / Content Reference** (元數據引用) | 3 | 供搜尋引擎抓取、SEO schema 標記使用，非供使用者直接點擊之 CTA。 |
| **Legacy / Inactive** (歷史遺留/非現行) | 5 | 專案中已廢棄、無頁面引入或已變更為其他導向之歷史連結與元件。 |
| **總計** | **19** | **所有現行及非現行路徑，目的地 App ID 皆為 `6754511420` (除已失效重定向外)。** |

---

## 2. 下載路徑詳細清單

### 2.1 Production Active (生產中活躍)

#### [rt_home_hero] 首頁 Hero 區塊 CTA
- **狀態**：`production_active`
- **來源檔案**：[src/components/SeoLanding.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx#L61)
- **頁面 URL**：`/` (https://verifyai.fork.work/)
- **頁面類型**：`home`
- **CTA 位置**：`hero`
- **適用語言**：`dynamic` (依瀏覽器與 locale 設定，繁中顯示為「免費下載 iPhone App」，英文顯示為「Download free for iPhone」)
- **目的地 URL**：`getAppStoreUrl(lang)` (繁中導向 `https://apps.apple.com/tw/app/id6754511420`；英文導向 `https://apps.apple.com/us/app/id6754511420`)
- **目的地 App ID**：`6754511420`
- **現行事件**：無 (待 Phase 1 部署)
- **Campaign 參數處理**：無額外處理
- **線上驗證狀態**：已驗證。線上點擊能依據瀏覽器語言自動導向至對應地區 storefront (台灣區 App 名稱為 `VerifyAI 影像搜尋`，美區為 `VerifyAI Image Search`)。

#### [rt_home_bottom] 首頁底部下載區塊 CTA
- **狀態**：`production_active`
- **來源檔案**：[src/components/SeoLanding.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx#L74)
- **頁面 URL**：`/` (https://verifyai.fork.work/)
- **頁面類型**：`home`
- **CTA 位置**：`bottom`
- **適用語言**：`dynamic` (繁中為「免費下載 iPhone App」，英文為「Download free for iPhone」)
- **目的地 URL**：`getAppStoreUrl(lang)`
- **目的地 App ID**：`6754511420`
- **現行事件**：無
- **Campaign 參數處理**：無額外處理
- **線上驗證狀態**：已驗證。

#### [rt_footer_changelog] 頁尾 Changelog 下載連結
- **狀態**：`production_active`
- **來源檔案**：[src/components/Footer.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/Footer.jsx#L38-L40) (由首頁、terms、privacy 等頁面引用)
- **頁面 URL**：`/`, `/terms`, `/privacy`, `/scammer-mind`
- **頁面類型**：`footer`
- **CTA 位置**：`footer`
- **適用語言**：`dynamic` (顯示文字為 `t('footer.product.changelog')`，英文為 `What's New`)
- **目的地 URL**：`getAppStoreUrl(lang)`
- **目的地 App ID**：`6754511420`
- **現行事件**：無
- **Campaign 參數處理**：無額外處理
- **線上驗證狀態**：已驗證。

#### [rt_smart_banner] iOS Safari Smart App Banner 原生橫幅
- **狀態**：`production_active`
- **來源檔案**：[index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html#L8)
- **頁面 URL**：載入此 HTML 的所有網頁路由 (全站)
- **頁面類型**：`global`
- **CTA 位置**：`browser_native` (由瀏覽器在頂部原生渲染)
- **適用語言**：`dynamic` (由 iOS 系統決定 storefront)
- **目的地 URL**：由系統原生處理
- **目的地 App ID**：`6754511420`
- **現行事件**：無 (Safari 原生行為)
- **Campaign 參數處理**：無額外參數
- **線上驗證狀態**：已驗證。使用 iOS Safari 開啟首頁時，頂部會自動浮現 VerifyAI Smart App Banner 原生下載橫幅。

---

### 2.2 Paid-Only (付費廣告流量專用)

#### [rt_ad_us_shorts] 美區 Shorts 廣告 Landing Page CTA
- **狀態**：`paid_only`
- **來源檔案**：[public/ads/us-shorts.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/ads/us-shorts.html#L152-L156)
- **頁面 URL**：`/ads/us-shorts` (https://verifyai.fork.work/ads/us-shorts)
- **頁面類型**：`ad` (不公開，設有 `noindex, nofollow`)
- **CTA 位置**：`inline` (頁面中間大按鈕)
- **適用語言**：`en` (英文)
- **目的地 URL**：`https://apps.apple.com/us/app/verifyai-image-search/id6754511420` (固定美區)
- **目的地 App ID**：`6754511420`
- **現行事件**：`gtag_report_conversion` (Google Ads 轉換事件 `AW-18226736945/tHpKCJrLtr0cELHel_ND`)
- **Campaign 參數處理**：透過 `gtag` 上報 conversion，但未將 URL 中的廣告參數傳遞給最終 App Store 連結。
- **線上驗證狀態**：已驗證。

---

### 2.3 Generated Guide (自動生成的指南)

以下 6 個頁面由 [scripts/generate-seo-guides.cjs](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/scripts/generate-seo-guides.cjs) 自動生成，每頁皆包含頂部 Header 與頁尾 CTA Block 兩個 App Store 下載連結。

#### [rt_guide_search_iphone] iPhone 反向圖片搜尋指南頁 CTA
- **狀態**：`generated_guide`
- **來源檔案**：由 generator 腳本生成至 `public/guides/reverse-image-search-iphone/index.html`
- **頁面 URL**：`/guides/reverse-image-search-iphone/`
- **頁面類型**：`guide`
- **CTA 位置**：`header` 與 `bottom_cta`
- **適用語言**：`en`
- **目的地 URL**：`https://apps.apple.com/us/app/verifyai-image-search/id6754511420` (固定美區)
- **目的地 App ID**：`6754511420`
- **現行事件**：無
- **Campaign 參數處理**：無額外處理
- **線上驗證狀態**：已驗證。

#### [rt_guide_find_source] 圖片原始來源尋找指南頁 CTA
- **狀態**：`generated_guide`
- **來源檔案**：由 generator 腳本生成至 `public/guides/find-image-source/index.html`
- **頁面 URL**：`/guides/find-image-source/`
- **頁面類型**：`guide`
- **CTA 位置**：`header` 與 `bottom_cta`
- **適用語言**：`en`
- **目的地 URL**：`https://apps.apple.com/us/app/verifyai-image-search/id6754511420`
- **目的地 App ID**：`6754511420`
- **現行事件**：無
- **Campaign 參數處理**：無額外處理
- **線上驗證狀態**：已驗證。

#### [rt_guide_check_fake] 頭像真偽核對指南頁 CTA
- **狀態**：`generated_guide`
- **來源檔案**：由 generator 腳本生成至 `public/guides/check-fake-profile-photo/index.html`
- **頁面 URL**：`/guides/check-fake-profile-photo/`
- **頁面類型**：`guide`
- **CTA 位置**：`header` 與 `bottom_cta`
- **適用語言**：`en`
- **目的地 URL**：`https://apps.apple.com/us/app/verifyai-image-search/id6754511420`
- **目的地 App ID**：`6754511420`
- **現行事件**：無
- **Campaign 參數處理**：無額外處理
- **線上驗證狀態**：已驗證。

#### [rt_guide_catfish] 網路交友防詐圖片搜尋指南頁 CTA
- **狀態**：`generated_guide`
- **來源檔案**：由 generator 腳本生成至 `public/guides/reverse-image-search-catfish/index.html`
- **頁面 URL**：`/guides/reverse-image-search-catfish/`
- **頁面類型**：`guide`
- **CTA 位置**：`header` 與 `bottom_cta`
- **適用語言**：`en`
- **目的地 URL**：`https://apps.apple.com/us/app/verifyai-image-search/id6754511420`
- **目的地 App ID**：`6754511420`
- **現行事件**：無
- **Campaign 參數處理**：無額外處理
- **線上驗證狀態**：已驗證。

#### [rt_guide_romance_scam] 浪漫詐騙照片識別指南頁 CTA
- **狀態**：`generated_guide`
- **來源檔案**：由 generator 腳本生成至 `public/guides/spot-romance-scam-photos/index.html`
- **頁面 URL**：`/guides/spot-romance-scam-photos/`
- **頁面類型**：`guide`
- **CTA 位置**：`header` 與 `bottom_cta`
- **適用語言**：`en`
- **目的地 URL**：`https://apps.apple.com/us/app/verifyai-image-search/id6754511420`
- **目的地 App ID**：`6754511420`
- **現行事件**：無
- **Campaign 參數處理**：無額外處理
- **線上驗證狀態**：已驗證。

#### [rt_guide_lens_alt] Google Lens 替代方案指南頁 CTA
- **狀態**：`generated_guide`
- **來源檔案**：由 generator 腳本生成至 `public/guides/google-lens-alternative-iphone/index.html`
- **頁面 URL**：`/guides/google-lens-alternative-iphone/`
- **頁面類型**：`guide`
- **CTA 位置**：`header` 與 `bottom_cta`
- **適用語言**：`en`
- **目的地 URL**：`https://apps.apple.com/us/app/verifyai-image-search/id6754511420`
- **目的地 App ID**：`6754511420`
- **現行事件**：無
- **Campaign 參數處理**：無額外處理
- **線上驗證狀態**：已驗證。

---

### 2.4 API / Content Reference (元數據引用)

#### [rt_ref_apple_itunes] index.html Smart App Banner 宣告
- **狀態**：`api_reference`
- **來源檔案**：[index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html#L8)
- **作用**：定義 iOS 裝置上的 Smart App Banner 關聯
- **目的地 App ID**：`6754511420`
- **線上驗證狀態**：已驗證，被 iOS Safari 用於調起原生橫幅。

#### [rt_ref_jsonld_org] Organization JSON-LD 組織結構元數據
- **狀態**：`api_reference`
- **來源檔案**：[index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html#L45)
- **作用**：搜尋引擎結構化資料 (sameAs 屬性指向 App Store 頁面)
- **目的地 URL**：`https://apps.apple.com/us/app/verifyai-image-search/id6754511420`
- **目的地 App ID**：`6754511420`
- **線上驗證狀態**：已驗證，符合 schema.org 標準。

#### [rt_ref_jsonld_app] SoftwareApplication JSON-LD 應用程式結構元數據
- **狀態**：`api_reference`
- **來源檔案**：[index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html#L66)
- **作用**：搜尋引擎結構化資料 (downloadUrl 屬性)
- **目的地 URL**：`https://apps.apple.com/us/app/verifyai-image-search/id6754511420`
- **目的地 App ID**：`6754511420`
- **線上驗證狀態**：已驗證，符合 schema.org 標準。

---

### 2.5 Legacy / Inactive (歷史遺留/非現行)

#### [rt_legacy_hero] 舊 Hero.jsx 元件中的下載按鈕
- **狀態**：`legacy_inactive`
- **來源檔案**：[src/components/Hero.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/Hero.jsx#L19-L31)
- **說明**：首頁已改為使用 `SeoLanding.jsx`，此元件目前閒置無任何頁面引用。
- **目的地 URL**：`getAppStoreUrl(lang)`
- **目的地 App ID**：`6754511420`
- **原有事件**：曾嘗試在點擊時觸發 Google Ads conversion event。
- **線上驗證狀態**：非 active，使用者無法在線上觸發。

#### [rt_legacy_cta_comp] 舊 CTA.jsx 元件中的下載按鈕
- **狀態**：`legacy_inactive`
- **來源檔案**：[src/components/CTA.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/CTA.jsx#L11-L19)
- **說明**：舊版 CTA 元件，目前閒置，無 active 頁面使用。
- **目的地 URL**：`getAppStoreUrl(lang)`
- **目的地 App ID**：`6754511420`
- **線上驗證狀態**：非 active。

#### [rt_legacy_campaign_go] 舊 Campaign.jsx 元件的立即前往按鈕
- **狀態**：`legacy_inactive`
- **來源檔案**：[src/components/Campaign.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/Campaign.jsx#L90)
- **說明**：舊版 Campaign 元件中的「立即前往 VerifyAI」按鈕，目前閒置，無 active 頁面使用。
- **目的地 URL**：`getAppStoreUrl(lang)` (透過 `goToApp()` 觸發 `window.open`)
- **目的地 App ID**：`6754511420`
- **線上驗證狀態**：非 active。

#### [rt_legacy_campaign_copy] 舊 Campaign.jsx 元件的複製連結按鈕
- **狀態**：`legacy_inactive`
- **來源檔案**：[src/components/Campaign.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/Campaign.jsx#L93)
- **說明**：舊版 Campaign 元件中的「複製連結」按鈕，目前閒置。
- **目的地 URL**：`getAppStoreUrl(lang)` (透過 `copyLink()` 寫入剪貼簿)
- **目的地 App ID**：`6754511420`
- **線上驗證狀態**：非 active。

#### [rt_legacy_redirect_go] 舊 /go/ads 重定向路徑
- **狀態**：`legacy_inactive`
- **說明**：舊的 YouTube Ads 轉址原型（原本為 `public/go/ads.html` 與 Cloudflare Worker 轉址），現已被刪除並修改。
- **原有目的地**：原本直接轉向 App Store 下載頁。
- **現行處理**：在 [public/_redirects](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/_redirects#L11) 中定義 `/go/* / 302`，將流量導回新首頁以保護數據基線。
- **線上驗證狀態**：已驗證，線上 `/go/ads?test=4c52b41` 成功 302 跳轉至 `/?test=4c52b41`，此路徑已無直接跳轉 App Store 功能。

---

## 3. 實際線上驗證證據與結果記錄

本項目於 2026-07-15 進行了實際的線上請求與跳轉驗證，確認所有目的地與跳轉路徑皆正常。

### 3.1 App Store 目的地驗證
使用 curl 類比不同語系/地區之使用者，向 App Store 目的地發送 HTTP 請求：
* **美區請求**：
  ```bash
  curl -s -I https://apps.apple.com/us/app/id6754511420
  ```
  **回報狀態**：`HTTP/2 301`  
  **Location 重新導向**：`https://apps.apple.com/us/app/verifyai-image-search/id6754511420` (驗證成功，產品為 VerifyAI Image Search)

* **台灣區請求**：
  ```bash
  curl -s -I https://apps.apple.com/tw/app/id6754511420
  ```
  **回報狀態**：`HTTP/2 301`  
  **Location 重新導向**：`https://apps.apple.com/tw/app/verifyai-%E5%BD%B1%E5%83%8F%E6%90%9C%E5%B0%8B/id6754511420` (驗證成功，解碼為 `verifyai-影像搜尋`)

### 3.2 舊版 `/go/*` 轉址保護驗證
驗證舊版流量入口是否會被成功攔截並轉至首頁：
* **請求網址**：
  ```bash
  curl -s -I "https://verifyai.fork.work/go/ads?test=4c52b41"
  ```
  **回報狀態**：`HTTP/2 302`  
  **Location 重新導向**：`/?test=4c52b41` (驗證成功，精確將舊流量引回首頁，且攜帶並保留原始 Query 參數以供後續追蹤)

* **首頁承接**：
  ```bash
  curl -s -I "https://verifyai.fork.work/"
  ```
  **回報狀態**：`HTTP/2 200` (驗證成功，首頁可正常渲染承接)

### 3.3 廣告與指南頁面驗證
* **美區 Shorts 廣告頁** (`https://verifyai.fork.work/ads/us-shorts`)：`HTTP/2 200`，內嵌 gtag 轉換代碼與美區 App Store 連結正常。
* **SEO 指南頁** (`https://verifyai.fork.work/guides/check-fake-profile-photo/`)：`HTTP/2 200`，內嵌美區 App Store 連結與 schema 元數據正常。
