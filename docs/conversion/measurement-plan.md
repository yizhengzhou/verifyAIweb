# VerifyAI 下載與轉換量測計畫 (Measurement Plan)

- **版本**：1.0
- **更新日期**：2026-07-16
- **適用專案**：VerifyAI Landing Page
- **文件角色**：定義網站與重定向路徑的 Canonical 量測事件、參數字典與驗證規範

---

## 1. 目的與設計原則

本文件為 **VerifyAI Landing Page** 在 [下載與轉換成長總企劃書](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/VERIFYAI_DOWNLOAD_CONVERSION_MASTER_PLAN-2026-07-15.md) 中，針對 **Phase 1 Task 1.1** 所制定的量測計畫（Measurement Plan）。

為確保數據的精準度與決策的重播性，本計畫遵循以下量測設計原則：

1. **單一行為唯一事件 (Canonical Event)**：
   同一類型的行為在全站僅使用一個標準事件名稱。例如：不論是在 Hero 區、底部還是指南頁面點擊 App Store 下載按鈕，均上報為 `click_app_store`，並透過參數區分其位置與脈絡。嚴禁建立如 `hero_click`、`footer_click` 等互不相容之自訂事件。
2. **事件與轉換管道對應 (Google Ads Separation)**：
   不將 Google Ads 的 Conversion ID 當成完整的 Analytics 事件規格。量測計畫定義的是前端使用者的行為脈絡，而 Google Ads Tag (`AW-18226736945`) 作為行銷管道的轉換信號，應在對應的 Canonical 事件（如 `click_app_store` 或 `redirect_app_store`）觸發時並聯執行。
3. **體驗與追蹤容錯 (Non-blocking Tracking)**：
   追蹤程式碼的執行失敗（例如受 Ad Blocker 攔截或網路超時）不得阻止使用者的正常跳轉。外連導向在必要時可透過輕微的 Event Flush 機制處理，但必須限制在毫秒級別內，不得造成肉眼可察覺的介面延遲。
4. **隱私與合規 (Privacy First)**：
   禁止記錄任何照片內容、使用者個人辨識資訊（PII）或敏感隱私資料。

---

## 2. 量測事件總表 (Event Inventory)

本計畫至少定義以下 6 個核心量測事件，用以覆蓋使用者從 Landing Page 造訪、產品互動、深入閱讀到下載跳轉的完整軌跡。

| 事件名稱 (Event) | 觸發時機 | 說明 | 必填參數 |
| :--- | :--- | :--- | :--- |
| `view_landing` | Landing Page 可互動 | 使用者進入首頁（或廣告特製 Landing Page）且頁面 DOM 可互動時觸發。 | `page_variant`, `language`, `source_group` |
| `view_guide` | 指南頁可互動 | 使用者進入任一自動生成的 SEO 指南頁面且 DOM 可互動時觸發。 | `guide_slug`, `language`, `source_group` |
| `click_app_store` | 任一 App Store CTA click | 使用者點擊網站上任何導向 App Store 的 CTA 按鈕或文字連結時立即觸發。 | `cta_id`, `cta_location`, `page_type`, `page_path`, `language`, `destination_app_id`, `campaign_id` |
| `click_learn_more` | FAQ / 內容深連結點擊 | 使用者點擊 FAQ 展開區塊中的「Learn more」或其他引導至指南頁的內部連結時觸發。 | `content_id`, `destination` |
| `view_screenshot` | 產品證據區塊瀏覽 | 使用者主動展開、點擊或滑動至產品功能截圖區塊，且在視窗停留超過 1.5 秒時觸發。 | `screenshot_id`, `page_variant` |
| `redirect_app_store` | 重定向路由執行 | 當後端、邊緣節點（Cloudflare Worker）或預設轉址頁面收到 `/go/*` 重定向請求並執行跳轉至 App Store 時觸發。 | `route_id`, `destination_app_id`, `campaign_id` |

---

## 3. 參數字典 (Parameter Dictionary)

所有上報事件的必填與選填參數，必須嚴格遵守以下型態與命名規範：

| 參數名稱 | 資料型態 | 說明 | 範例值與允許值 |
| :--- | :--- | :--- | :--- |
| `page_variant` | String | 當前網頁的 A/B 測試或文案版本識別碼。 | `'control'` (現行首頁), `'variant_a'` (新 Hero 文案版) |
| `language` | String | 當前網頁呈現的語言（若動態則為偵測語系，若固定則為該頁語系）。 | `'zh-TW'`, `'en'`, `'ja'`, `'ko'` |
| `source_group` | String | 流量來源群組。前端由 URL Query 參數（如 `utm_source`）或 `document.referrer` 動態判斷歸類。 | `'organic_search'`, `'google_ads'`, `'direct'`, `'referral'`, `'social'` |
| `guide_slug` | String | 指南頁面的唯一路徑識別碼（對應指南資料夾名稱）。 | `'reverse-image-search-catfish'`, `'find-image-source'` |
| `cta_id` | String | 下載進入點的唯一標識符，**必須精確對應到下載路徑清冊**。 | `'rt_home_hero'`, `'rt_home_bottom'`, `'rt_footer_changelog'`, `'rt_ad_us_shorts'` 等 |
| `cta_location` | String | CTA 元件在頁面中的物理區塊位置。 | `'hero'`, `'bottom'`, `'footer'`, `'header'`, `'inline'` |
| `page_type` | String | 觸發事件的當前頁面類型。 | `'home'`, `'guide'`, `'ad'`, `'global'` |
| `page_path` | String | 當前網頁的相對路徑。 | `'/'`, `'/guides/reverse-image-search-iphone/'`, `'/ads/us-shorts'` |
| `destination_app_id`| String | 目標 Apple App Store 的 App ID。目前 VerifyAI 的正式 ID 固定為此值。 | `'6754511420'` |
| `campaign_id` | String | 關聯的廣告活動或行銷活動 ID，優先從 URL 中的 `campaign_id` 或 `utm_campaign` 讀取，無則設為 `'none'`。 | `'camp_202607_shorts'`, `'none'` |
| `content_id` | String | 被點擊的 FAQ 問題、卡片或內容區塊的唯一識別碼。 | `'faq_stolen_dating_photo'`, `'faq_ai_detection'` |
| `destination` | String | 內容深連結跳轉的站內目標路徑。 | `'/guides/check-fake-profile-photo/'` |
| `screenshot_id` | String | 被瀏覽或滑動到的產品截圖識別碼。 | `'screenshot_1'` (第一張搜尋入口截圖), `'screenshot_2'` 等 |
| `route_id` | String | 執行重定向的路由標識符（主要對應舊版轉址或 Workers 轉址路徑）。 | `'rt_legacy_redirect_go'` |

---

## 4. 事件詳細規格與代碼範例

### 4.1 `view_landing` (Landing Page 可互動)
- **觸發時機**：首頁（如 [src/components/SeoLanding.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx)）或廣告頁加載完畢，且使用者可以開始進行滾動、點擊等互動時。
- **代碼觸發範例**（抽象實作）：
  ```javascript
  // 於 SeoLanding 組件加載完成後 (useEffect) 呼叫
  analytics.track('view_landing', {
    page_variant: 'control',
    language: 'zh-TW', // 或 'en'，依當前 i18n context
    source_group: parseSourceGroup(document.referrer, window.location.search)
  });
  ```

### 4.2 `view_guide` (指南頁可互動)
- **觸發時機**：任一自動生成的指南頁面載入並可互動時（如 `/guides/find-image-source/index.html`）。
- **代碼觸發範例**：
  ```javascript
  analytics.track('view_guide', {
    guide_slug: 'find-image-source',
    language: 'en',
    source_group: parseSourceGroup(document.referrer, window.location.search)
  });
  ```

### 4.3 `click_app_store` (任一 App Store CTA click)
- **觸發時機**：使用者點擊任何下載按鈕，在執行 `window.open` 或藉由 `<a>` 標籤跳轉至 App Store 之前。
- **安全容錯要求**：
  為避免追蹤代碼報錯阻礙使用者跳轉，請使用 `try...catch` 包裹，且設定最大延遲值（例如 150ms）執行跳轉。
- **代碼觸發範例**：
  ```javascript
  function handleAppStoreClick(event, ctaConfig) {
    // 阻止預設直接跳轉（以便完成 Event Flush）
    event.preventDefault();
    
    let trackerFired = false;
    const destinationUrl = event.currentTarget.href;
    
    // 超時 Fallback 機制
    const fallbackTimeout = setTimeout(() => {
      if (!trackerFired) {
        trackerFired = true;
        window.open(destinationUrl, '_blank', 'noreferrer');
      }
    }, 150);

    try {
      analytics.track('click_app_store', {
        cta_id: ctaConfig.cta_id,             // 必須與下載清冊一致
        cta_location: ctaConfig.cta_location, // 例如 'hero'
        page_type: ctaConfig.page_type,       // 例如 'home'
        page_path: window.location.pathname,  // 例如 '/'
        language: ctaConfig.language,         // 例如 'zh-TW'
        destination_app_id: '6754511420',
        campaign_id: parseQueryParam('utm_campaign') || 'none'
      }, () => {
        // 追蹤成功回呼
        if (!trackerFired) {
          trackerFired = true;
          clearTimeout(fallbackTimeout);
          window.open(destinationUrl, '_blank', 'noreferrer');
        }
      });
    } catch (err) {
      console.error('Tracking error:', err);
      if (!trackerFired) {
        trackerFired = true;
        clearTimeout(fallbackTimeout);
        window.open(destinationUrl, '_blank', 'noreferrer');
      }
    }
  }
  ```

### 4.4 `click_learn_more` (FAQ/內容深連結)
- **觸發時機**：使用者在首頁 FAQ 點擊「Learn more」以跳轉至指南頁時。
- **代碼觸發範例**：
  ```javascript
  analytics.track('click_learn_more', {
    content_id: 'faq_stolen_dating_photo', // 對應點擊的 FAQ 項目
    destination: '/guides/check-fake-profile-photo/'
  });
  ```

### 4.5 `view_screenshot` (使用者主動展開或滑到產品證據)
- **觸發時機**：
  在首頁 `screenshots-section` 區塊，當使用者在視窗中滾動使截圖顯示面積大於 50% 且停留超過 1.5 秒，或當使用者在行動端橫向滑動輪播圖切換截圖時觸發。
- **代碼觸發範例**：
  ```javascript
  // 使用 Intersection Observer 偵測
  analytics.track('view_screenshot', {
    screenshot_id: 'screenshot_2', // 例如滑到第二張「比對相同圖片與裁切版本」
    page_variant: 'control'
  });
  ```

### 4.6 `redirect_app_store` (redirect route 執行)
- **觸發時機**：
  當預設的短網址、重定向 Worker 或中轉頁（如歷史遺留的轉址路由）被造訪時，在伺服器端（Cloudflare Workers）或中轉網頁（前端 JS 執行 `window.location.replace` 前）立刻觸發。
- **代碼觸發範例**：
  ```javascript
  // 若在中轉網頁中執行
  analytics.track('redirect_app_store', {
    route_id: 'rt_legacy_redirect_go', // 對應清冊中的路由 ID
    destination_app_id: '6754511420',
    campaign_id: parseQueryParam('utm_campaign') || 'none'
  });
  ```

---

## 5. 與下載路徑清冊 (Download Route Inventory) 之 CTA 對照表

為確保事件上報的 `cta_id` 精確對應，下表定義了量測參數 `cta_id` 與 [下載路徑清冊](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/conversion/download-route-inventory.md) 中活躍 (Active) 下載路徑的對照關係：

| 下載路徑 ID | 量測 `cta_id` 規範值 | 物理位置 (`cta_location`) | 頁面類型 (`page_type`) | 頁面路徑範例 (`page_path`) |
| :--- | :--- | :--- | :--- | :--- |
| **`rt_home_hero`** | `'rt_home_hero'` | `'hero'` | `'home'` | `'/'` |
| **`rt_home_bottom`** | `'rt_home_bottom'` | `'bottom'` | `'home'` | `'/'` |
| **`rt_footer_changelog`**| `'rt_footer_changelog'` | `'footer'` | `'footer'` | `'/'`, `'/terms'`, `'/scammer-mind'` |
| **`rt_smart_banner`** | `'rt_smart_banner'` | `'browser_native'` | `'global'` | 全站（由 iOS 系統渲染） |
| **`rt_ad_us_shorts`** | `'rt_ad_us_shorts'` | `'inline'` | `'ad'` | `'/ads/us-shorts'` |
| **`rt_guide_search_iphone`** | `'rt_guide_search_iphone_header'`<br>`'rt_guide_search_iphone_bottom'` | `'header'` (頂部)<br>`'bottom_cta'` (底部) | `'guide'` | `'/guides/reverse-image-search-iphone/'` |
| **`rt_guide_find_source`** | `'rt_guide_find_source_header'`<br>`'rt_guide_find_source_bottom'` | `'header'` (頂部)<br>`'bottom_cta'` (底部) | `'guide'` | `'/guides/find-image-source/'` |
| **`rt_guide_check_fake`** | `'rt_guide_check_fake_header'`<br>`'rt_guide_check_fake_bottom'` | `'header'` (頂部)<br>`'bottom_cta'` (底部) | `'guide'` | `'/guides/check-fake-profile-photo/'` |
| **`rt_guide_catfish`** | `'rt_guide_catfish_header'`<br>`'rt_guide_catfish_bottom'` | `'header'` (頂部)<br>`'bottom_cta'` (底部) | `'guide'` | `'/guides/reverse-image-search-catfish/'` |
| **`rt_guide_romance_scam`** | `'rt_guide_romance_scam_header'`<br>`'rt_guide_romance_scam_bottom'` | `'header'` (頂部)<br>`'bottom_cta'` (底部) | `'guide'` | `'/guides/spot-romance-scam-photos/'` |
| **`rt_guide_lens_alt`** | `'rt_guide_lens_alt_header'`<br>`'rt_guide_lens_alt_bottom'` | `'header'` (頂部)<br>`'bottom_cta'` (底部) | `'guide'` | `'/guides/google-lens-alternative-iphone/'` |

> [!NOTE]
> `rt_smart_banner` 為 iOS 瀏覽器原生橫幅，前端通常無法藉由 JavaScript 直接監聽其點擊事件。然而，應將此路徑記錄於量測計畫中，以便在進行數據歸因分析（如 ASC 平台中 `App Store Smart App Banner` 管道數據）時作為對應項目。

---

## 6. GA4 與 Google Ads 轉換追蹤對應關係

為避免將行銷管道的單一 Conversion ID 混淆為完整的前端事件，以下定義本專案 Google Ads Tag (`AW-18226736945`) 與本量測計畫事件的對應及並聯發送規則。

### 6.1 廣告轉換事件並聯觸發機制
當前端觸發 Canonical 事件時，如果符合特定條件，應**同時且並聯**呼叫 Google Ads 轉換代碼：

1. **美國 Shorts 廣告頁 CTA 點擊**：
   - **觸發事件**：`click_app_store`
   - **過濾條件**：`cta_id === 'rt_ad_us_shorts'`
   - **並聯呼叫**：
     ```javascript
     // 執行 gtag 轉換匯報
     gtag('event', 'conversion', {
       'send_to': 'AW-18226736945/tHpKCJrLtr0cELHel_ND',
       'value': 1.0,
       'currency': 'USD'
     });
     ```

2. **一般頁面下載 CTA 點擊**（未來若有其他廣告轉換活動）：
   - **觸發事件**：`click_app_store`
   - **過濾條件**：來源包含特定廣告 GCLID 且 `cta_location` 為 `hero` 或 `bottom`
   - **並聯呼叫**：依據對應之 Google Ads conversion label 執行上報。

---

## 7. 資料品質與 QA 驗證標準

在後續 Phase 1 Task 1.2 實作與 Task 1.5 告警建立時，必須使用以下標準進行驗收：

1. **無重複觸發 (De-duplication)**：
   在 React 載入與 StrictMode 下，確保 `view_landing` 與 `view_guide` 在單次頁面載入中僅觸發一次，不因組件重複渲染或重複事件監聽器而發送多個重複事件。
2. **參數必填度 (Null-value Prevention)**：
   所有列於量測計畫中的「必填參數」均不得為 `undefined`。若無適當值（如 `campaign_id` 於自然搜尋流量下），必須統一回傳標準預留字串 `'none'`。
3. **無阻塞跳轉驗證 (Ad-blocker Resiliency)**：
   在瀏覽器啟用常見廣告阻擋外掛（如 AdBlock、uBlock Origin）的情況下，模擬點擊 `rt_home_hero` 與 `rt_home_bottom` 按鈕，下載連結 must 能在 150ms 內順利於新分頁開啟，且 Console 中被阻擋的 analytics 請求不得導致頁面崩潰或跳轉失敗。
4. **地區語系動態對齊**：
   點擊 `click_app_store` 時，上報參數中的 `language` 必須與實體跳轉之 App Store storefront 地區語系（由 [getAppStoreUrl.js](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/utils/getAppStoreUrl.js) 計算得出）具備邏輯對應關係（例如 `language: 'zh-TW'` 對應跳轉至台灣區 storefront `/tw/` 連結）。
