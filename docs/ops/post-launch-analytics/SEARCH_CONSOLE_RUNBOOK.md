# Search Console runbook (Rubio manual actions)

## Selected configuration

```text
PROPERTY_TYPE=Domain Property
VERIFICATION_METHOD=DNS TXT
DOMAIN=octusconsulting.com
SEARCH_CONSOLE_DNS_VERIFICATION_REQUIRED=true
SEARCH_CONSOLE_META_TOKEN_REQUIRED=false
```

**Do not invent tokens. Do not change DNS from the application or this agent session.**

## Rubio checklist (Domain Property — required path)

1. **Create or access the Domain Property** in Google Search Console for `octusconsulting.com` (covers apex and `www`).  
2. **Add the Google-provided DNS TXT record** at the DNS provider (exact value from Google). Wait for DNS propagation.  
3. **Wait for verification** until the Domain Property shows verified.  
4. **Submit sitemap:** `https://octusconsulting.com/sitemap.xml`  
5. **Request indexing** for Tier-1 URLs (home, key services hubs, contact, diagnostic, insights hub, jurisdictions hub — as prioritized commercially).  
6. **Record** verification date and property owner in the ops evidence pack.

## Optional HTML-tag path (not required for Domain Property)

`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` remains supported for **URL-prefix** HTML meta verification only. It is **not** required when using the Domain Property + DNS TXT workflow above.

If using URL-prefix HTML verification instead:

1. Copy the meta `content` token from Google.  
2. Set Vercel production env `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token>`.  
3. Redeploy production (separate approved release).  
4. Confirm `<meta name="google-site-verification" …>` on the live homepage.  

The app never writes DNS records.

## Preflight checks (already expected on production)

| Check | Expect |
|-------|--------|
| `https://octusconsulting.com/robots.txt` | 200 |
| `https://octusconsulting.com/sitemap.xml` | 200 |
| Canonical host | `https://octusconsulting.com` |
| Production apex/www | no production-wide `noindex` |
| Preview `*.vercel.app` | retains `X-Robots-Tag: noindex` |
