# VerifyAI Landing Page dependency security audit

Audit date: 2026-07-15 (Asia/Taipei)
Deployment baseline: `origin/main` at `b2c53e0`
Local working branch at audit start: `main` at `5a8ee3c` with unrelated staged, unstaged, and untracked work

## Executive summary

`npm audit` initially reported 7 vulnerable package entries: 1 low, 1 moderate, and 5 high. The count represented seven affected dependency nodes, not seven independently reachable production exploits.

The deployed site is a statically built React/Vite site on Cloudflare Pages. The Babel, Picomatch, PostCSS, Rollup, and Vite findings affect local or CI build/development tooling and are not shipped as executable packages in the browser bundle. The React Router advisories concern React Router framework server endpoints and document mutation handling that this client-side SPA does not expose. No currently deployed attack path was identified.

All findings nevertheless had non-breaking fixes inside the dependency ranges already declared in `package.json`. Running `npm audit fix` without `--force` changed only `package-lock.json`, retained the existing direct-dependency major versions, and reduced the audit result to 0 vulnerabilities. `npm ci`, the production build, sitemap XML validation, and local metadata checks passed.

The dependency update is safe to deploy. A separate pre-existing content-signal inconsistency was found during live verification: Markdown responses currently advertise `ai-train=yes`, while `public/_headers` and the readiness documentation say `ai-train=no`. This is caused by the explicit header in `functions/_middleware.js`, is unrelated to the dependency update, and was intentionally not bundled into this security patch.

## Baseline and scope

- Latest fetched remote baseline: `origin/main` = `b2c53e0` (`Document live Cloudflare content signals`).
- The original local branch was behind the remote and contained unrelated work. No unrelated file was reset, cleaned, staged, or modified for this audit.
- Direct production dependencies: React, React DOM, React Router DOM, Framer Motion, and Lucide React.
- Direct build dependencies: Vite and `@vitejs/plugin-react`.
- `package.json` did not require a change because its existing caret ranges already admit all patched versions.
- `.github/workflows/deploy.yml` already uses `actions/checkout@v4`, `actions/setup-node@v4`, and Node 20. No workflow change was made. The workflow's selected Node build version is distinct from the JavaScript runtime used internally by a GitHub Action; no repository-side action upgrade was indicated by the inspected workflow.

## Findings and reachability

| Package / advisory | Severity | Dependency path | Affected version | Patched version | Production reachable? | Assessment |
| --- | --- | --- | --- | --- | --- | --- |
| `@babel/core` [GHSA-4x5r-pxfx-6jf8](https://github.com/advisories/GHSA-4x5r-pxfx-6jf8), arbitrary file read through `sourceMappingURL` | Low | `@vitejs/plugin-react` -> `@babel/core` | `7.29.0` | `7.29.7` | No | Development/build-time transform only. Exploitation requires Babel to process attacker-controlled source or source-map references on the build host; Babel is not in the browser output. |
| `picomatch` [GHSA-3v7f-55p6-f55p](https://github.com/advisories/GHSA-3v7f-55p6-f55p), POSIX class method injection | Moderate | `vite` -> `picomatch`; `vite` -> `fdir` -> `picomatch`; `vite` -> `tinyglobby` -> `picomatch` | `4.0.3` | `4.0.5` | No | Build/dev glob matching only. The deployed static site accepts no user-controlled glob patterns. |
| `picomatch` [GHSA-c2c7-rcm5-vvqj](https://github.com/advisories/GHSA-c2c7-rcm5-vvqj), extglob ReDoS | High | Same paths as above | `4.0.3` | `4.0.5` | No | Requires attacker-controlled glob input to a long-running Node process. No such process or input exists in the deployed site. |
| `postcss` [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93), unescaped `</style>` during CSS stringify | Moderate | `vite` -> `postcss` | `8.5.6` | `8.5.19` | No | CSS is compiled from repository-controlled source during build. The production site does not stringify user-supplied CSS. |
| `react-router` [GHSA-8x6r-g9mw-2r78](https://github.com/advisories/GHSA-8x6r-g9mw-2r78), unbounded `__manifest` path expansion DoS | High | `react-router-dom` -> `react-router` | `7.14.2` | `7.18.1` | No for this architecture | The site uses React Router in a Vite client SPA and has no React Router framework server or `__manifest` endpoint. Cloudflare serves static output and separate Pages Functions. |
| `react-router` [GHSA-84g9-w2xq-vcv6](https://github.com/advisories/GHSA-84g9-w2xq-vcv6), potential CSRF for PUT/PATCH/DELETE document requests | Low advisory within a high affected node | `react-router-dom` -> `react-router` | `7.14.2` | `7.18.1` | No for this architecture | The SPA does not expose React Router framework document-action routes. Its API Pages Functions are separate from React Router. |
| `rollup` [GHSA-mw96-cpmx-2vgc](https://github.com/advisories/GHSA-mw96-cpmx-2vgc), arbitrary file write through path traversal | High | `vite` -> `rollup` | `4.57.1` | `4.62.2` | No | Build-time bundler only. Risk would require malicious build input or plugin behavior on the build runner; Rollup is absent from the deployed browser bundle. |
| `vite` [GHSA-4w7w-66w2-5vf9](https://github.com/advisories/GHSA-4w7w-66w2-5vf9), optimized dependency source-map path traversal | Moderate | Direct dev dependency | `6.4.1` | `6.4.3` | No | Applies to Vite's development server. The production deployment serves `dist`, not a Vite server. |
| `vite` [GHSA-p9ff-h696-f583](https://github.com/advisories/GHSA-p9ff-h696-f583), arbitrary file read through dev-server WebSocket | High | Direct dev dependency | `6.4.1` | `6.4.3` | No | Requires access to a running Vite development server. None is deployed publicly. |
| `vite` [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3), Windows UNC/NTLMv2 disclosure through launch-editor | Moderate | Direct dev dependency | `6.4.1` | `6.4.3` | No | Development-only and Windows-specific; the Cloudflare build/deployment does not expose Vite's editor-launch endpoint. |
| `vite` [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff), Windows alternate-path `server.fs.deny` bypass | High | Direct dev dependency | `6.4.1` | `6.4.3` | No | Development-server and Windows-specific. It is not present in the static production runtime. |

`npm audit` groups multiple advisories under the affected `vite`, `picomatch`, and `react-router` nodes. That is why the advisory rows above outnumber the seven vulnerable package entries in the original summary.

## Changes made

- Updated only `package-lock.json` using `npm audit fix` without `--force`.
- Updated resolved packages include:
  - `@babel/core` `7.29.0` -> `7.29.7`
  - `picomatch` `4.0.3` -> `4.0.5`
  - `postcss` `8.5.6` -> `8.5.19`
  - `react-router` and `react-router-dom` `7.14.2` -> `7.18.1`
  - `rollup` `4.57.1` -> `4.62.2`
  - `vite` `6.4.1` -> `6.4.3`
- `package.json`: unchanged.
- GitHub Actions workflow: unchanged.
- No forced or breaking dependency upgrade was used.

## Deferred findings

No npm advisory was deferred: all available fixes were compatible and passed local verification.

The following unrelated deployment-policy mismatch is deferred to a separate change:

- `public/_headers` specifies `Content-Signal: search=yes, ai-input=yes, ai-train=no`.
- `functions/_middleware.js` explicitly returns `Content-Signal: ai-train=yes, search=yes, ai-input=yes` for `Accept: text/markdown`.
- Live verification confirmed that the middleware value wins for Markdown responses.
- A future change should select one policy, align the middleware and documentation, deploy it, and recheck the response header. This audit does not silently choose a training policy on the user's behalf.

## Verification results

### Dependency and build checks

- `npm ci`: passed; 75 packages installed from the lockfile.
- `npm audit --json`: passed with 0 low, 0 moderate, 0 high, 0 critical; 0 total vulnerabilities.
- `npm run build`: passed with Vite `6.4.3`; 1,728 modules transformed; six SEO guide pages generated.
- `xmllint --noout dist/sitemap.xml`: passed.
- Homepage production artifact contains title, canonical link, `SoftwareApplication` JSON-LD, and App Store app ID `6754511420`.
- All six generated guide artifacts contain a canonical link and `HowTo` JSON-LD.

### Live baseline and post-deployment checks

Baseline cache-busting query: `?audit=20260715`. Post-deployment cache-busting query: `?audit=d4a42fd`.

- Homepage: HTTP 200.
- All six `/guides/` pages: HTTP 200.
- App icon and all five App Store screenshots: HTTP 200 with image content types.
- `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and `/llms-full.txt`: HTTP 200.
- App Store CTA resolves to app ID `6754511420` in the retrieved homepage content.
- `Accept: text/markdown`: HTTP 200, `content-type: text/markdown; charset=utf-8`, and `Vary: Accept`.
- Content-signal caveat: the live Markdown response returned `ai-train=yes, search=yes, ai-input=yes`; see Deferred findings.
- The post-deployment homepage referenced `assets/index-BYuiYpqC.js`, matching the clean Vite build from the security commit rather than the earlier cached bundle.

## Commit, Actions, and deployment status

- Security patch commit: `d4a42fd0374dabfea6a727e955636b8c19362d3c` (`Audit and patch npm dependencies`).
- GitHub Actions workflow: [Deploy to Cloudflare Pages run 29419930333](https://github.com/yizhengzhou/verifyAIweb/actions/runs/29419930333), completed with conclusion `success`.
- Cloudflare deployment: propagated successfully; the cache-busted homepage served the clean-build asset from the security commit.
- Final live verification: passed for the homepage, all six guides, app icon, five screenshots, sitemap, robots file, and both llms files. The documented content-signal mismatch remains unchanged and deferred.

## Manual follow-up

1. Decide whether Markdown responses should permit training (`ai-train=yes`) or opt out (`ai-train=no`), then align `functions/_middleware.js`, `public/_headers`, and `docs/CLOUDFLARE_AI_READINESS.md` in a separate change.
2. Continue routine Dependabot/npm audit monitoring because build-only findings can still affect CI integrity even when they are not production reachable.
