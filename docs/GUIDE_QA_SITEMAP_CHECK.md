# R1.3–R1.4 Guide QA & Sitemap 一致性檢查報告

## R1.3 Guide QA 結果
| Guide (Slug) | title | description | canonical | HowTo schema | CTA link | Internal links | 狀態 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **check-fake-profile-photo** | `How to Check If a Profile Picture Is Fake \| VerifyAI Guide` (格式正確) | 與 Quick answer 一致 | `https://verifyai.fork.work/guides/check-fake-profile-photo/` (正確) | 存在，與 `ol` 列表一致 | 指向 App ID `6754511420` (正確) | 首頁 `/` 及 `/#guides` (存在) | OK |
| **find-image-source** | `How to Find the Original Source of an Image \| VerifyAI Guide` (格式正確) | 與 Quick answer 一致 | `https://verifyai.fork.work/guides/find-image-source/` (正確) | 存在，與 `ol` 列表一致 | 指向 App ID `6754511420` (正確) | 首頁 `/` 及 `/#guides` (存在) | OK |
| **google-lens-alternative-iphone** | `A Multi-Engine Google Lens Alternative for iPhone \| VerifyAI Guide` (格式正確) | 與 Quick answer 一致 | `https://verifyai.fork.work/guides/google-lens-alternative-iphone/` (正確) | 存在，與 `ol` 列表一致 | 指向 App ID `6754511420` (正確) | 首頁 `/` 及 `/#guides` (存在) | OK |
| **reverse-image-search-catfish** | `Reverse Image Search for Catfish Checks \| VerifyAI Guide` (格式正確) | 與 Quick answer 一致 | `https://verifyai.fork.work/guides/reverse-image-search-catfish/` (正確) | 存在，與 `ol` 列表一致 | 指向 App ID `6754511420` (正確) | 首頁 `/` 及 `/#guides` (存在) | OK |
| **reverse-image-search-iphone** | `How to Reverse Image Search on iPhone \| VerifyAI Guide` (格式正確) | 與 Quick answer 一致 | `https://verifyai.fork.work/guides/reverse-image-search-iphone/` (正確) | 存在，與 `ol` 列表一致 | 指向 App ID `6754511420` (正確) | 首頁 `/` 及 `/#guides` (存在) | OK |
| **spot-romance-scam-photos** | `How to Spot Photos Used in Romance Scams \| VerifyAI Guide` (格式正確) | 與 Quick answer 一致 | `https://verifyai.fork.work/guides/spot-romance-scam-photos/` (正確) | 存在，與 `ol` 列表一致 | 指向 App ID `6754511420` (正確) | 首頁 `/` 及 `/#guides` (存在) | OK |

### R1.3 額外說明
- **Title 格式**：所有 6 個 guides 的標籤格式均符合 `{title} | VerifyAI Guide`。
- **Description 一致性**：每個 guide 的 description meta 內容皆與頁面內的 `Quick answer` 文字一致。
- **Canonical URL**：所有 guide 的 canonical link 皆正確指向各自的網址，且以 `/` 結尾。
- **HowTo Schema JSON-LD**：皆有嵌入 JSON-LD 格式的 HowTo schema，且 `step` 內容與頁面顯示之 `ol`（有序列表）文字完全一致。
- **App Store CTA 連結**：頁尾及 CTA 區塊的下載連結均正確指向同一個 iOS App ID `6754511420`。
- **Internal Links**：皆包含指向首頁 `/` 的 Header link，以及指向 `/#guides` 的麵包屑（Breadcrumb）導航連結。

---

## R1.4 Sitemap 一致性
- 檔案存在：是 (`public/sitemap.xml`)
- 總 URL 數：11
- 缺失：`https://verifyai.fork.work/ads/us-shorts` (專案中存在 `public/ads/us-shorts.html`，但未列於 sitemap 中)
- 過多：無 (額外包含之非 guide 網頁為 `/privacy`、`/terms`、`/llms.txt`、`/llms-full.txt`，皆屬正常配置網頁)

### sitemap.xml 內之所有 URL 清單：
1. `https://verifyai.fork.work/`
2. `https://verifyai.fork.work/guides/reverse-image-search-iphone/`
3. `https://verifyai.fork.work/guides/find-image-source/`
4. `https://verifyai.fork.work/guides/check-fake-profile-photo/`
5. `https://verifyai.fork.work/guides/reverse-image-search-catfish/`
6. `https://verifyai.fork.work/guides/spot-romance-scam-photos/`
7. `https://verifyai.fork.work/guides/google-lens-alternative-iphone/`
8. `https://verifyai.fork.work/privacy`
9. `https://verifyai.fork.work/terms`
10. `https://verifyai.fork.work/llms.txt`
11. `https://verifyai.fork.work/llms-full.txt`
