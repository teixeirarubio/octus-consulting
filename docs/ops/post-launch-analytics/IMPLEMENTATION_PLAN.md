# Post-launch analytics — implementation plan

**Branch:** `feat/post-launch-analytics-consent`  
**Baseline main:** `1c022f8490ba9ec359850d3d606b03ab165b54dd`  
**Status:** Architecture ready for credentials — Sol classification/view corrections applied.

## Goals

1. GTM as orchestration layer  
2. GA4 through GTM only (no direct gtag; GA4 ID configured inside GTM)  
3. Consent Mode v2 preference UI  
4. Commercial conversion events  
5. Search Console Domain Property readiness (DNS TXT — manual)  
6. Lead-path validation (WhatsApp / email; no forms)

## Non-goals / hard stops

- Do not invent GTM / GA4 / Search Console IDs  
- Do not deploy production  
- Do not modify DNS  
- Do not merge until Rubio provides credentials and approves  
- No Meta Pixel / LinkedIn Insight / advertising tags  
- No copy/IA/visual redesign beyond consent UI necessities  

## Architecture

| Layer | Location | Behavior when IDs absent |
|-------|----------|--------------------------|
| Config | `lib/analytics/config.ts` | Tracking inert |
| Host gate | `lib/analytics/hostGate.ts` | Non-prod hosts never track |
| Consent | `lib/analytics/consent.ts` + `CookieBanner` | Preference model; analytics default denied |
| Events | `lib/analytics/events.ts` + trackers | No `dataLayer` push without gates; `trackEvent` returns enqueue boolean |
| Classification | `lib/analytics/clickClassification.ts` | `diagnostic_click` only via `data-octus-event` |
| View dispatch | `lib/analytics/viewDispatch.ts` | Dedupe only after successful enqueue; consent-updated re-eval |
| GTM load | `components/analytics/GtmBootstrap.tsx` | Script inject only after analytics consent + prod host + `NEXT_PUBLIC_GTM_ID` |
| GSC meta | `app/layout.tsx` metadata.verification | Optional URL-prefix only when env set |

## Env vars

```text
NEXT_PUBLIC_GTM_ID                 # required by application to load GTM
# GA4 Measurement ID               # configured inside GTM — not an app env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION  # optional HTML meta; Domain Property uses DNS TXT
```

## Rollout sequence (after credentials)

1. Rubio creates GTM + GA4; maps GA4 via GTM (not direct site gtag)  
2. Rubio supplies `NEXT_PUBLIC_GTM_ID` to Vercel **production** env only  
3. Rubio completes Search Console **Domain Property DNS TXT** (see SEARCH_CONSOLE_RUNBOOK.md)  
4. Human approve → merge → production deploy (separate mandate)  

## Phase audit (pre-change on main)

```text
GTM_PRESENT=false
GA4_PRESENT=false
GOOGLE_SITE_VERIFICATION_PRESENT=false
COOKIE_BANNER_MODE=essential_only → replaced by consent preference model
CONTACT_INTAKE_MODE=whatsapp_and_email
DIAGNOSTIC_INTAKE_MODE=whatsapp_and_email
```
