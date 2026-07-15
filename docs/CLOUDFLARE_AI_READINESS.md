# Cloudflare AI readiness and post-deploy verification

Updated: 2026-07-15

## Current verified state

- The live zone already has **Markdown for Agents** enabled. A request to `https://verifyai.fork.work/` with `Accept: text/markdown` returned `content-type: text/markdown` on 2026-07-15.
- The repository publishes `/llms.txt` and `/llms-full.txt`.
- `/robots.txt` is served by `functions/robots.txt.js`, explicitly allows major search and AI answer crawlers, and points to the sitemap.
- The origin now sends `Content-Signal: search=yes, ai-input=yes, ai-train=no`. This invites search indexing and real-time AI answer use while opting out of model training.
- The sitemap intentionally prioritizes the homepage, six task-focused guides, policies, and AI-readable files. The old low-value blog is not part of the canonical discovery set.

## Recommended Cloudflare dashboard settings

Cloudflare dashboard → select `verifyai.fork.work` zone → **AI Crawl Control**:

1. Keep **Markdown for Agents** enabled.
2. In **Manage AI Crawlers**, choose **Allow** for crawlers that can produce search results, citations, or referrals. At minimum review Googlebot, Bingbot, Applebot, GPTBot, ClaudeBot, PerplexityBot, and relevant search/AI assistants.
3. Do not enable a blanket AI crawler block. VerifyAI's goal is discovery and citation.
4. Open the **Directives** tab after deployment and confirm `/robots.txt` is available and there are no unexpected violations.
5. Leave Cloudflare's managed training-blocking `robots.txt` disabled unless its generated rules have been reviewed. This project already supplies an intentional, product-specific robots file; managed rules can be prepended and may conflict with the desired allow policy.
6. If **Content Signals Policy** is shown, confirm the effective policy is `search=yes, ai-input=yes, ai-train=no`. The origin header is authoritative for Markdown for Agents responses.

## Why these content signals

- `search=yes`: allow conventional indexing and discovery.
- `ai-input=yes`: allow the page to be used for live AI answers and citations.
- `ai-train=no`: opt out of training/fine-tuning use; training is not required for referral traffic or answers.

These directives express a preference; `robots.txt` compliance is voluntary. Cloudflare AI Crawl Control can enforce crawler-level allow/block decisions separately.

## Verification commands

Run after Cloudflare deployment finishes:

```bash
curl -sS -D - -o /tmp/verifyai.md \
  -H 'Accept: text/markdown' \
  'https://verifyai.fork.work/'

head -40 /tmp/verifyai.md
curl -sS 'https://verifyai.fork.work/robots.txt'
curl -sS 'https://verifyai.fork.work/llms.txt'
curl -sS 'https://verifyai.fork.work/sitemap.xml'
```

Expected homepage response headers:

```text
content-type: text/markdown; charset=utf-8
content-signal: search=yes, ai-input=yes, ai-train=no
vary: Accept
```

Also verify all six guide URLs return HTTP 200 and that the Markdown response contains the new homepage headline rather than the retired blog-first content.

## API alternative

If Markdown for Agents ever becomes disabled, Cloudflare documents this API setting:

```bash
curl -X PATCH \
  'https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/content_converter' \
  -H 'Authorization: Bearer {api_token}' \
  -H 'Content-Type: application/json' \
  --data '{"value":"on"}'
```

The token requires **Zone Settings: Edit**. Do not store the token in this repository. Dashboard path: **AI Crawl Control → Markdown for Agents**.

## Official references

- https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
- https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/
- https://developers.cloudflare.com/ai-crawl-control/features/track-robots-txt/
- https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/
