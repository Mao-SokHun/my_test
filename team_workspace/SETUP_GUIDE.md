# How to Paste Your Files into the Project

## Step 1: Clone Project from GitLab

```bash
git clone <gitlab-url>
cd "Rok Kru Platform"
```

Project structure after clone:

```
Rok Kru Platform/
├── frontend/
│   ├── src/
│   │   ├── components/     ← SHARED (don't edit alone)
│   │   │   ├── ui/         ← 13 files — UI Primitives (Button, Input, Modal, etc.)
│   │   │   ├── layout/     ← 11 files — Page Layouts (MainLayout, AdminLayout, AppLayout, etc.)
│   │   │   ├── common/     ← 43 files — Shared Components (FilterBar, TeacherCard, etc.)
│   │   │   └── backgrounds/← 13 files — Animations (Auth + Home ONLY, NOT student/teacher)
│   │   ├── hooks/          ← 23 files — Custom Hooks (useAuth, useTeachers, etc.)
│   │   ├── services/       ← 20 files — API Services (authService, teacherService, etc.)
│   │   ├── constants/      ← 14 files — Static Data (filters, mockData, tokens, etc.)
│   │   ├── lib/            ← 12 files — Utilities & i18n (cn, LanguageProvider, etc.)
│   │   ├── utils/          ← 4 files — Helper Functions
│   │   ├── assets/         ← 2 files — Images (hero.png, vite.svg)
│   │   ├── pages/          ← YOUR FILES GO HERE ⬅️
│   │   │   ├── auth/       ← Phy
│   │   │   ├── onboarding/ ← Phy
│   │   │   ├── student/    ← Rint + Heang
│   │   │   ├── teacher/    ← Hun + Phy
│   │   │   ├── admin/      ← B Nang + B Ratanak
│   │   │   ├── community/  ← B Ratanak
│   │   │   ├── legal/      ← B Ratanak
│   │   │   └── NotFound.jsx← B Ratanak
│   │   ├── App.jsx         ← Router (SHARED — don't edit alone)
│   │   ├── main.jsx        ← Entry Point (SHARED)
│   │   ├── i18n.js         ← i18n barrel exports (SHARED)
│   │   └── index.css       ← Tailwind Styles (SHARED)
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── components.json     ← shadcn/ui CLI config
│   └── jsconfig.json       ← Path alias (@/ → src/)
│
├── backend_rokkru/          ← Backend API (Node.js + Express + PostgreSQL)
├── team_workspace/          ← Team workspace files (this folder)
└── docs/                    ← Project documentation
```

---

## Step 2: Paste Your Files

### Rint — Student Core

Copy from `team_workspace/Rint/student/` to `frontend/src/pages/student/`:

```
Rint/student/Home.jsx           → frontend/src/pages/student/Home.jsx
Rint/student/Schedule.jsx       → frontend/src/pages/student/Schedule.jsx
Rint/student/SearchResults.jsx  → frontend/src/pages/student/SearchResults.jsx
Rint/student/Leaderboard.jsx    → frontend/src/pages/student/Leaderboard.jsx
Rint/student/TeacherDetail.jsx  → frontend/src/pages/student/TeacherDetail.jsx
Rint/student/BookSession.jsx    → frontend/src/pages/student/BookSession.jsx
```

---

### Heang — Student Social

Copy from `team_workspace/Heang/student/` to `frontend/src/pages/student/`:

```
Heang/student/Profile.jsx            → frontend/src/pages/student/Profile.jsx
Heang/student/Messages.jsx           → frontend/src/pages/student/Messages.jsx
Heang/student/Notifications.jsx      → frontend/src/pages/student/Notifications.jsx
Heang/student/Community.jsx          → frontend/src/pages/student/Community.jsx
Heang/student/SessionReview.jsx      → frontend/src/pages/student/SessionReview.jsx
Heang/student/StudentEditProfile.jsx → frontend/src/pages/student/StudentEditProfile.jsx
```

---

### Hun — Teacher

Copy from `team_workspace/Hun/teacher/` to `frontend/src/pages/teacher/`:

```
Hun/teacher/TeacherHome.jsx          → frontend/src/pages/teacher/TeacherHome.jsx
Hun/teacher/Analytics.jsx            → frontend/src/pages/teacher/Analytics.jsx
Hun/teacher/TeacherMyProfile.jsx     → frontend/src/pages/teacher/TeacherMyProfile.jsx
Hun/teacher/TeacherPublicProfile.jsx → frontend/src/pages/teacher/TeacherPublicProfile.jsx
Hun/teacher/TeacherCreatePost.jsx    → frontend/src/pages/teacher/TeacherCreatePost.jsx
Hun/teacher/EditProfile.jsx          → frontend/src/pages/teacher/EditProfile.jsx
Hun/teacher/ProfileSetting.jsx       → frontend/src/pages/teacher/ProfileSetting.jsx
```

---

### Phy — Auth + Onboarding

Copy from `team_workspace/Phy/` to 3 different folders:

**Auth pages → `frontend/src/pages/auth/`**
```
Phy/auth/Login.jsx             → frontend/src/pages/auth/Login.jsx
Phy/auth/CreateAccount.jsx     → frontend/src/pages/auth/CreateAccount.jsx
Phy/auth/Landing.jsx           → frontend/src/pages/auth/Landing.jsx
Phy/auth/AdminLogin.jsx        → frontend/src/pages/auth/AdminLogin.jsx
```

**Onboarding pages → `frontend/src/pages/onboarding/`**
```
Phy/onboarding/ChooseCommunity.jsx  → frontend/src/pages/onboarding/ChooseCommunity.jsx
Phy/onboarding/CompleteProfile.jsx  → frontend/src/pages/onboarding/CompleteProfile.jsx
```

**Teacher billing pages → `frontend/src/pages/teacher/`**
```
Phy/teacher/TeacherBilling.jsx      → frontend/src/pages/teacher/TeacherBilling.jsx
Phy/teacher/TeacherSubscription.jsx → frontend/src/pages/teacher/TeacherSubscription.jsx
```

---

### B Nang — Admin

Copy from `team_workspace/B_Nang/admin/` to `frontend/src/pages/admin/`:

```
B_Nang/admin/AdminDashboard.jsx    → frontend/src/pages/admin/AdminDashboard.jsx
B_Nang/admin/UserManagement.jsx    → frontend/src/pages/admin/UserManagement.jsx
B_Nang/admin/RoleManagement.jsx    → frontend/src/pages/admin/RoleManagement.jsx
B_Nang/admin/AdminSettings.jsx     → frontend/src/pages/admin/AdminSettings.jsx
B_Nang/admin/SystemReports.jsx     → frontend/src/pages/admin/SystemReports.jsx
B_Nang/admin/ContentManagement.jsx → frontend/src/pages/admin/ContentManagement.jsx
B_Nang/admin/Billing.jsx           → frontend/src/pages/admin/Billing.jsx
B_Nang/admin/HelpCenter.jsx        → frontend/src/pages/admin/HelpCenter.jsx
```

---

### B Ratanak — Legal + Community

Copy from `team_workspace/B_Ratanak/` to 3 different folders:

**Legal pages → `frontend/src/pages/legal/`**
```
B_Ratanak/legal/Contact.jsx     → frontend/src/pages/legal/Contact.jsx
B_Ratanak/legal/Help.jsx        → frontend/src/pages/legal/Help.jsx
B_Ratanak/legal/Privacy.jsx     → frontend/src/pages/legal/Privacy.jsx
B_Ratanak/legal/Terms.jsx       → frontend/src/pages/legal/Terms.jsx
```

**Community pages → `frontend/src/pages/community/`**
```
B_Ratanak/community/CommunityDetail.jsx → frontend/src/pages/community/CommunityDetail.jsx
B_Ratanak/community/CreateCommunity.jsx → frontend/src/pages/community/CreateCommunity.jsx
```

**Admin pages → `frontend/src/pages/admin/`**
```
B_Ratanak/admin/ContactSupport.jsx   → frontend/src/pages/admin/ContactSupport.jsx
B_Ratanak/admin/TermsOfService.jsx   → frontend/src/pages/admin/TermsOfService.jsx
B_Ratanak/admin/PrivacyPolicy.jsx    → frontend/src/pages/admin/PrivacyPolicy.jsx
```

**NotFound → `frontend/src/pages/`**
```
B_Ratanak/NotFound.jsx → frontend/src/pages/NotFound.jsx
```

---

## Step 3: Install & Run

```bash
cd frontend
npm install
npm run dev
```

Open browser: http://localhost:5173

---

## Import Guide — How to Use Shared Files

All imports use `@/` prefix which points to `frontend/src/`:

```javascript
// ✅ UI Components
import { Button, Input, Modal, Select, Avatar, Badge } from '@/components/ui'
import { StarRating, Toggle, LanguageSwitcher } from '@/components/ui'

// ✅ Common Components
import { FilterBar, PageCard, TeacherCard, PageHeader } from '@/components/common'
import { SearchFilter, TeacherList, TeacherRowCard } from '@/components/common'
import { SubscriptionAlerts, TabBar, Stepper, PageAmbient } from '@/components/common'
import { PageScaffold, StatMetric, WelcomeBanner } from '@/components/common'

// ✅ Layout Components
import MainLayout from '@/components/layout/MainLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import AdminLayout from '@/components/layout/AdminLayout'

// ✅ Background Animations (Auth + Home pages ONLY — NOT for student/teacher)
import { AnimatedBackground } from '@/components/backgrounds'
import { PolygonBackground, GalaxyBackground } from '@/components/backgrounds'

// ✅ Auth Hook
import { useAuth } from '@/hooks'

// ✅ Custom Hooks
import { useTeachers, useFilterBar, usePagination } from '@/hooks'
import { useTeacherFilters, useAmbientPointer } from '@/hooks'
import { useNotifications, useChat } from '@/hooks'

// ✅ API Services
import { teacherService, authService } from '@/services'
import { communityService, sessionService } from '@/services'

// ✅ Constants
import { majorOptions, subjectOptions } from '@/constants/teacherFilters'
import { mockTeachers } from '@/constants/mockData'
import { legalContent } from '@/constants/legalContent'
import { communities } from '@/constants/communities'

// ✅ cn() Utility (Tailwind class merge — shadcn/ui pattern)
import { cn } from '@/lib/utils'

// ✅ i18n (Language)
import { useTranslation } from '@/lib/LanguageProvider'
```

### Why @/ Works

`jsconfig.json` has this path alias:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

So `@/components/ui` = `src/components/ui` — works from any page folder!

---

## Important Notes

### Animations
- Background animations (`components/backgrounds/`) are used **ONLY** on:
  - Login page
  - Register (CreateAccount) page
  - Home / Landing page
- **Student pages and Teacher pages do NOT use animations**

### Don't Edit Shared Files Alone
- `components/`, `hooks/`, `services/`, `constants/`, `lib/`, `utils/` are **SHARED**
- If you need changes, tell the team → get approval from **Rint** → create separate branch

---

## Quick Reference Table

| Your Folder | Paste To | Member |
|-------------|----------|--------|
| `Rint/student/` | `frontend/src/pages/student/` | Rint |
| `Heang/student/` | `frontend/src/pages/student/` | Heang |
| `Hun/teacher/` | `frontend/src/pages/teacher/` | Hun |
| `Phy/auth/` | `frontend/src/pages/auth/` | Phy |
| `Phy/onboarding/` | `frontend/src/pages/onboarding/` | Phy |
| `Phy/teacher/` | `frontend/src/pages/teacher/` | Phy |
| `B_Nang/admin/` | `frontend/src/pages/admin/` | B Nang |
| `B_Ratanak/legal/` | `frontend/src/pages/legal/` | B Ratanak |
| `B_Ratanak/community/` | `frontend/src/pages/community/` | B Ratanak |
| `B_Ratanak/admin/` | `frontend/src/pages/admin/` | B Ratanak |
| `B_Ratanak/NotFound.jsx` | `frontend/src/pages/NotFound.jsx` | B Ratanak |
