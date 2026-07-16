# VerifyAI 事件證據矩陣 (Event Evidence Matrix)

本文件依據 [measurement-plan.md](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/conversion/measurement-plan.md) 中定義的 6 個核心量測事件，逐一檢查其實體程式碼實作、數據流向與驗證狀態。

---

## 1. 事件證據矩陣 (Evidence Matrix)

| 事件名稱 | Code Location | Analytics Destination | Production Receipt | QA Evidence | 狀態 | 限制 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`view_landing`** | [SeoLanding.jsx:L57-63](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx#L57-L63) | Google Ads (`AW-18226736945`)，無 GA4 目的地 | 無<br>(無實體收件證明) | 可設定 `localStorage.debug = 'verifyai'` 於 Console 檢視 Log | `implemented_unverified` | 1. 由於 `index.html` 僅載入 Google Ads 追蹤碼，無 GA4 `G-...` Measurement ID，此事件無 Analytics 目的地可接收。<br>2. Google Ads 通常不收集自訂 pageview 事件。 |
| **`view_guide`** | 無<br>(僅在 [tracking.js:L88](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/utils/tracking.js#L88) 有去重宣告) | 無 | 無 | 無 | `spec_only` | 指南頁面產生器 [generate-seo-guides.cjs](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/scripts/generate-seo-guides.cjs) 生成的 HTML 檔案完全未包含任何追蹤 JavaScript 或 `trackEvent` 呼叫。 |
| **`click_app_store`** | 1. [SeoLanding.jsx:L72](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx#L72) (`rt_home_hero`)、[L85](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx#L85) (`rt_home_bottom`) 呼叫 `trackAppStoreClick()`。<br>2. [us-shorts.html:L38-46](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/ads/us-shorts.html#L38-L46) inline 呼叫 `gtag('event', 'click_app_store', ...)`。 | Google Ads (`AW-18226736945`)，無 GA4 目的地 | 無<br>(無實體收件證明) | 可設定 `localStorage.debug = 'verifyai'` 於首頁及 `us-shorts.html` 點擊時，在 Console 檢視 Log | `implemented_unverified` | 1. **非 Canonical 呼叫**：[Hero.jsx:L24-28](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/Hero.jsx#L24-L28) 點擊下載按鈕時僅 inline 呼叫 Google Ads `conversion`，未發送此事件。<br>2. **指南頁遺漏**：由 [generate-seo-guides.cjs](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/scripts/generate-seo-guides.cjs) 生成的指南頁面 CTA 為純 `<a>` 連結，無 onClick 監聽。<br>3. **實作分歧**：`us-shorts.html` 的 inline 追蹤與 `tracking.js` 屬於兩套獨立實作，無代碼共用。<br>4. 無 GA4 property 接收此事件。 |
| **`click_learn_more`** | 無 | 無 | 無 | 無 | `spec_only` | [SeoLanding.jsx:L84](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx#L84) FAQ 中的 "Learn more" 連結為純 `<a>` 標籤，完全無 onClick 監聽，亦無呼叫追蹤。 |
| **`view_screenshot`** | 無 | 無 | 無 | 無 | `spec_only` | [SeoLanding.jsx:L81](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx#L81) 產品截圖區塊無滾動監聽或 Intersection Observer，亦無 `trackEvent` 呼叫。 |
| **`redirect_app_store`** | 無 | 無 | 無 | 無 | `spec_only` | 專案中完全無 Cloudflare Workers 或是中轉跳轉路由之追蹤代碼實作。 |

---

## 2. 關鍵量測事實記錄 (Core Verification Facts)

1. **僅有 Google Ads Tag，無 GA4 Measurement ID**：
   - 經檢查 [index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html#L70-L77)，全站僅載入了 Google Ads 轉換追蹤代碼 `AW-18226736945`。
   - 專案內**沒有配置任何 GA4 `G-...` Measurement ID**，亦沒有 GA4 Property 實體或與之關聯的數據 Dashboard。
2. **Canonical 自訂事件目的地缺失**：
   - 雖然 [tracking.js](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/utils/tracking.js) 的 `trackEvent()` 最終呼叫了 `window.gtag()` 來發送自訂事件，但因為網頁只設定了 Google Ads Tag，這些自訂事件（如 `view_landing` 等）並不會被發送到任何 Analytics 平台進行收集與報表展示，形同流失。
3. **指南頁面 (Guide Pages) 完全無追蹤**：
   - [generate-seo-guides.cjs](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/scripts/generate-seo-guides.cjs) 生成的 6 個 SEO 指南頁面，其產出的 HTML 內容僅包含純靜態網頁與 CSS，完全沒有引入 `gtag.js` 追蹤腳本，也沒有對任何下載 CTA 按鈕綁定 onClick 事件，故無法觸發 `view_guide` 與 `click_app_store` 事件。
4. **廣告 Landing Page 與主站追蹤實作分歧**：
   - [us-shorts.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/ads/us-shorts.html#L21-L67) 中的追蹤為純 inline JavaScript 實作，與 React 主站的 [tracking.js](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/utils/tracking.js) 互不相干，屬於重複且獨立的程式碼實作。且該廣告頁面載入時，並未發送 `view_landing` 等頁面瀏覽事件。
5. **Hero 組件未遵循 Canonical 規範**：
   - 首頁 Hero 區的舊 React 組件 [Hero.jsx:L24-28](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/Hero.jsx#L24-L28) 在點擊下載時，直接 inline 呼叫了 `window.gtag('event', 'conversion', ...)` 上報 Google Ads 轉換，這繞過了 [tracking.js](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/utils/tracking.js)，且遺漏了 canonical 事件 `click_app_store` 的發送。
6. **Smart App Banner 無法以前端 JavaScript 追蹤**：
   - [index.html:L8](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html#L8) 中宣告的 `<meta name="apple-itunes-app" content="app-id=6754511420" />` 屬於 Apple iOS 的原生 Smart App Banner。當使用者在 iOS 設備點擊該橫幅下載時，完全是由 iOS 系統底層處理，前端 JavaScript 無法透過任何監聽器攔截點擊，故該進入點之點擊追蹤在前端實作上受限於平台限制，標記為 `blocked_external_access`。
7. **歷史 Baseline 數據證明缺失**：
   - 專案中並無任何 GA4 Property 實體、Dashboard 或 real-time 收件截圖證明。原先宣稱存在的 baseline 歷史文件 `docs/conversion/baselines/2026-07-16-web-baseline.md` 實際上並不存在。

---

## 3. 建議改善方案 (後續 Phase 1 修正建議)

1. **修正 Hero 下載 CTA**：將 [Hero.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/Hero.jsx) 中的 inline gtag 轉換為呼叫 `trackAppStoreClick('rt_home_hero', 'hero', 'home', lang)`，以符合 Canonical 事件設計。
2. **補實作指南頁面追蹤**：修改 [generate-seo-guides.cjs](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/scripts/generate-seo-guides.cjs)，在產出的 HTML 中植入與 `index.html` 一致的 `gtag.js` 配置，並對下載按鈕綁定 onclick 追蹤事件。
3. **補齊 FAQ Learn More 追蹤**：為 [SeoLanding.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx#L84) 中 FAQ 的「Learn more」超連結綁定 onClick 監聽，觸發 `trackEvent('click_learn_more', ...)`。
4. **引入 Intersection Observer 追蹤產品截圖瀏覽**：在首頁 [SeoLanding.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx) 使用 React Ref 與 `IntersectionObserver` 監聽產品截圖區塊，停留超過 1.5 秒時觸發 `view_screenshot` 事件。
5. **部署 GA4 Property**：向專案擁有者申請建立 GA4 帳戶並取得 Measurement ID，將其配置於 `index.html` 內，方能使所有 Canonical 自訂事件發送至正確的數據目的地。
