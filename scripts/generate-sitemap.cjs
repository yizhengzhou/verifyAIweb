/**
 * generate-sitemap.cjs — VerifyAI 全域 Sitemap 產生器
 *
 * 掃描 public/ 下所有靜態 HTML 頁面，產生完整 sitemap.xml
 * 用法：node scripts/generate-sitemap.cjs
 */
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://verifyai.fork.work';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const TODAY = new Date().toISOString().split('T')[0];

/** Priority and changefreq rules per path pattern */
const RULES = [
  // Home
  { test: /^index\.html$/,           freq: 'weekly',   pri: '1.0' },
  // Guides (content pages)
  { test: /^guides\/.+/,             freq: 'monthly',  pri: '0.9' },
  // Blog index pages
  { test: /^blog\/[^/]+\/index\.html$/, freq: 'daily', pri: '0.8' },
  // Blog daily posts
  { test: /^blog\/.+\/daily\/.+/,    freq: 'weekly',   pri: '0.7' },
  // Blog root
  { test: /^blog\/index\.html$/,     freq: 'daily',    pri: '0.8' },
  // Privacy / Terms
  { test: /^privacy\.html$/,         freq: 'yearly',   pri: '0.4' },
  { test: /^terms\.html$/,          freq: 'yearly',   pri: '0.4' },
  // AI files
  { test: /^llms/,                   freq: 'monthly',  pri: '0.6' },
  // Ads / landing pages
  { test: /^ads\//,                  freq: 'monthly',  pri: '0.5' },
];

/** Pick the first matching rule, or default */
function classify(relPath) {
  for (const r of RULES) {
    if (r.test.test(relPath)) return { freq: r.freq, pri: r.pri };
  }
  return { freq: 'monthly', pri: '0.5' };
}

/** Escape XML entities */
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Walk public/ directory for HTML pages */
function collect() {
  const urls = [];

  function walk(dir, baseRel) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = baseRel ? `${baseRel}/${e.name}` : e.name;
      if (e.isDirectory()) {
        walk(full, rel);
      } else if (e.name.endsWith('.html')) {
        // Skip templates and index files that redirect
        if (e.name.includes('template')) continue;
        if (e.name === 'index.html' && rel === 'index.html') {
          // Root index → /
          urls.push({ loc: BASE_URL + '/', rel: 'index.html' });
          continue;
        }
        // Convert to URL path
        let urlPath;
        if (e.name === 'index.html') {
          // dir/index.html → /dir/
          urlPath = '/' + rel.replace(/\/index\.html$/, '') + '/';
        } else {
          // other.html → /other
          urlPath = '/' + rel.replace(/\.html$/, '');
        }
        urls.push({ loc: BASE_URL + urlPath, rel });
      }
    }
  }

  walk(PUBLIC_DIR, '');
  return urls;
}

function generate() {
  const pages = collect();
  console.log(`Found ${pages.length} HTML pages.`);

  const entries = pages.map(p => {
    const rule = classify(p.rel);
    return `  <url>
    <loc>${esc(p.loc)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${rule.freq}</changefreq>
    <priority>${rule.pri}</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log('✅  /sitemap.xml — ' + pages.length + ' URLs');
}

generate();