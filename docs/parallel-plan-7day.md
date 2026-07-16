# VerifyAI — 7 天 Baseline 等待期平行計畫

> 建立日期：2026-07-16
> 背景：Phase 1 已完成（tracking 部署 + measurement plan + 命名規範 + dashboard spec）
> 等待：7 天 tracking baseline 數據（~2026-07-23 可填寫）
> 原則：不等待，不平躺。以下工作可平行執行，不影響 baseline 累積。

---

## 1. 為什麼不等 7 天

Tracking 在 production 上線後，數據自動累積。不需要人坐在旁邊等。這 7 天可以做三件事：

1. **準備 Phase 2 的研究材料** — 讓 baseline 一填完就能直接開始，不用再花時間準備
2. **驗證 tracking 品質** — 前 48 小時最重要，確保事件正確再離開
3. **建立實驗 infrastructure** — 實驗格式、hypothesis backlog、friction audit 檢查清單

---

## 2. 前 48 小時：Tracking QA（D+0 ~ D+2）

**目的**：確認 tracking 真的在 production 上正常運作，不要等到第 7 天才發現事件沒收到。

### 2.1 實機驗證（1 小時）

| 檢查項目 | 方法 | 通過標準 |
|---------|------|---------|
| `view_landing` 事件 | 用手機打開 verifyai.fork.work，檢查 GA4 DebugView | 事件出現，page_variant 正確 |
| `click_app_store` Hero CTA | 點擊 Hero 下載按鈕 | 事件出現，cta_id = rt_home_hero |
| `click_app_store` Bottom CTA | 滾到底部點擊 | 事件出現，cta_id = rt_home_bottom |
| Ad blocker 測試 | 在啟用 ad blocker 的瀏覽器點擊 CTA | 仍可正常導向 App Store |
| 參數完整性 | 檢查每個事件的所有必填參數 | 無 null / undefined 參數 |

### 2.2 Console Error 檢查（0.5 小時）

```bash
# 在 production 頁面檢查 console errors
# 檢查 tracking.js 是否正確載入
# 檢查 gtag 是否正確初始化
```

### 2.3 修復（如有錯誤）

如果 tracking 有問題，立即修正並重新部署。修正後重新計時 48 小時。

---

## 3. 7 天內可平行執行的工作

### Task A：建立 Audience Intent Map 草稿（預計 4 小時）

**不須 baseline 即可開始**。Intent map 是對使用者的質性研究，不需要 tracking 數據。

**做法**：
1. 從 download-route-inventory.md 的 6 個 guide pages 出發
2. 每個 guide 對應一個搜尋意圖：
   - `search-iphone-photo` → 使用者想查一張照片的來源
   - `catfish-instagram` → 使用者懷疑交友照片是假的
   - `reverse-image-search-iphone` → 使用者知道工具類別在比較
   - `scam-image-verification` → 使用者被騙或差點被騙後想自保
3. 為每個 segment 記錄：
   - 使用者真正想完成的事
   - 主要疑慮（為什麼會猶豫不下載）
   - Landing Page 目前是否滿足

**交付物**：`docs/conversion/audience-intent-map.md`（草稿，可在 baseline 完成後更新）

### Task B：建立 Friction Audit 檢查清單（預計 2 小時）

**做法**：
1. 從手機打開 Landing Page，逐區塊回答：
   - 第一眼是否知道這是 iPhone App？
   - 是否知道要提供什麼照片、會得到什麼？
   - 「4 個搜尋來源」對使用者是利益還是技術名詞？
   - 是否清楚免費 3 次與免帳號的條件？
   - 是否有足夠信任證據，而不是只有產品自述？
   - 截圖是否能在手機尺寸看懂？
   - CTA 是否在高意圖時刻出現？
2. 每個 friction 記錄：證據、受影響 segment、漏斗階段、嚴重度

**交付物**：`docs/conversion/friction-audit.md`（格式建立，內容可逐步補）

### Task C：建立 Hypothesis Backlog 格式（預計 1 小時）

**做法**：
1. 建立 standard hypothesis template：

```markdown
## H-{NNN}：{簡短假設名稱}

**因為我們觀察到**：{來自 friction audit 或 intent map 的證據}
**如果我們**：{具體的修改}
**預期會改善**：{主要指標}
**主要指標**：{CTA CTR / 滾動深度 / 等}
**護欄指標**：{App Store CVR / bounce rate / 等}
**適用受眾**：{segment 名稱}
**所需樣本/期間**：{每個 variant 200 clicks / 14 天}
**實作成本**：{低/中/高}
**風險**：{低/中/高}
```

2. 建立 3–5 個初始假設（即使還不確定，先寫下來，等 baseline 完成後再驗證）

**交付物**：`docs/conversion/hypothesis-backlog.md`

### Task D：Tracking 健康檢查 Cron（預計 1 小時）

**做法**：
1. 建立一個 cron job，每天檢查：
   - GA4 在過去 24 小時內是否有收到 `click_app_store` 事件
   - 如果連續 24 小時歸零但網站正常，發 Telegram 告警
2. 這是為了防止「以為 tracking 在跑，但其實已經壞了一週」

**交付物**：Hermes cron job 設定

---

## 4. 時間軸

| 時間 | 工作 | 誰做 |
|------|------|------|
| D+0（今天） | 部署 tracking ✅ | 已完成 |
| D+0 ~ D+2 | Tracking QA（實機驗證、console error） | 執行 agent |
| D+0 ~ D+7 | Task A：Audience Intent Map 草稿 | 執行 agent |
| D+0 ~ D+7 | Task B：Friction Audit 檢查清單 | 執行 agent |
| D+0 ~ D+1 | Task C：Hypothesis Backlog 格式 | 執行 agent |
| D+0 ~ D+1 | Task D：Tracking 健康檢查 cron | 執行 agent |
| **D+7（~7/23）** | **填寫 baseline 數據** | 執行 agent |
| D+7 | Baseline 完成 → Gate 通過 → 進入 Phase 2 | 執行 agent |

---

## 5. 不可做的事

- ❌ 不修改 Hero 文案（沒有 baseline 無從比較）
- ❌ 不開始 A/B test（沒有 baseline 無從比較）
- ❌ 不開付費廣告（paid readiness gate 未通過）
- ❌ 不重寫 Landing Page 設計（Phase 3 的事）

---

## 6. 交付物清單

| 檔案 | 狀態 | 預計完成 |
|------|------|---------|
| `docs/conversion/audience-intent-map.md` | ⬜ 未開始 | D+7 |
| `docs/conversion/friction-audit.md` | ⬜ 未開始 | D+7 |
| `docs/conversion/hypothesis-backlog.md` | ⬜ 未開始 | D+1 |
| Tracking 健康檢查 cron | ⬜ 未開始 | D+1 |
| `docs/conversion/baselines/2026-07-16-web-baseline.md` | ✅ 已建立（空白） | D+7 填寫 |

---

*2026-07-16 · VerifyAI 7-Day Parallel Plan v1.0*