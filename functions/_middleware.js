/**
 * Cloudflare Pages Middleware
 *
 * Implements "Markdown for Agents" for the free plan:
 * When a request contains `Accept: text/markdown`, serve the
 * Markdown version of the site (llms.txt) instead of HTML.
 *
 * This replicates Cloudflare's Pro-plan "Markdown for Agents" feature
 * without needing a paid plan.
 *
 * Usage (for AI agents / curl):
 *   curl https://verifyai01.pages.dev/ -H "Accept: text/markdown"
 */
export async function onRequest(context) {
    const { request, next } = context;
    const accept = request.headers.get("Accept") || "";

    // Check if the client prefers text/markdown
    if (accept.includes("text/markdown")) {
        const url = new URL(request.url);
        // Serve /llms.txt as the Markdown representation of the site
        const mdUrl = new URL("/llms.txt", url.origin);
        const mdResponse = await fetch(mdUrl.toString());

        if (mdResponse.ok) {
            const markdown = await mdResponse.text();
            return new Response(markdown, {
                status: 200,
                headers: {
                    "Content-Type": "text/markdown; charset=utf-8",
                    "Vary": "Accept",
                    // Content Signals — mirrors Cloudflare's default policy
                    "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
                    "Cache-Control": "public, max-age=3600",
                },
            });
        }
    }

    // Otherwise, serve the normal response
    const response = await next();

    // Add Vary: Accept to all responses so caches know content varies
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Vary", "Accept");

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
    });
}
