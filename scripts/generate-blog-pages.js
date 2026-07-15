import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const blogDir = path.join(publicDir, 'blog')
const legacyDailyDir = path.join(blogDir, 'daily')
const languages = {
  zh: { htmlLang: 'zh-Hant', label: '繁體中文', title: 'VerifyAI 每日防詐快報', intro: '每日整理網路感情詐騙、盜圖與假帳號案例。', feedTitle: 'VerifyAI 每日防詐快報' },
  en: { htmlLang: 'en', label: 'English', title: 'VerifyAI Daily Scam Report', intro: 'Daily notes on romance scams, stolen photos, and fake profile patterns.', feedTitle: 'VerifyAI Daily Scam Report' },
  ja: { htmlLang: 'ja', label: '日本語', title: 'VerifyAI 詐欺対策レポート', intro: 'ロマンス詐欺、なりすまし、盗用写真に関する日次レポート。', feedTitle: 'VerifyAI 詐欺対策レポート' },
}
const baseUrl = 'https://verifyai.fork.work'

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }) }
function read(file) { return fs.readFileSync(file, 'utf8') }
function write(file, text) { ensureDir(path.dirname(file)); fs.writeFileSync(file, text) }
function escapeHtml(s = '') { return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;') }
function decodeHtmlEntities(s = '') {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x2F;/g, '/')
}
function stripTags(s = '') { return s.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }
function firstMatch(text, regex, fallback = '') { const m = text.match(regex); return m ? m[1].trim() : fallback }
function noExt(file) { return path.basename(file).replace(/\.html$/, '') }
function slugUrl(lang, slug) { return `${baseUrl}/blog/${lang}/daily/${slug}.html` }
function normalizeUrl(url = '') {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('/')) return `${baseUrl}${url}`
  return url
}
function matchesAny(text = '', patterns = []) {
  return patterns.some(pattern => pattern.test(text))
}
const illustrationCatalog = [
  {
    src: '/blog/images/2026-06-19-ai-deepfake-romance-scam.png',
    alt: {
      zh: 'AI 深偽與戀愛詐騙示意圖',
      en: 'AI deepfake romance scam illustration',
      ja: 'AIディープフェイクとロマンス詐欺のイラスト',
    },
    caption: {
      zh: '示意圖：陌生訊息、偽造頭像與戀愛詐騙的常見起點。',
      en: 'Illustration of the common starting point for romance scams: stranger messages and fake profiles.',
      ja: 'ロマンス詐欺の典型的な入口である、見知らぬメッセージと偽プロフィールのイラスト。',
    },
    match: [/scam/i, /romance/i, /pig butchering/i, /deepfake/i, /catfish/i, /殺豬盤/, /網戀/, /詐騙/, /反詐/, /reverse image/i],
  },
]
const fallbackIllustration = {
  src: '/logov2.png',
  alt: {
    zh: 'VerifyAI 標誌',
    en: 'VerifyAI logo',
    ja: 'VerifyAI ロゴ',
  },
  caption: {
    zh: 'VerifyAI 預設標誌圖。',
    en: 'VerifyAI default logo asset.',
    ja: 'VerifyAI のデフォルトロゴ。',
  },
}
function pickCatalogIllustration(post) {
  const haystack = [post.slug, post.title, post.description, post.keywords].filter(Boolean).join(' ').toLowerCase()
  return illustrationCatalog.find(asset => matchesAny(haystack, asset.match)) || fallbackIllustration
}
function selectIllustration(post) {
  const explicit = normalizeUrl(post.heroImage || post.ogImage || '')
  const explicitAlt = post.heroImageAlt || post.ogImageAlt || ''
  const explicitCaption = post.heroImageCaption || post.ogImageCaption || ''
  const selected = explicit && !explicit.endsWith('/logov2.png') ? { src: explicit, alt: explicitAlt, caption: explicitCaption, source: 'explicit' } : pickCatalogIllustration(post)
  const src = normalizeUrl(selected.src || explicit || fallbackIllustration.src)
  const alt = selected.alt?.[post.lang] || selected.alt || explicitAlt || post.title
  const caption = selected.caption?.[post.lang] || selected.caption || explicitCaption || ''
  return { src, alt, caption, source: selected.source || (explicit ? 'explicit' : 'catalog') }
}
function langFromHtml(text, fallback = 'zh') {
  const htmlLang = firstMatch(text, /<html[^>]*\slang=["']([^"']+)["']/i, '')
  if (htmlLang.startsWith('en')) return 'en'
  if (htmlLang.startsWith('ja')) return 'ja'
  return fallback
}
function assertBalancedLanguages(posts) {
  const counts = Object.fromEntries(Object.keys(languages).map(lang => [lang, posts.filter(p => p.lang === lang).length]))
  const distinctCounts = new Set(Object.values(counts))
  if (distinctCounts.size > 1) {
    throw new Error(`Blog language counts must match before publish: ${JSON.stringify(counts)}`)
  }
  return counts
}
function buildNavigation(posts) {
  const navigation = {}
  for (const lang of Object.keys(languages)) {
    const langPosts = posts.filter(p => p.lang === lang).sort((a, b) => String(a.dateIso || a.date).localeCompare(String(b.dateIso || b.date)))
    navigation[lang] = langPosts.map((post, index) => ({
      slug: post.slug,
      title: post.title,
      url: post.url,
      date: post.date,
      prev: langPosts[index - 1] ? {
        slug: langPosts[index - 1].slug,
        title: langPosts[index - 1].title,
        url: langPosts[index - 1].url,
      } : null,
      next: langPosts[index + 1] ? {
        slug: langPosts[index + 1].slug,
        title: langPosts[index + 1].title,
        url: langPosts[index + 1].url,
      } : null,
    }))
  }
  write(path.join(legacyDailyDir, 'navigation.json'), JSON.stringify({ generated_at: new Date().toISOString(), navigation }, null, 2) + '\n')
}
function metadata(file, fallbackLang = 'zh') {
  const text = read(file)
  const slug = noExt(file)
  const lang = langFromHtml(text, fallbackLang)
  const titleRaw = firstMatch(text, /<meta\s+property=["']og:title["']\s+content="([^"]*)"/i, firstMatch(text, /<title>(.*?)<\/title>/is, slug))
  const title = decodeHtmlEntities(titleRaw).replace(/\s+—\s+VerifyAI.*$/i, '').trim()
  const description = decodeHtmlEntities(firstMatch(text, /<meta\s+name=["']description["']\s+content="([^"]*)"/i, stripTags(text).slice(0, 160)))
  const ogImage = firstMatch(text, /<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i, '')
  const heroImageAlt = firstMatch(text, /<meta\s+name=["']verifyai:image-alt["']\s+content=["']([^"']*)["']/i, '')
  const heroImageCaption = firstMatch(text, /<meta\s+name=["']verifyai:image-caption["']\s+content=["']([^"']*)["']/i, '')
  const dateIso = firstMatch(text, /<meta\s+property=["']article:published_time["']\s+content=["']([^"']*)["']/i, '')
  const date = dateIso ? dateIso.slice(0, 10) : (slug.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '')
  const illustration = selectIllustration({ slug, lang, title, description, keywords: firstMatch(text, /<meta\s+property=["']article:tag["']\s+content=["']([^"']*)["']/i, ''), ogImage, heroImageAlt, heroImageCaption })
  return {
    file,
    slug,
    lang,
    title,
    description,
    date,
    dateIso,
    url: slugUrl(lang, slug),
    legacy: file.includes('/blog/daily/'),
    ogImage: normalizeUrl(ogImage),
    heroImageAlt,
    heroImageCaption,
    heroImage: illustration.src,
    heroImageAltFinal: illustration.alt,
    heroImageCaptionFinal: illustration.caption,
    illustrationSource: illustration.source,
  }
}
function listHtml(lang, posts) {
  const cfg = languages[lang]
  const ogLocale = lang === 'zh' ? 'zh_TW' : lang === 'en' ? 'en_US' : 'ja_JP'
  const items = posts.map(p => `
    <article class="post-card${p.heroImage ? ' has-thumb' : ''}">
      ${p.heroImage ? `<a class="thumb" href="/blog/${lang}/daily/${p.slug}.html"><img src="${escapeHtml(p.heroImage)}" alt="${escapeHtml(p.heroImageAltFinal || p.title)}" loading="lazy" decoding="async"></a>` : ''}
      <div class="post-copy">
        <time datetime="${escapeHtml(p.date)}">${escapeHtml(p.date)}</time>
        <h2><a href="/blog/${lang}/daily/${p.slug}.html">${escapeHtml(p.title)}</a></h2>
        <p>${escapeHtml(p.description || '')}</p>
      </div>
    </article>`).join('\n') || '<p class="empty">No posts yet.</p>'
  const alternates = Object.entries(languages).map(([code, c]) => `<link rel="alternate" hreflang="${c.htmlLang}" href="${baseUrl}/blog/${code}/daily/">`).join('\n')
  return `<!DOCTYPE html>
<html lang="${cfg.htmlLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(cfg.title)} — VerifyAI</title>
<meta name="description" content="${escapeHtml(cfg.intro)}">
<link rel="canonical" href="${baseUrl}/blog/${lang}/daily/">
${alternates}
<link rel="alternate" type="application/rss+xml" title="${escapeHtml(cfg.feedTitle)}" href="${baseUrl}/blog/${lang}/feed.xml">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(cfg.title)}">
<meta property="og:description" content="${escapeHtml(cfg.intro)}">
<meta property="og:url" content="${baseUrl}/blog/${lang}/daily/">
<meta property="og:site_name" content="VerifyAI">
<meta property="og:image" content="${baseUrl}/logov2.png">
<meta property="og:image:alt" content="VerifyAI logo">
<meta property="og:locale" content="${ogLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(cfg.title)}">
<meta name="twitter:description" content="${escapeHtml(cfg.intro)}">
<meta name="twitter:image" content="${baseUrl}/logov2.png">
<meta name="twitter:image:alt" content="VerifyAI logo">
<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cfg.title} — VerifyAI`,
    description: cfg.intro,
    url: `${baseUrl}/blog/${lang}/daily/`,
    inLanguage: cfg.htmlLang,
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logov2.png`,
      caption: 'VerifyAI logo',
    },
  })}</script>
<style>
:root{--teal:#3CB39B;--bg:#0E1414;--fg:#E8EDED;--muted:#A8B5B5;--border:#1F2828}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:-apple-system,BlinkMacSystemFont,"Inter","Noto Sans TC","Noto Sans JP",sans-serif;line-height:1.7}.wrap{max-width:860px;margin:0 auto;padding:56px 24px 88px}.brand{color:var(--teal);font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-size:13px}h1{font-size:clamp(32px,5vw,52px);line-height:1.08;margin:16px 0 12px}p.lead{color:var(--muted);font-size:18px;margin:0 0 32px}.lang{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0 40px}.lang a{color:var(--fg);text-decoration:none;border:1px solid var(--border);padding:6px 10px;border-radius:6px}.lang a.active{background:var(--teal);color:#001;border-color:var(--teal)}.post-card{border-top:1px solid var(--border);padding:24px 0}.post-card.has-thumb{display:grid;grid-template-columns:160px minmax(0,1fr);gap:18px;align-items:start}.thumb{display:block;border-radius:14px;overflow:hidden;border:1px solid var(--border);background:#111}.thumb img{display:block;width:100%;height:100%;aspect-ratio:16/9;object-fit:cover}.post-copy time{color:var(--muted);font-size:13px}.post-copy h2{font-size:24px;line-height:1.25;margin:6px 0 8px}.post-card a{color:var(--fg);text-decoration:none}.post-card a:hover{color:var(--teal)}.post-card p{color:var(--muted);margin:0}.empty{color:var(--muted)}footer{border-top:1px solid var(--border);margin-top:48px;padding-top:24px;color:var(--muted);font-size:14px}footer a{color:var(--teal)}@media (max-width:640px){.post-card.has-thumb{grid-template-columns:1fr}.thumb{max-width:100%}}
</style>
</head>
<body><main class="wrap"><div class="brand">VerifyAI Blog</div><h1>${escapeHtml(cfg.title)}</h1><p class="lead">${escapeHtml(cfg.intro)}</p><nav class="lang">${Object.entries(languages).map(([code, c]) => `<a class="${code === lang ? 'active' : ''}" href="/blog/${code}/daily/">${escapeHtml(c.label)}</a>`).join('')}</nav>${items}<footer><a href="/">VerifyAI</a> · <a href="/blog/feed.xml">RSS</a></footer></main></body></html>`
}
function redirectHtml(target, title = 'VerifyAI Blog') {
  return `<!DOCTYPE html><html lang="zh-Hant"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(title)}</title><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0;url=${target}"></head><body><p><a href="${target}">Redirecting to ${target}</a></p></body></html>`
}
function feedXml(lang, posts) {
  const cfg = languages[lang]
  const items = posts.map(p => `<item><title>${escapeHtml(p.title)}</title><link>${p.url}</link><guid>${p.url}</guid><pubDate>${new Date(p.dateIso || p.date).toUTCString()}</pubDate><description>${escapeHtml(p.description || '')}</description></item>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeHtml(cfg.feedTitle)}</title><link>${baseUrl}/blog/${lang}/daily/</link><description>${escapeHtml(cfg.intro)}</description>${items}</channel></rss>`
}
function allFeedXml(posts) {
  const items = posts.map(p => `<item><title>${escapeHtml(p.title)}</title><link>${p.url}</link><guid>${p.url}</guid><pubDate>${new Date(p.dateIso || p.date).toUTCString()}</pubDate><description>${escapeHtml(p.description || '')}</description></item>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>VerifyAI Blog</title><link>${baseUrl}/blog/</link><description>VerifyAI multilingual scam prevention blog.</description>${items}</channel></rss>`
}
function copyLegacyToZh() {
  if (!fs.existsSync(legacyDailyDir)) return
  for (const name of fs.readdirSync(legacyDailyDir)) {
    if (!name.endsWith('.html') || name === 'daily-template.html' || name === 'index.html') continue
    const src = path.join(legacyDailyDir, name)
    const slug = noExt(name)
    const zhDest = path.join(blogDir, 'zh', 'daily', name)
    const text = read(src)
    if (!fs.existsSync(zhDest)) write(zhDest, text.replaceAll('/blog/daily/', '/blog/zh/daily/'))
    write(src, redirectHtml(slugUrl('zh', slug), `${slug} — VerifyAI`))
  }
}
function collectPosts() {
  const posts = []
  for (const lang of Object.keys(languages)) {
    const dir = path.join(blogDir, lang, 'daily')
    ensureDir(dir)
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith('.html') || name === 'index.html') continue
      posts.push(metadata(path.join(dir, name), lang))
    }
  }
  posts.sort((a, b) => String(b.dateIso || b.date).localeCompare(String(a.dateIso || a.date)))
  return posts
}
function updateSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10)
  const staticUrls = ['/', '/llms.txt', '/llms-full.txt', '/blog/', '/blog/zh/', '/blog/en/', '/blog/ja/', '/blog/daily/', '/blog/zh/daily/', '/blog/en/daily/', '/blog/ja/daily/', '/blog/feed.xml', '/blog/zh/feed.xml', '/blog/en/feed.xml', '/blog/ja/feed.xml', '/blog/why-i-built-verifyai-zh', '/blog/why-i-built-verifyai-en', '/blog/why-i-built-verifyai-ja']
  const urls = [...staticUrls.map(u => ({ loc: `${baseUrl}${u}`, date: today, priority: u === '/' ? '1.0' : u.includes('/daily/') ? '0.7' : '0.8' })), ...posts.map(p => ({ loc: p.url, date: p.date || today, priority: '0.8' }))]
  write(path.join(publicDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.date}</lastmod><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`).join('\n')}\n</urlset>\n`)
}
function updateLlms(posts) {
  const lines = ['# VerifyAI', '', '> Reverse-image search for face photos; scam prevention notes for humans and AI crawlers.', '', '## Blog Hubs', '', `- [zh-Hant](${baseUrl}/blog/zh/)`, `- [English](${baseUrl}/blog/en/)`, `- [日本語](${baseUrl}/blog/ja/)`, '', '## Daily Scam Reports', '']
  for (const p of posts) lines.push(`- [${p.date} ${p.title}](${p.url}): ${p.description || ''}`)
  lines.push('', '## Founder Story', '', `- [Why I Built VerifyAI — zh](${baseUrl}/blog/why-i-built-verifyai-zh)`, `- [Why I Built VerifyAI — en](${baseUrl}/blog/why-i-built-verifyai-en)`, `- [Why I Built VerifyAI — ja](${baseUrl}/blog/why-i-built-verifyai-ja)`, '', '## Feeds', '', `- [All languages](${baseUrl}/blog/feed.xml)`, `- [zh-Hant](${baseUrl}/blog/zh/feed.xml)`, `- [English](${baseUrl}/blog/en/feed.xml)`, `- [Japanese](${baseUrl}/blog/ja/feed.xml)`)
  write(path.join(publicDir, 'llms.txt'), lines.join('\n') + '\n')
}
function updatePostsIndex(posts) {
  write(path.join(publicDir, 'posts-index.json'), JSON.stringify({ generated_at: new Date().toISOString(), posts }, null, 2) + '\n')
}
function updateIllustrations(posts) {
  const illustrations = posts.map(p => ({
    slug: p.slug,
    lang: p.lang,
    title: p.title,
    url: p.url,
    image: p.heroImage,
    alt: p.heroImageAltFinal || p.title,
    caption: p.heroImageCaptionFinal || '',
    source: p.illustrationSource,
  }))
  write(path.join(publicDir, 'blog', 'illustrations.json'), JSON.stringify({ generated_at: new Date().toISOString(), illustrations }, null, 2) + '\n')
}
copyLegacyToZh()
const posts = collectPosts()
assertBalancedLanguages(posts)
buildNavigation(posts)
for (const lang of Object.keys(languages)) {
  const langPosts = posts.filter(p => p.lang === lang)
  write(path.join(blogDir, lang, 'daily', 'index.html'), listHtml(lang, langPosts))
  write(path.join(blogDir, lang, 'feed.xml'), feedXml(lang, langPosts))
}
write(path.join(legacyDailyDir, 'index.html'), redirectHtml(`${baseUrl}/blog/zh/daily/`, 'VerifyAI 每日防詐快報'))
write(path.join(blogDir, 'feed.xml'), allFeedXml(posts))
updateSitemap(posts)
updateLlms(posts)
updatePostsIndex(posts)
updateIllustrations(posts)
console.log(`Generated ${posts.length} blog posts across ${Object.keys(languages).length} languages.`)
