# Shared Files — DO NOT EDIT WITHOUT TEAM APPROVAL

These files are shared across all team members. They live in `frontend/src/` and are used by all pages.

**Team Lead for shared changes: Rint**

If you need to modify any shared file:
1. Tell the team in the group chat
2. Get approval from Rint
3. Create a separate branch: `git checkout -b shared/<your-name>-<change>`
4. Make the change and create a Merge Request

---

## Folder Map: shared/ → frontend/src/

| This folder | Maps to in frontend | What it contains |
|---|---|---|
| `shared/components/ui/` | `frontend/src/components/ui/` | UI primitives (Button, Input, Modal, etc.) |
| `shared/components/layout/` | `frontend/src/components/layout/` | Page layouts (MainLayout, Navbar, Footer, etc.) |
| `shared/components/common/` | `frontend/src/components/common/` | Shared feature components (FilterBar, TeacherCard, etc.) |
| `shared/components/backgrounds/` | `frontend/src/components/backgrounds/` | Visual effects (Auth + Home pages ONLY) |
| `shared/hooks/` | `frontend/src/hooks/` | Custom hooks (useAuth, useTeachers, etc.) |
| `shared/services/` | `frontend/src/services/` | API services (authService, teacherService, etc.) |
| `shared/constants/` | `frontend/src/constants/` | Static data (filters, mockData, tokens) |
| `shared/lib/` | `frontend/src/lib/` | Utilities (cn function, i18n, translations) |
| `shared/utils/` | `frontend/src/utils/` | Helper functions |
| `shared/assets/` | `frontend/src/assets/` | Images (hero.png) |

---

## How to Import Shared Files (in your page files)

```javascript
// UI Components
import { Button, Input, Modal } from '@/components/ui'

// Common Components
import { FilterBar, PageCard, TeacherCard } from '@/components/common'

// Layout
import MainLayout from '@/components/layout/MainLayout'

// Hooks
import { useAuth } from '@/hooks'
import { useTeachers, useFilterBar } from '@/hooks'

// Services
import { teacherService, authService } from '@/services'

// Constants
import { majorOptions } from '@/constants/teacherFilters'

// Utility
import { cn } from '@/lib/utils'

// i18n
import { useTranslation } from '@/lib/LanguageProvider'
```

> Always use `@/` prefix — it maps to `frontend/src/` via `jsconfig.json`.
