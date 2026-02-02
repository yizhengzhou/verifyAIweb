# VerifyAI Landing Page

**深度反向圖片搜尋** ｜ Deep Reverse Image Search

VerifyAI 是一款 AI 驅動的圖片真偽驗證工具，專為保護用戶免受網路詐騙而設計。本專案為 VerifyAI 的官方 Landing Page。

**App Store**: [下載 VerifyAI](https://apps.apple.com/tw/app/verifyai-%E5%BD%B1%E5%83%8F%E6%90%9C%E5%B0%8B/id6754511420)

---

## 技術架構

| 項目 | 說明 |
|------|------|
| 框架 | React 18 |
| 建置工具 | Vite 6 |
| 多語系統 | 自製 Context-based i18n（zh-TW / en / ja / ko） |
| 樣式 | 純 CSS（遵循品牌指南） |
| 部署 | Cloudflare Pages |

## 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置 production 版本
npm run build

# 預覽建置結果
npm run preview
```

## 專案結構

```
├── index.html                  # Vite 入口（含 SEO meta、JSON-LD）
├── vite.config.js
├── package.json
├── public/
│   ├── logov2.png              # 品牌 Logo
│   ├── sitemap.xml
│   ├── robots.txt
│   └── locales/                # i18n 翻譯檔
│       ├── zh-TW.json
│       ├── en.json
│       ├── ja.json
│       └── ko.json
└── src/
    ├── main.jsx                # React 入口
    ├── App.jsx                 # 主元件（組裝所有區段）
    ├── index.css               # 全站樣式（品牌指南色彩系統）
    ├── context/
    │   └── I18nContext.jsx     # 多語系統 Provider + useI18n hook
    └── components/
        ├── Navbar.jsx          # 固定導覽列 + 語言切換
        ├── Hero.jsx            # 主視覺 + App Store CTA
        ├── Features.jsx        # 4 張應用場景卡片
        ├── HowItWorks.jsx      # 3 步驟流程
        ├── Technology.jsx      # 3 張核心技術卡片
        ├── Mission.jsx         # 使命宣言（深色背景）
        ├── Testimonials.jsx    # 3 則證言卡片
        ├── Campaign.jsx        # Email 訂閱 + 社群分享
        ├── FAQ.jsx             # 9 題手風琴式 FAQ
        ├── CTA.jsx             # 最終行動呼籲
        └── Footer.jsx          # 品牌資訊 + 客服信箱 + 法律連結
```

## 頁面區段

| # | 區段 | 說明 |
|---|------|------|
| 1 | Nav | 固定導覽列，支援手機漢堡選單 |
| 2 | Hero | 品牌主視覺，CTA 連結至 App Store |
| 3 | Features | 約會軟體 / 社群媒體 / 商業往來 / 線上購物 |
| 4 | How It Works | 遇到可疑照片 → 分享至 VerifyAI → 獲得報告 |
| 5 | Technology | 反向圖片搜索 / 元數據分析 / 人臉比對 |
| 6 | Mission | 使命宣言，說明 VerifyAI 存在的意義 |
| 7 | Testimonials | 專家、受害者、團隊三方真實聲音 |
| 8 | Campaign | Email 訂閱取得兌換碼 + LINE / Facebook / X 分享 |
| 9 | FAQ | 9 題常見問題，涵蓋隱私、原理、方案差異、侷限等 |
| 10 | CTA | 最終下載呼籲 |
| 11 | Footer | 產品連結、隱私政策、客服信箱、© 2026 |

## 品牌指南

本專案嚴格遵循 VerifyAI Brand Guidelines v1.0：

**色彩系統**

| 名稱 | 色碼 | 用途 |
|------|------|------|
| Brand Teal | `#00CFA0` | 主要行動按鈕、Logo「AI」字樣 |
| Amber Glow | `#FFD96A` | 強調色 |
| Graphite Gray | `#444A53` | 主要文字 |
| Frost White | `#F7F8F8` | 淺色背景 |
| Deep Night | `#0A0A0A` | 深色區段背景 |

**字型系統**

| 語言 | 主要字型 |
|------|----------|
| English | Inter |
| 繁體中文 | Noto Sans TC |
| 日本語 | Noto Sans JP |

**品牌語調**：同理心優先、陳述事實不製造恐慌、建議而非命令、誠實但不過度承諾。

## 多語系統

透過 React Context 實現，支援：

- **繁體中文**（zh-TW）— 預設語言
- **English**（en）
- **日本語**（ja）
- **한국어**（ko）

系統會自動偵測瀏覽器語言，並將偏好儲存於 localStorage。

```jsx
// 在元件中使用
import { useI18n } from '../context/I18nContext'

function MyComponent() {
  const { t, lang, changeLanguage } = useI18n()
  return <h1>{t('hero.title')}</h1>
}
```

## SEO

- Open Graph + Twitter Card meta 標籤
- JSON-LD 結構化資料：`Organization`、`SoftwareApplication`、`FAQPage`
- `sitemap.xml` + `robots.txt`
- `<link rel="canonical">`
- 語義化 HTML + `aria-label`

## 待辦事項

- [ ] Campaign 區段：整合 Mailchimp / Brevo API（目前為模擬模式）
- [ ] Apple Promo Code 兌換機制
- [ ] 確認正式網域後更新 canonical URL / og:url
- [ ] 新增 App 截圖輪播至 Hero 區段

## 聯絡方式

- **客服信箱**: verifyai.image.search@gmail.com
- **隱私政策**: https://yizhengzhou.github.io/verifyai-legal
