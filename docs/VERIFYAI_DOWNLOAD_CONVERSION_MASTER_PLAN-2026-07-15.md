# VerifyAI 下載與轉換成長總企劃書

版本：1.0
建立日期：2026-07-15
適用專案：VerifyAI Landing Page
正式網站：<https://verifyai.fork.work/>
App Store ID：`6754511420`
文件角色：本專案「增加下載與轉換率」的 canonical execution plan

---

## 0. 這份企劃書要解決什麼問題

### 0.1 商業目的

這個企劃的最終目的不是讓網站看起來更漂亮，也不是單純增加流量，而是讓更多真正有圖片查核需求的人：

1. 找到 VerifyAI。
2. 快速理解 VerifyAI 能解決什麼問題。
3. 相信它值得嘗試。
4. 點擊正確的 App Store 連結。
5. 完成安裝。
6. 完成第一次圖片搜尋並體驗產品價值。
7. 在有持續需求時成為付費用戶。

### 0.2 這是「執行」還是「追蹤」？

答案是：**兩者都要，而且必須依正確順序執行。**

- 只有執行、沒有追蹤：可能改了很多頁面，卻無法證明下載是否增加。
- 只有追蹤、沒有執行：可以看到問題，但不會產生成長。
- 正確方法：先建立可信的量測基線，再執行優化，之後持續追蹤、判讀與迭代。

本企劃因此分成兩條同步工作軌：

| 工作軌 | 目的 | 主要產出 |
| --- | --- | --- |
| Execution 執行軌 | 改善訊息、頁面、CTA、信任、內容、App Store 承接與流量品質 | 可部署的頁面、素材、連結、實驗版本 |
| Measurement 追蹤軌 | 確認每一步是否真的改善，建立可重播的決策依據 | 事件、歸因、dashboard、週報、實驗結論 |

任何一條工作軌單獨完成，都不能宣稱企劃成功。

### 0.3 非目標

這一階段不以以下事項作為主要成功判準：

- 只提高網站瀏覽量。
- 只提高搜尋排名，但沒有更多合格 App Store 點擊或安裝。
- 只提高 CTA 點擊，卻把使用者送到錯誤 App、錯誤地區或無法歸因的連結。
- 只提高短期下載，卻導致首次搜尋、留存或付費品質下降。
- 為了測試而同時重做整個品牌、全部頁面和 App 產品流程。
- 用沒有證據的百分比宣稱轉換率提升。

---

## 1. 所有人都能理解的轉換漏斗

### 1.1 漏斗定義

```text
曝光
  ↓
網站有效造訪
  ↓
理解產品價值
  ↓
App Store CTA 點擊
  ↓
App Store Product Page 瀏覽
  ↓
App 安裝
  ↓
首次開啟
  ↓
首次完整圖片搜尋
  ↓
再次使用 / 訂閱
```

### 1.2 為什麼不能只看 CTA 點擊

CTA 點擊是網站可以直接控制的重要中間指標，但不是最終下載。使用者可能：

- 點擊後發現 App Store 頁面不符合期待。
- 被送到錯誤 App ID。
- 因裝置、地區或語言不匹配而離開。
- 安裝後無法理解第一次搜尋流程。
- 只因誤導性文案點擊，沒有真正需求。

因此至少要同時觀察網站點擊、App Store 轉換、首次產品價值三層。

### 1.3 指標字典

| 指標 | 白話定義 | 計算方式 | 主要資料源 |
| --- | --- | --- | --- |
| Qualified Sessions | 有合理互動、不是機器或秒退的網站造訪 | 符合品質條件的 sessions | GA4 或核准分析工具 |
| App Store CTA CTR | 看過頁面的人，有多少點擊下載按鈕 | CTA clicks / eligible sessions | Website analytics |
| Guide-to-CTA CTR | 指南讀者有多少進入下載路徑 | Guide CTA clicks / guide sessions | Website analytics |
| App Store Product Page CVR | 到 App Store 頁面的人，有多少下載 | App Units / Product Page Views | App Store Connect |
| Click-to-Install Proxy | 網站點擊到安裝的近似轉換 | App Units / tracked outbound clicks | Website + ASC；需標記誤差 |
| Activation Rate | 安裝者有多少完成首次完整搜尋 | first_complete_search / first_open | App analytics |
| Trial-to-Paid CVR | 進入試用或免費使用者有多少付費 | paid starts / eligible trial users | App / RevenueCat / ASC |
| Cost per Qualified Install | 每個合格安裝的廣告成本 | spend / attributed qualified installs | Ads + attribution |

### 1.4 North Star 與護欄指標

本企劃建議的 North Star：

> **每週完成首次完整圖片搜尋的新用戶數。**

理由：下載不是價值實現；完成第一次完整搜尋，才代表使用者真正走到 VerifyAI 的核心價值。

在 App 端事件尚未接通前，暫時使用：

> **每週合格 App Store outbound clicks。**

護欄指標：

- App Store Product Page CVR 不得顯著下降。
- 首次完整搜尋完成率不得顯著下降。
- 退款、立即取消訂閱、負評不得因誤導性文案上升。
- 頁面 LCP、CLS、錯誤率與可存取性不得惡化。
- SEO canonical、JSON-LD、sitemap 與主要搜尋頁不得被破壞。

---

## 2. 已知現況、未知事項與禁止假設

### 2.1 已確認現況

- 正式 Landing Page 已上線。
- 首頁已有 Hero、產品截圖、How It Works、Guides、FAQ 與下載 CTA。
- 已有 6 個搜尋意圖指南頁。
- 首頁與指南頁已有 App Store CTA。
- 正式 App Store ID 是 `6754511420`。
- `index.html` 已載入 Google Ads tag `AW-18226736945`。
- 舊 `Hero.jsx` 包含 Google Ads conversion event，但目前首頁實際使用 `SeoLanding.jsx`。
- `SeoLanding.jsx` 的主要 CTA 目前沒有明確的 click event handler。
- `public/ads/us-shorts.html` 有 Google Ads conversion 呼叫。
- 舊版 `public/go/ads.html` 是 2026-06-09 建立、未完成 tracking 的 YouTube Ads redirect prototype；經確認不再作為新版轉換入口後已移除。
- 新版轉換計算以 SEO-first Landing Page commit `e53af6a` 的正式部署為版本界線；舊版網站、舊 `/go/ads` 與舊 campaign 數據不得混入新版 baseline。
- 網站存在大量其他人的 staged、unstaged 與 untracked 工作，執行者不得清理或覆蓋。

### 2.2 尚未確認，不得猜測

- 現在的有效網站 sessions 基線。
- 首頁與各指南的 CTA CTR。
- 每個 CTA 位置的獨立表現。
- Google Ads、organic search、direct、referral 的安裝貢獻。
- App Store Product Page Views 與 App Units 的實際轉換率。
- App 首次開啟、首次完整搜尋與訂閱事件是否可串接。
- 各語言、國家、裝置與流量來源的轉換差異。
- App Store Custom Product Pages 是否已建立。
- Apple Search Ads attribution 與 campaign token 是否已接通。

任何 agent 在沒有來源證據前，不得把上述項目寫成「已完成」或填入推測數字。

### 2.3 新版量測起點與舊資料隔離

新版 baseline 只計算 SEO-first Landing Page commit `e53af6a` 部署後的資料。若分析工具無法精確切到部署時間，則從部署後第一個完整日曆日開始，並在 baseline 文件記錄實際時區與起訖時間。

以下資料不得與新版 baseline 混算：

1. 舊版 Landing Page 流量。
2. 已移除的 `/go/ads` redirect 流量。
3. 無法確認 destination、campaign ID 或 App ID 的舊廣告點擊。
4. 內部 QA、bot 與部署驗證流量。

舊資料可以保存為歷史背景，但不得用來宣稱新版轉換率提升或下降。

---

## 3. 共同交付原則

所有人類與 AI agent 都必須遵守以下原則。

### 3.1 Evidence before claim

- 「已部署」必須有 commit、workflow 與 live URL 證據。
- 「轉換提升」必須有同口徑 baseline、樣本量、期間與結果。
- 「事件正常」必須有瀏覽器或 analytics debug evidence，不只看到程式碼。
- 「App Store 下載增加」必須引用 App Store Connect 或可接受的 attribution source。

### 3.2 One primary question per experiment

一次實驗只回答一個主要問題，例如：

- 使用「先查照片，再相信帳號」是否比功能型標題提高合格 CTA CTR？
- 在 Hero 顯示「3 次免費、免帳號」是否降低疑慮？
- 指南頁加入情境式 CTA 是否提高 guide-to-CTA CTR？

不得同時改 Hero、價格、截圖、CTA 顏色、導覽與 App Store 頁面後，把結果歸因給其中一項。

### 3.3 Preserve user trust

- 不得承諾 VerifyAI 能確認一個人的真實身份。
- 不得把「沒有搜尋結果」描述成安全或真實證明。
- 不得宣稱 AI detector 完全準確。
- 不得使用恐嚇或虛假倒數製造點擊。
- 所有免費、試用、訂閱與取消說明必須與 App 實際狀態一致。

### 3.4 Mobile and international first

- 主要下載路徑以 iPhone 行動體驗為第一優先。
- 不得只在 desktop 驗收。
- 語言、App Store storefront、幣別與文案必須一致。
- 非 iOS 訪客需得到清楚說明，不得被送入壞掉流程。

### 3.5 Surgical delivery

- 每個 Task 只修改與該 Task 直接相關的檔案。
- 不得清除或 reset 無關工作。
- 不得順便重做品牌或刪除舊內容。
- 任何跨 repo 工作必須在交付紀錄中標明 repo、commit 和 owner。

### 3.6 Reversible experiments

- 每個實驗必須能在一次小型 revert 中還原。
- Control 與 Variant 的文案、截圖或元件必須可追溯。
- 實驗結束後必須明確決定 ship、iterate 或 reject，不得永久留下不明 flag。

---

## 4. 角色分工：讓不同 AI agent 都知道自己在做什麼

這裡的「角色」不是指定特定人，而是指定工作責任。單一 agent 可以擔任一個角色，但不得在沒有證據時替另一角色宣告完成。

| 角色 | 白話責任 | 必要輸入 | 必要交付 |
| --- | --- | --- | --- |
| Program Lead | 維護順序、範圍與決策 | 本企劃、狀態板、風險 | Phase gate、決策紀錄、交接 |
| Analytics Agent | 讓每一步可量測 | 事件規格、tag、資料源權限 | Event map、QA evidence、dashboard |
| Web Conversion Agent | 改善網站理解與點擊 | Baseline、研究、頁面程式 | 小範圍 variant、測試、部署證據 |
| Content/SEO Agent | 把搜尋意圖轉成合格下載 | Query、指南、internal links | Content brief、頁面、CTA mapping |
| App Store Agent | 改善商店頁承接 | ASC data、listing、screenshots | PPO/CPP plan、素材、結果 |
| App Activation Agent | 讓下載者完成首次價值 | App flow、事件、產品資料 | Activation funnel、產品實驗 |
| Paid Acquisition Agent | 買到可轉換流量 | 素材、受眾、budget、tracking | Campaign record、spend/result writeback |
| QA/Verification Agent | 獨立確認沒有假成功 | Commit、build、URL、event spec | Pass/fail report、repro evidence |

### 4.1 最低交接格式

每個 Task 結束時，交接必須包含：

```text
Task ID：
狀態：not_started / in_progress / blocked / complete
目的：
實際修改：
未修改：
檔案與 commit：
驗證命令：
證據連結或截圖：
結果數據與期間：
已知限制：
下一個唯一 Task：
```

---

## 5. Phase 0：止血、盤點與基線保護

目標：先確保流量沒有被送錯、資料沒有明顯斷點，並保存改版前基線。

Phase Gate：legacy `/go/ads` 已移除、所有現行下載入口清冊完成、新版 baseline window 定義完成，才能進 Phase 1。

### Task 0.1：建立所有下載路徑清冊

執行內容：

1. 搜尋所有 App Store URL、app ID、redirect page、CTA component。
2. 記錄來源頁、CTA 位置、語言、destination、是否有 event、是否保留 campaign data。
3. 區分 production active、legacy unused、paid-only、guide-only。

交付物：

- `docs/conversion/download-route-inventory.md`
- 機器可讀清冊：`docs/conversion/download-route-inventory.csv`

交付標準：

- Repo 內所有 `apps.apple.com`、`app/id` 與 app ID 出現位置都有對應紀錄。
- 每個 active route 都有實際最終 destination 驗證。
- 清冊中不能只寫「看起來正確」。

### Task 0.2：確認 legacy route 移除與新版量測起點

執行內容：

- 確認舊 `public/go/ads.html` 不再存在於 production build。
- 搜尋現行頁面是否仍有非正式 App ID。
- 確認外部 Google Ads、書籤或文件不再把 `/go/ads` 當成新版入口。
- 在 baseline 文件記錄新版版本界線、實際起始時間與時區。

交付標準：

- Production build 不再包含 `go/ads.html` 或舊 ID `6740724263`。
- 現行下載入口全部使用核准的 App ID `6754511420`。
- `/go/ads` 不再被列為 active conversion route。
- 新版 baseline 不包含舊 `/go/ads` 或舊版 Landing Page 數據。

### Task 0.3：保存 baseline

Baseline 起點與最低期間：

- 版本界線為 SEO-first Landing Page commit `e53af6a` 的正式部署。
- 若無法精確取得部署分鐘，從部署後第一個完整日曆日開始。
- 建議 14 個完整日曆日。
- 若流量過低，延長至至少取得可判讀樣本；不得任意用 1–2 天下結論。

交付物：

- `docs/conversion/baselines/YYYY-MM-DD-baseline.md`
- 原始數據來源與匯出時間。

必填欄位：

- Sessions、source/medium、country、language、device。
- 首頁 CTA clicks 與指南 CTA clicks；若尚無事件，明確標記 unavailable。
- App Store Product Page Views、App Units、CVR。
- Paid spend、clicks、attributed installs；無法對齊時標記 attribution gap。
- App first_open、first_complete_search、subscription；沒有就標 unavailable。

不得做的事：

- 不得用「業界平均」代替 VerifyAI baseline。
- 不得把不同日期、國家或來源的數據混成一個沒有註解的百分比。

---

## 6. Phase 1：建立可信的量測與歸因

目標：每個重要 CTA 和漏斗階段都有一致名稱、參數與 QA 證據。

Phase Gate：核心事件在 production 可觸發、可看到、可區分位置與來源，才可啟動轉換實驗。

### Task 1.1：建立 Measurement Plan

交付物：`docs/conversion/measurement-plan.md`

核心事件建議：

| Event | 觸發時機 | 必填參數 |
| --- | --- | --- |
| `view_landing` | Landing Page 可互動 | `page_variant`, `language`, `source_group` |
| `view_guide` | 指南頁可互動 | `guide_slug`, `language`, `source_group` |
| `click_app_store` | 任一 App Store CTA click | `cta_id`, `cta_location`, `page_type`, `page_path`, `language`, `destination_app_id`, `campaign_id` |
| `click_learn_more` | FAQ/內容深連結 | `content_id`, `destination` |
| `view_screenshot` | 使用者主動展開或滑到產品證據 | `screenshot_id`, `page_variant` |
| `redirect_app_store` | redirect route 執行 | `route_id`, `destination_app_id`, `campaign_id` |

事件命名原則：

- 同一行為只能有一個 canonical event name。
- CTA 位置用參數區分，不建立 `hero_click`、`footer_click` 等互不相容事件。
- 不把 Google Ads conversion ID 當成完整 analytics event spec。

### Task 1.2：實作 CTA tracking helper

範圍：

- `SeoLanding.jsx` Hero CTA。
- Bottom CTA。
- 6 個 guide CTA。
- Paid landing page CTA。
- Redirect route。

交付原則：

- 建立小型、單一用途 helper；不要為此引入大型 analytics framework。
- Tracking failure 不得阻止使用者前往 App Store。
- 外連導向需考慮 event flush，但不得用明顯延遲傷害體驗。
- 不記錄照片、個資或使用者敏感內容。

驗收標準：

- Debug 模式能看到 event name 與全部必填參數。
- 每個 CTA 的 `cta_id` 穩定且唯一。
- 事件只觸發一次，不因 React StrictMode 或重複 listener 觸發兩次。
- Ad blocker 下 CTA 仍能正常導向。
- App ID 參數與實際 destination 一致。

### Task 1.3：建立 UTM 與 campaign 命名規範

交付物：`docs/conversion/campaign-taxonomy.md`

最低欄位：

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
campaign_id
creative_id
landing_variant
```

交付標準：

- 同一 campaign 在 Google Ads、website event、ASC/attribution 與週報使用同一 ID。
- 禁止自由輸入多種拼法，例如 `googleads`、`google_ads`、`Google Ads` 混用。
- 明確說明 Apple App Store 是否保留、忽略或無法使用 web UTM；不得假設一般 UTM 等同安裝歸因。

### Task 1.4：串接 App 與 App Store 結果

需要跨 repo 或控制台協作時，交接必須記錄外部 owner。

最低目標：

- App Store Connect：Product Page Views、App Units、conversion rate、territory、source type。
- App：first_open、first_complete_search。
- Subscription：trial/intro/paid start，若由 RevenueCat 管理需標明 source of truth。

驗收標準：

- 至少能以日或週對齊網站 outbound clicks 與 ASC 結果。
- 清楚標示不能一對一歸因的區段。
- 不得把 correlation 寫成 deterministic attribution。

### Task 1.5：建立 Conversion Dashboard 與資料品質告警

交付物：

- `docs/conversion/dashboard-spec.md`
- dashboard URL 或可重建設定。
- `docs/conversion/data-quality-checklist.md`

Dashboard 最低區塊：

1. Executive funnel。
2. Source/medium。
3. Landing page / guide。
4. CTA location。
5. Language / country / device。
6. App Store conversion。
7. Activation / paid conversion。
8. Data quality warnings。

告警條件示例：

- `click_app_store` 24 小時歸零但 sessions 正常。
- destination app ID 出現非 `6754511420`。
- 同一 CTA 每 click 觸發兩次以上。
- source/medium 的 `(not set)` 突然大幅上升。

---

## 7. Phase 2：研究使用者與建立轉換假設

目標：用真實搜尋意圖、使用情境與流失點決定要改什麼。

Phase Gate：至少有一份 evidence-backed hypothesis backlog，且每項假設有影響範圍、證據、指標與優先級。

### Task 2.1：按意圖分群

建議初始群組：

| Segment | 使用者真正想完成的事 | 主要疑慮 |
| --- | --- | --- |
| Dating / catfish | 確認交友照片是否被盜用 | 害怕誤判、害怕被騙 |
| Romance scam family | 幫家人查核可疑對象 | 不知道怎麼勸、需要證據 |
| Marketplace buyer | 查商品照是否盜圖 | 想快速判斷是否值得交易 |
| Image source researcher | 找原始來源與上下文 | 需要多來源與可點擊證據 |
| Google Lens alternative | 想一次比較多個引擎 | 不想反覆上傳、在意效率 |
| AI image concern | 想知道圖片是否 AI 生成 | 容易期待過度確定答案 |

交付物：`docs/conversion/audience-intent-map.md`

交付標準：每個 segment 都必須連到 query、landing/guide、CTA promise、App Store promise 與 activation moment。

### Task 2.2：建立 Friction Audit

逐步回答：

- 第一眼是否知道這是 iPhone App？
- 是否知道要提供什麼照片、會得到什麼？
- 「4 個搜尋來源」對使用者是利益還是技術名詞？
- 是否清楚免費 3 次與免帳號的條件？
- 是否有足夠信任證據，而不是只有產品自述？
- 截圖是否能在手機尺寸看懂？
- CTA 是否在高意圖時刻出現？
- 指南讀完後是否自然進入 App？
- App Store 截圖與網站承諾是否一致？

交付物：`docs/conversion/friction-audit.md`

每個 friction 必須包含：證據、受影響 segment、漏斗階段、嚴重度、建議解法、驗證指標。

### Task 2.3：建立 Hypothesis Backlog

格式：

```text
Hypothesis ID:
因為我們觀察到：
如果我們：
預期會改善：
主要指標：
護欄指標：
適用受眾：
所需樣本 / 期間：
實作成本：
風險：
```

優先排序使用 ICE 或 RICE，但分數必須附理由，不能只給數字。

---

## 8. Phase 3：Landing Page 轉換優化

目標：提高合格訪客理解產品並點擊正確 App Store CTA 的比例。

Phase Gate：每個修改都對應研究假設與 event；沒有 baseline 的大改版不得直接宣稱成功。

### Task 3.1：Hero message test

第一輪建議只測訊息，不同時更換整個版型。

候選方向：

- Control：`Check the photo. Before you trust the profile.`
- Variant A：更明確說明使用場景與結果。
- Variant B：更強調一次查 4 個來源與節省步驟。

必要內容：

- 是 iPhone App。
- 會搜尋哪些證據，而不是宣稱判定真偽。
- 免費 3 次、免帳號若仍為真實條件。
- Primary CTA 與 secondary explainer path。

主要指標：Hero CTA CTR。
護欄：scroll engagement、bottom CTA CTR、ASC CVR、bounce/engagement。

### Task 3.2：Trust and proof layer

可測元素：

- 產品流程截圖配上具體註解。
- 「你會看到什麼」而不是只寫功能。
- 隱私、照片處理與免帳號的準確說明。
- Evidence-not-verdict 原則。
- 真實評論或評分；沒有真實來源不得製造 social proof。

驗收標準：

- 每個信任聲明能指出來源。
- 不增加無法證明的評價、下載數或媒體 Logo。
- 手機上不用放大即可理解截圖重點。

### Task 3.3：CTA architecture

每個 CTA 必須有明確 ID 與意圖：

| 建議 ID | 位置 | 使用者心理階段 |
| --- | --- | --- |
| `home_hero_primary` | 首屏 | 已有需求，快速下載 |
| `home_after_proof` | 證據/截圖後 | 看懂產品後下載 |
| `home_final_primary` | 頁尾 | 完整考慮後下載 |
| `guide_inline_{slug}` | 指南步驟後 | 想立即執行教學 |
| `guide_final_{slug}` | 指南結尾 | 完整閱讀後下載 |

交付標準：

- CTA 文案描述動作與價值，不只寫 `Submit` 或模糊的 `Try now`。
- 所有 CTA destination 正確。
- 所有 CTA tracking 完整。
- 不用黏性 CTA 遮擋主要內容或造成誤觸。

### Task 3.4：Mobile conversion QA

最低裝置範圍：

- 小尺寸 iPhone viewport。
- 主流 iPhone viewport。
- desktop 作為次要驗證。

檢查：

- Hero 是否在不過度滾動下看懂並可點擊。
- CTA touch target。
- 截圖橫向區塊操作。
- 語言切換後 layout。
- 外連、返回與 scroll position。
- Core Web Vitals 與 console errors。

---

## 9. Phase 4：指南頁與 SEO 流量轉換

目標：不是只讓指南獲得排名，而是把每種搜尋意圖轉成自然、可信的 App 使用下一步。

### Task 4.1：每個 Guide 建立 conversion brief

每份 brief 包含：

- Target query / intent。
- Quick answer。
- 使用者風險與情境。
- VerifyAI 在流程中的具體角色。
- 不可承諾事項。
- Inline CTA 位置與文案。
- App Store/CPP destination。
- 主要事件與成功指標。

交付物位置：`docs/conversion/guide-briefs/{slug}.md`

### Task 4.2：指南 CTA 與 internal journey

原則：

- 先完整回答問題，再引導工具。
- CTA 必須與該 query 對應，不使用同一段泛用文案貼滿所有頁面。
- 高風險詐騙情境需提供安全建議，不只促銷 App。
- Learn More link 必須真的提供下一層內容。

主要指標：guide-to-CTA CTR。
護欄：organic impressions、ranking、engagement、ASC CVR。

### Task 4.3：內容擴張 gate

只有同時符合以下條件才新增更多指南：

1. 有明確 query 與 intent，不是為了堆關鍵字。
2. 現有頁面沒有完整回答。
3. VerifyAI 能自然成為解決步驟之一。
4. 有 internal linking 與 CTA plan。
5. 有更新 owner 與品質驗收。

---

## 10. Phase 5：App Store Product Page Optimization

目標：讓網站承諾、廣告承諾與 App Store 頁面完全一致，減少點擊後流失。

### Task 5.1：Message match audit

比較：

- Website Hero。
- Guide promise。
- Paid ad promise。
- App Store icon、subtitle、第一至第三張 screenshot。
- App onboarding first screen。

交付物：`docs/conversion/app-store-message-match.md`

交付標準：任何主要 campaign 都能追到一致的 promise，不得出現網站說 A、App Store 說 B。

### Task 5.2：Product Page Optimization test

第一輪建議優先測 screenshot story，而不是同時改 icon、subtitle 和 screenshot。

Screenshot story 建議順序：

1. 使用者問題：可疑照片／帳號。
2. 動作：一次搜尋多個來源。
3. 結果：看到來源與相似圖片。
4. 判讀：證據不是裁決。
5. 免費起點與使用限制。

主要指標：App Store Product Page CVR。
護欄：activation、retention、refund/negative review。

### Task 5.3：Custom Product Pages

建議對應：

- Catfish / dating profile。
- Romance scam family safety。
- Find original image source。
- Multi-engine Google Lens alternative。

每個 CPP 必須有唯一 campaign mapping，不得只建立頁面卻無法歸因。

---

## 11. Phase 6：App 內 Activation 與付費承接

目標：確保增加的下載不是空下載，而能完成第一次價值並在適合時付費。

此 Phase 可能需要在 App repo 執行；本網站 repo 仍保存跨 repo Task 與結果索引。

### Task 6.1：定義 activation moment

Canonical activation 建議：

> 使用者完成一次完整多來源圖片搜尋，並看到至少一個可檢視的結果或清楚的 no-result explanation。

交付物：`docs/conversion/app-activation-spec.md`

### Task 6.2：First-run friction audit

檢查：

- 第一次如何加入照片。
- 權限說明是否清楚。
- 是否過早要求註冊或付費。
- 免費 3 次承諾是否一致。
- 搜尋等待期間是否說明進度。
- No result 是否被誤解為安全證明。
- Paywall 出現時間是否在價值前或價值後。

### Task 6.3：Activation experiment

優先順序：

1. 降低第一次加入照片的摩擦。
2. 清楚說明多來源搜尋進度。
3. 改善結果判讀與下一步。
4. 再測試 paywall timing 與 offer presentation。

不得先以更激進 paywall 提高短期收入，卻犧牲首次價值與長期留存。

---

## 12. Phase 7：Paid acquisition 與擴量

目標：只有在量測與 organic conversion path 穩定後，才用付費流量擴大有效下載。

### Task 7.1：Paid readiness gate

必須全部通過：

- 所有 paid destination 正確。
- `click_app_store` 與 campaign ID 可追蹤。
- App Store/attribution 有可接受的回傳。
- Landing promise 與 ad creative 一致。
- 有明確 budget、stop-loss 與 owner。
- 已知 baseline，不用猜測 CPA。

### Task 7.2：Creative × Landing matrix

每個廣告素材只能對應適合的 landing/CPP：

| Creative angle | Landing intent | App Store承接 |
| --- | --- | --- |
| Dating profile check | Catfish guide / targeted landing | Catfish CPP |
| Help protect family | Romance scam guide | Family safety CPP |
| Find image source | Source guide | Source-search CPP |
| Four engines in one | Main landing / Lens alternative guide | Multi-engine CPP |

### Task 7.3：Budget scaling rule

- 先用小額 validation budget。
- 未達最低樣本前不因單日波動加減預算。
- CPA 需以 attributed qualified install 或更深事件評估，不只 CTA click。
- 只有主要指標改善且護欄穩定，才逐步增加預算。
- 每次增幅與觀察期必須記錄。

---

## 13. 實驗制度與判定標準

### 13.1 實驗開始前必填

交付物：`docs/conversion/experiments/EXP-{NNN}-{slug}.md`

```text
Experiment ID:
Owner:
Status:
Primary question:
Control:
Variant:
Target audience:
Traffic allocation:
Primary metric:
Guardrail metrics:
Baseline:
Minimum sample / minimum duration:
Stop conditions:
Expected risks:
Implementation commit:
QA evidence:
```

### 13.2 最低執行規則

- 至少跨過完整週期，避免只比較不同星期。
- 未達事先定義樣本，不因短期漂亮結果提前宣布勝利。
- 同一受眾不得同時暴露於互相污染的實驗。
- Paid campaign 結構改動需記錄 learning reset 風險。
- Bot、內部流量與 QA 流量需排除或標記。

### 13.3 結果只能有四種

| 結果 | 定義 | 下一步 |
| --- | --- | --- |
| Ship | 主要指標改善、護欄正常、證據足夠 | 合併為新 control |
| Iterate | 方向可能有效但證據或實作仍有問題 | 建立新 experiment ID |
| Reject | 沒改善或護欄惡化 | 還原並保存學習 |
| Inconclusive | 樣本不足或資料品質不可信 | 修量測或延長，不宣稱結果 |

### 13.4 禁止的成功寫法

- 「看起來更有轉換力」。
- 「按鈕更明顯，所以應該有效」。
- 「workflow success，所以實驗成功」。
- 「點擊變多，所以下載一定變多」。
- 「這週安裝增加，所以是 Hero 改版造成」。

---

## 14. 固定追蹤節奏

### 每日自動/快速檢查

- 網站與主要 landing HTTP status。
- CTA event 是否有資料。
- destination app ID。
- Paid spend 異常與 broken destination。
- Production error。

### 每週成長檢討

交付物：`docs/conversion/reports/YYYY-Www-weekly.md`

固定順序：

1. 本週發生什麼改動。
2. Funnel metrics 與上週/基線比較。
3. Source、language、country、device 差異。
4. 正在跑的 experiments。
5. Data quality warnings。
6. 學到什麼。
7. 下週唯一最高優先 Task。

### 每月策略檢討

- North Star 趨勢。
- Website → ASC → activation → paid 的完整漏斗。
- 哪些 segment 帶來最高品質使用者。
- SEO guide 是否帶來合格下載。
- Paid 是否應擴量、縮減或更換 message。
- 哪些已完成實驗應更新本企劃或 backlog。

---

## 15. 優先執行順序

### 第一批：立即執行

1. Task 0.1 下載路徑清冊。
2. Task 0.2 確認 legacy `/go/ads` 移除與新版量測起點。
3. Task 1.1 Measurement Plan。
4. Task 1.2 統一 CTA events。
5. Task 0.3 保存可比較 baseline。

### 第二批：量測穩定後

6. Task 2.1 Audience intent map。
7. Task 2.2 Friction audit。
8. Task 2.3 Hypothesis backlog。
9. Task 3.1 第一個 Hero message experiment。
10. Task 4.1/4.2 指南 conversion briefs 與 CTA。

### 第三批：網站漏斗可判讀後

11. App Store message match 與 PPO。
12. App activation funnel。
13. Paid acquisition controlled scaling。

不得跳過 Measurement Phase，直接同時重做 Landing Page、App Store 和廣告。

---

## 16. 每個 Phase 的 Definition of Done

| Phase | 完成標準 |
| --- | --- |
| 0 止血與基線 | Legacy `/go/ads` 已移除；所有現行下載 route 正確；新版 baseline 有版本界線、來源與期間 |
| 1 量測與歸因 | 核心事件 production verified；dashboard 可判讀；資料缺口明示 |
| 2 研究與假設 | 每個優先假設都有 evidence、metric、guardrail、成本與風險 |
| 3 Landing CRO | 至少一個受控實驗完成；結果依規則 ship/iterate/reject/inconclusive |
| 4 Guide conversion | 6 個 guide 有獨立意圖、CTA mapping 與可分辨事件 |
| 5 App Store | Website/Ads/ASC message match；至少一個可歸因 PPO/CPP test |
| 6 Activation | first_complete_search 可量測；首次價值摩擦有實驗結果 |
| 7 Paid scaling | attribution、stop-loss、creative mapping 完整；以合格安裝判斷擴量 |

### 專案級成功標準

只有以下條件都成立，才能宣稱「下載與轉換企劃有效」：

1. 同口徑、可驗證的 baseline 存在。
2. 合格 App Store clicks 或 App Units 有可信改善。
3. App Store CVR 與 activation 沒有被犧牲。
4. 結果可連到特定 experiment/commit/期間。
5. 改善持續超過單日或偶發 campaign spike。
6. 沒有依靠誤導、恐懼、錯誤承諾或錯誤 destination。

---

## 17. Repo 文件結構與狀態管理

後續 agent 應在本專案建立以下結構；不得把 canonical 成果只放在個人資料夾或 Codex memory：

```text
docs/conversion/
  STATUS.md
  download-route-inventory.md
  download-route-inventory.csv
  measurement-plan.md
  campaign-taxonomy.md
  dashboard-spec.md
  data-quality-checklist.md
  audience-intent-map.md
  friction-audit.md
  hypothesis-backlog.md
  app-store-message-match.md
  app-activation-spec.md
  baselines/
  guide-briefs/
  experiments/
  reports/
  decisions/
  handoffs/
```

### `STATUS.md` 最低內容

- 我們現在在哪個 Phase。
- 正在執行的唯一主 Task。
- 已完成項目及證據。
- Blockers。
- Live experiments。
- 最近一次 baseline/report。
- 下一個 gate。

### 文件真實性順序

1. 本企劃書：目的、原則、Phase 與 gate。
2. `docs/conversion/STATUS.md`：現在進度。
3. Experiment/decision record：個別決策證據。
4. Weekly reports：時間序列結果。
5. Handoff：當次 agent 的交接摘要。

Handoff 不得覆蓋企劃原則；若要更改企劃，必須新增 decision record 說明原因。

---

## 18. QA、部署與回退標準

任何網站修改至少執行：

```bash
npm ci
npm run build
xmllint --noout dist/sitemap.xml
```

Conversion-specific QA：

- 所有 active CTA 的 app ID 正確。
- 所有 CTA 可在 tracking blocked 時正常外連。
- 事件 name、parameter 與 measurement plan 一致。
- 不重複觸發。
- Control/variant 可識別。
- Mobile viewport 通過。
- Canonical、JSON-LD、sitemap 不被破壞。
- GitHub Actions success。
- Cloudflare live cache-busting 驗證。
- Live event debug 或 downstream receipt 證據。

回退條件：

- CTA destination 錯誤。
- 事件重複或大量遺失。
- Build/production error。
- 主要護欄顯著惡化。
- 內容造成錯誤承諾或法規/隱私風險。

---

## 19. 需要人類決策的事項

Agent 不得自行決定以下事項：

1. 可投入的 paid acquisition 月預算與 stop-loss。
2. 是否允許 AI training 的 Content-Signal 政策。
3. App pricing、free search 次數與 subscription offer 的產品變更。
4. 是否採用新的 analytics/attribution vendor，尤其涉及個資與成本時。
5. 是否對特定國家、語言或高風險族群進行付費擴量。
6. 使用者評論、合作 Logo 或媒體背書的發布授權。

其他可逆、低風險、符合本企劃範圍的 docs/code/test 工作，可以依 Phase 順序執行，不需每個小步驟重新詢問。

---

## 20. 下一個 Session 的精確啟動任務

下一個 agent 不應直接重寫 Hero。應從以下任務開始：

> **Phase 0 Task 0.1 + Task 0.2：建立完整下載路徑清冊，確認 legacy `/go/ads` 已從 production 移除，並記錄 SEO-first Landing Page 新版 baseline 的起始時間與時區。**

啟動前先讀：

1. `docs/VERIFYAI_DOWNLOAD_CONVERSION_MASTER_PLAN-2026-07-15.md`
2. `docs/DEPENDENCY_SECURITY_AUDIT.md`
3. `app.md`
4. `src/components/SeoLanding.jsx`
5. `src/utils/getAppStoreUrl.*`
6. `public/ads/us-shorts.html`
7. `public/_redirects`

完成後建立：

- `docs/conversion/STATUS.md`
- `docs/conversion/download-route-inventory.md`
- `docs/conversion/download-route-inventory.csv`
- 一份 Phase 0 handoff。

只有 Task 0.1、0.2 通過，下一個 agent 才開始 Measurement Plan，不得把舊版流量混入新版 baseline，也不得跳到視覺重做或付費擴量。
