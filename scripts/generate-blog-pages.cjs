/**
 * generate-blog-pages.js — VerifyAI 靜態部落格頁面產生器
 * 
 * 職責：
 * 1. 掃描 public/blog/{zh,en,ja}/daily/*.html 文章
 * 2. 從 HTML meta 擷取 title, description, date, slug, lang
 * 3. 生成各層 index.html 列表頁
 * 4. 更新 sitemap.xml 和 llms.txt
 *
 * 用法：node scripts/generate-blog-pages.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://verifyai.fork.work';
const BLOG_DIR = path.join(__dirname, '..', 'public', 'blog');
const LANGS = ['zh', 'en', 'ja'];

const LANG_CONFIG = {
  zh: {
    code: 'zh-Hant',
    name: '繁體中文',
    ogLocale: 'zh_TW',
    sectionName: '防詐快報',
    label: { blog: '部落格', daily: '每日快報', back: '回部落格首頁', noPosts: '尚無文章', description: 'VerifyAI 部落格 — 繁體中文' }
  },
  en: {
    code: 'en',
    name: 'English',
    ogLocale: 'en_US',
    sectionName: 'Scam Alert',
    label: { blog: 'Blog', daily: 'Daily Brief', back: 'Back to Blog', noPosts: 'No posts yet', description: 'VerifyAI Blog — English' }
  },
  ja: {
    code: 'ja',
    name: '日本語',
    ogLocale: 'ja_JP',
    sectionName: '詐欺速報',
    label: { blog: 'ブログ', daily: 'デイリー速報', back: 'ブログトップへ', noPosts: '記事はまだありません', description: 'VerifyAI ブログ — 日本語' }
  }
};

/** Extract metadata from an HTML file */
function extractMeta(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const meta = {};

  // Language from <html lang="...">
  const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/i);
  meta.lang = langMatch ? langMatch[1] : null;

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  meta.title = titleMatch ? titleMatch[1].trim() : null;

  // Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (!descMatch) {
    const descMatch2 = html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
    meta.description = descMatch2 ? descMatch2[1] : '';
  } else {
    meta.description = descMatch[1];
  }

  // Published date from article:published_time
  const dateMatch = html.match(/<meta\s+property=["']article:published_time["']\s+content=["']([^"']+)["']/i);
  if (!dateMatch) {
    const dateMatch2 = html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']article:published_time["']/i);
    meta.date = dateMatch2 ? dateMatch2[1] : null;
  } else {
    meta.date = dateMatch[1];
  }

  // Canonical URL
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    const canonicalMatch2 = html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);
    meta.canonical = canonicalMatch2 ? canonicalMatch2[1] : null;
  } else {
    meta.canonical = canonicalMatch[1];
  }

  // Slug from filename or canonical
  if (meta.canonical) {
    const slugMatch = meta.canonical.match(/\/([^/]+)$/);
    meta.slug = slugMatch ? slugMatch[1] : path.basename(filePath, '.html');
  } else {
    meta.slug = path.basename(filePath, '.html');
  }

  // OG Image
  const ogImgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  meta.ogImage = ogImgMatch ? ogImgMatch[1] : `${BASE_URL}/logov2.png`;

  // JSON-LD schema
  const ldMatch = html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
  meta.jsonLd = ldMatch ? ldMatch[1].trim() : null;

  return meta;
}

/** Get display date from ISO date */
function formatDate(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return isoDate;
  return d.toISOString().split('T')[0];
}

/** Generate daily list page for one language */
function generateDailyIndex(lang) {
  const cfg = LANG_CONFIG[lang];
  const dailyDir = path.join(BLOG_DIR, lang, 'daily');
  const posts = [];

  if (fs.existsSync(dailyDir)) {
    const files = fs.readdirSync(dailyDir)
      .filter(f => f.endsWith('.html') && !f.startsWith('.') && f !== 'index.html' && !f.includes('template'));

    for (const file of files) {
      const meta = extractMeta(path.join(dailyDir, file));
      if (meta.title && meta.date) {
        posts.push(meta);
      }
    }
  }

  // Sort by date descending
  posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  const hreflangLinks = LANGS.map(l => {
    const lcfg = LANG_CONFIG[l];
    return `  <link rel="alternate" hreflang="${lcfg.code}" href="${BASE_URL}/blog/${l}/daily/">`;
  }).join('\n');

  const postItems = posts.map(p => {
    const displayDate = formatDate(p.date);
    return `      <article class="post-card">
        <time datetime="${p.date}">${displayDate}</time>
        <h3><a href="${p.canonical}">${escHtml(p.title)}</a></h3>
        <p>${escHtml(p.description || '')}</p>
      </article>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="${cfg.code}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${cfg.label.daily} — VerifyAI</title>
<meta name="description" content="VerifyAI ${cfg.name} ${cfg.label.daily}。每日反詐騙新聞摘要與防詐知識。">
<link rel="canonical" href="${BASE_URL}/blog/${lang}/daily/">
<link rel="icon" href="/logov2.png">
<link rel="apple-touch-icon" href="/logov2.png">
<link rel="alternate" type="application/rss+xml" title="VerifyAI ${cfg.label.daily} RSS" href="${BASE_URL}/blog/${lang}/feed.xml">
<meta property="og:type" content="website">
<meta property="og:title" content="${cfg.label.daily} — VerifyAI">
<meta property="og:description" content="VerifyAI ${cfg.name} ${cfg.label.daily}。每日反詐騙新聞摘要與防詐知識。">
<meta property="og:url" content="${BASE_URL}/blog/${lang}/daily/">
<meta property="og:site_name" content="VerifyAI">
<meta property="og:image" content="${BASE_URL}/logov2.png">
<meta property="og:locale" content="${cfg.ogLocale}">
<meta name="twitter:card" content="summary_large_image">
${hreflangLinks}
<style>
  :root {
    --bg: #0a0a0a; --text: #e0e0e0; --accent: #00d4aa;
    --card-bg: #1a1a1a; --border: #333; --muted: #888;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6; min-height: 100vh;
  }
  .container { max-width: 800px; margin: 0 auto; padding: 2rem 1.5rem; }
  header { margin-bottom: 3rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
  header h1 { font-size: 2rem; color: var(--accent); margin-bottom: 0.5rem; }
  header .breadcrumb { font-size: 0.85rem; color: var(--muted); }
  header .breadcrumb a { color: var(--accent); text-decoration: none; }
  header .breadcrumb a:hover { text-decoration: underline; }
  .lang-switcher { display: flex; gap: 1rem; margin-bottom: 2rem; font-size: 0.9rem; }
  .lang-switcher a { color: var(--muted); text-decoration: none; padding: 0.25rem 0.5rem; border-radius: 4px; }
  .lang-switcher a.active { color: var(--accent); background: rgba(0,212,170,0.1); }
  .post-list { display: flex; flex-direction: column; gap: 1.5rem; }
  .post-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; }
  .post-card time { font-size: 0.8rem; color: var(--muted); display: block; margin-bottom: 0.5rem; }
  .post-card h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
  .post-card h3 a { color: var(--text); text-decoration: none; }
  .post-card h3 a:hover { color: var(--accent); }
  .post-card p { font-size: 0.9rem; color: var(--muted); }
  footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); text-align: center; font-size: 0.8rem; color: var(--muted); }
  footer a { color: var(--accent); text-decoration: none; }
  .empty { text-align: center; padding: 3rem; color: var(--muted); }
</style>
</head>
<body>
  <div class="container">
    <header>
      <div class="breadcrumb"><a href="/">VerifyAI</a> / <a href="/blog/${lang}/">${cfg.label.blog}</a> / ${cfg.label.daily}</div>
      <h1>📰 ${cfg.label.daily}</h1>
    </header>

    <nav class="lang-switcher">
      ${LANGS.map(l => {
        const lcfg = LANG_CONFIG[l];
        return `      <a href="/blog/${l}/daily/" ${l === lang ? 'class="active"' : ''}>${lcfg.name}</a>`;
      }).join('\n')}
    </nav>

    <div class="post-list">
      ${posts.length > 0 ? postItems : `      <div class="empty"><p>${cfg.label.noPosts}</p></div>`}
    </div>

    <footer>
      <p><a href="/blog/${lang}/">← ${cfg.label.back}</a></p>
      <p style="margin-top:1rem">&copy; fork inc. — VerifyAI</p>
    </footer>
  </div>
</body>
</html>`;
}

/** Generate language-level blog index page */
function generateLangIndex(lang) {
  const cfg = LANG_CONFIG[lang];
  const dailyDir = path.join(BLOG_DIR, lang, 'daily');
  const founderPosts = [];

  // Collect founder posts for this language
  const langPrefix = lang === 'zh' ? 'zh' : lang;
  const blogRoot = BLOG_DIR;
  if (fs.existsSync(blogRoot)) {
    const files = fs.readdirSync(blogRoot).filter(f => f.endsWith('.html') && f.includes('why-i-built') && f.includes(`-${langPrefix}`));
    for (const file of files) {
      const meta = extractMeta(path.join(blogRoot, file));
      if (meta.title) founderPosts.push(meta);
    }
  }

  // Count daily posts
  let dailyCount = 0;
  if (fs.existsSync(dailyDir)) {
    dailyCount = fs.readdirSync(dailyDir).filter(f => f.endsWith('.html') && !f.startsWith('.') && f !== 'index.html').length;
  }

  const hreflangLinks = LANGS.map(l => {
    const lcfg = LANG_CONFIG[l];
    return `  <link rel="alternate" hreflang="${lcfg.code}" href="${BASE_URL}/blog/${l}/">`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="${cfg.code}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${cfg.label.blog} — VerifyAI</title>
<meta name="description" content="${cfg.label.description}">
<link rel="canonical" href="${BASE_URL}/blog/${lang}/">
<link rel="icon" href="/logov2.png">
<link rel="apple-touch-icon" href="/logov2.png">
<link rel="alternate" type="application/rss+xml" title="VerifyAI ${cfg.label.blog} RSS" href="${BASE_URL}/blog/${lang}/feed.xml">
<meta property="og:type" content="website">
<meta property="og:title" content="${cfg.label.blog} — VerifyAI">
<meta property="og:description" content="${cfg.label.description}">
<meta property="og:url" content="${BASE_URL}/blog/${lang}/">
<meta property="og:site_name" content="VerifyAI">
<meta property="og:image" content="${BASE_URL}/logov2.png">
<meta property="og:locale" content="${cfg.ogLocale}">
<meta name="twitter:card" content="summary_large_image">
${hreflangLinks}
<style>
  :root {
    --bg: #0a0a0a; --text: #e0e0e0; --accent: #00d4aa;
    --card-bg: #1a1a1a; --border: #333; --muted: #888;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6; min-height: 100vh;
  }
  .container { max-width: 800px; margin: 0 auto; padding: 2rem 1.5rem; }
  header { margin-bottom: 3rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); text-align: center; }
  header h1 { font-size: 2.2rem; color: var(--accent); margin-bottom: 0.5rem; }
  header p { color: var(--muted); }
  .lang-switcher { display: flex; justify-content: center; gap: 1rem; margin-bottom: 2.5rem; font-size: 0.95rem; }
  .lang-switcher a { color: var(--muted); text-decoration: none; padding: 0.35rem 0.75rem; border-radius: 6px; border: 1px solid transparent; }
  .lang-switcher a.active { color: var(--accent); background: rgba(0,212,170,0.1); border-color: var(--accent); }
  .sections { display: grid; gap: 2rem; }
  .section-card {
    background: var(--card-bg); border: 1px solid var(--border); border-radius: 10px; padding: 2rem;
    transition: border-color 0.2s;
  }
  .section-card:hover { border-color: var(--accent); }
  .section-card h2 { font-size: 1.3rem; color: var(--accent); margin-bottom: 0.75rem; }
  .section-card h2 a { color: var(--accent); text-decoration: none; }
  .section-card .count { font-size: 0.85rem; color: var(--muted); margin-bottom: 0.5rem; }
  .section-card p { color: var(--muted); font-size: 0.9rem; }
  footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); text-align: center; font-size: 0.8rem; color: var(--muted); }
  footer a { color: var(--accent); text-decoration: none; }
</style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📝 ${cfg.label.blog}</h1>
      <p>${cfg.label.description}</p>
    </header>

    <nav class="lang-switcher">
      ${LANGS.map(l => {
        const lcfg = LANG_CONFIG[l];
        return `      <a href="/blog/${l}/" ${l === lang ? 'class="active"' : ''}>${lcfg.name}</a>`;
      }).join('\n')}
    </nav>

    <div class="sections">
      <div class="section-card">
        <h2><a href="/blog/${lang}/daily/">📰 ${cfg.label.daily}</a></h2>
        <div class="count">${dailyCount} ${lang === 'zh' ? '篇文章' : lang === 'ja' ? '件の記事' : 'articles'}</div>
        <p>${lang === 'zh' ? '每日反詐騙新聞摘要，從各大新聞來源自動彙整。'
            : lang === 'ja' ? '毎日の詐欺ニュースを主要ニュースソースから自動収集。'
            : 'Daily scam news briefs, auto-aggregated from major news sources.'}</p>
      </div>
      ${founderPosts.map(p => `
      <div class="section-card">
        <h2><a href="${p.canonical || BASE_URL + '/blog/' + path.basename(path.dirname(p.canonical || '')) + '/' + p.slug}">💡 ${escHtml(p.title)}</a></h2>
        <p>${escHtml(p.description || '')}</p>
      </div>`).join('')}
    </div>

    <footer>
      <p><a href="/">← VerifyAI 首頁</a></p>
      <p style="margin-top:1rem">&copy; fork inc. — VerifyAI</p>
    </footer>
  </div>
</body>
</html>`;
}

/** Generate sitemap.xml */
function generateSitemap() {
  const urls = [];

  // Add all blog pages
  for (const lang of LANGS) {
    const dailyDir = path.join(BLOG_DIR, lang, 'daily');
    urls.push({
      loc: `${BASE_URL}/blog/${lang}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '0.8'
    });
    urls.push({
      loc: `${BASE_URL}/blog/${lang}/daily/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '0.9'
    });

    if (fs.existsSync(dailyDir)) {
      const files = fs.readdirSync(dailyDir).filter(f => f.endsWith('.html') && !f.startsWith('.') && f !== 'index.html' && !f.includes('template'));
      for (const file of files) {
        const meta = extractMeta(path.join(dailyDir, file));
        const lastmod = meta.date ? meta.date.split('T')[0] : new Date().toISOString().split('T')[0];
        urls.push({
          loc: meta.canonical || `${BASE_URL}/blog/${lang}/daily/${file.replace('.html', '')}`,
          lastmod: lastmod,
          changefreq: 'weekly',
          priority: '0.7'
        });
      }
    }
  }

  // Add legacy daily posts
  const legacyDir = path.join(BLOG_DIR, 'daily');
  if (fs.existsSync(legacyDir)) {
    const files = fs.readdirSync(legacyDir).filter(f => f.endsWith('.html') && !f.startsWith('.') && f !== 'index.html' && !f.includes('template'));
    for (const file of files) {
      const meta = extractMeta(path.join(legacyDir, file));
      urls.push({
        loc: meta.canonical || `${BASE_URL}/blog/daily/${file.replace('.html', '')}`,
        lastmod: meta.date ? meta.date.split('T')[0] : new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.6'
      });
    }
  }

  // Add founder posts
  const blogRoot = BLOG_DIR;
  if (fs.existsSync(blogRoot)) {
    const founderFiles = fs.readdirSync(blogRoot).filter(f => f.endsWith('.html') && f.includes('why-i-built'));
    for (const file of founderFiles) {
      const meta = extractMeta(path.join(blogRoot, file));
      urls.push({
        loc: meta.canonical || `${BASE_URL}/blog/${file.replace('.html', '')}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.8'
      });
    }
  }

  const urlEntries = urls.map(u =>
    `  <url>
    <loc>${escXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

/** Generate llms.txt */
function generateLlmsTxt() {
  const entries = [];

  entries.push(`# VerifyAI — LLMs.txt`);
  entries.push(`> Website: ${BASE_URL}`);
  entries.push(`> Description: VerifyAI 反詐騙知識平台 — 每日防詐快報與防詐知識庫`);
  entries.push(``);

  // Lang-level index pages
  entries.push(`## Blog Indexes`);
  for (const lang of LANGS) {
    const cfg = LANG_CONFIG[lang];
    entries.push(`- [${cfg.name} Blog](${BASE_URL}/blog/${lang}/): ${cfg.label.description}`);
    entries.push(`- [${cfg.name} Daily](${BASE_URL}/blog/${lang}/daily/): ${cfg.label.daily}`);
  }

  entries.push(``);
  entries.push(`## Daily Posts`);

  for (const lang of LANGS) {
    const cfg = LANG_CONFIG[lang];
    const dailyDir = path.join(BLOG_DIR, lang, 'daily');
    if (fs.existsSync(dailyDir)) {
      const files = fs.readdirSync(dailyDir).filter(f => f.endsWith('.html') && !f.startsWith('.') && f !== 'index.html' && !f.includes('template'));
      if (files.length > 0) {
        entries.push(`### ${cfg.name}`);
        for (const file of files.sort().reverse()) {
          const meta = extractMeta(path.join(dailyDir, file));
          entries.push(`- [${escHtml(meta.title || file)}](${meta.canonical || `${BASE_URL}/blog/${lang}/daily/${file}`}): ${escHtml(meta.description || '').substring(0, 120)}`);
        }
      }
    }
  }

  // Legacy posts
  entries.push(``);
  entries.push(`## Legacy Posts (redirected to /blog/zh/daily/)`);
  const legacyDir = path.join(BLOG_DIR, 'daily');
  if (fs.existsSync(legacyDir)) {
    const files = fs.readdirSync(legacyDir).filter(f => f.endsWith('.html') && !f.startsWith('.') && f !== 'index.html' && !f.includes('template'));
    for (const file of files.sort().reverse()) {
      const meta = extractMeta(path.join(legacyDir, file));
      entries.push(`- [${escHtml(meta.title || file)}](${meta.canonical || `${BASE_URL}/blog/daily/${file}`})`);
    }
  }

  entries.push(``);
  entries.push(`## Founder Posts`);
  const blogRoot = BLOG_DIR;
  if (fs.existsSync(blogRoot)) {
    const founderFiles = fs.readdirSync(blogRoot).filter(f => f.endsWith('.html') && f.includes('why-i-built'));
    for (const file of founderFiles) {
      const meta = extractMeta(path.join(blogRoot, file));
      entries.push(`- [${escHtml(meta.title || file)}](${meta.canonical || `${BASE_URL}/blog/${file}`})`);
    }
  }

  entries.push(``);
  entries.push(`## Optional`);
  entries.push(`- [Sitemap](${BASE_URL}/sitemap.xml)`);
  for (const lang of LANGS) {
    entries.push(`- [${LANG_CONFIG[lang].name} RSS](${BASE_URL}/blog/${lang}/feed.xml)`);
  }

  return entries.join('\n');
}

/** HTML escape */
function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** XML escape */
function escXml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

// ─── Main ────────────────────────────────────────────────
console.log('🔍 Scanning blog posts...');

// Generate daily index pages
for (const lang of LANGS) {
  const dailyIndex = generateDailyIndex(lang);
  const destDir = path.join(BLOG_DIR, lang, 'daily');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(path.join(destDir, 'index.html'), dailyIndex, 'utf8');
  console.log(`  ✅ /blog/${lang}/daily/index.html`);
}

// Generate language-level index pages
for (const lang of LANGS) {
  const langIndex = generateLangIndex(lang);
  const destDir = path.join(BLOG_DIR, lang);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(path.join(destDir, 'index.html'), langIndex, 'utf8');
  console.log(`  ✅ /blog/${lang}/index.html`);
}

// Generate sitemap.xml
const sitemap = generateSitemap();
const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('  ✅ /sitemap.xml');

// Generate llms.txt
const llmsTxt = generateLlmsTxt();
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf8');
console.log('  ✅ /llms.txt');

console.log('\\n🎉 Blog pages regenerated successfully!');
