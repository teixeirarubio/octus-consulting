# Event dictionary

Single tracking layer: `lib/analytics/events.ts` (`trackEvent` → boolean) + document click capture + path view dispatcher.

Events fire only when **all** are true:

1. Hostname is `octusconsulting.com` or `www.octusconsulting.com`  
2. `NEXT_PUBLIC_GTM_ID` is a valid `GTM-*` value  
3. User granted analytics (`octus-consent-v2.analytics === true`)  

GA4 Measurement ID is configured **inside the GTM container**. The application does not require `NEXT_PUBLIC_GA4_MEASUREMENT_ID`.

## Events

| Event | Trigger | Notes |
|-------|---------|-------|
| `whatsapp_click` | Any `wa.me` / WhatsApp API anchor click | Includes nav, home CTAs, float, footer, contact, diagnostic, service pages |
| `email_click` | Any `mailto:` click | Destination = mailbox only; never message body / PII from draft |
| `diagnostic_click` | Only when `data-octus-event="diagnostic_click"` | See dual-fire note below |
| `services_view` | `/solutions`, `/solutions/*` | Once per path after successful enqueue |
| `industry_view` | `/markets`, `/markets/*` | Once per path after successful enqueue |
| `jurisdiction_view` | `/jurisdictions`, `/jurisdictions/*`, `/brazil` | Once per path after successful enqueue |
| `insight_view` | `/insights`, `/insights/*` | Once per path after successful enqueue |

## Parameters

| Param | When |
|-------|------|
| `page_path` | Always when available |
| `page_title` | Always when available |
| `cta_location` | Click events (`data-cta-location` or inferred landmark) |
| `cta_label` | Click events (trimmed label / aria-label) |
| `destination` | Click events (scheme+host+path or mailto mailbox; query stripped for WA base) |
| `content_type` | View events when slugable |
| `content_slug` | View events when slugable |
| `consent_state` | `granted` / `denied` analytics_storage mirror |

## Dual-fire: `diagnostic_click` + `whatsapp_click`

Canonical SoT for diagnostic:

```text
data-octus-event="diagnostic_click"
```

| CTA | whatsapp_click | diagnostic_click |
|-----|----------------|------------------|
| Discuss-operation WhatsApp | true | false |
| Floating WhatsApp | true | false |
| Footer WhatsApp | true | false |
| Partnership WhatsApp | true | false |
| Diagnostic primary assessment (`data-octus-event`) | true | true |
| Diagnostic secondary discuss CTA | true | false |

Do **not** classify diagnostic from pathname `/diagnostic`, shared `wa.me` phone base, or message query alone.

## Deduplication (views)

- `trackEvent()` returns whether the event was enqueued.  
- Deduplication key `event:pathname` is recorded **only after** successful enqueue.  
- If the user lands with analytics denied, then grants consent on the same page, the current-path view fires exactly once (`octus:consent-updated` re-evaluates).  
- Consent reopen without changing grant → no extra view.  
- Strict Mode / same-path re-render after enqueue → no duplicate.  
