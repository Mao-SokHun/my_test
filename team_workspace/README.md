# Team Workspace — RokKru Frontend

## Project Structure Overview

```
frontend/src/
├── App.jsx                    # Router & Route Config
├── main.jsx                   # Entry Point
├── index.css                  # Tailwind Global Styles
├── i18n.js                    # i18n barrel exports
│
├── components/                # Reusable Components (SHARED — DO NOT edit alone)
│   ├── ui/                    # UI Primitives (Button, Input, Modal, etc.)
│   ├── layout/                # Page Structure (MainLayout, AdminLayout, AppLayout, etc.)
│   ├── common/                # Shared Feature Components (FilterBar, TeacherCard, etc.)
│   └── backgrounds/           # Visual Effects & Animations (auth + home pages ONLY)
│
├── pages/                     # Route Pages (by role) — YOUR WORK GOES HERE
│   ├── auth/                  # Phy → Login, CreateAccount, Landing, AdminLogin
│   ├── onboarding/            # Phy → ChooseCommunity, CompleteProfile
│   ├── student/               # Rint + Heang → Student pages
│   ├── teacher/               # Hun + Phy → Teacher pages
│   ├── admin/                 # B Nang + B Ratanak → Admin pages
│   ├── community/             # B Ratanak → CommunityDetail, CreateCommunity
│   ├── legal/                 # B Ratanak → Contact, Help, Privacy, Terms + InApp variants
│   └── NotFound.jsx           # B Ratanak → 404 page
│
├── hooks/                     # Custom Hooks & Context (SHARED)
├── services/                  # API Connection Layer (SHARED)
├── constants/                 # Static Data & Config (SHARED)
├── lib/                       # Utility Libraries & i18n (SHARED)
├── utils/                     # Helper Functions (SHARED)
└── assets/                    # Static Assets (Images)
```

---

## Task Assignment

| Member | Zone | Pages (file location in `frontend/src/pages/`) |
|--------|------|-------|
| **Rint** | Student Core | `student/Home.jsx`, `student/Schedule.jsx`, `student/SearchResults.jsx`, `student/Leaderboard.jsx`, `student/TeacherDetail.jsx`, `student/BookSession.jsx` |
| **Heang** | Student Social | `student/Profile.jsx`, `student/Messages.jsx`, `student/Notifications.jsx`, `student/Community.jsx`, `student/SessionReview.jsx`, `student/StudentEditProfile.jsx` |
| **Hun** | Teacher | `teacher/TeacherHome.jsx`, `teacher/Analytics.jsx`, `teacher/TeacherMyProfile.jsx`, `teacher/TeacherPublicProfile.jsx`, `teacher/TeacherCreatePost.jsx`, `teacher/EditProfile.jsx`, `teacher/ProfileSetting.jsx` |
| **Phy** | Auth + Onboarding | `auth/Login.jsx`, `auth/CreateAccount.jsx`, `auth/Landing.jsx`, `auth/AdminLogin.jsx`, `onboarding/ChooseCommunity.jsx`, `onboarding/CompleteProfile.jsx`, `teacher/TeacherBilling.jsx`, `teacher/TeacherSubscription.jsx` |
| **B Nang** | Admin | `admin/AdminDashboard.jsx`, `admin/UserManagement.jsx`, `admin/RoleManagement.jsx`, `admin/AdminSettings.jsx`, `admin/SystemReports.jsx`, `admin/ContentManagement.jsx`, `admin/Billing.jsx`, `admin/HelpCenter.jsx` |
| **B Ratanak** | Legal + Community | `legal/Contact.jsx`, `legal/Help.jsx`, `legal/Privacy.jsx`, `legal/Terms.jsx`, `community/CommunityDetail.jsx`, `community/CreateCommunity.jsx`, `admin/ContactSupport.jsx`, `admin/TermsOfService.jsx`, `admin/PrivacyPolicy.jsx`, `NotFound.jsx` |

---

## File Placement Guide — Where to Paste Your Files

### Rint (Student Core)

| Your workspace file | Paste to (in `frontend/src/`) |
|---|---|
| `team_workspace/Rint/student/Home.jsx` | `pages/student/Home.jsx` |
| `team_workspace/Rint/student/Schedule.jsx` | `pages/student/Schedule.jsx` |
| `team_workspace/Rint/student/SearchResults.jsx` | `pages/student/SearchResults.jsx` |
| `team_workspace/Rint/student/Leaderboard.jsx` | `pages/student/Leaderboard.jsx` |
| `team_workspace/Rint/student/TeacherDetail.jsx` | `pages/student/TeacherDetail.jsx` |
| `team_workspace/Rint/student/BookSession.jsx` | `pages/student/BookSession.jsx` |

### Heang (Student Social)

| Your workspace file | Paste to (in `frontend/src/`) |
|---|---|
| `team_workspace/Heang/student/Community.jsx` | `pages/student/Community.jsx` |
| `team_workspace/Heang/student/Messages.jsx` | `pages/student/Messages.jsx` |
| `team_workspace/Heang/student/Notifications.jsx` | `pages/student/Notifications.jsx` |
| `team_workspace/Heang/student/Profile.jsx` | `pages/student/Profile.jsx` |
| `team_workspace/Heang/student/SessionReview.jsx` | `pages/student/SessionReview.jsx` |
| `team_workspace/Heang/student/StudentEditProfile.jsx` | `pages/student/StudentEditProfile.jsx` |

### Hun (Teacher)

| Your workspace file | Paste to (in `frontend/src/`) |
|---|---|
| `team_workspace/Hun/teacher/TeacherHome.jsx` | `pages/teacher/TeacherHome.jsx` |
| `team_workspace/Hun/teacher/Analytics.jsx` | `pages/teacher/Analytics.jsx` |
| `team_workspace/Hun/teacher/TeacherMyProfile.jsx` | `pages/teacher/TeacherMyProfile.jsx` |
| `team_workspace/Hun/teacher/TeacherPublicProfile.jsx` | `pages/teacher/TeacherPublicProfile.jsx` |
| `team_workspace/Hun/teacher/TeacherCreatePost.jsx` | `pages/teacher/TeacherCreatePost.jsx` |
| `team_workspace/Hun/teacher/EditProfile.jsx` | `pages/teacher/EditProfile.jsx` |
| `team_workspace/Hun/teacher/ProfileSetting.jsx` | `pages/teacher/ProfileSetting.jsx` |

### Phy (Auth + Onboarding)

| Your workspace file | Paste to (in `frontend/src/`) |
|---|---|
| `team_workspace/Phy/auth/Login.jsx` | `pages/auth/Login.jsx` |
| `team_workspace/Phy/auth/CreateAccount.jsx` | `pages/auth/CreateAccount.jsx` |
| `team_workspace/Phy/auth/Landing.jsx` | `pages/auth/Landing.jsx` |
| `team_workspace/Phy/auth/AdminLogin.jsx` | `pages/auth/AdminLogin.jsx` |
| `team_workspace/Phy/onboarding/ChooseCommunity.jsx` | `pages/onboarding/ChooseCommunity.jsx` |
| `team_workspace/Phy/onboarding/CompleteProfile.jsx` | `pages/onboarding/CompleteProfile.jsx` |
| `team_workspace/Phy/teacher/TeacherBilling.jsx` | `pages/teacher/TeacherBilling.jsx` |
| `team_workspace/Phy/teacher/TeacherSubscription.jsx` | `pages/teacher/TeacherSubscription.jsx` |

### B Nang (Admin)

| Your workspace file | Paste to (in `frontend/src/`) |
|---|---|
| `team_workspace/B_Nang/admin/AdminDashboard.jsx` | `pages/admin/AdminDashboard.jsx` |
| `team_workspace/B_Nang/admin/UserManagement.jsx` | `pages/admin/UserManagement.jsx` |
| `team_workspace/B_Nang/admin/RoleManagement.jsx` | `pages/admin/RoleManagement.jsx` |
| `team_workspace/B_Nang/admin/AdminSettings.jsx` | `pages/admin/AdminSettings.jsx` |
| `team_workspace/B_Nang/admin/SystemReports.jsx` | `pages/admin/SystemReports.jsx` |
| `team_workspace/B_Nang/admin/ContentManagement.jsx` | `pages/admin/ContentManagement.jsx` |
| `team_workspace/B_Nang/admin/Billing.jsx` | `pages/admin/Billing.jsx` |
| `team_workspace/B_Nang/admin/HelpCenter.jsx` | `pages/admin/HelpCenter.jsx` |

### B Ratanak (Legal + Community)

| Your workspace file | Paste to (in `frontend/src/`) |
|---|---|
| `team_workspace/B_Ratanak/legal/Contact.jsx` | `pages/legal/Contact.jsx` |
| `team_workspace/B_Ratanak/legal/Help.jsx` | `pages/legal/Help.jsx` |
| `team_workspace/B_Ratanak/legal/Privacy.jsx` | `pages/legal/Privacy.jsx` |
| `team_workspace/B_Ratanak/legal/Terms.jsx` | `pages/legal/Terms.jsx` |
| `team_workspace/B_Ratanak/community/CommunityDetail.jsx` | `pages/community/CommunityDetail.jsx` |
| `team_workspace/B_Ratanak/community/CreateCommunity.jsx` | `pages/community/CreateCommunity.jsx` |
| `team_workspace/B_Ratanak/admin/ContactSupport.jsx` | `pages/admin/ContactSupport.jsx` |
| `team_workspace/B_Ratanak/admin/TermsOfService.jsx` | `pages/admin/TermsOfService.jsx` |
| `team_workspace/B_Ratanak/admin/PrivacyPolicy.jsx` | `pages/admin/PrivacyPolicy.jsx` |
| `team_workspace/B_Ratanak/NotFound.jsx` | `pages/NotFound.jsx` |

---

## shared/ Folder — SHARED FILES (DO NOT edit without team approval)

These files are used by ALL team members. **Rint** is the team lead for shared changes.

### components/ui/ — UI Primitives (13 files)

| File | Description |
|---|---|
| `Avatar.jsx` | User avatar component |
| `Badge.jsx` | Status/label badge |
| `Button.jsx` | Primary button component |
| `EmptyState.jsx` | Empty content placeholder |
| `Input.jsx` | Text input field |
| `LanguageSwitcher.jsx` | KH/EN language toggle |
| `Modal.jsx` | Dialog/popup modal |
| `ProgressBar.jsx` | Progress indicator |
| `Select.jsx` | Dropdown select |
| `StarRating.jsx` | Star rating display |
| `Textarea.jsx` | Multi-line text input |
| `Toggle.jsx` | Toggle switch |

### components/layout/ — Page Structure & Navigation (11 files)

| File | Description |
|---|---|
| `AdminLayout.jsx` | Admin dashboard layout |
| `AppLayout.jsx` | App layout variant |
| `AuthLayout.jsx` | Auth pages layout (login, signup) |
| `Footer.jsx` | App footer |
| `Logo.jsx` | RokKru logo component |
| `MainLayout.jsx` | Main app layout (sidebar + navbar + content) |
| `Navbar.jsx` | Top navigation bar |
| `ProtectedRoute.jsx` | Auth-protected route wrapper |
| `SettingsMenu.jsx` | Settings dropdown menu |
| `settingsMenuConfig.js` | Settings menu configuration |
| `StandalonePageShell.jsx` | Standalone page wrapper |

### components/common/ — Shared Feature Components (43 files)

| File | Description |
|---|---|
| `AdminOrPublicSupport.jsx` | Admin or public support wrapper |
| `AppFooter.jsx` | App footer component |
| `AuthRoleTabs.jsx` | Student/Teacher role tabs |
| `BillingIntervalToggle.jsx` | Monthly/yearly billing toggle |
| `CommunityPicker.jsx` | Community selection picker |
| `CommunityPostCard.jsx` | Community post display card |
| `CommunityPostComposer.jsx` | Create new community post |
| `ContactForm.jsx` | Contact form component |
| `ContactPageContent.jsx` | Contact page layout |
| `CreatePostModal.jsx` | Modal for creating posts |
| `DataTable.jsx` | Reusable data table |
| `ExperienceSection.jsx` | Teacher experience display |
| `FilterBar.jsx` | Search filter toolbar |
| `LegalPageRoute.jsx` | Legal page route wrapper |
| `LegalWrapper.jsx` | Legal page wrapper |
| `NotificationItem.jsx` | Notification list item |
| `PageAmbient.jsx` | Page ambient background wrapper |
| `PageCard.jsx` | Content card container |
| `PageHeader.jsx` | Page title/header section |
| `PageScaffold.jsx` | Page scaffold layout |
| `PageSection.jsx` | Page section wrapper |
| `PageWrapper.jsx` | Full page wrapper |
| `PaginationBar.jsx` | Pagination controls |
| `PublicNavbar.jsx` | Public page navbar |
| `RokkruLogo.jsx` | Branded logo component |
| `ScheduleGridCard.jsx` | Schedule grid item |
| `ScheduleSection.jsx` | Schedule section display |
| `SearchFilter.jsx` | Search + filter combined |
| `SegmentedTabs.jsx` | Segmented tab control |
| `SettingsToggleRow.jsx` | Settings toggle row |
| `StandalonePageShell.jsx` | Standalone page shell |
| `StatCard.jsx` | Statistics card |
| `StatMetric.jsx` | Stat metric display |
| `Stepper.jsx` | Multi-step progress indicator |
| `SubjectTabs.jsx` | Subject tab navigation |
| `SubscriptionAlerts.jsx` | Subscription status alerts |
| `SupportWrapper.jsx` | Support page wrapper |
| `TabBar.jsx` | Tab bar navigation |
| `TeacherCard.jsx` | Teacher profile card |
| `TeacherList.jsx` | Teacher list display |
| `TeacherRowCard.jsx` | Teacher row-style card |
| `WelcomeBanner.jsx` | Welcome banner (home page) |

### components/backgrounds/ — Visual Effects (13 files)

> **Note:** Background animations are used ONLY on Login, Register, and Home pages.
> Student and Teacher pages do NOT use animations.

| File | Description |
|---|---|
| `AdminFlowAmbient.jsx` | Admin flow animation |
| `AdminPanelBackground.jsx` | Admin panel background |
| `AmbientColorWash.jsx` | Ambient color wash effect |
| `AnimatedBackground.jsx` | Animated background wrapper |
| `AuthHeroBackground.jsx` | Auth hero panel background |
| `AuthHeroShapes.jsx` | Auth page hero shapes |
| `ColorOverlay.jsx` | Color overlay effect |
| `GalaxyBackground.jsx` | Galaxy/stars background |
| `MeshNetworkBackground.jsx` | Mesh network animation |
| `PageBackground.jsx` | Page background component |
| `PanelBackground.jsx` | Panel background effect |
| `PolygonBackground.jsx` | Polygon animation background |

### hooks/ — Custom Hooks & Context (23 files)

| File | Description |
|---|---|
| `AuthContext.jsx` | Authentication context provider (useAuth) |
| `useAdminUsers.js` | Admin user management hook |
| `useAmbientPointer.js` | Ambient pointer tracking for glass effects |
| `useBookingForm.js` | Session booking form hook |
| `useChat.js` | Chat/messaging hook |
| `useDashboardStats.js` | Dashboard statistics hook |
| `useEditableList.js` | Editable list items hook |
| `useFilterBar.js` | Filter bar state hook |
| `useModal.js` | Modal open/close hook |
| `useMultiStepForm.js` | Multi-step form wizard hook |
| `useNotifications.js` | Notifications hook |
| `usePagination.js` | Pagination hook |
| `useReviewForm.js` | Review form hook |
| `useRoleEditor.js` | Role editor hook |
| `useSearchFilter.js` | Search filter hook |
| `useTabState.js` | Tab state management hook |
| `useTeacherDashboard.js` | Teacher dashboard data hook |
| `useTeacherFilters.js` | Teacher filter state hook |
| `useTeacherProfile.js` | Teacher profile data hook |
| `useTeachers.js` | Teacher list data hook |
| `useTeacherSubscription.js` | Teacher subscription hook |
| `useToggleSet.js` | Toggle set state hook |

### services/ — API Connection Layer (20 files)

| File | Description |
|---|---|
| `api.js` | fetch wrapper + JWT auto-attach |
| `adminApi.js` | Admin API calls |
| `apiBarrel.js` | API barrel exports |
| `apiClient.js` | Base API client |
| `apiErrors.js` | API error types |
| `authApi.js` | Auth API calls |
| `authService.js` | `/auth` endpoints |
| `communitiesApi.js` | Communities API calls |
| `communityService.js` | `/communities` endpoints |
| `endpoints.js` | API endpoint constants |
| `filterService.js` | `/filters` endpoint |
| `notificationService.js` | `/notifications` endpoints |
| `searchService.js` | `/search` endpoint |
| `sessionsApi.js` | Sessions API calls |
| `sessionService.js` | `/sessions` endpoints |
| `subscriptionService.js` | `/subscriptions` endpoints |
| `teachersApi.js` | Teachers API calls |
| `teacherService.js` | `/teachers` endpoints |
| `usersApi.js` | Users API calls |

### constants/ — Static Data & Config (14 files)

| File | Description |
|---|---|
| `communities.js` | Community categories & data |
| `env.js` | Environment config (API URL) |
| `filters.js` | Filter constants |
| `homeFilterOptions.js` | Home page filter options |
| `legalContent.js` | Terms, Privacy, FAQ text content |
| `majors.json` | Major list data |
| `meshNetworkPresets.js` | Mesh animation presets |
| `mockData.js` | Demo data (replace with real API later) |
| `polygonBackgroundPresets.js` | Polygon animation presets |
| `subjects.json` | Subject list data |
| `teacherFilters.js` | Filter options (major, subject, location) |
| `tokens.js` | Design tokens (colors, spacing) |
| `typography.js` | Typography scale constants |

### lib/ — Utility Libraries & i18n (12 files)

| File | Description |
|---|---|
| `utils.js` | `cn()` function (tailwind-merge + clsx) |
| `LanguageProvider.jsx` | i18n language context provider |
| `localeEn.js` | English translations |
| `localeKm.js` | Khmer translations |
| `localizeOptions.js` | Option localization utility |
| `kmOptionLabels.js` | Khmer option labels |
| `kmTeacherProfiles.js` | Khmer teacher profiles |
| `useTeacherDisplay.js` | Teacher display localization hook |
| `entities.js` | Entity type definitions |
| `types.js` | Type exports |
| `i18n.js` | i18n barrel export |

### utils/ — Utility Functions (4 files)

| File | Description |
|---|---|
| `filterTeachers.js` | Client-side teacher filtering |
| `teacherQuery.js` | Teacher query string builder |
| `teacherSubscription.js` | Subscription helper functions |

### assets/ — Static Assets (2 files)

| File | Description |
|---|---|
| `hero.png` | Hero image |
| `vite.svg` | Vite logo |

---

## Rules to Avoid Git Conflicts

### Rule 1: Only edit YOUR pages
- Each member works ONLY on files in `pages/` assigned to them
- DO NOT touch other members' pages

### Rule 2: Do NOT edit shared/ alone
- If you need to change components/hooks/services, tell the team first
- **Rint** is the team lead for shared/ folder changes
- Create a separate branch for shared changes

### Rule 3: File ownership
```
Rint     → pages/student/Home.jsx, Schedule.jsx, SearchResults.jsx, Leaderboard.jsx, TeacherDetail.jsx, BookSession.jsx
Heang    → pages/student/Profile.jsx, Messages.jsx, Notifications.jsx, Community.jsx, SessionReview.jsx, StudentEditProfile.jsx
Hun      → pages/teacher/TeacherHome.jsx, Analytics.jsx, TeacherMyProfile.jsx, TeacherPublicProfile.jsx, TeacherCreatePost.jsx, EditProfile.jsx, ProfileSetting.jsx
Phy      → pages/auth/*.jsx, pages/onboarding/*.jsx, pages/teacher/TeacherBilling.jsx, TeacherSubscription.jsx
B Nang   → pages/admin/AdminDashboard.jsx, UserManagement.jsx, RoleManagement.jsx, AdminSettings.jsx, SystemReports.jsx, ContentManagement.jsx, Billing.jsx, HelpCenter.jsx
B Ratanak → pages/legal/*.jsx, pages/community/*.jsx, pages/admin/ContactSupport.jsx, TermsOfService.jsx, PrivacyPolicy.jsx, NotFound.jsx
```

---

## How to Set Up

### Step 1: Clone project
```bash
git clone <gitlab-url>
cd "Rok Kru Platform/frontend"
npm install
```

### Step 2: Copy your pages to the project
```bash
# Example for Rint:
# Copy files from team_workspace/Rint/student/ → frontend/src/pages/student/
# ONLY copy YOUR assigned files!
```

### Step 3: Run the app
```bash
npm run dev
# Opens at http://localhost:5173
```

---

## Git Workflow

```bash
# 1. Always pull latest first
git pull origin main

# 2. Create your own branch
git checkout -b feature/<your-name>-<task>
# Example: git checkout -b feature/rint-home-page

# 3. Work on YOUR pages only

# 4. Commit with clear message
git add .
git commit -m "feat: update Home page search filter"

# 5. Push your branch
git push origin feature/<your-name>-<task>

# 6. Create Merge Request on GitLab
# Wait for review before merging to main
```

---

## How to Import (in your page files)

```javascript
// ✅ Import UI components
import { Button, Input, Modal, Select } from '@/components/ui'

// ✅ Import common components
import { FilterBar, PageCard, TeacherCard, PageHeader } from '@/components/common'
import { SearchFilter, TeacherList, TeacherRowCard } from '@/components/common'
import { SubscriptionAlerts, TabBar, Stepper, PageAmbient } from '@/components/common'

// ✅ Import layout
import MainLayout from '@/components/layout/MainLayout'

// ✅ Import auth hook
import { useAuth } from '@/hooks'

// ✅ Import custom hooks
import { useTeachers, useFilterBar, usePagination } from '@/hooks'
import { useTeacherFilters, useAmbientPointer } from '@/hooks'

// ✅ Import API services
import { teacherService, authService } from '@/services'

// ✅ Import constants
import { majorOptions, subjectOptions } from '@/constants/teacherFilters'
import { mockTeachers } from '@/constants/mockData'

// ✅ Import cn utility (Tailwind class merge — shadcn/ui pattern)
import { cn } from '@/lib/utils'

// ✅ Import i18n (language)
import { useTranslation } from '@/lib/LanguageProvider'
```

> **Important:** Always use `@/` prefix for imports. This is configured in `jsconfig.json` to point to `frontend/src/`.

---

## Tech Stack

- React 18 + Vite
- Tailwind CSS + shadcn/ui
- fetch API (API calls via apiRequest wrapper)
- Lucide React (Icons)
- class-variance-authority (cva)
- tailwind-merge (cn function)
