# VerifyAI Landing Page — 網站端 Baseline

> 建立日期：2026-07-16
> 版本界線：commit `a84a0b2`（tracking 部署）
> 時區：Asia/Taipei
> 資料源：GA4 網站端事件（`view_landing`、`click_app_store`）
> ⚠️ 限制：此 baseline 只反映網站端 CTA 效率，不反映 App Store 轉換或下載量（iOS ATT 限制，UTM 無法追蹤到安裝與訂閱）

---

## 填寫規則

1. 部署 tracking 後開始計時
2. 第 7 天填寫以下數據
3. 如果 tracking 部署時間不是整日，從部署後第一個完整日曆日開始計算
4. 所有數據必須標註來源與匯出時間

---

## Baseline 數據

| 指標 | 值 | 註解 |
|------|-----|------|
| 期間 | 2026-07-XX ~ 2026-07-XX（7 天） | 填實際日期 |
| 總造訪（`view_landing`） | | |
| 總造訪（`view_guide`） | | |
| Hero CTA 點擊數（`rt_home_hero`） | | |
| Bottom CTA 點擊數（`rt_home_bottom`） | | |
| Footer CTA 點擊數（`rt_footer_changelog`） | | |
| 指南 CTA 點擊數（`rt_guide_*`） | | |
| Hero CTA CTR | | 點擊 / 首頁造訪 |
| Bottom CTA CTR | | 點擊 / 首頁造訪 |
| 指南 CTA CTR | | 點擊 / 指南造訪 |
| 流量來源：organic | | |
| 流量來源：direct | | |
| 流量來源：social | | |
| 流量來源：referral | | |
| 語言：zh-TW 佔比 | | |
| 語言：en 佔比 | | |
| 語言：ja 佔比 | | |
| 語言：ko 佔比 | | |
| 裝置：mobile 佔比 | | |
| 裝置：desktop 佔比 | | |

## 已知限制

- ✅ 可比較：CTA CTR 改版前後
- ❌ 不可比較：下載量、安裝量、訂閱量
- ❌ 不可歸因：App Store Product Page Views、App Units
- ❌ 不可比較：不同 tracking 實作方式之間的數據（如舊版無 tracking 的歷史數據）

## 追蹤部署驗證

- [ ] tracking.js 在 production bundle 中（build 驗證）
- [ ] GA4 收到 `view_landing` 事件（實機驗證）
- [ ] GA4 收到 `click_app_store` 事件（實機點擊驗證）
- [ ] 每個 CTA 的 `cta_id` 參數正確（GA4 DebugView 驗證）
- [ ] Ad blocker 下 CTA 仍可正常導向 App Store

## 版本紀錄

| 日期 | 版本 | 變更 |
|------|------|------|
| 2026-07-16 | v1 | 首次建立（空白，等待 7 天數據） |