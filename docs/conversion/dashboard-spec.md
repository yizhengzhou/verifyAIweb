# VerifyAI 下載與轉換數據儀表板規格書 (Conversion Dashboard Specification)

- **版本**：1.0
- **更新日期**：2026-07-16
- **適用專案**：VerifyAI Landing Page
- **文件角色**：定義 Conversion Dashboard 的核心數據區塊、指標計算公式、資料源、刷新頻率與數據品質告警機制。

---

## 1. 目的與設計原則

本規格書為 **VerifyAI Landing Page** 在 [下載與轉換成長總企劃書](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/VERIFYAI_DOWNLOAD_CONVERSION_MASTER_PLAN-2026-07-15.md) 框架下，針對 **Phase 1 Task 1.5** 所制定的 Conversion Dashboard 規格。

為確保決策層與行銷團隊能精確評估轉換表現，本儀表板設計遵循以下原則：
1. **端到端一體化 (End-to-End Visibility)**：打破網站端 (GA4)、商店端 (ASC) 與 App 內部 (Firebase) 的數據孤島，建立完整的轉換漏斗。
2. **實用歸因與估算 (Attribution Realism)**：明確指出 Web UTM 到 App Store 的技術斷層，並採用 [UTM 規範](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/conversion/campaign-taxonomy.md) 定義的對齊與估算邏輯。
3. **數據品質防護 (Garbage-In, Garbage-Out Prevention)**：透過主動監控告警機制，確保前端埋點實作的準確性，避免決策受重複上報或錯誤參數的干擾。

---

## 2. 儀表板核心區塊規格 (8 個最低區塊)

本儀表板至少需包含以下 8 個核心數據分析區塊，以滿足不同層級決策與優化需求：

```mermaid
graph TD
    subgraph 網站端 (GA4)
        A[view_landing / view_guide] -->|Outbound Clicks| B[click_app_store / redirect_app_store]
    end
    subgraph 商店端 (ASC)
        B -->|Impression / PPV| C[App Store Product Page]
        C -->|App Units| D[App Downloads]
    end
    subgraph App 內部 (Firebase)
        D -->|first_open| E[Activation]
        E -->|first_complete_search| F[Core Feature Value]
    end
    
    style A fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style B fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style C fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style D fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style E fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    style F fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
```

---

### 2.1 Executive Funnel (決策高階轉換漏斗)

- **區塊目的**：提供管理團隊與行銷主管一個全局的「端到端」轉換視角，快速識別用戶旅程中流失最嚴重的環環節，評估整體商業健康度。
- **資料源**：
  - GA4 (網站端)：`view_landing`, `view_guide`, `click_app_store`, `redirect_app_store`
  - App Store Connect (ASC - 商店端)：Product Page Views (PPV), App Units (下載)
  - Firebase Analytics (App 內端)：`first_open`, `first_complete_search`
- **關鍵指標與計算方式**：
  - **總網站造訪會話數 (Total Web Sessions)**：
    $$\text{Total Web Sessions} = \text{Unique Sessions containing } view\_landing \text{ or } view\_guide$$
  - **總點擊意願數 (Total Outbound Clicks)**：
    $$\text{Total Outbound Clicks} = \text{Event Count of } click\_app\_store + redirect\_app\_store$$
  - **網頁離站下載率 (Outbound CTR)**：
    $$\text{Outbound CTR} = \frac{\text{Total Outbound Clicks}}{\text{Total Web Sessions}}$$
  - **商店轉換率 (Store CVR)**：
    $$\text{Store CVR} = \frac{\text{App Units (ASC)}}{\text{Product Page Views (ASC)}}$$
  - **下載代理轉化率 (Click-to-Install Proxy)**：
    $$\text{Click-to-Install Proxy} = \frac{\text{App Units (ASC)}}{\text{Total Outbound Clicks (GA4)}}$$
    > [!NOTE]
    > 由於 Web UTM 無法直接傳遞，此指標為估計值，可用以評估跳轉至 App Store 後的流失比例（如商店文案不吸引人或地區不匹配）。
  - **端到端總體轉換率 (End-to-End CVR)**：
    $$\text{End-to-End CVR} = \frac{\text{First Complete Search (Firebase)}}{\text{Total Web Sessions (GA4)}}$$
- **刷新頻率**：Daily (每日刷新。由於 ASC 數據通常有 24-48 小時落後，此區塊將以 2 天延遲展示每日滾動數據)。
- **呈現方式建議**：
  - **漏斗圖 (Funnel Chart)**：呈現 `Web Sessions` $\rightarrow$ `Outbound Clicks` $\rightarrow$ `ASC PPV` $\rightarrow$ `ASC App Units` $\rightarrow$ `First Opens` $\rightarrow$ `First Complete Search` 的層層衰減與轉化率。
  - **關鍵指標字卡 (KPI Cards)**：顯示昨日與過去 7 天移動平均的 App Units、End-to-End CVR 與 Outbound CTR，並以紅/綠箭頭標記環比升降。

---

### 2.2 Source / Medium (流量來源與媒介表現)

- **區塊目的**：按流量管道評估引流質量與點擊下載表現，輔助行銷團隊優化不同廣告管道（如 Google Ads, Meta Ads）與自然搜尋的預算分配。
- **資料源**：GA4（事件參數 `source_group`、會話級 `source / medium`）與 ASC（Campaign ct 參數歸因）。
- **關鍵指標與計算方式**：
  - **管道會話數 (Sessions by Source/Medium)**：過濾特定來源與媒介組合的會話數。
  - **管道下載點擊數 (Outbound Clicks by Channel)**：過濾該來源之 `click_app_store` 與 `redirect_app_store` 事件計數。
  - **管道點擊率 (Outbound CTR by Channel)**：
    $$\text{Outbound CTR (Channel)} = \frac{\text{特定管道下載點擊數}}{\text{特定管道會話數}}$$
  - **估計 App 下載數 (Estimated App Units by Channel)**：
    - *付費廣告專屬頁面 (如 `/ads/us-shorts`)*：直接對齊 ASC 中 `ct = rt_ad_us_shorts` 的 App Units（具備 1:1 映射關係）。
    - *通用頁面*：採用佔比估算法：
      $$\text{Estimated App Units (Channel)} = \text{ASC 總 App Units} \times \frac{\text{該管道之 click\_app\_store 數}}{\text{總 click\_app\_store 數}}$$
- **刷新頻率**：Daily。
- **呈現方式建議**：
  - **堆疊長條圖 (Stacked Bar Chart)**：X 軸為日期，Y 軸為 Outbound Clicks，以不同顏色堆疊顯示各管道（例如 `google/cpc`, `facebook/cpm`, `organic`, `direct`）的貢獻趨勢。
  - **對照表格**：
    | Source / Medium | Sessions | Outbound Clicks | Outbound CTR | Est. App Units | Est. CAC (若引入花費) |
    | :--- | :--- | :--- | :--- | :--- | :--- |

---

### 2.3 Landing Page / SEO Guide (落地頁與 SEO 指南獨立轉換率)

- **區塊目的**：評慢首頁（不同文案/測試版本）與 6 個已上線的 SEO 指南頁面的引流與點擊下載表現，找出高轉化黃金內容，調整內容優化方向。
- **資料源**：GA4（`view_landing` 帶有 `page_variant`，`view_guide` 帶有 `guide_slug`，以及 `click_app_store` 帶有 `page_path`）。
- **關鍵指標與計算方式**：
  - **頁面會話數 (Page Sessions)**：造訪該頁面（首頁或特定指南頁）的 Session 數。
  - **頁面點擊數 (Page Outbound Clicks)**：在該頁面上觸發 `click_app_store` 的事件計數。
  - **頁面轉換率 (Page CVR)**：
    $$\text{Page CVR} = \frac{\text{Page Outbound Clicks}}{\text{Page Sessions}}$$
- **刷新頻率**：Weekly。
- **呈現方式建議**：
  - **散佈圖 (Scatter Plot)**：X 軸為 Page Sessions (流量大小)，Y 軸為 Page CVR (轉換效率)。
    - *右上象限*：黃金區（高流量、高轉換）。
    - *左上象限*：潛力區（低流量、高轉換），應加強 SEO 或外鏈引流。
    - *右下象限*：待優化區（高流量、低轉換），應重新梳理文案與 CTA 排版。
  - **詳細明細表**：
    | Page Path | Page Type | Page Variant / Guide Slug | Sessions | Outbound Clicks | Page CVR |

---

### 2.4 CTA Location & ID (CTA 位置與點擊表現)

- **區塊目的**：分析頁面不同物理位置（如 Hero 區、底部署名區、頁尾 Changelog、指南頂部/底部）的點擊佔比與效率，優化網頁版面設計與按鈕配置。
- **資料源**：GA4（`click_app_store` 事件的 `cta_id` 和 `cta_location` 參數，對齊 [下載路徑清冊](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/conversion/download-route-inventory.md)）。
- **關鍵指標與計算方式**：
  - **CTA 點擊量 (Clicks by CTA ID)**：特定 `cta_id` 的事件上報次數。
  - **位置點擊佔比 (Click Share by Location)**：
    $$\text{Click Share} = \frac{\text{特定 cta\_location 的點擊量}}{\text{總 click\_app\_store 點擊量}}$$
  - **特定位置轉換效率 (CTA Location Efficiency)**：
    $$\text{CTA Location CTR} = \frac{\text{該位置 click\_app\_store 點擊量}}{\text{觸及該位置頁面的總 Sessions}}$$
- **刷新頻率**：Weekly。
- **呈現方式建議**：
  - **環狀圖 (Donut Chart)**：展示 `cta_location` 佔比（如 `hero` vs `bottom` vs `header` vs `footer` vs `inline` vs `bottom_cta`）。
  - **橫向長條圖 (Horizontal Bar Chart)**：按 `cta_id` 點擊數降序排列，直觀對比各進入點的表現。

---

### 2.5 Language / Country / Device (市場與裝置分析)

- **區塊目的**：分析全球不同地理區域（Territory）、使用者瀏覽器語言設定（Language）與設備類型（Device）的點擊與商店轉換表現，決定本地化資源投放比重。
- **資料源**：GA4 (地理與裝置屬性、`language` 參數) 與 ASC (地區、裝置報表)。
- **關鍵指標與計算方式**：
  - **地區會話數 (Sessions by Region)**：GA4 依地理位置統計之 Session 數。
  - **語系點擊率 (Outbound CTR by Language)**：按 `language` 參數分組的點擊率。
  - **商店下載分布 (App Units by Country/Territory)**：ASC 各國別 App 下載量。
  - **商店轉換率 (Store CVR by Territory)**：ASC 各國別下載/商店頁瀏覽。
- **刷新頻率**：Weekly。
- **呈現方式建議**：
  - **地理分布圖 (Choropleth Map)**：以顏色深淺標示全球各市場（如美國、台灣、日本、韓國）的實際 App 下載量 (App Units)。
  - **交叉分析矩陣表 (Matrix Table)**：按「國家/語言」與「裝置類型 (如 iPhone 15 Pro, iPhone 14 等)」交叉展示 Outbound Clicks 與 Store CVR。

---

### 2.6 App Store Conversion (App Store 商店轉換率深度分析)

- **區塊目的**：專注監控 App Store 商店端的行銷漏斗效率，評估 App 商店頁面之圖文素材、評分與評論是否具備足夠的轉化說服力。
- **資料源**：App Store Connect (ASC) Analytics。
- **關鍵指標與計算方式**：
  - **曝光數 (Impressions)**：App 在 App Store 中被看見的總次數（包括搜尋結果、精選、類別等）。
  - **產品頁瀏覽數 (Product Page Views, PPV)**：用戶點擊進入 App 產品詳情頁面的次數。
  - **商店搜尋點擊率 (Impression-to-PPV CVR)**：
    $$\text{Impression-to-PPV CTR} = \frac{\text{Product Page Views}}{\text{Impressions}}$$
  - **商店轉換率 (Store CVR / Product Page CVR)**：
    $$\text{Store CVR} = \frac{\text{App Units}}{\text{Product Page Views}}$$
  - **總下載量 (App Units)**：首次下載 App 的使用者數（不含重新下載）。
- **刷新頻率**：Daily (隨 ASC 更新時程)。
- **呈現方式建議**：
  - **雙軸趨勢圖 (Dual-axis Line Chart)**：左軸為 Impressions 和 Product Page Views，右軸為 Store CVR (%)，監控每日轉化率走勢是否穩定。
  - **週對比數據表**：對比本週與上週的商店轉換率變化。

---

### 2.7 Activation / Paid Conversion (App 啟用與後續轉換)

- **區塊目的**：追蹤用戶下載後的實質互動，包含 App 是否成功開啟、是否體驗到核心價值（完成首次反向搜尋），避免以虛榮的「下載量」作為唯一指標，防範無效流量。
- **資料源**：Firebase Analytics (App 內部 SDK 數據)。
- **關鍵指標與計算方式**：
  - **激活量 (First Opens)**：App 被首次開啟的次數（`first_open` 事件）。
  - **激活率 (Activation Rate)**：
    $$\text{Activation Rate} = \frac{\text{First Opens (Firebase)}}{\text{App Units (ASC)}}$$
    *(正常基準值通常在 80% - 95% 之間，若過低代表安裝後未被開啟，可能與 iOS 載入體驗有關)*
  - **核心功能觸發量 (First Complete Search Count)**：用戶在 App 內首次完成反向圖片搜尋的次數（`first_complete_search`）。
  - **核心價值轉換率 (Activation-to-Search CVR)**：
    $$\text{Activation-to-Search CVR} = \frac{\text{First Complete Search}}{\text{First Opens}}$$
- **刷新頻率**：Daily。
- **呈現方式建議**：
  - **水平條形圖 / 進度環**：呈現 `App Units` $\rightarrow$ `First Opens` $\rightarrow$ `First Complete Search` 的流失鏈條。
  - **激活趨勢圖 (Area Chart)**：展示每日 `First Opens` 與 `First Complete Search` 的數量對比。

---

### 2.8 Data Quality Warnings (數據品質與埋點健康看板)

- **區塊目的**：集中管理並展示所有埋點異常告警的觸發狀態，確保數據基線無損、無重複上報，並主動預警轉址失效或廣告參數異常。
- **資料源**：GA4 即時數據流、每日檢測腳本、ASC 每日異常記錄。
- **關鍵指標與計算方式**：
  - **活躍告警數 (Active Warning Count)**：目前觸發且未排除的告警數量。
  - **(not set) 會話佔比**：
    $$\text{(not set) Session Ratio} = \frac{\text{Source/Medium 包含 (not set) 的 Sessions}}{\text{總 Sessions}}$$
  - **重複上報率 (Duplicate Reporting Rate)**：
    $$\text{Duplicate Rate} = \frac{\text{click\_app\_store 事件上報次數}}{\text{實際點擊發生的次數}}$$ (預期應為 100%)
- **刷新頻率**：Real-time (或 Daily 滾動掃描)。
- **呈現方式建議**：
  - **紅綠燈狀態卡 (System Health Traffic Lights)**：
    - **綠色**：系統健康，無活躍告警。
    - **黃色**：有 P1 Warning (如重複觸發或 (not set) 上升)。
    - **紅色**：有 P0 Critical 告警 (如轉址目標錯誤或點擊事件歸零)。
  - **警報日誌歷史表格 (Warning Logs)**。

---

## 3. 數據品質警告與異常告警條件 (Data Quality Warnings)

為確保數據儀表板的準確性，必須在數據管道（或監控腳本）中實施以下至少 4 個異常告警監控規則：

### 3.1 告警一：下載點擊歸零而造訪正常 (P0 - Critical)

- **告警說明**：Landing Page 正常有造訪流量，但下載按鈕點擊事件完全消失，通常代表前端代碼被意外修改或事件監聽器出錯。
- **異常判定邏輯**：
  $$\text{過去 24 小時內 } click\_app\_store \text{ 事件數} = 0$$
  $$\text{且同時間段內 } view\_landing + view\_guide \text{ 事件數} \ge 100 \text{ (或過去 7 天日均值的 50\%)}$$
- **可能原因**：
  1. 前端 `handleAppStoreClick` 函式存在未捕獲的 JavaScript 語法錯誤，導致點擊監聽器崩潰。
  2. A/B 測試框架或 UI 元件重構時，意外將 `onClick` 事件綁定或 `cta_id` 參數移除。
  3. 追蹤代碼 (Gtag/GTM) 初始化失敗，或者第三方 Analytics 腳本被 Adblocker 徹底屏蔽且未進入 Fallback 機制。
- **標準排除步驟 (SOP)**：
  1. 檢查生產環境 Console 日誌，模擬點擊 CTA 是否出現 JS 錯誤。
  2. 檢查 Git Commit Log，確認最近 48 小時內是否有 `SeoLanding.jsx` 或 `getAppStoreUrl.js` 的程式碼變更。
  3. 在不同瀏覽器（Safari, Chrome, Firefox）手動觸發測試，確認事件是否成功發送至 GA4 DebugView。
  4. 確認 GTM 或 GA4 帳戶設定是否被意外暫停或封鎖。

---

### 3.2 告警二：出現非預期的目標 App ID (P0 - Critical)

- **告警說明**：網站上報的下載點擊事件中，目標 App ID 出現了非 VerifyAI 正式 ID 的數值，代表流量可能被導向錯誤的 App Store 頁面。
- **異常判定邏輯**：
  $$\text{觸發事件為 } click\_app\_store \text{ 或 } redirect\_app\_store$$
  $$\text{且其參數 } destination\_app\_id \neq \text{'6754511420' (且不為空)}$$
- **可能原因**：
  1. 開發者在測試分支中使用了沙盒 (Sandbox) 或是測試用 App ID，並不小心將該代碼併入並部署至 `main` 預設生產分支。
  2. `getAppStoreUrl.js` 中的 ID 常量被拼寫錯誤或覆寫。
  3. 網站遭遇惡意程式碼注入 (XSS)，導致 CTA 連結被惡意替換。
- **標準排除步驟 (SOP)**：
  1. 找出異常事件的 `page_path` 與 `cta_id` 參數，定位具體的出錯頁面。
  2. 全域 Grep 搜尋該非預期的 App ID，找出硬編碼 (Hard-coded) 在程式碼中的來源。
  3. 檢查 `getAppStoreUrl.js` 常量宣告，修復並重新部署。
  4. 審查第三方依賴庫安全性，排除惡意代碼注入的可能性。

---

### 3.3 告警三：單次點擊重複觸發事件 (P1 - Warning)

- **告警說明**：使用者點擊一次 CTA 按鈕卻上報了兩次以上的 `click_app_store` 事件，會人為虛增網頁轉化率，導致數據基線失真。
- **異常判定邏輯**：
  - *即時監控*：分析 GA4 事件流中，同一個 `client_id` (或 `session_id`) 在 **200 毫秒 (ms)** 內上報了多個相同 `cta_id` 的 `click_app_store` 事件。
  - *批次檢測*：
    $$\text{每日 } click\_app\_store \text{ 事件數} > \text{網頁實體點擊估算量 } \times 1.2$$
- **可能原因**：
  1. React 組件生命週期問題，導致 `useEffect` 中的事件監聽器 (Event Listener) 被重複綁定且未在 clean-up 函式中移除。
  2. React StrictMode 造成的雙重初始化，在生產環境中如果處理不妥可能導致事件雙發。
  3. 前端同時在 `<a>` 標籤的 `onClick` 事件與 `href` 的預設行為上觸發了追蹤，或事件冒泡 (Event Bubbling) 未被正確攔截。
- **標準排除步驟 (SOP)**：
  1. 在本地開發環境啟動 React StrictMode，開啟 GA4 DebugView 進行單次點擊測試，觀察是否觸發雙重事件。
  2. 檢查 `SeoLanding.jsx` 與指南生成器中的事件綁定程式碼，確保點擊處理函式中有呼叫 `event.preventDefault()` 並在完成追蹤後才跳轉，且監聽器有正確 clean-up。
  3. 優化去重機制，可在前端引入防抖 (Debounce) 機制，限制同一 CTA 在 1 秒內僅能點擊觸發一次。

---

### 3.4 告警四：流量來源與媒介出現 (not set) 異常上升 (P1 - Warning)

- **告警說明**：GA4 中的 `source / medium` 被分類為 `(not set)` 或 `unattributed` 的 Session 比例大幅上升，代表 UTM 歸因參數丟失或不合規。
- **異常判定邏輯**：
  $$\text{單日 (not set) Sessions 佔總 Sessions 比例 } > 15\%$$
  $$\text{或 (not set) Session 佔比相較過去 7 天移動平均上升 } \ge 50\%$$
- **可能原因**：
  1. 轉址路由保護機制 (如 `/go/*`) 在執行 302 重定向時，丟失了原始 Query 中的 UTM 參數（未將 `window.location.search` 拼接至重定向 URL）。
  2. 行銷團隊在廣告投放時使用的 UTM 參數拼寫不符合 [UTM 規範](file:///Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb/docs/conversion/campaign-taxonomy.md) 的 Enum 限制，導致 GA4 將其歸類至未分類。
  3. 頁面在進行 SSL/TLS 重定向（如 http 轉 https）或跨網域跳轉時，丟失了 Referrer 資訊。
- **標準排除步驟 (SOP)**：
  1. 提取 (not set) Sessions 主要發生的 `landing_page_path` 與時間分布。
  2. 驗證所有活躍的轉址路由（特別是 `/go/*` 入口），確保重定向時有完整拼接保留所有 URL 參數。
  3. 檢查行銷團隊最近上線的廣告 URL，確認是否嚴格遵守 `utm_source=google`、`utm_medium=cpc` 等全小寫與 Enums 限制。
  4. 檢查網站安全策略 (Referrer-Policy)，確保跨站點轉介時有保留必要的 Referrer。

---

## 4. 數據對齊與歸因映射流程

為應對 Web UTM 與 App Store 官方安裝歸因的技術限制，儀表板報表生成與週報數據對齊必須採用以下對應流程：

```
+------------------+     (網頁端 click_app_store 點擊數)      +-------------------+
|  GA4 數據報表    | --------------------------------------> |                   |
| (Web Analytics)  |                                         |                   |
+------------------+                                         |   BI 歸因對齊     |
                                                             |  (週報 / Dashboard)|
+------------------+     (商店端 ct = cta_id 安裝數)          |                   |
| ASC 官方數據報表  | --------------------------------------> |                   |
| (App Analytics)  |                                         |                   |
+------------------+                                         +-------------------+
```

1. **資料串接鍵值 (Join Key)**：
   - 網頁端的 `cta_id` (來自 `click_app_store` 的事件參數)。
   - 商店端的 `ct` (Campaign Token，寫入 App Store URL 的參數)。
2. **週報數據對齊演算法**：
   - **Paid Campaign (廣告專屬頁)**：由於頁面與 Campaign 具備 1:1 關係，ASC 報表中來自該 `ct` 的安裝量即為該 Campaign 的實際安裝量。
   - **Organic / Referral (通用首頁與指南頁)**：由於多個渠道共同指向同一個 CTA 位置（例如首頁的 `rt_home_hero`），在 ASC 後台僅能看到 `ct = rt_home_hero` 的總安裝數。此時，儀表板必須依據 GA4 中該 `cta_id` 點擊的「管道來源比例」，將總安裝數進行等比例拆分，以逼近真實的渠道歸因。

---

## 5. 儀表板實作與維護建議

- **推薦工具**：
  - **Looker Studio (舊 Google Data Studio)**：最適合直接串接 GA4 數據，並可透過 BigQuery 或是 CSV 上傳方式導入 App Store Connect 數據進行交叉比對。
  - **Tableau / Power BI**：適合更複雜的數據清洗與多維度模型對齊。
- **維護責任人**：
  - 埋點與告警腳本維護：前端工程師。
  - 儀表板維護與數據解讀：成長黑客 / 行銷數據分析師。
- **告警通知管道**：
  - P0 告警應串接 Slack Webhook 或 PagerDuty，於異常偵測後 15 分鐘內發出即時通知。
  - P1 告警應納入每日數據日誌報告中。
