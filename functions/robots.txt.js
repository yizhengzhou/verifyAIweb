// Cloudflare Pages Function: GET /robots.txt
// Override Cloudflare's auto-injected "Managed Content" block (which Disallows
// GPTBot / ClaudeBot / etc) by serving robots.txt from a Function instead of
// the static file pipeline. Function responses skip CF's robots.txt injection.

const ROBOTS = `User-agent: *
Content-signal: search=yes, ai-input=yes, ai-train=no, use=reference
Allow: /

Disallow: /deployment/
Disallow: /.git/

# AI agents explicitly welcome for search and answer citations.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: Amazonbot
Allow: /

Sitemap: https://verifyai.fork.work/sitemap.xml

# AI agent friendly endpoints:
# - /llms.txt — compact AI-readable profile (per https://llmstxt.org/)
# - /llms-full.txt — full knowledge base in plain text
# - /api/about, /api/features, /api/pricing, /api/use-cases, /api/faq — JSON
# - /api/posts/why-i-built-verifyai-{zh|en|ja} — founder story JSON
#
# This site also supports Cloudflare Markdown for Agents.
# Set request header \`Accept: text/markdown\` to receive HTML pages as Markdown.
`;

export async function onRequestGet() {
  return new Response(ROBOTS, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
