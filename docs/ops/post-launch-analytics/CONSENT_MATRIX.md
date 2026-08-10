# Consent matrix (Consent Mode v2)

## UI actions

| Action | Necessary | Analytics | Decision stored |
|--------|-----------|-----------|-----------------|
| Accept all | granted (always) | granted (preference) | `accept_all` |
| Reject non-essential | granted | denied | `reject_non_essential` |
| Manage → Save | granted | user toggle | `custom` |
| No decision yet | granted | denied (default) | banner visible |

Analytics tags **do not load** until analytics is granted **and** GTM ID is configured **and** host gate passes. Accept all without a configured GTM ID stores the preference but still does not load tags.

## Consent Mode signals

| Signal | Default | After accept analytics | After reject |
|--------|---------|------------------------|--------------|
| `analytics_storage` | denied | granted | denied |
| `ad_storage` | denied | denied | denied |
| `ad_user_data` | denied | denied | denied |
| `ad_personalization` | denied | denied | denied |
| `functionality_storage` | granted | granted | granted |
| `security_storage` | granted | granted | granted |

Advertising tags are out of scope permanently in this architecture.

## Persistence

- Key: `octus-consent-v2` (JSON)  
- Legacy `octus-cookies-accepted` migrates to reject non-essential (analytics off)  
- Reopen: footer / Cookie Policy `Cookie preferences` → `octus:consent-reopen`  

## Accessibility

- Dialog region with labelled actions  
- Keyboard focusable controls  
- Mobile: no horizontal overflow; WhatsApp float remains lifted via `cookie-banner-visible`  
