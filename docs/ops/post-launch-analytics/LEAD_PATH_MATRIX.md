# Lead path matrix

Intake mode: **whatsapp_and_email** (no HTML lead forms on `/contact` or `/diagnostic`).

Validation: `scripts/lead-path-validate.test.cjs` (static; does not send messages).

| Path | CTA | Destination | Prefill | Tracking | Safe attrs |
|------|-----|-------------|---------|----------|------------|
| `/contact` primary | WhatsApp | `wa.me/5511974273000` | Discuss operation text | `whatsapp_click` | `noopener noreferrer` |
| `/contact` email | mailto | `info@octusconsulting.com` | n/a | `email_click` | n/a |
| `/diagnostic` primary | WhatsApp assess | same E.164 | Assess situation text | `whatsapp_click` + `diagnostic_click` | yes |
| `/diagnostic` secondary | WhatsApp discuss | same E.164 | Discuss text | `whatsapp_click` (+ diag if on page) | yes |
| `/diagnostic` email | mailto | info@ | n/a | `email_click` | n/a |
| Global float | WhatsApp | discuss URL | discuss | `whatsapp_click` | yes |
| Footer WhatsApp | WhatsApp | discuss URL | discuss | `whatsapp_click` | yes |
| Footer email | mailto | info@ | n/a | `email_click` | n/a |
| Careers | email | careers/info paths in page | n/a | `email_click` if mailto | — |
| Compliance channel | published contact paths | page SoT | n/a | as applicable | — |

## Guarantees

- No sensitive credentials appended to URLs  
- Prefills use `encodeURIComponent` in `lib/cta.ts`  
- Automated tests must not open WhatsApp or send mail  
