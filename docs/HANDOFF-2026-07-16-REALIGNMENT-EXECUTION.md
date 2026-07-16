# VerifyAI 下一階段執行交接

日期：2026-07-16

## 先讀

依序閱讀：

1. `docs/VERIFYAI_CODEBASE_REALIGNMENT_PLAN-2026-07-16.md`
2. `docs/conversion/STATUS.md`
3. `docs/VERIFYAI_DOWNLOAD_CONVERSION_MASTER_PLAN-2026-07-15.md`

## 現在執行

下一個唯一任務是 **Phase R0.1**：建立事件 evidence matrix，逐項區分：

- `spec_only`
- `implemented_unverified`
- `complete_verified`
- `blocked_external_access`

每個事件需記錄 code location、analytics destination、production receipt、QA evidence 與限制，並更新 `docs/conversion/STATUS.md`。

## 重要限制

- Git 整合問題已解除；以最新 `origin/main` 為基線繼續工作。
- 不要 merge、rebase 或 cherry-pick 舊 `f280e30`。
- 不要先改 Hero、增加 guides、做 A/B test 或再寫 dashboard 規格。
- 檔案存在、build 或 deploy 成功都不等於 production 已驗證。
- 缺少 GA4、ASC 或 App analytics 權限時，記為 `blocked_external_access`，不得假設完成。
- 保留其他人的工作，不清理無關變更。

## 完成條件

完成 R0.1 後提交：

- 更新後狀態板
- event evidence matrix
- 驗證命令與結果
- production evidence 或明確 blocker
- 下一個唯一任務

完成後停止擴張範圍，等待 owner 安排獨立審核。

## 給 Agent 的提示詞

> 請閱讀 `docs/HANDOFF-2026-07-16-REALIGNMENT-EXECUTION.md`，依照其中順序與限制完成目前唯一任務。除非遇到需要 owner 權限或決策的真正阻塞，否則請持續執行到完成並留下交接證據。
