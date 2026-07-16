# VerifyAI 下載與轉換優化執行狀態板

---

## 1. 當前執行狀態

- **狀態重建日期**：2026-07-16
- **當前階段**：Phase R0：Reality Recovery
- **當前任務**：R0.1：重建真實狀態板與事件 evidence matrix
- **任務狀態**：`in_progress`
- **最新計劃**：[`../VERIFYAI_CODEBASE_REALIGNMENT_PLAN-2026-07-16.md`](../VERIFYAI_CODEBASE_REALIGNMENT_PLAN-2026-07-16.md)

> 2026-07-16 審查發現：repo 未見 GA4 destination 或 dashboard 實體，且原先列出的 baseline 文件不存在。下列歷史 `complete` 不能全部視為 production verified。

> **Git 整合不是阻塞條件：** 舊 `f280e30` 的必要 tracking 內容已由 `a84a0b2` 安全整合進 `origin/main`。不要再 merge/rebase 該舊分支；請以最新 `origin/main` 為基線，依最新計劃繼續工作。完成後留下完整證據與交接，等待 owner 安排獨立審核。
>
> **分支清理 gate：** `origin/main-conversion-tracking` 僅暫留至獨立審核完成。確認 `a84a0b2` 已承接必要內容後，應刪除舊 remote branch，避免後續誤操作。

---

## 2. 歷史宣稱（尚待 R0.1 重新驗證）

| Task ID | 任務名稱 | 狀態 | 完成日期 | 交付物 |
| :--- | :--- | :--- | :--- | :--- |
| **Task 0.1** | 建立所有現行下載路徑清冊 | `complete` | 2026-07-15 | `STATUS.md`, `download-route-inventory.md`, `download-route-inventory.csv` |
| **Task 0.2** | 確認 legacy route 移除與新版量測起點 | `complete` | 2026-07-15 | `/go/ads` 已移除，新版版本界線 `e53af6a` |
| **Task 1.1** | 建立 Measurement Plan | `spec_only` | 2026-07-15 | `measurement-plan.md`（6 核心事件 + 必填參數） |
| **Task 1.2** | 實作 CTA tracking helper | `implemented_unverified` | 2026-07-16 | `tracking.js`, `getAppStoreUrl.js`, `SeoLanding.jsx`, `us-shorts.html`；部署不等同收件驗證 |
| **Task 1.3** | 建立 UTM 與 campaign 命名規範 | `spec_only` | 2026-07-15 | `campaign-taxonomy.md` |
| **Task 1.5** | 建立 Conversion Dashboard 規格 | `spec_only` | 2026-07-15 | `dashboard-spec.md`；不是 dashboard 實體 |

---

## 3. 進行中 / 等待中

| Task ID | 任務名稱 | 狀態 | 原因 |
| :--- | :--- | :--- | :--- |
| **Task 0.3** | 保存 baseline | `not_started` | 尚未證明 analytics destination 收到完整事件，不能開始有效等待期 |
| **Task 1.4** | 串接 App 與 App Store 結果 | `blocked_external_access` | 需要 ASC 與 App 端資料（first_open / first_complete_search） |

---

## 4. 下一個唯一主任務

> **R0.1：完成事件 evidence matrix，逐項區分 spec、code、production receipt 與 external access。**

### 4.1 重建後的暫定狀態

| 工作 | 狀態 | 說明 |
| --- | --- | --- |
| Task 0.1 download inventory | `complete_verified` | 有 Markdown/CSV 與當時 live evidence |
| Task 0.2 legacy route | `complete_verified` | `/go/*` 已回首頁，需防回歸 |
| Task 1.1 measurement plan | `spec_only` | 規格存在，不等同 production 收件 |
| Task 1.2 tracking helper | `implemented_unverified` | 首頁兩 CTA 已接；guides/FAQ/screenshots 未完整覆蓋 |
| Task 1.3 campaign taxonomy | `spec_only` | 文件存在，未見完整回寫證據 |
| Task 1.4 ASC/App 串接 | `blocked_external_access` | repo 內無 ASC/activation 證據 |
| Task 1.5 dashboard | `spec_only` | 只有規格，沒有 dashboard 實體 |
| Task 0.3 baseline | `not_started` | 所指 baseline artifact 不存在 |

---

## 5. 已知限制

- ⚠️ 尚不可比較：未先證明 analytics destination 正在接收完整事件
- ❌ 不可比較：下載量、安裝量、訂閱量（iOS ATT 限制）
- ❌ 不可歸因：App Store Product Page Views、App Units（需 App 端配合）
- Tracking 部署 commit：`a84a0b2`
- Production tracking 生效日：2026-07-16
- 原先宣稱的 baseline 文件 `docs/conversion/baselines/2026-07-16-web-baseline.md` 目前不存在，不得引用為證據
