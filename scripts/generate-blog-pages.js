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
function stripTags(s = '') { return s.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }
function firstMatch(text, regex, fallback = '') { const m = text.match(regex); return m ? m[1].trim() : fallback }
function noExt(file) { return path.basename(file).replace(/\.html$/, '') }
function slugUrl(lang, slug) { return `${baseUrl}/blog/${lang}/daily/${slug}.html` }
function langFromHtml(text, fallback = 'zh') {
  const htmlLang = firstMatch(text, /<html[^>]*\slang=["']([^"']+)["']/i, '')
  if (htmlLang.startsWith('en')) return 'en'
  if (htmlLang.startsWith('ja')) return 'ja'
  return fallback
}
function metadata(file, fallbackLang = 'zh') {
  const text = read(file)
  const slug = noExt(file)
  const lang = langFromHtml(text, fallbackLang)
  const titleRaw = firstMatch(text, /<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i, firstMatch(text, /<title>(.*?)<\/title>/is, slug))
  const title = titleRaw.replace(/\s+—\s+VerifyAI.*$/i, '').trim()
  const description = firstMatch(text, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i, stripTags(text).slice(0, 160))
  const dateIso = firstMatch(text, /<meta\s+property=["']article:published_time["']\s+content=["']([^"']*)["']/i, '')
  const date = dateIso ? dateIso.slice(0, 10) : (slug.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '')
  return { file, slug, lang, title, description, date, dateIso, url: slugUrl(lang, slug), legacy: file.includes('/blog/daily/') }
}
function listHtml(lang, posts) {
  const cfg = languages[lang]
  const items = posts.map(p => `
    <article class="post-card">
      <time datetime="${escapeHtml(p.date)}">${escapeHtml(p.date)}</time>
      <h2><a href="/blog/${lang}/daily/${p.slug}.html">${escapeHtml(p.title)}</a></h2>
      <p>${escapeHtml(p.description || '')}</p>
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
<style>
:root{--teal:#3CB39B;--bg:#0E1414;--fg:#E8EDED;--muted:#A8B5B5;--border:#1F2828}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:-apple-system,BlinkMacSystemFont,"Inter","Noto Sans TC","Noto Sans JP",sans-serif;line-height:1.7}.wrap{max-width:860px;margin:0 auto;padding:56px 24px 88px}.brand{color:var(--teal);font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-size:13px}h1{font-size:clamp(32px,5vw,52px);line-height:1.08;margin:16px 0 12px}p.lead{color:var(--muted);font-size:18px;margin:0 0 32px}.lang{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0 40px}.lang a{color:var(--fg);text-decoration:none;border:1px solid var(--border);padding:6px 10px;border-radius:6px}.lang a.active{background:var(--teal);color:#001;border-color:var(--teal)}.post-card{border-top:1px solid var(--border);padding:24px 0}.post-card time{color:var(--muted);font-size:13px}.post-card h2{font-size:24px;line-height:1.25;margin:6px 0 8px}.post-card a{color:var(--fg);text-decoration:none}.post-card a:hover{color:var(--teal)}.post-card p{color:var(--muted);margin:0}.empty{color:var(--muted)}footer{border-top:1px solid var(--border);margin-top:48px;padding-top:24px;color:var(--muted);font-size:14px}footer a{color:var(--teal)}
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
  const staticUrls = ['/', '/llms.txt', '/llms-full.txt', '/blog/why-i-built-verifyai-zh', '/blog/why-i-built-verifyai-en', '/blog/why-i-built-verifyai-ja']
  const urls = [...staticUrls.map(u => ({ loc: `${baseUrl}${u}`, date: '2026-06-11', priority: u === '/' ? '1.0' : '0.8' })), ...posts.map(p => ({ loc: p.url, date: p.date || '2026-06-11', priority: '0.8' }))]
  write(path.join(publicDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.date}</lastmod><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`).join('\n')}\n</urlset>\n`)
}
function updateLlms(posts) {
  const lines = ['# VerifyAI', '', '> Reverse-image search for face photos; scam prevention notes for humans and AI crawlers.', '', '## Daily Scam Reports', '']
  for (const p of posts) lines.push(`- [${p.date} ${p.title}](${p.url}): ${p.description || ''}`)
  lines.push('', '## Feeds', '', `- [All languages](${baseUrl}/blog/feed.xml)`, `- [zh-Hant](${baseUrl}/blog/zh/feed.xml)`, `- [English](${baseUrl}/blog/en/feed.xml)`, `- [Japanese](${baseUrl}/blog/ja/feed.xml)`)
  write(path.join(publicDir, 'llms.txt'), lines.join('\n') + '\n')
}
function updatePostsIndex(posts) {
  write(path.join(publicDir, 'posts-index.json'), JSON.stringify({ generated_at: new Date().toISOString(), posts }, null, 2) + '\n')
}
copyLegacyToZh()
const posts = collectPosts()
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
console.log(`Generated ${posts.length} blog posts across ${Object.keys(languages).length} languages.`)
