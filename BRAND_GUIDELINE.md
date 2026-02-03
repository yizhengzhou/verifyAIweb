# VerifyAI Brand Guidelines
# VerifyAI 品牌指南

**Version**: 1.0
**Last Updated**: 2026-01-31
**Status**: Active
**Applicable To**: All marketing materials, landing pages, App Store assets, social media

---

## Table of Contents

1. [Brand Overview / 品牌概述](#1-brand-overview--品牌概述)
2. [Logo System / 標誌系統](#2-logo-system--標誌系統)
3. [Color Palette / 色彩系統](#3-color-palette--色彩系統)
4. [Typography / 字型系統](#4-typography--字型系統)
5. [Brand Voice / 品牌語調](#5-brand-voice--品牌語調)
6. [Iconography & Imagery / 圖標與圖像](#6-iconography--imagery--圖標與圖像)
7. [Application Guidelines / 應用規範](#7-application-guidelines--應用規範)
8. [Do's and Don'ts / 規範與禁忌](#8-dos-and-donts--規範與禁忌)

---

## 1. Brand Overview / 品牌概述

### Brand Identity / 品牌識別

| Element | Content |
|---------|---------|
| **Brand Name** | VerifyAI |
| **Tagline (EN)** | Deep reverse image search |
| **Tagline (繁中)** | 深度反向圖片搜尋 |
| **Tagline (日本語)** | ディープ逆画像検索 |

### Brand Essence / 品牌精神

VerifyAI 是一款 AI 驅動的圖片真偽驗證工具，專為保護用戶免受網路詐騙而設計。我們的核心價值是：

| Value | EN | 繁中 | 日本語 |
|-------|-----|------|--------|
| **Empathy** | Compassionate support without judgment | 同理心支持，不批判 | 批判なき思いやりのサポート |
| **Transparency** | Clear, honest information | 透明誠實的資訊 | 明確で誠実な情報 |
| **Empowerment** | Tools to make informed decisions | 賦權用戶自主判斷 | 情報に基づいた判断のためのツール |

### Target Audience / 目標用戶

- **Primary**: 50-70 歲網路交友用戶（需要驗證對方身份）
- **Secondary**: 內容創作者（檢查圖片版權）
- **Tertiary**: 新聞工作者、事實查核者

### Brand Personality / 品牌個性

```
專業 Professional ━━━━━━━━●━━ 親切 Friendly
嚴肅 Serious      ━━━━━━●━━━━ 輕鬆 Casual
權威 Authoritative ━━━━━━━●━━━ 平易近人 Approachable
科技感 Techy      ━━━━━━━━●━━ 人性化 Human-centric
```

---

## 2. Logo System / 標誌系統

### 2.1 Primary Logo / 主標誌

**Location**: `frontend/app/assets/icon.png`

The primary logo features a clever detective silhouette with a diagonal verification slash, creating negative space that reveals a second profile—symbolizing the act of unmasking and revealing truth.

主標誌為偵探側臉剪影，搭配對角線驗證斜線，在負空間中呈現第二個輪廓——象徵揭露真相與驗證身份。

```
┌─────────────────────────────────────┐
│                                     │
│       [Detective silhouette         │
│        with verification slash      │
│        in Brand Teal #00CFA0]       │
│                                     │
│   Asset: frontend/app/assets/       │
│          icon.png (1024x1024)       │
│                                     │
└─────────────────────────────────────┘
```

### 2.2 Wordmark / 文字標誌

**Format**: Verify + AI

| Part | Style | Color |
|------|-------|-------|
| **Verify** | Inter SemiBold | #444A53 (Graphite Gray) |
| **AI** | Inter SemiBold | #00CFA0 (Brand Teal) |

```
Light Background:    Verify[AI]
                     ─────  ──
                     Gray   Teal

Dark Background:     Verify[AI]
                     ─────  ──
                     White  Teal
```

### 2.3 Logo Variations / 標誌變體

| Variation | Use Case | Files Needed |
|-----------|----------|--------------|
| **Icon Only** | App icon, favicon | `icon.png` ✅ |
| **Wordmark Only** | Text-heavy layouts | Need to create |
| **Icon + Wordmark (Horizontal)** | Landing page header | Need to create |
| **Icon + Wordmark (Vertical)** | App Store, splash | Need to create |
| **Monochrome (White)** | Dark backgrounds | Need to create |
| **Monochrome (Black)** | Print, stamps | Need to create |

### 2.4 Clear Space / 安全空間

Minimum clear space around the logo = 25% of logo height (X)

```
        ┌───X───┐
        │       │
    X   │ LOGO  │   X
        │       │
        └───X───┘
```

### 2.5 Minimum Size / 最小尺寸

| Format | Minimum Size |
|--------|--------------|
| **Digital (icon only)** | 32 x 32 px |
| **Digital (with wordmark)** | 120 px width |
| **Print** | 15 mm width |

---

## 3. Color Palette / 色彩系統

### 3.1 Primary Colors / 主色

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Brand Teal** | `#00CFA0` | 0, 207, 160 | Primary actions, logo "AI", success states |
| **Amber Glow** | `#FFD96A` | 255, 217, 106 | Accents, highlights, premium features |

### 3.2 Neutral Colors / 中性色

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Graphite Gray** | `#444A53` | 68, 74, 83 | Primary text |
| **Secondary Gray** | `#666666` | 102, 102, 102 | Secondary text |
| **Light Gray** | `#999999` | 153, 153, 153 | Captions, hints |
| **Frost White** | `#F7F8F8` | 247, 248, 248 | Light backgrounds |
| **Pure White** | `#FFFFFF` | 255, 255, 255 | Cards, modals |
| **Deep Night** | `#0A0A0A` | 10, 10, 10 | Dark mode background |

### 3.3 Semantic Colors / 語意色彩

| Name | Hex | Usage |
|------|-----|-------|
| **Success / Clean** | `#00CFA0` | Verified, safe results |
| **Warning / Suspicious** | `#F38BA0` | Risk indicators |
| **Info / Uncertain** | `#FFD96A` | Requires attention |
| **Error** | `#F38BA0` | System errors |

### 3.4 Risk Spectrum / 風險色譜

Used in result displays to indicate verification confidence:

| Level | Hex | EN | 繁中 | 日本語 |
|-------|-----|-----|------|--------|
| **Very Low** | `#34C759` | Very Low Risk | 極低風險 | 非常に低いリスク |
| **Low** | `#00CFA0` | Low Risk | 低風險 | 低リスク |
| **Medium** | `#FF9500` | Medium Risk | 中度風險 | 中程度のリスク |
| **High** | `#FF3B30` | High Risk | 高風險 | 高リスク |
| **Very High** | `#DC143C` | Very High Risk | 極高風險 | 非常に高いリスク |
| **Unknown** | `#8E8E93` | Uncertain | 無法判斷 | 不明 |

### 3.5 Gradient Definitions / 漸層定義

| Name | Colors | Usage |
|------|--------|-------|
| **Primary Gradient** | `#00CFA0` → `#FFD96A` | CTAs, premium elements |
| **Background Gradient** | `#00CFA0` → `#F7F8F8` | Hero sections |
| **Dark Gradient** | `#0A0A0A` → `#1A1A1A` | Dark mode cards |

### 3.6 Color Accessibility / 色彩無障礙

All color combinations must meet WCAG AA standards (4.5:1 contrast ratio minimum).

| Text Color | Background | Contrast Ratio | Pass? |
|------------|------------|----------------|-------|
| `#444A53` | `#FFFFFF` | 9.5:1 | ✅ AAA |
| `#444A53` | `#F7F8F8` | 8.8:1 | ✅ AAA |
| `#FFFFFF` | `#00CFA0` | 3.2:1 | ⚠️ Large text only |
| `#0A0A0A` | `#00CFA0` | 8.1:1 | ✅ AAA |

---

## 4. Typography / 字型系統

### 4.1 Font Families / 字型家族

| Language | Primary Font | Fallback |
|----------|--------------|----------|
| **English** | Inter | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto |
| **繁體中文** | Noto Sans TC | "PingFang TC", "Microsoft JhengHei" |
| **日本語** | Noto Sans JP | "Hiragino Sans", "Yu Gothic" |
| **Monospace** | IBM Plex Mono | Menlo, "Courier New" |

### 4.2 Font Weights / 字重

| Weight | Value | Usage |
|--------|-------|-------|
| **Regular** | 400 | Body text |
| **Medium** | 500 | Emphasis |
| **SemiBold** | 600 | Subheadings, buttons |
| **Bold** | 700 | Headlines |

### 4.3 Type Scale / 字級系統

Optimized for users aged 50-70 with enhanced readability.

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| **H1 / Hero** | 28px | Bold | 1.3 | Page titles |
| **H2 / Section** | 20px | SemiBold | 1.4 | Section headings |
| **H3 / Subsection** | 18px | SemiBold | 1.4 | Card titles |
| **Body** | 16px | Regular | 1.6 | Main content |
| **Caption** | 14px | Regular | 1.5 | Descriptions |
| **Small** | 12px | Regular | 1.4 | Legal, footnotes |

### 4.4 Text Styles Examples / 文字範例

**Headlines (EN)**
```
H1: Deep reverse image search
H2: Verify photo authenticity
H3: How it works
```

**Headlines (繁中)**
```
H1: 深度反向圖片搜尋
H2: 驗證照片真偽
H3: 使用方式
```

**Headlines (日本語)**
```
H1: ディープ逆画像検索
H2: 写真の真偽を確認
H3: 使い方
```

---

## 5. Brand Voice / 品牌語調

### 5.1 Core Principles / 核心原則

| Principle | EN | 繁中 | 日本語 |
|-----------|-----|------|--------|
| **Empathy First** | Understand before advising | 先理解，後建議 | まず理解し、それからアドバイス |
| **Inform, Don't Alarm** | Facts over fear | 陳述事實，不製造恐慌 | 恐怖ではなく事実を |
| **Suggest, Don't Command** | Empower decisions | 建議而非命令 | 命令ではなく提案を |
| **Honest, Not Excessive** | No false guarantees | 誠實但不過度承諾 | 誠実に、しかし過度な約束はしない |

### 5.2 Voice Examples by Scenario / 情境範例

#### High Risk Result / 高風險結果

| ❌ DON'T | ✅ DO |
|----------|-------|
| "WARNING! You're being scammed!" | "We found this photo in a stock image library" |
| 「警告！你被騙了！」 | 「我們在商用圖庫中找到了這張照片」 |
| 「警告！詐欺されています！」 | 「この写真はストックフォトライブラリで見つかりました」 |

#### Clean Result / 乾淨結果

| ❌ DON'T | ✅ DO |
|----------|-------|
| "100% Safe! This person is real!" | "No matches found online, but verification has limits" |
| 「100% 安全！這個人是真的！」 | 「網路上沒有找到匹配，但驗證有其限制」 |
| 「100%安全！本物です！」 | 「オンラインでの一致は見つかりませんでしたが、検証には限界があります」 |

### 5.3 Recommended Vocabulary / 建議用語

**Use These (EN)**
- "We suggest..."
- "This may indicate..."
- "Consider..."
- "Our analysis shows..."

**Use These (繁中)**
- 「我們建議...」
- 「這可能表示...」
- 「請考慮...」
- 「分析結果顯示...」

**Use These (日本語)**
- 「ご検討ください...」
- 「これは...を示している可能性があります」
- 「...をお勧めします」
- 「分析結果によると...」

### 5.4 Forbidden Vocabulary / 禁止用語

| ❌ Avoid | Why |
|----------|-----|
| "Warning!", "Danger!", "Alert!" | Too alarming |
| "You must...", "Immediately..." | Too commanding |
| "100% safe", "Guaranteed real" | False promises |
| "How could you fall for this?" | Judgmental |

---

## 6. Iconography & Imagery / 圖標與圖像

### 6.1 Icon Style / 圖標風格

- **Style**: Outline icons, 2px stroke weight
- **Corner**: Rounded (2px radius)
- **Size**: 24x24px base, scalable
- **Color**: Single color, follows text color or Brand Teal

### 6.2 Recommended Icons / 建議圖標

| Use Case | Icon | Description |
|----------|------|-------------|
| **Verification** | ✓ Checkmark | Simple, not in circle |
| **Risk** | ⚠️ Triangle | Soft, not alarming |
| **Info** | ℹ️ Info circle | Informative, helpful |
| **Search** | 🔍 Magnifier | Discovery, investigation |
| **Upload** | ↑ Arrow up | Clear action |
| **Shield** | 🛡️ Shield | Protection, security |

### 6.3 Photography Style / 攝影風格

For marketing materials:

| Element | Guideline |
|---------|-----------|
| **Subjects** | Diverse, relatable people (not stock-looking) |
| **Lighting** | Natural, warm, trustworthy |
| **Colors** | Align with brand palette |
| **Mood** | Calm, reassuring, professional |
| **Avoid** | Overly dramatic, fearful expressions |

### 6.4 Illustration Style / 插畫風格

- **Style**: Clean, geometric, minimal
- **Colors**: Brand palette only
- **Complexity**: Simple shapes, easy to understand
- **Mood**: Friendly, approachable, not childish

---

## 7. Application Guidelines / 應用規範

### 7.1 Landing Page / 登陸頁面

```
┌─────────────────────────────────────────────────────┐
│  [Logo]                    [EN/繁中/日本語] [CTA]   │  ← Header
├─────────────────────────────────────────────────────┤
│                                                     │
│           [Hero Image: App Mockup]                  │
│                                                     │
│            VerifyAI                                 │  ← H1, Brand Teal
│     Deep reverse image search                       │  ← Tagline, Gray
│                                                     │
│         [Download on App Store]                     │  ← Primary CTA
│         [Get it on Google Play]                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│   How it Works        Features        Pricing       │  ← Sections
│                                                     │
├─────────────────────────────────────────────────────┤
│  Footer: Privacy | Terms | Contact | © 2026        │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Max content width: 1200px
- Section padding: 80px vertical
- Background: Frost White (#F7F8F8)
- CTA buttons: Brand Teal (#00CFA0) with white text

### 7.2 App Store Screenshots / App Store 截圖

**Dimensions:**
- iPhone 6.7": 1290 x 2796 px
- iPhone 6.5": 1284 x 2778 px
- iPad Pro 12.9": 2048 x 2732 px

**Layout Template:**
```
┌─────────────────────┐
│                     │
│   [Headline Text]   │  ← H2, centered
│                     │
│  ┌───────────────┐  │
│  │               │  │
│  │  App Screen   │  │  ← Device mockup
│  │   Mockup      │  │
│  │               │  │
│  └───────────────┘  │
│                     │
│   [Feature Badge]   │  ← Optional
│                     │
└─────────────────────┘
```

**Screenshot Sequence (5 images):**

| # | Headline (EN) | Headline (繁中) | Headline (日本語) |
|---|--------------|----------------|------------------|
| 1 | Deep reverse image search | 深度反向圖片搜尋 | ディープ逆画像検索 |
| 2 | Verify anyone's photo | 驗證任何人的照片 | 誰でも写真を確認 |
| 3 | Multi-engine search | 多引擎搜尋技術 | マルチエンジン検索 |
| 4 | Instant risk assessment | 即時風險評估 | 即座のリスク評価 |
| 5 | Protect yourself online | 保護你的網路安全 | オンラインで自分を守る |

### 7.3 Social Media / 社群媒體

**Profile Picture:**
- Use icon only (no wordmark)
- Size: 400 x 400 px minimum
- Background: White or transparent

**Cover/Banner Images:**

| Platform | Size | Layout |
|----------|------|--------|
| Facebook | 820 x 312 px | Horizontal wordmark + tagline |
| Twitter/X | 1500 x 500 px | Logo + tagline + app mockup |
| LinkedIn | 1128 x 191 px | Wordmark only |
| YouTube | 2560 x 1440 px | Full brand treatment |

**Post Templates:**

```
┌─────────────────────────────────┐
│                                 │
│  [Brand Teal Background]        │
│                                 │
│      "Key Message Here"         │  ← White text, H2
│                                 │
│        VerifyAI                 │  ← Wordmark
│   Deep reverse image search     │  ← Tagline
│                                 │
└─────────────────────────────────┘
```

### 7.4 Promotional Videos / 宣傳影片

**Video Specifications:**
- Aspect ratio: 16:9 (landscape), 9:16 (vertical/stories)
- Resolution: 1920 x 1080 px minimum
- Frame rate: 30 fps

**Intro/Outro Template:**
```
[0:00-0:03] Logo animation: Icon reveals with verification slash
[0:03-0:05] Wordmark fades in: VerifyAI
[0:05-0:06] Tagline appears: Deep reverse image search
```

**Color Grading:**
- Shadows: Slightly teal tint
- Highlights: Warm amber tint
- Overall: Clean, trustworthy, not overly dramatic

**Music/Audio Guidelines:**
- Mood: Calm, reassuring, modern
- Tempo: Moderate (80-100 BPM)
- Avoid: Dramatic, suspenseful, alarming tones

### 7.5 Landing Page Screenshot Carousel / 登陸頁面截圖輪播 ⭐ NEW

展示 App 實際畫面的輪播元件，用於 Hero 區塊。

**Layout Template:**
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│        ┌─────────────────────────────┐              │
│        │  ┌───────────────────────┐  │              │
│        │  │                       │  │              │
│        │  │   App Screenshot      │  │  ← iPhone frame
│        │  │   (localized)         │  │
│        │  │                       │  │
│        │  │                       │  │
│        │  └───────────────────────┘  │              │
│        └─────────────────────────────┘              │
│                                                     │
│                 ● ○ ○ ○ ○                           │  ← Pagination dots
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Screenshot Specifications:**
| Item | Specification |
|------|---------------|
| **Format** | PNG with transparency or solid background |
| **Dimensions** | 1290 x 2796 px (iPhone 15 Pro Max) |
| **Localization** | Separate sets for zh-TW, en-US, ja-JP |
| **Count** | 5 screenshots per language |
| **Naming** | `{locale}/screen-{n}.png` (e.g., `zh-TW/screen-1.png`) |

**Recommended Screenshots (5 images):**

| # | Screen | Purpose | Key Elements |
|---|--------|---------|--------------|
| 1 | Upload Screen | Show entry point | Clean UI, upload button |
| 2 | Analyzing Screen | Show process | Multi-engine progress indicators |
| 3 | Clean Result | Positive outcome | Green indicators, reassuring message |
| 4 | Risk Result | Warning outcome | Match found, source links |
| 5 | FAQ/Settings | Professional features | Trust indicators |

**Carousel Behavior:**
- **Auto-rotate**: Every 4 seconds
- **Manual control**: Swipe (mobile) / Click arrows (desktop)
- **Pagination**: Dot indicators, clickable
- **Transition**: Smooth slide (300ms ease-out)
- **Pause on hover**: Yes (desktop)

**Device Frame:**
- Use iPhone 15 Pro mockup frame (Space Black or Natural Titanium)
- Consistent frame across all screenshots
- Optional: Subtle shadow for depth

**Responsive Behavior:**

| Breakpoint | Screenshot Size | Layout |
|------------|-----------------|--------|
| Mobile (<640px) | 280px width | Centered, full width |
| Tablet (640-1024px) | 320px width | Centered |
| Desktop (>1024px) | 400px width | Side-by-side with text or centered |

**Animation Guidelines:**
- Use CSS transitions, not heavy JS animations
- Ensure 60fps performance
- Respect `prefers-reduced-motion` for accessibility

---

## 8. Do's and Don'ts / 規範與禁忌

### 8.1 Logo Usage

| ✅ DO | ❌ DON'T |
|-------|----------|
| Use official logo files | Recreate or redraw the logo |
| Maintain clear space | Crowd the logo with other elements |
| Use approved color variations | Change logo colors arbitrarily |
| Scale proportionally | Stretch or distort |
| Use on appropriate backgrounds | Place on busy or clashing backgrounds |

### 8.2 Color Usage

| ✅ DO | ❌ DON'T |
|-------|----------|
| Use Brand Teal for primary actions | Use teal for error states |
| Maintain sufficient contrast | Use light text on light backgrounds |
| Follow the risk spectrum consistently | Invent new colors for risk levels |
| Use Amber Glow sparingly for emphasis | Overuse accent colors |

### 8.3 Typography

| ✅ DO | ❌ DON'T |
|-------|----------|
| Use Inter for English content | Use decorative or script fonts |
| Use Noto Sans for CJK languages | Mix different font families randomly |
| Maintain 16px minimum for body text | Use tiny text for important information |
| Follow the type scale | Create arbitrary font sizes |

### 8.4 Messaging

| ✅ DO | ❌ DON'T |
|-------|----------|
| Be empathetic and supportive | Be judgmental or condescending |
| Provide factual information | Make exaggerated claims |
| Empower users to decide | Command or pressure users |
| Acknowledge tool limitations | Promise 100% accuracy |
| Use inclusive language | Use fear-based messaging |

---

## Appendix A: Asset Inventory / 資產清單

### Current Assets / 現有資產

| Asset | Path | Size | Status |
|-------|------|------|--------|
| App Icon | `frontend/app/assets/icon.png` | 1024x1024 | ✅ Ready |
| Splash Screen | `frontend/app/assets/splash.png` | 1024x1024 | ✅ Ready |
| iOS App Icons | `frontend/app/ios/VerifyAI/Images.xcassets/` | Multiple | ✅ Ready |
| Android Icons | `frontend/app/android/app/src/main/res/` | Multiple | ✅ Ready |

### Assets To Create / 待製作資產

| Asset | Priority | Specifications |
|-------|----------|----------------|
| Horizontal wordmark (light bg) | High | SVG + PNG, transparent |
| Horizontal wordmark (dark bg) | High | SVG + PNG, transparent |
| Vertical lockup | Medium | SVG + PNG |
| Monochrome logo (white) | Medium | SVG + PNG |
| Monochrome logo (black) | Low | SVG + PNG |
| Social media templates | High | Figma/PSD |
| App Store screenshot templates | High | Figma/PSD |
| Video intro/outro | Medium | After Effects/Remotion |
| **Landing page screenshots (zh-TW)** | **High** | 5x PNG, 1290x2796px |
| **Landing page screenshots (en-US)** | **High** | 5x PNG, 1290x2796px |
| **Landing page screenshots (ja-JP)** | **High** | 5x PNG, 1290x2796px |
| iPhone mockup frame | High | PNG with transparency |

---

## Appendix B: Contact / 聯絡方式

For brand guideline questions or asset requests:

- **Project Owner**: @zhyz
- **Repository**: image-fact-checker

---

**Document Version History**

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-31 | Initial brand guidelines created |
| 1.1 | 2026-02-01 | Added Section 7.5: Landing Page Screenshot Carousel specifications |

---

*This document is the authoritative source for VerifyAI brand identity. All marketing materials, landing pages, App Store assets, and promotional content must adhere to these guidelines.*

