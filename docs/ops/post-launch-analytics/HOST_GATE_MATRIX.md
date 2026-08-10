# Host gate matrix

Implementation: `lib/analytics/hostGate.ts`  
Tests: `lib/analytics/hostGate.test.cjs`

| Hostname | Tracking allowed | Reason |
|----------|------------------|--------|
| `octusconsulting.com` | yes | production_host |
| `www.octusconsulting.com` | yes | production_host |
| `localhost` | no | local_dev |
| `127.0.0.1` | no | local_dev |
| `*.vercel.app` | no | vercel_preview_host |
| Other | no | non_production_host |

Additional gates (all required):

1. Valid `NEXT_PUBLIC_GTM_ID`  
2. Analytics consent granted  

Preview deployments must remain noindex (existing `vercel.json` header) and must not load GTM.
