# VerifyAI CodeBase 與原始主規劃對齊審查暨續作計劃

日期：2026-07-16

審查基準：目前 `main`（`a84a0b2`）、原始 SEO/AEO/GEO 規劃、後續下載轉換主企劃、實際 React/Cloudflare/static guide 實作

文件角色：自 2026-07-16 起的 repo reality 與下一階段執行入口

## 0. 給執行 Agent 的 Git 提示：整合問題已解除，請繼續工作

> **不要因舊分支 `f280e30` 尚未 merge 而暫停。** Tracking 工作已經從該混合分支安全抽出，並以乾淨 commit `a84a0b2` 整合進正式主線；目前本地 `main` 與 `origin/main` 已同步。舊的 `origin/main-conversion-tracking` 僅作歷史備份，不是待 merge 的工作。

執行規則：

1. 不要 merge、rebase 或 cherry-pick 整個 `f280e30`；它包含大量與 tracking 無關的 blog、i18n 與 generator 差異。
2. 以目前最新 `origin/main` 為唯一開發基線，保留工作區內既有且與本計劃相關的文件變更。
3. 依本規劃書與 `docs/conversion/STATUS.md` 持續執行，不需要等待舊分支整合。
4. 每完成一項工作，必須留下實際修改、驗證命令、production evidence、已知限制與下一步；不得以 commit、push 或 build 成功單獨宣稱完成。
5. 完成本輪規劃工作後停止擴張範圍並提交完整交接。專案 owner 會再安排獨立審核，因此執行 Agent 不需要自行宣告整體計劃已通過最終驗收。
6. `origin/main-conversion-tracking` 只保留到本輪獨立審核確認 `a84a0b2` 已完整承接必要 tracking 內容；審核通過後應刪除該 remote branch，避免未來誤 merge。刪除前不得把它當成新工作的基線。

## 1. 審查結論

目前 CodeBase **沒有在產品方向上大幅背離原始計劃**。原始要求的首頁結構、App Store 素材、6 個搜尋意圖 guide、FAQ 深連結、structured data、sitemap、`llms.txt` 與直接下載 CTA，大部分已實作。

真正需要修正的不是退回重做，而是：

1. **狀態文件超前於證據。** `STATUS.md` 把 tracking、campaign taxonomy、dashboard spec 標為 complete，並宣稱正等待 7 天 baseline；但 repo 內沒有它所指的 baseline 文件，也沒有 GA4 destination/dashboard 實體或 production receipt 證據。
2. **量測規格超前於實作。** 首頁兩個 CTA 有 helper，但 guides、FAQ Learn More、screenshots 未按規格上報；Smart App Banner 也有不可追蹤限制。
3. **SEO/AEO/GEO 只完成第一層。** 技術基礎已存在，但語言/metadata 一致性、guide quality gate、真實搜尋成效與轉換閉環仍未完成。

決策：**保留 SEO-first landing page 與合理的後期工作；先執行 Reality Recovery，讓文件、事件、production evidence 一致，再回到原計劃的受眾研究與受控實驗。**

## 2. 原始主規劃對照

| 原始要求 | CodeBase 現況 | 判定 | 處置 |
| --- | --- | --- | --- |
| App Store 資料與素材 | `app.md`、icon、5 張 screenshots | 已完成 | 保留，補來源更新責任 |
| hero/download/screenshots/how/guides/FAQ/CTA/footer | `SeoLanding.jsx` 全部具備 | 已完成 | 不回滾 |
| 每個核准 keyword 一頁 guide | generator 產生 6 個英文 guides | 第一批完成 | 先驗證，不擴張薄內容 |
| FAQ + Learn More | 5 題連至 guides | 基礎完成 | 補 tracking、語言與 schema 決策 |
| SEO technical baseline | canonical、OG、SoftwareApplication、HowTo、sitemap | 大致完成 | 修語言訊號與自動檢查 |
| AEO/GEO | `llms.txt`、JSON APIs、Markdown middleware | 基礎完成 | 驗證一致性；不把開放 crawler 當成被引用證據 |
| 多語 landing | UI 支援 zh-TW/en/ja/ko | 部分完成 | 主頁主要 copy 只有 en/zh-TW，ja/ko fallback 英文 |
| CTA attribution | 首頁兩個 CTA 與 paid page 有事件 | 部分完成 | 先確認真正 analytics destination，再補覆蓋 |
| GA4/dashboard | 只有規格文字 | 未證實 | 不得列為完成 |
| baseline/experiment | 無實際數字或實驗 artifact | 未完成 | Recovery 後開始 |
| ASC → activation | 無 ASC/first search 接線證據 | 未完成、跨 repo | 需外部資料與 owner |

## 3. 應保留的合理演進

- SEO-first `SeoLanding` 與使用者信任限制文案。
- App Store ID `6754511420` 與 locale storefront helper。
- 移除舊 `/go/ads` 直跳路徑，隔離舊 baseline。
- download inventory、measurement plan、campaign taxonomy、dashboard spec。
- `llms.txt`、AI-readable APIs 與 crawler policy。

這些都與原始 SEO/AEO/GEO + conversion 目標相容。「回到原計劃」不代表刪除它們。

## 4. 必須修正的差異

### P0：文件真實性

- `STATUS.md` 宣稱 Task 1.2 已部署並等待 baseline，但 `docs/conversion/baselines/2026-07-16-web-baseline.md` 不存在。
- dashboard 目前是規格文件，不是可使用 dashboard。
- 文件應把狀態拆成 `spec_only`、`implemented_unverified`、`complete_verified`、`blocked_external_access`，不能以檔案存在代表完成。
- 舊 handoff 保留為歷史證據，但新 Agent 應從本文件與更新後 `STATUS.md` 開始。

### P0：量測 destination 與事件覆蓋

`trackEvent()` 會呼叫 `window.gtag('event', ...)`，但 `index.html` 只設定 Google Ads `AW-18226736945`。repo 未發現 GA4 `G-...` Measurement ID、GA4 property record、custom dimensions 或 dashboard 實體。因此不能宣稱 GA4 正在累積可用 baseline。

事件實況：

- 首頁 hero/bottom：已有 `click_app_store`。
- guides：無 `view_guide`；header/bottom CTA 無 canonical event 或 `ct` route ID。
- FAQ Learn More：無 `click_learn_more`。
- screenshots：無 `view_screenshot`。
- paid landing：獨立 inline 實作，未證明與 helper 的參數/去重完全一致。
- Smart App Banner：原生行為無法由目前 helper 完整量測，inventory 應明示限制。

### P1：語言與 SEO 訊號

初始 HTML 是 `lang="zh-TW"`、`og:locale=zh_TW`，但 title/description 是英文；client-side 才切換部分 metadata。ja/ko 使用者在新 landing 的主 copy 也會 fallback 英文。crawler 或不執行 JS 的 agent 可能看到互相衝突的訊號。

應二選一：

1. 建議：建立真正可索引的 locale URLs，提供 server/static metadata、canonical 與 hreflang；或
2. 過渡：首頁先採英文唯一 canonical 與 `lang=en`，語言切換只作 UX，直到 locale URLs 完成。

### P1：Guide quality 與驗證能力

6 個 guides 是合理的第一批，但 generator 將資料、模板與 CSS 放在單一大型字串，且缺少 updated/owner、相關內容 journey、canonical tracking，以及 title/canonical/schema/broken-link 自動驗證。應先改善 generator 與 quality gate，不應立即大量生成近義關鍵字頁。

目前 `npm run build` 成功，但 repo 沒有 test 或 SEO/tracking validation script。Build 不能證明事件收件、structured data 正確、mobile UX 合格或 live deployment 正確。

## 5. 新執行計劃

### Phase R0：Reality Recovery（下一個唯一階段）

#### R0.1 重建真實狀態板

- 更新 `STATUS.md`，逐 Task 標記 `spec_only / implemented_unverified / complete_verified / blocked_external_access`。
- 建立「事件 → code location → destination → QA evidence」矩陣。
- 將舊 handoff 標為 historical 並指向本文件。

驗收：只讀狀態板即可分辨文件、程式與 production evidence。

#### R0.2 確認 analytics destination

需要人類確認 GA4 property、Measurement ID、存取權與 custom dimensions 權限。

- 若已有 GA4：接線並用 DebugView/Realtime/Tag Assistant 留下 production-like QA 證據。
- 若沒有：標為 `blocked_external_access`；保留 Google Ads conversion，但不得假造 GA4 baseline。

驗收：同一 QA session 可觀察一次 `view_landing` 與一次 `click_app_store`，參數完整且不重複。

#### R0.3 補齊 canonical events

只有 R0.2 有有效 destination 後才做：guide view、guide header/bottom CTA、FAQ Learn More、screenshot visibility，以及 paid page schema 對齊；同步更新 inventory/generator。

#### R0.4 核准語言 URL 策略

建立一頁 ADR，記錄 URL、canonical、hreflang、metadata、guide locale 與 fallback。每個可索引 URL 必須只有一套不衝突的語言訊號。

### Phase R1：Verification & Quality Gate

加入最小 deterministic checks：

1. build；
2. active App Store links 的 App ID/route ID；
3. guide title、description、canonical、HowTo schema 與 internal links；
4. sitemap 與實際頁面一致；
5. 無 evidence 的 task 不得標 complete。

另做 mobile 360/390px、desktop、鍵盤與基本 structured-data/live QA，結果寫入 repo。

### Phase 2：回到原主計劃

R0/R1 通過後，執行原主企劃 Task 2.1–2.3：Audience Intent Map、Friction Audit、Hypothesis Backlog。沒有 Search Console/GA4/ASC 真實資料時可以列假設，但不得填假數字排序。

### Phase 3：第一個受控 Landing Page 實驗

保留目前 Hero 作 control。第一個 variant 只測一個訊息變數，不同時改截圖、價格、CTA 顏色與 App Store page。主要指標為 qualified CTA CTR；ASC 可對照時再加入 install guardrail。

### Phase 4：Guide conversion 與內容擴張

先替現有 6 頁建立 brief、CTA journey 與基線。只有具獨立搜尋意圖、來源/owner、非 thin duplicate 且可量測，才新增下一個 keyword guide。

### Phase 5–7：維持原順序

網站漏斗可判讀後，依序進行 App Store message-match/PPO/CPP、App activation、paid scaling。這些跨 ASC/App repo；沒有權限、資料或 owner 時必須標 blocked。

## 6. 下一個 Agent 的唯一任務

> 執行 R0.1：完成真實狀態板與事件 evidence matrix。不要先改 Hero、增加 guides、做 A/B test 或再寫 dashboard 規格。

R0.1 後需要使用者確認兩件事：GA4 destination 與多語 URL 策略。在此之前可做 read-only inventory 與 deterministic validation，不應宣稱量測閉環完成。

Git 提醒：`f280e30` 不再是阻塞條件。請直接在最新 `origin/main` 的基礎上依序完成本計劃；完成後交付證據並等待 owner 安排獨立審核。

## 7. 本次驗證邊界

- `npm run build` 通過，產生 6 guides，Vite bundle 成功。
- build 未產生未提交差異。
- 未發現 GA4 `G-...` Measurement ID。
- 已確認 guides/FAQ/screenshots 缺少規格所列事件。
- 本次沒有 Analytics、Search Console 或 ASC 存取，因此不宣稱排名、下載或轉換提升。
