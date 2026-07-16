# VerifyAI 下載與轉換優化執行狀態板

此狀態板用於追蹤「VerifyAI 下載與轉換成長企劃」中各 Phase 的執行狀態與進度。

---

## 1. 當前執行狀態

- **當前階段**：Phase 0：止血、盤點與基線保護
- **當前任務**：Phase 0 Task 0.1：建立所有現行下載路徑清冊
- **任務狀態**：`complete` (已完成)

---

## 2. 歷史執行記錄

| Task ID | 任務名稱 | 狀態 | 完成日期 | 交付物 / 備註 |
| :--- | :--- | :--- | :--- | :--- |
| **Task 0.1** | 建立所有現行下載路徑清冊 | `complete` | 2026-07-15 | 建立 `STATUS.md`、`download-route-inventory.md` 與 `download-route-inventory.csv`，完成實際線上驗證。 |

---

## 3. 下一個唯一主任務

> [!IMPORTANT]
> **Phase 1 Task 1.1：建立 `docs/conversion/measurement-plan.md`**
>
> **任務目的**：定義核心追蹤事件與其必要參數（如 `view_landing`、`view_guide` Alexander、`click_app_store`、`click_learn_more`、`view_screenshot`、`redirect_app_store` 等），確保所有下載入口點的點擊事件皆能被精確歸因且區分位置。
>
> **限制條件**：Task 1.1 僅為事件量測規格之規劃與審查，在完成並審查通過前，**不得修改任何追蹤代碼或 Landing Page 事件程式**。

---

## 4. 任務執行回報 (Task 0.1)

```text
Task ID：Phase 0 Task 0.1
狀態：complete
目的：搜尋與盤點 Repo 內所有下載路徑、CTA 元件、轉址與 Google Ads 呼叫，建立下載路徑清冊，區分不同類型，並實際驗證線上重定向狀態，避免新舊流量混雜。
實際修改：
- 新增 docs/conversion/STATUS.md
- 新增 docs/conversion/download-route-inventory.md
- 新增 docs/conversion/download-route-inventory.csv
未修改：
- 未修改任何 Landing Page (SeoLanding.jsx) 文案、排版或功能
- 未修改 any 現行事件追蹤代碼或 Google Ads tag
- 保留所有 unstaged 與 untracked 檔案變更
檔案與 commit：
- docs/conversion/STATUS.md
- docs/conversion/download-route-inventory.md
- docs/conversion/download-route-inventory.csv
驗證命令：
- curl -s -I https://apps.apple.com/us/app/id6754511420
- curl -s -I "https://verifyai.fork.work/go/ads?test=4c52b41"
Live evidence：
- App Store ID 6754511420 有效存在。美區 301 重定向至: https://apps.apple.com/us/app/verifyai-image-search/id6754511420
- 台灣區 301 重定向至: https://apps.apple.com/tw/app/verifyai-%E5%BD%B1%E5%83%8F%E6%90%9C%E5%B0%8B/id6754511420
- 線上 /go/* 轉址正常運作且保留參數。https://verifyai.fork.work/go/ads?test=4c52b41 -> HTTP 302 導向 /?test=4c52b41 -> HTTP 200
結果數據與期間：inconclusive (本任務為靜態盤點，無涉及轉換率數據提升，且點擊事件尚未部署)
已知限制：
- 部分 Generated Guides 的 App Store 連結固定指向美區 (us) storefront，無法針對其他地區訪客進行動態 storefront 切換。
- Legacy 閒置元件 (Hero.jsx, CTA.jsx, Campaign.jsx) 的 App Store 連結仍殘留在原始碼中，但不影響 active 流量。
下一個唯一 Task：Phase 1 Task 1.1：建立 docs/conversion/measurement-plan.md
```
