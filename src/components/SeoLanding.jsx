import { useEffect } from 'react'
import { ArrowRight, Check, Search, ShieldCheck, HeartHandshake, Eye, UserCheck, CreditCard, Lock, Sparkles } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import Navbar from './Navbar'
import Footer from './Footer'
import { getAppStoreUrl } from '../utils/getAppStoreUrl'
import { trackAppStoreClick, trackEvent, parseSourceGroup, initScrollDepthTracking, trackFaqToggle } from '../utils/tracking'

const copy = {
  en: {
    eyebrow: 'Reverse image search for online safety',
    title: 'Check the photo.\nBefore you trust the profile.',
    intro: 'VerifyAI searches the same image across Google, Yandex, Google Lens, and Shutterstock, then organizes the evidence so you can spot reused, stolen, or stock photos.',
    primary: 'Download for iPhone', secondary: 'See how it works', note: 'No account needed. Photos are deleted after each search.',
    proof: ['4 search engines in one check', 'Exact-match and crop comparison', 'Clear source links — you review the evidence'],
    shotsTitle: 'See what the search finds', shotsBody: 'From one screenshot to source-by-source evidence. VerifyAI shows the work behind every result.',
    howTitle: 'How reverse image verification works', steps: [['01', 'Choose a photo', 'Use a profile photo, marketplace image, or screenshot you have a legitimate reason to check.'], ['02', 'Search multiple sources', 'VerifyAI checks four image search sources and compares likely exact or cropped matches.'], ['03', 'Review the evidence', 'Open source pages, compare context, and decide your next safe step. A match is a clue, not a verdict.']],
    scenariosEyebrow: 'Real-world situations',
    scenariosTitle: 'Which situation are you facing right now?',
    scenariosIntro: 'Whether you want to verify privately on your own device, help a loved one, or check for stolen photos — choose your scenario below.',
    scenarios: [
      { id: 'share_concern', tag: 'Care & Remind', title: 'A loved one has a new romance, but asking directly feels awkward', desc: 'Direct confrontation creates defense and breaks trust. Share VerifyAI so they can quietly check the photos on their own device without confrontation. Only they see the results.', cta: 'Share or verify on iPhone', ctaId: 'rt_card_share_concern' },
      { id: 'self_check', tag: 'Personal Peace of Mind', title: 'Met someone new online and want peace of mind without being judged', desc: 'A few details feel slightly off, but you don’t want to alert anyone or be judged. Search the photo directly on iPhone. 100% private, no desktop needed, photos deleted immediately.', cta: 'Verify privately on iPhone', ctaId: 'rt_card_self_check' },
      { id: 'evidence_check', tag: 'Objective Evidence', title: 'Someone you know is too deeply involved to listen to warnings', desc: 'Verbal warnings are often dismissed as interference. Trace the photo to find original stock sources or duplicate accounts across the web to let objective evidence speak.', cta: 'Trace original photo source', ctaId: 'rt_card_evidence_check' },
      { id: 'anti_impersonation', tag: 'Anti-Impersonation', title: 'Concerned your own photos are being stolen by fake accounts', desc: 'Check if your public social photos or portraits have been scraped by scammers to create fake profiles across dating apps and social media.', cta: 'Scan where your photo appears', ctaId: 'rt_card_anti_impersonation' },
      { id: 'no_subscription', tag: 'Zero Subscriptions', title: 'Want a clean mobile search tool without monthly subscriptions', desc: 'Tired of complex desktop websites and $15–$30/mo auto-renewal traps. Single-use credits directly on iPhone, zero recurring commitment.', cta: 'Get single-use credits', ctaId: 'rt_card_no_subscription' }
    ],
    guidesTitle: 'Guides for the question you are asking', guidesBody: 'Practical, evidence-first answers for common image verification and online safety searches.',
    faqTitle: 'Reverse image search questions, answered',
    ctaTitle: 'A photo should not be the reason you ignore a warning sign.', ctaBody: 'Run a multi-engine image check before you send money, share private information, or move a conversation off-platform.',
  },
  'zh-TW': {
    eyebrow: '用反向圖片搜尋保護網路互動', title: '先查照片。\n再決定是否相信帳號。',
    intro: 'VerifyAI 同時搜尋 Google、Yandex、Google Lens 與 Shutterstock，整理每個來源的證據，協助你發現被重複使用、盜用或來自圖庫的照片。',
    primary: '下載 iPhone App', secondary: '了解運作方式', note: '無需建立帳號。搜尋完成後圖片即刪除。',
    proof: ['一次查詢 4 個搜尋來源', '比對相同圖片與裁切版本', '提供原始來源，由你檢視證據'],
    shotsTitle: '從一張截圖，找到可核對的來源', shotsBody: 'VerifyAI 不只顯示結果，也清楚呈現每個搜尋與比對步驟。',
    howTitle: '反向圖片驗證怎麼運作', steps: [['01', '選擇照片', '使用你有正當理由查核的交友照、賣場圖片或聊天截圖。'], ['02', '同時搜尋多個來源', 'VerifyAI 查詢四個圖片搜尋來源，比對可能相同或經裁切的結果。'], ['03', '檢視證據', '開啟來源頁面、比較脈絡，再決定安全的下一步。搜尋結果是線索，不是定罪。']],
    scenariosEyebrow: '真實生活情境',
    scenariosTitle: '哪一個是目前最想解決的情境？',
    scenariosIntro: '無論是想在自己手機上私密自查、委婉提醒身邊的人，或是清查個人照片防盜用，在手機上用客觀證據找出答案。',
    scenarios: [
      { id: 'share_concern', tag: '關心提醒', title: '看見身邊人有了新網戀，想提醒卻不知如何開口', desc: '直接質問容易尷尬、甚至破壞彼此信任。分享這個手機工具給對方，讓對方在自己的手機上悄悄查證，結果只有對方自己看得到。', cta: '在手機上查證或分享', ctaId: 'rt_card_share_concern' },
      { id: 'self_check', tag: '個人安心', title: '剛在網路上認識新朋友，想自己求個心安', desc: '有些細節隱約覺得不太對勁，但不想驚動任何人，更不想被周遭評斷或看笑話。在自己的手機上選取照片查一次，完全保密無痕，查完照片立即刪除。', cta: '私下在手機查證', ctaId: 'rt_card_self_check' },
      { id: 'evidence_check', tag: '客觀鐵證', title: '身邊的人深陷其中勸不動，需要客觀事實', desc: '言語提醒往往被當成耳邊風或惡意阻礙。拿照片找出網路上的原始出處與重複冒用紀錄，用客觀事實溫和打破謊言。', cta: '找出照片原始出處', ctaId: 'rt_card_evidence_check' },
      { id: 'anti_impersonation', tag: '防範冒用', title: '擔心自己的日常照片被假帳號冒用', desc: '擔心公開的社群生活照被盜用去設立假身分騙人。反向搜尋個人照片，清查網路上是否出現未經授權的相同臉孔。', cta: '清查個人照片出處', ctaId: 'rt_card_anti_impersonation' },
      { id: 'no_subscription', tag: '免綁月費', title: '只想在手機上搜圖，不想被綁每月自動扣款', desc: '反感國外搜圖工具繁瑣的網頁操作與每月 500-1000 元的訂閱陷阱。純 iPhone 手機操作，單次點數計費，用多少算多少、零續約負擔。', cta: '以單次點數體驗', ctaId: 'rt_card_no_subscription' }
    ],
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
  ['Can reverse image search identify a person?', 'It can find pages containing the same or a visually similar photo. It is not a people-search or facial-recognition guarantee.', 'find-image-source', 'faq_identify_person'],
  ['How can I tell if a dating profile picture is stolen?', 'Search the photo across multiple sources. Earlier posts, different names, stock-photo pages, or scam reports are reasons to pause and verify.', 'check-fake-profile-photo', 'faq_stolen_profile'],
  ['Can I check a suspicious dating profile photo directly on my phone without monthly subscriptions?', 'Yes. VerifyAI is built for private, discreet verification directly on iPhone. You can check a photo across 4 major search engines using single-use credits, without desktop computers or monthly recurring charges.', 'spot-romance-scam-photos', 'faq_private_check'],
  ['Can VerifyAI detect AI-generated images?', 'VerifyAI provides AI-image detection as reference information, but no detector is perfectly reliable. Treat it as one signal alongside source evidence.', 'spot-romance-scam-photos', 'faq_ai_detect'],
  ['What does it mean if reverse image search finds nothing?', 'It may mean the image is new, private, altered, low quality, or not indexed. No result does not prove that a person is genuine.', 'reverse-image-search-catfish', 'faq_finds_nothing'],
  ['Does VerifyAI store my photos?', 'Photos are processed to perform the search and deleted immediately afterward. Review the privacy policy for exact data handling terms.', 'reverse-image-search-iphone', 'faq_privacy_storage'],
]

export default function SeoLanding() {
  const { lang } = useI18n()
  const c = copy[lang] || copy.en
  const heroAppUrl = getAppStoreUrl(lang, 'rt_home_hero')
  const bottomAppUrl = getAppStoreUrl(lang, 'rt_home_bottom')

  useEffect(() => {
    trackEvent('view_landing', {
      page_variant: 'control',
      language: lang,
      source_group: parseSourceGroup(document.referrer, window.location.search)
    });

    const cleanupScroll = initScrollDepthTracking();
    return () => cleanupScroll();
  }, [lang]);

  return <>
    <Navbar />
    <main className="seo-landing">
      <section className="seo-hero">
        <div className="seo-hero-copy">
          <p className="seo-eyebrow">{c.eyebrow}</p>
          <h1>{c.title.split('\n').map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)}</h1>
          <p className="seo-lede">{c.intro}</p>
          <div className="seo-actions"><a className="seo-button primary" href={heroAppUrl} onClick={() => trackAppStoreClick('rt_home_hero', 'hero', 'home', lang)} target="_blank" rel="noreferrer">{c.primary}<ArrowRight size={18}/></a><a className="seo-button secondary" href="#howItWorks">{c.secondary}</a></div>
          <p className="seo-note"><Check size={16}/>{c.note}</p>
        </div>
        <div className="seo-hero-product" aria-label="VerifyAI iPhone app">
          <div className="app-identity"><img src="/app-store/app-icon.png" alt="VerifyAI app icon"/><div><strong>VerifyAI Image Search</strong><span>Deep reverse image search</span></div></div>
          <img className="hero-phone" src="/app-store/screenshot-1.jpg" alt="VerifyAI multi-engine reverse image search results on iPhone" />
        </div>
      </section>
      <section id="features" className="proof-strip" aria-label="Product capabilities">{c.proof.map((item, i) => <div key={item}><span>0{i+1}</span><p>{item}</p></div>)}</section>

      {/* 5 Scenario Cards Section (Let users choose their exact situation) */}
      <section id="scenarios" className="seo-section scenarios-section" style={{ maxWidth: '1160px', margin: '40px auto', padding: '40px 20px' }}>
        <div className="section-intro" style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p className="seo-eyebrow" style={{ color: '#00CFA0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.scenariosEyebrow}</p>
          <h2 style={{ fontSize: '2.2rem', margin: '10px 0', letterSpacing: '-0.02em' }}>{c.scenariosTitle}</h2>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>{c.scenariosIntro}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {c.scenarios.map((sc, idx) => {
            const cardUrl = getAppStoreUrl(lang, sc.ctaId)
            return (
              <div key={sc.id} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.2s ease' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ background: '#ecfdf5', color: '#00CFA0', fontSize: '0.85rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px' }}>{sc.tag}</span>
                    <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>0{idx + 1}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', lineHeight: '1.4', marginBottom: '12px', color: '#0f172a' }}>{sc.title}</h3>
                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>{sc.desc}</p>
                </div>
                <a 
                  href={cardUrl} 
                  onClick={() => trackAppStoreClick(sc.ctaId, `scenario_card_${sc.id}`, 'home', lang)} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', background: '#f8fafc', color: '#0f172a', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', border: '1px solid #cbd5e1' }}
                >
                  <span>{sc.cta}</span>
                  <ArrowRight size={16} color="#00CFA0" />
                </a>
              </div>
            )
          })}
        </div>
      </section>

      <section id="technology" className="seo-section screenshots-section"><div className="section-intro"><p className="seo-eyebrow">Product tour</p><h2>{c.shotsTitle}</h2><p>{c.shotsBody}</p></div><div className="screenshots-row">{[1,2,3,4,5].map((n) => <img key={n} src={`/app-store/screenshot-${n}.jpg`} alt={`VerifyAI iPhone app screenshot ${n}`} loading={n > 2 ? 'lazy' : 'eager'} />)}</div></section>
      <section id="howItWorks" className="seo-section how-section"><div className="section-intro"><p className="seo-eyebrow">Three clear steps</p><h2>{c.howTitle}</h2></div><div className="steps-grid">{c.steps.map(([n,t,d]) => <article key={n}><span>{n}</span>{n === '01' ? <Search/> : n === '02' ? <ShieldCheck/> : <Check/>}<h3>{t}</h3><p>{d}</p></article>)}</div></section>
      <section id="guides" className="seo-section guides-section"><div className="section-intro"><p className="seo-eyebrow">Search & safety guides</p><h2>{c.guidesTitle}</h2><p>{c.guidesBody}</p></div><div className="guide-grid">{guides.map(([slug,title,desc], i) => <a href={`/guides/${slug}/`} key={slug}><span>Guide {String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{desc}</p><b>Read guide <ArrowRight size={16}/></b></a>)}</div></section>
      <section id="faq" className="seo-section seo-faq"><div className="section-intro"><p className="seo-eyebrow">FAQ</p><h2>{c.faqTitle}</h2></div><div>{faqs.map(([q,a,slug,faqId]) => <details key={q} onToggle={(e) => { if (e.target.open) trackFaqToggle(faqId || slug, lang); }}><summary>{q}</summary><p>{a}</p><a href={`/guides/${slug}/`}>Learn more <ArrowRight size={15}/></a></details>)}</div></section>
      <section id="download" className="download-cta"><img src="/app-store/app-icon.png" alt="VerifyAI app icon"/><div><h2>{c.ctaTitle}</h2><p>{c.ctaBody}</p></div><a className="seo-button primary" href={bottomAppUrl} onClick={() => trackAppStoreClick('rt_home_bottom', 'bottom', 'home', lang)} target="_blank" rel="noreferrer">{c.primary}<ArrowRight size={18}/></a></section>
    </main>
    <Footer />
  </>
}
