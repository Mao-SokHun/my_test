# B Ratanak — Legal + Community Pages

## តួនាទី

Legal pages (terms, privacy, help, contact), community pages, admin support pages.

## Files

| File | Description |
|------|-------------|
| `legal/Contact.jsx` | Contact form page |
| `legal/Help.jsx` | Help & FAQ page |
| `legal/Privacy.jsx` | Privacy policy page |
| `legal/Terms.jsx` | Terms of service page |
| `community/CommunityDetail.jsx` | Community detail + posts feed |
| `community/CreateCommunity.jsx` | Create new community form |
| `admin/ContactSupport.jsx` | Admin — support tickets view |
| `admin/TermsOfService.jsx` | Admin — edit terms |
| `admin/PrivacyPolicy.jsx` | Admin — edit privacy |
| `NotFound.jsx` | 404 error page |

## Paste Location

```
B_Ratanak/legal/*.jsx      →  frontend/src/pages/legal/
B_Ratanak/community/*.jsx  →  frontend/src/pages/community/
B_Ratanak/admin/*.jsx      →  frontend/src/pages/admin/
B_Ratanak/NotFound.jsx     →  frontend/src/pages/NotFound.jsx
```

## Imports

```javascript
import { Button, PageCard, PageHeader, ContactForm } from '../../components'
import { PublicNavbar, AppFooter, PageAmbient } from '../../components'
import { CommunityPostCard, CommunityPostComposer } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import { communityService } from '../../services'
import { termsSections, privacySections, helpFaqs } from '../../constants/legalContent'
import { cn } from '../../lib/utils'
```

## Priority Order

1. `Terms.jsx` — display terms content
2. `Privacy.jsx` — display privacy content
3. `Help.jsx` — FAQ accordion + contact info
4. `Contact.jsx` — contact form
5. `CommunityDetail.jsx` — community page + posts feed
6. `CreateCommunity.jsx` — create community form
7. `ContactSupport.jsx` — admin support ticket view
8. `TermsOfService.jsx` — admin edit terms
9. `PrivacyPolicy.jsx` — admin edit privacy
10. `NotFound.jsx` — 404 error page

## Git Branch

```bash
git checkout -b feature/bratanak-legal-community
```
