# VerifyAI 結構化資料驗證與佈局檢測報告 (R1.5–R1.6)

本報告記錄了對 VerifyAI 專案進行的結構化資料驗證與不同裝置解析度下的佈局檢查結果。

---

## R1.5 結構化資料驗證

### 1. JSON-LD 驗證結果與完整性檢查

| Schema Type | 欄位 | 存在 | 正確 | 備註 |
|:---|:---|:---:|:---:|:---|
| **Organization** | `@type` | Yes | Yes | 宣告為 `Organization` |
| | `name` | Yes | Yes | 值為 `"VerifyAI"` |
| | `url` | Yes | Yes | 值為 `"https://verifyai.fork.work"` |
| | `logo` | Yes | Yes | 指向 `"https://verifyai.fork.work/app-store/app-icon.png"` |
| | `sameAs` | Yes | Yes | 內含 App Store 下載連結，為 array 格式 |
| **SoftwareApplication** | `@type` | Yes | Yes | 宣告為 `SoftwareApplication` |
| | `name` | Yes | Yes | 值為 `"VerifyAI"` |
| | `operatingSystem` | Yes | Yes | 值為 `"iOS"` |
| | `applicationCategory`| Yes | Yes | 值為 `"UtilitiesApplication"` |
| | `description` | Yes | Yes | 描述完整 |
| | `image` | Yes | Yes | 圖標 URL 正確 |
| | `softwareVersion` | Yes | Yes | 版本為 `"2.0.2"` |
| | `featureList` | Yes | Yes | 條列支援之搜尋引擎與比較特色 |
| | `offers` | Yes | Yes | 巢狀 Offer 包含價格與貨幣（0 USD） |
| | `downloadUrl` | Yes | Yes | 指向正確的 App Store 下載連結 |
| **HowTo** (Guide 頁面) | `@type` | Yes | Yes | 六個 Guide 頁面均獨立宣告 `HowTo` |
| | `name` | Yes | Yes | 各頁面標題正確對應 |
| | `description` | Yes | Yes | 與各頁面之 meta description 相符 |
| | `step` | Yes | Yes | 均包含 4 個 `HowToStep` 步驟，各步驟有 `position`, `name`, `text` 欄位 |

> [!NOTE]
> 包含 HowTo schema 的六個 Guide 頁面分別位於：
> 1. [google-lens-alternative-iphone/index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/guides/google-lens-alternative-iphone/index.html)
> 2. [reverse-image-search-catfish/index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/guides/reverse-image-search-catfish/index.html)
> 3. [spot-romance-scam-photos/index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/guides/spot-romance-scam-photos/index.html)
> 4. [check-fake-profile-photo/index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/guides/check-fake-profile-photo/index.html)
> 5. [find-image-source/index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/guides/find-image-source/index.html)
> 6. [reverse-image-search-iphone/index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/public/guides/reverse-image-search-iphone/index.html)

### 2. Live 與 Repository 一致性比對
經由 HTTP GET 請求 `https://verifyai.fork.work/` 並比對本地 [index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html)：
- **結果**：Live 站點的 Organization 以及 SoftwareApplication schema 與本地程式碼**完全一致**。

### 3. Google Rich Results Test 狀態
- **測試網址**：`https://search.google.com/test/rich-results?url=https://verifyai.fork.work/`
- **狀態**：此網址為 Google 互動式 Rich Results 檢測工具，主要在 client 端進行 SPA 渲染與檢測，不提供直接的 HTTP GET 靜態報告。但經過代碼與 JSON-LD 規範檢驗，語法完全符合 schema.org 的 JSON 格式規範，無語法錯誤。

---

## R1.6 佈局檢查

### 1. 響應式佈局呈現分析
我們已於 `docs/screenshots/` 中存放實際截圖，並針對其進行視覺分析：

- **首頁 Mobile 呈現 (390px)**：
  - 截圖路徑：[home_mobile.png](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/screenshots/home_mobile.png)
  - **呈現狀態**：整體排版有針對行動裝置微調，按鈕寬度合適。但主標題「先查照片。再決定是否相信帳號。」在 390px 下，「帳號」的「號」字會掉到下一行單獨呈現，視覺上略顯突兀。
- **首頁 Desktop 呈現 (1440px)**：
  - 截圖路徑：[home_desktop.png](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/screenshots/home_desktop.png)
  - **呈現狀態**：雙欄配置正確，在大螢幕下視覺十分精美，區塊分布均勻。主標題「先查照片。再決定是否相信帳號。」折行為三行，最後一行是「信帳號。」，建議優化換行邏輯。
- **Guide 頁面 Mobile 呈現 (390px)**：
  - 截圖路徑：[guide_mobile.png](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/screenshots/guide_mobile.png)（以 `/guides/reverse-image-search-iphone/` 為例）
  - **重大 Responsive 缺陷**：
    - **Header 截斷**：導航欄右上角的 "Download for iPhone" 按鈕為固定寬度且無縮小或隱藏機制，在 390px 下被螢幕右側邊緣切斷，只顯示出 `"Download fo..."`。
    - **H1 標題斷字錯誤**：標題 "How to Reverse Image Search on iPhone" 的 "Reverse Image" 由於容器寬度或字體大小（使用 `clamp`），導致 `Image` 被斷字切開成首行的 `"Im"` 與次行的 `"age"`，而非以完整單字折行。
    - **CTA 區塊斷字**：底部黑色 CTA 的標題 `"Check the image across four sources"` 出現 `"acros"` 在首行，而 `"s"` 掉到下一行，斷字不正確。

### 2. 效能與響應式代碼證據

* **Mobile Responsive 證據**：
  - [index.html](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/index.html) 以及各 guide 的 HTML 中均有 `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` 宣告。
  - 在 [index.css](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/index.css) 中有大量媒體查詢（`@media`），例如：
    - `@media (max-width: 1024px)`、`@media (max-width: 768px)`、`@media (max-width: 640px)`、`@media (max-width: 400px)`、`@media (max-width: 900px)`、`@media (max-width: 560px)` 等，針對各版塊的 grid、padding、font-size 進行響應式縮放。
    - 各 Guide 頁面的 HTML 內嵌 style 亦含有 `@media (max-width: 600px)` 用於調整 CTA 排版（由 row 改為 column 排列）。

* **圖片 Lazy Loading**：
  - 在 [SeoLanding.jsx](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/src/components/SeoLanding.jsx#L81) 中有明確的圖片優化邏輯：
    ```javascript
    {[1,2,3,4,5].map((n) => <img key={n} src={`/app-store/screenshot-${n}.jpg`} alt={`VerifyAI iPhone app screenshot ${n}`} loading={n > 2 ? 'lazy' : 'eager'} />)}
    ```
    前兩張 LCP 關鍵圖片使用 `loading="eager"` 確保載入速度，後續圖片則使用 `loading="lazy"` 以節省頻寬，完全符合 CWV (Core Web Vitals) 的最佳實踐。

* **字體載入**：
  - 主頁在 HTML 標頭中通過預先連線（`preconnect`）至 `https://fonts.googleapis.com` 與 `https://fonts.gstatic.com`，並搭配 `crossorigin`，降低了 Google Fonts 的 DNS 與 TCP 連線延遲。
  - 載入字體系列 `Inter`、`Noto Sans TC`（繁中）和 `Noto Sans JP`（日文）時，設定了 `display=swap`，避免了 FOIT（Flash of Invisible Text），讓網頁載入時能先以系統字體顯示，待 Web Fonts 下載完成後再進行替換。
  - 備註：Guide 頁面為追求極速載入，未引入外部 Web Fonts，僅在 CSS 指定本地系統備份字體（`Inter, Helvetica Neue, Arial, sans-serif`）。

---

## 建議與優化方案

1. **修正行動端 Header 按鈕截斷問題**：
   - 針對 Guide 頁面的 `.download` 按鈕或主頁 Header，在寬度小於 400px 時，建議縮減 padding、字級大小，或將按鈕文字縮短為 "Download"，甚至隱藏以確保不被螢幕切斷。
2. **優化英文字詞換行限制**：
   - 在 Guide 頁面的 CSS 樣式中加入 `word-break: keep-all;` 與 `overflow-wrap: break-word;` 屬性，避免 "Image" -> "Im" + "age" 或 "across" -> "acros" + "s" 的不自然單字截斷。
3. **優化中文標題折行**：
   - 使用 CSS 屬性 `word-break: keep-all; inline-size: min-content;` 或適度調整容器寬度，確保主頁大標題在 mobile/desktop 解析度下不會有單個中文字被折到下一行的情況（如「信帳號。」的「信」與「帳號」分離，或單獨留下一個「號」字）。
