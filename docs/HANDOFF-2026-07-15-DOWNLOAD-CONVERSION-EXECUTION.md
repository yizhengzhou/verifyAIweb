# VerifyAI 下載與轉換企劃執行交接

日期：2026-07-15
專案：`/Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb`
正式網站：<https://verifyai.fork.work/>
正式 App Store ID：`6754511420`
狀態：企劃書已完成；執行工作待開始

## 1. 這份交接檔的用途

這份文件是下一個人類或 AI agent 的待辦入口。它不取代完整企劃書，而是明確指出：

- 哪一份企劃書是主規格。
- 現在完成了什麼。
- 哪些工作尚未開始。
- 下一個唯一執行任務是什麼。
- 需要建立哪些交付物。
- 什麼條件下才可以進入下一階段。

## 2. 唯一主企劃書

開始工作前必須完整閱讀：

- `docs/VERIFYAI_DOWNLOAD_CONVERSION_MASTER_PLAN-2026-07-15.md`

這份企劃書是本專案「增加下載與轉換率」的 canonical execution plan，包含：

- 商業目標與非目標。
- 完整轉換漏斗。
- 指標、North Star 與護欄。
- Phase 0–7。
- 每個 Task 的交付原則與驗收標準。
- 實驗制度。
- QA、部署、回退與跨 agent 交接規則。

若本 handoff 與主企劃書不同：

- 企劃目的、Phase 順序與交付原則以主企劃書為準。
- 現在的執行狀態與下一個 Task 以本 handoff 為準。
- 不得自行新增新 Phase 或跳過 Measurement Phase。

## 3. 商業目的

本輪工作的目的不是單純增加流量或重新設計頁面，而是建立並改善以下閉環：

```text
有效造訪
→ 理解產品價值
→ 點擊 App Store CTA
→ App Store Product Page
→ 安裝
→ 首次開啟
→ 首次完整圖片搜尋
→ 再次使用或付費
```

只有 CTA 點擊增加，不能單獨宣稱下載與轉換成功。

## 4. 已完成並應保留的基準

### 4.1 新版網站

- SEO-first Landing Page 已上線。
- 6 個搜尋意圖指南頁已上線。
- App Store 圖示與 5 張正式截圖已上線。
- Homepage、guides、sitemap、robots 與 llms endpoints 已驗證。
- 現行下載入口使用 App Store ID `6754511420`。

### 4.2 安全與部署

- npm audit 已完成，結果為 0 vulnerabilities。
- GitHub Actions 已使用 `actions/checkout@v5`、`actions/setup-node@v5`。
- 詳細證據：`docs/DEPENDENCY_SECURITY_AUDIT.md`。

### 4.3 Legacy `/go/ads` 清理

- 舊 `public/go/ads.html` 已刪除。
- Cloudflare Worker 的 `verifyai.fork.work/go/*` route 已由使用者移除。
- Pages 現在把所有 `/go/*` 以 HTTP 302 導向新版首頁。
- 正式驗證：`/go/ads?test=4c52b41` → `/?test=4c52b41` → HTTP 200。
- Redirect 修復 commit：`4c52b41`。
- Deployment workflow：<https://github.com/yizhengzhou/verifyAIweb/actions/runs/29426717455>。

不得恢復舊 `go/ads.html`，也不得讓 `/go/*` 再次直接繞過新版 Landing Page 跳到 App Store。

### 4.4 新舊資料界線

- 新版網站的版本界線：SEO-first Landing Page commit `e53af6a`。
- 舊 Landing Page、舊 `/go/ads` 與無法確認 destination 的舊 campaign 資料，不得混入新版 baseline。
- 若分析工具無法切到部署分鐘，流量／ASC 歷史從部署後第一個完整日曆日開始記錄，並註明 `Asia/Taipei`。
- `click_app_store` 尚未完整部署，因此 CTA click baseline 只能從新 tracking 正式上線後開始，不得回填或猜測。

## 5. 尚未完成

以下項目目前都不能標記 complete：

- 所有現行 App Store CTA 的完整清冊。
- `docs/conversion/STATUS.md`。
- `docs/conversion/download-route-inventory.md`。
- `docs/conversion/download-route-inventory.csv`。
- `docs/conversion/measurement-plan.md`。
- 統一 `click_app_store` event。
- Hero、bottom、guide、paid landing CTA 的位置參數。
- Production analytics debug evidence。
- Website → App Store Connect 的可對照 baseline。
- App `first_open` 與 `first_complete_search` 串接。
- Conversion dashboard。
- 任何 Landing Page A/B test。
- 任何已證明的轉換率提升。

因此不得宣稱「轉換率最大化已完成」。

## 6. 下一個唯一主 Task

下一個 agent 必須執行：

> **Phase 0 Task 0.1：建立所有現行下載路徑清冊。**

不要先重寫 Hero、改 CTA 顏色、建立 A/B test、增加廣告預算或重做 App Store 截圖。

### 6.1 必讀檔案

依序閱讀：

1. `docs/VERIFYAI_DOWNLOAD_CONVERSION_MASTER_PLAN-2026-07-15.md`
2. 本 handoff。
3. `app.md`
4. `src/components/SeoLanding.jsx`
5. `src/utils/getAppStoreUrl.js`
6. `scripts/generate-seo-guides.cjs`
7. `public/ads/us-shorts.html`
8. `public/_redirects`
9. `index.html`

### 6.2 執行內容

1. 搜尋 repo 內所有：
   - `apps.apple.com`
   - `app/id`
   - `6754511420`
   - 其他 10 位數 App ID
   - CTA component
   - redirect route
   - Google Ads conversion 呼叫
2. 區分：
   - Production active
   - Generated guide
   - Paid-only
   - API/content reference
   - Legacy/inactive
3. 對每個 active CTA 記錄：
   - Source file
   - Page URL
   - CTA ID 建議值
   - CTA location
   - Page type
   - Language/storefront
   - Destination URL
   - Destination App ID
   - Existing event
   - Campaign parameter handling
   - Production verification status
4. 實際驗證所有 active destination，不能只看原始碼。

### 6.3 必要交付物

建立：

- `docs/conversion/STATUS.md`
- `docs/conversion/download-route-inventory.md`
- `docs/conversion/download-route-inventory.csv`

如果 `docs/conversion/` 不存在，可以建立；不得把成果只寫在對話、暫存檔或個人資料夾。

### 6.4 Inventory CSV 最低欄位

```text
route_id
status
source_file
page_url
page_type
cta_location
language
destination_url
destination_app_id
existing_event
campaign_handling
production_verified
evidence
notes
```

### 6.5 Task 0.1 驗收標準

只有全部符合才可標記完成：

- Repo 內所有 App Store URL、App ID 與 active CTA 都被清冊涵蓋。
- 每個 production active destination 都有 live evidence。
- 所有現行 App ID 都是核准的 `6754511420`，或有明確例外說明。
- Legacy、generated、API reference 和 active CTA 沒有混為一談。
- Markdown 與 CSV 的 route 數量、ID 與狀態一致。
- `docs/conversion/STATUS.md` 指向下一個 Task。
- 沒有修改 Landing Page 文案、視覺或事件程式。

## 7. Task 0.1 完成後的下一個 Task

Task 0.1 通過後，才開始：

> **Phase 1 Task 1.1：建立 `docs/conversion/measurement-plan.md`。**

Measurement Plan 至少定義：

- `view_landing`
- `view_guide`
- `click_app_store`
- `click_learn_more`
- `view_screenshot`
- `redirect_app_store`（只在仍存在合法 redirect 時）

`click_app_store` 必填參數：

```text
cta_id
cta_location
page_type
page_path
language
destination_app_id
campaign_id
```

Task 1.1 只是規格；必須先完成並審查，下一個 Task 才能修改 tracking code。

## 8. Measurement Plan 之後的執行順序

不得改變以下順序：

1. Task 0.1：下載路徑清冊。
2. Task 1.1：Measurement Plan。
3. Task 1.2：統一 CTA tracking helper 與 production event QA。
4. Task 0.3：建立可比較 baseline。
5. Task 2.1–2.3：受眾、摩擦與 hypothesis backlog。
6. Task 3.1：第一個受控 Landing Page experiment。
7. Phase 4：6 個 guides 的 conversion briefs 與 CTA 實驗。
8. Phase 5：App Store message match、PPO／CPP。
9. Phase 6：App activation。
10. Phase 7：Paid scaling。

## 9. 不可破壞事項

- 不得把舊版數據混入新版 baseline。
- 不得在 tracking 尚未上線時假造 CTA click baseline。
- 不得把 CTA click 當成實際下載。
- 不得同時大改 Hero、CTA、截圖與 App Store 頁面後宣稱單一原因有效。
- 不得恢復 `/go/ads` 舊 HTML。
- 不得修改正式 App ID `6754511420`，除非使用者以 ASC Apple ID 證據明確更正。
- 不得執行 `git reset --hard`、強制推送或清理其他人的變更。
- 不得把 token、API key、ASC credential 或 Cloudflare credential 寫入 repo。
- 不得只用 build、push 或 workflow success 宣稱 conversion tracking 已成功。
- Tracking 失敗不得阻止使用者正常前往 App Store。
- 不得記錄照片、個資或敏感查核內容。

## 10. 工作樹保護

目前主要工作樹含有其他人的 staged、unstaged 與 untracked 變更。

後續 agent 必須：

- 先執行 `git status --short`。
- 只修改本 Task 必要檔案。
- 不清理、不 restore、不 reset 無關檔案。
- Commit 時使用明確 pathspec，只包含本 Task 檔案。
- 若需部署，使用乾淨 worktree 或等價隔離方式，避免把其他工作混入。

## 11. 每次程式修改的最低驗證

```bash
npm ci
npm run build
xmllint --noout dist/sitemap.xml
```

Conversion tracking 修改另外必須驗證：

- CTA 在 analytics blocked 時仍可外連。
- Event 不因 React StrictMode 重複。
- 每個 CTA 的 `cta_id` 唯一且穩定。
- `destination_app_id` 與真實 URL 一致。
- Mobile viewport 可操作。
- Production debug evidence 可看到 event 與全部必填參數。
- Homepage、6 guides、App Store assets、sitemap、robots、llms endpoints 仍正常。

## 12. 狀態回報規則

每個 Task 結束時必須使用：

```text
Task ID：
狀態：not_started / in_progress / blocked / complete
目的：
實際修改：
未修改：
檔案與 commit：
驗證命令：
Live evidence：
結果數據與期間：
已知限制：
下一個唯一 Task：
```

若沒有 baseline、樣本、期間或 downstream evidence，結果只能標示 `inconclusive`，不得標示 conversion uplift。

## 13. 下一個 Session 啟動提示詞

```text
你目前位於 VerifyAI Landing Page 專案：

/Volumes/NEWXYZ/macOS_data_mirror/Project/verifyAIweb

請先完整閱讀：

docs/HANDOFF-2026-07-15-DOWNLOAD-CONVERSION-EXECUTION.md
docs/VERIFYAI_DOWNLOAD_CONVERSION_MASTER_PLAN-2026-07-15.md
app.md

接著只執行 Phase 0 Task 0.1：建立所有現行下載路徑清冊。

必須建立：

docs/conversion/STATUS.md
docs/conversion/download-route-inventory.md
docs/conversion/download-route-inventory.csv

重要要求：
- 保留所有無關 staged、unstaged 與 untracked 變更。
- 不要先重寫 Hero 或加入 tracking code。
- 不得把舊版流量混入新版 baseline。
- 每個 production active destination 必須有 live evidence。
- 完成清冊並通過 Task 0.1 驗收後，才把下一個 Task 設為 Phase 1 Task 1.1 Measurement Plan。
```
