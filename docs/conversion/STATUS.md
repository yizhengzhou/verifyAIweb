# VerifyAI 下載與轉換優化執行狀態板

---

## 1. 當前執行狀態

- **當前階段**：Phase 1：量測與歸因基礎
- **當前任務**：Phase 1 Task 1.2：實作 CTA tracking helper
- **任務狀態**：`complete`（已部署到 production）
- **下一步**：等待 7 天 tracking baseline 完成後進入 Phase 2

---

## 2. 已完成 Task

| Task ID | 任務名稱 | 狀態 | 完成日期 | 交付物 |
| :--- | :--- | :--- | :--- | :--- |
| **Task 0.1** | 建立所有現行下載路徑清冊 | `complete` | 2026-07-15 | `STATUS.md`, `download-route-inventory.md`, `download-route-inventory.csv` |
| **Task 0.2** | 確認 legacy route 移除與新版量測起點 | `complete` | 2026-07-15 | `/go/ads` 已移除，新版版本界線 `e53af6a` |
| **Task 1.1** | 建立 Measurement Plan | `complete` | 2026-07-15 | `measurement-plan.md`（6 核心事件 + 必填參數） |
| **Task 1.2** | 實作 CTA tracking helper | `complete` | 2026-07-16 | `tracking.js`, `getAppStoreUrl.js`, `SeoLanding.jsx`, `us-shorts.html`，已部署到 production |
| **Task 1.3** | 建立 UTM 與 campaign 命名規範 | `complete` | 2026-07-15 | `campaign-taxonomy.md` |
| **Task 1.5** | 建立 Conversion Dashboard 規格 | `complete` | 2026-07-15 | `dashboard-spec.md` |

---

## 3. 進行中 / 等待中

| Task ID | 任務名稱 | 狀態 | 原因 |
| :--- | :--- | :--- | :--- |
| **Task 0.3** | 保存 baseline | `in_progress` | Tracking 已部署，等待 7 天數據累積（~2026-07-23） |
| **Task 1.4** | 串接 App 與 App Store 結果 | `blocked` | 需要 App 端配合（first_open / first_complete_search） |

---

## 4. 下一個唯一主任務

> **等待 7 天 tracking baseline 完成（預計 2026-07-23）**
>
> Baseline 完成後，下一個 Task：
> **Phase 2 Task 2.1：按意圖分群 — 建立 Audience Intent Map**
>
> 在此之前，可平行準備：
> - 建立 Hypothesis Backlog 草稿
> - 準備 Friction Audit 檢查清單

---

## 5. 已知限制

- ✅ 可比較：CTA CTR 改版前後（網站端）
- ❌ 不可比較：下載量、安裝量、訂閱量（iOS ATT 限制）
- ❌ 不可歸因：App Store Product Page Views、App Units（需 App 端配合）
- Tracking 部署 commit：`a84a0b2`
- Production tracking 生效日：2026-07-16
- Baseline 文件：`docs/conversion/baselines/2026-07-16-web-baseline.md`