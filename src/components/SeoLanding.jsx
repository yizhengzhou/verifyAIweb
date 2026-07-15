import { ArrowRight, Check, Search, ShieldCheck } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import Navbar from './Navbar'
import Footer from './Footer'
import { getAppStoreUrl } from '../utils/getAppStoreUrl'

const copy = {
  en: {
    eyebrow: 'Reverse image search for online safety',
    title: 'Check the photo.\nBefore you trust the profile.',
    intro: 'VerifyAI searches the same image across Google, Yandex, Google Lens, and Shutterstock, then organizes the evidence so you can spot reused, stolen, or stock photos.',
    primary: 'Download free for iPhone', secondary: 'See how it works', note: 'New users get 3 complimentary full searches. No account required to start.',
    proof: ['4 search engines in one check', 'Exact-match and crop comparison', 'Clear source links — you review the evidence'],
    shotsTitle: 'See what the search finds', shotsBody: 'From one screenshot to source-by-source evidence. VerifyAI shows the work behind every result.',
    howTitle: 'How reverse image verification works', steps: [['01', 'Choose a photo', 'Use a profile photo, marketplace image, or screenshot you have a legitimate reason to check.'], ['02', 'Search multiple sources', 'VerifyAI checks four image search sources and compares likely exact or cropped matches.'], ['03', 'Review the evidence', 'Open source pages, compare context, and decide your next safe step. A match is a clue, not a verdict.']],
    guidesTitle: 'Guides for the question you are asking', guidesBody: 'Practical, evidence-first answers for common image verification and online safety searches.',
    faqTitle: 'Reverse image search questions, answered',
    ctaTitle: 'A photo should not be the reason you ignore a warning sign.', ctaBody: 'Run a multi-engine image check before you send money, share private information, or move a conversation off-platform.',
  },
  'zh-TW': {
    eyebrow: '用反向圖片搜尋保護網路互動', title: '先查照片。\n再決定是否相信帳號。',
    intro: 'VerifyAI 同時搜尋 Google、Yandex、Google Lens 與 Shutterstock，整理每個來源的證據，協助你發現被重複使用、盜用或來自圖庫的照片。',
    primary: '免費下載 iPhone App', secondary: '了解運作方式', note: '新用戶可免費使用 3 次完整搜尋，開始使用不必建立帳號。',
    proof: ['一次查詢 4 個搜尋來源', '比對相同圖片與裁切版本', '提供原始來源，由你檢視證據'],
    shotsTitle: '從一張截圖，找到可核對的來源', shotsBody: 'VerifyAI 不只顯示結果，也清楚呈現每個搜尋與比對步驟。',
    howTitle: '反向圖片驗證怎麼運作', steps: [['01', '選擇照片', '使用你有正當理由查核的交友照、賣場圖片或聊天截圖。'], ['02', '同時搜尋多個來源', 'VerifyAI 查詢四個圖片搜尋來源，比對可能相同或經裁切的結果。'], ['03', '檢視證據', '開啟來源頁面、比較脈絡，再決定安全的下一步。搜尋結果是線索，不是定罪。']],
    guidesTitle: '針對你正在搜尋的問題', guidesBody: '用可執行、重視證據的方法回答常見圖片查核與網路安全問題。', faqTitle: '反向圖片搜尋常見問題',
    ctaTitle: '在匯款、交出個資或轉移平台前，先查一次照片。', ctaBody: '用多引擎圖片搜尋，多取得一項可以核對的證據。',
  }
}

const guides = [
  ['reverse-image-search-iphone', 'How to reverse image search on iPhone', 'Search a saved photo or screenshot and compare results from multiple engines.'],
  ['find-image-source', 'How to find the original source of an image', 'Trace reposted or cropped images back to earlier pages and context.'],
  ['check-fake-profile-photo', 'How to check if a profile picture is fake', 'Look for reused portraits, stock photos, and identity inconsistencies.'],
  ['reverse-image-search-catfish', 'Reverse image search for catfish checks', 'Verify a dating profile photo before trust, money, or private details are involved.'],
  ['spot-romance-scam-photos', 'How to spot photos used in romance scams', 'Use image evidence together with behavioral warning signs.'],
  ['google-lens-alternative-iphone', 'A multi-engine Google Lens alternative for iPhone', 'When one search engine is not enough, compare four sources in one workflow.'],
]

const faqs = [
  ['Can reverse image search identify a person?', 'It can find pages containing the same or a visually similar photo. It is not a people-search or facial-recognition guarantee.', 'find-image-source'],
  ['How can I tell if a dating profile picture is stolen?', 'Search the photo across multiple sources. Earlier posts, different names, stock-photo pages, or scam reports are reasons to pause and verify.', 'check-fake-profile-photo'],
  ['Can VerifyAI detect AI-generated images?', 'VerifyAI provides AI-image detection as reference information, but no detector is perfectly reliable. Treat it as one signal alongside source evidence.', 'spot-romance-scam-photos'],
  ['What does it mean if reverse image search finds nothing?', 'It may mean the image is new, private, altered, low quality, or not indexed. No result does not prove that a person is genuine.', 'reverse-image-search-catfish'],
  ['Does VerifyAI store my photos?', 'Photos are processed to perform the search. Review the current privacy policy for the exact data handling and retention terms.', 'reverse-image-search-iphone'],
]

export default function SeoLanding() {
  const { lang } = useI18n()
  const c = copy[lang] || copy.en
  const appUrl = getAppStoreUrl(lang)
  return <>
    <Navbar />
    <main className="seo-landing">
      <section className="seo-hero">
        <div className="seo-hero-copy">
          <p className="seo-eyebrow">{c.eyebrow}</p>
          <h1>{c.title.split('\n').map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)}</h1>
          <p className="seo-lede">{c.intro}</p>
          <div className="seo-actions"><a className="seo-button primary" href={appUrl} target="_blank" rel="noreferrer">{c.primary}<ArrowRight size={18}/></a><a className="seo-button secondary" href="#howItWorks">{c.secondary}</a></div>
          <p className="seo-note"><Check size={16}/>{c.note}</p>
        </div>
        <div className="seo-hero-product" aria-label="VerifyAI iPhone app">
          <div className="app-identity"><img src="/app-store/app-icon.png" alt="VerifyAI app icon"/><div><strong>VerifyAI Image Search</strong><span>Deep reverse image search</span></div></div>
          <img className="hero-phone" src="/app-store/screenshot-1.jpg" alt="VerifyAI multi-engine reverse image search results on iPhone" />
        </div>
      </section>
      <section id="features" className="proof-strip" aria-label="Product capabilities">{c.proof.map((item, i) => <div key={item}><span>0{i+1}</span><p>{item}</p></div>)}</section>
      <section id="technology" className="seo-section screenshots-section"><div className="section-intro"><p className="seo-eyebrow">Product tour</p><h2>{c.shotsTitle}</h2><p>{c.shotsBody}</p></div><div className="screenshots-row">{[1,2,3,4,5].map((n) => <img key={n} src={`/app-store/screenshot-${n}.jpg`} alt={`VerifyAI iPhone app screenshot ${n}`} loading={n > 2 ? 'lazy' : 'eager'} />)}</div></section>
      <section id="howItWorks" className="seo-section how-section"><div className="section-intro"><p className="seo-eyebrow">Three clear steps</p><h2>{c.howTitle}</h2></div><div className="steps-grid">{c.steps.map(([n,t,d]) => <article key={n}><span>{n}</span>{n === '01' ? <Search/> : n === '02' ? <ShieldCheck/> : <Check/>}<h3>{t}</h3><p>{d}</p></article>)}</div></section>
      <section id="guides" className="seo-section guides-section"><div className="section-intro"><p className="seo-eyebrow">Search & safety guides</p><h2>{c.guidesTitle}</h2><p>{c.guidesBody}</p></div><div className="guide-grid">{guides.map(([slug,title,desc], i) => <a href={`/guides/${slug}/`} key={slug}><span>Guide {String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{desc}</p><b>Read guide <ArrowRight size={16}/></b></a>)}</div></section>
      <section id="faq" className="seo-section seo-faq"><div className="section-intro"><p className="seo-eyebrow">FAQ</p><h2>{c.faqTitle}</h2></div><div>{faqs.map(([q,a,slug]) => <details key={q}><summary>{q}</summary><p>{a}</p><a href={`/guides/${slug}/`}>Learn more <ArrowRight size={15}/></a></details>)}</div></section>
      <section id="download" className="download-cta"><img src="/app-store/app-icon.png" alt="VerifyAI app icon"/><div><h2>{c.ctaTitle}</h2><p>{c.ctaBody}</p></div><a className="seo-button primary" href={appUrl} target="_blank" rel="noreferrer">{c.primary}<ArrowRight size={18}/></a></section>
    </main>
    <Footer />
  </>
}
