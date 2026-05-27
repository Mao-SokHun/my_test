# RokKru — Folder Function Guide

---

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS + shadcn/ui, fetch API, React Router, Lucide Icons

**Backend:** Node.js, Express, PostgreSQL, Sequelize ORM, JWT

---

# FRONTEND

```bash
cd frontend
npm install
npm run dev    # http://localhost:5173
```

## Frontend Folder Structure

```
frontend/src/
├── components/       → Reusable Components (shadcn/ui pattern)
├── pages/            → Route Pages (by role)
├── hooks/            → Custom Hooks & Context
├── services/         → API Connection Layer
├── constants/        → Static Data & Config
├── lib/              → Utility Libraries, i18n & Localization
├── utils/            → Helper Functions
├── assets/           → Images & Static Files
├── App.jsx           → Router & Route Config
├── main.jsx          → Entry Point
├── i18n.js           → i18n barrel (re-exports from lib/)
└── index.css         → Global Styles (Tailwind)
```

---

### `lib/` — Utility Libraries & i18n

| File | Function |
|------|----------|
| `utils.js` | `cn()` — merge Tailwind classes (tailwind-merge + clsx) |
| `LanguageProvider.jsx` | i18n context (useTranslation, useLanguage) |
| `localeEn.js` | English translations |
| `localeKm.js` | Khmer translations |
| `localizeOptions.js` | Localize filter options |
| `kmOptionLabels.js` | Khmer option labels |
| `kmTeacherProfiles.js` | Khmer teacher profile data |
| `useTeacherDisplay.js` | Localized teacher display hook |
| `entities.js` | Entity type definitions |
| `types.js` | Type exports |
| `i18n.js` | i18n barrel export |
| `index.js` | Barrel export |

```javascript
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/LanguageProvider'
<div className={cn('px-4', isActive && 'bg-primary-500', className)} />
```

---

### `components/` — Reusable Components

| Subfolder | Function | Examples |
|-----------|----------|----------|
| `ui/` | UI Primitives | Button, Input, Select, Modal, Toggle, LanguageSwitcher |
| `layout/` | Page Structure & Navigation | MainLayout, AdminLayout, AppLayout, Navbar, Footer, SettingsMenu |
| `common/` | Shared Feature Components | FilterBar, TeacherCard, DataTable, PageCard, SearchFilter, TeacherList |
| `backgrounds/` | Visual Effects & Animations (Auth + Home ONLY) | AnimatedBackground, GalaxyBackground, AdminPanelBackground |

```javascript
import { Button, Input } from '@/components/ui'
import { FilterBar, TeacherCard } from '@/components/common'
import MainLayout from '@/components/layout/MainLayout'
```

#### `components/ui/` — UI Primitives

| File | Function |
|------|----------|
| `Avatar.jsx` | User avatar with fallback |
| `Badge.jsx` | Status/label badge |
| `Button.jsx` | Button component with variants |
| `EmptyState.jsx` | Empty state placeholder |
| `Input.jsx` | Text input field |
| `LanguageSwitcher.jsx` | EN/KM language toggle |
| `Modal.jsx` | Modal dialog |
| `ProgressBar.jsx` | Progress indicator |
| `Select.jsx` | Dropdown select |
| `StarRating.jsx` | Star rating display |
| `Textarea.jsx` | Multi-line text input |
| `Toggle.jsx` | Toggle switch |

#### `components/layout/` — Page Layouts

| File | Function |
|------|----------|
| `AdminLayout.jsx` | Admin panel layout (sidebar, nav) |
| `AppLayout.jsx` | App layout variant |
| `AuthLayout.jsx` | Auth page layout (split hero) |
| `Footer.jsx` | App footer |
| `Logo.jsx` | RokKru logo component |
| `MainLayout.jsx` | Main app layout (student/teacher) |
| `Navbar.jsx` | Public navigation bar |
| `ProtectedRoute.jsx` | Route guard (role-based) |
| `SettingsMenu.jsx` | Settings dropdown menu |
| `settingsMenuConfig.js` | Settings menu configuration |
| `StandalonePageShell.jsx` | Standalone page wrapper |

#### `components/common/` — Shared Components

| File | Function |
|------|----------|
| `AdminOrPublicSupport.jsx` | Admin or public support wrapper |
| `AppFooter.jsx` | App footer component |
| `AuthRoleTabs.jsx` | Student/Teacher role tabs |
| `BillingIntervalToggle.jsx` | Monthly/yearly billing toggle |
| `CommunityPicker.jsx` | Community selection picker |
| `CommunityPostCard.jsx` | Community post display |
| `CommunityPostComposer.jsx` | Create new post form |
| `ContactForm.jsx` | Contact form |
| `ContactPageContent.jsx` | Contact page layout |
| `CreatePostModal.jsx` | Create post modal dialog |
| `DataTable.jsx` | Admin data table |
| `ExperienceSection.jsx` | Teacher experience display |
| `FilterBar.jsx` | Filter controls bar |
| `LegalPageRoute.jsx` | Legal page route wrapper |
| `LegalWrapper.jsx` | Legal content wrapper |
| `NotificationItem.jsx` | Single notification display |
| `PageAmbient.jsx` | Page ambient background wrapper |
| `PageCard.jsx` | Content card container |
| `PageHeader.jsx` | Page header with title |
| `PageScaffold.jsx` | Page scaffold layout |
| `PageSection.jsx` | Page content section |
| `PageWrapper.jsx` | Page wrapper container |
| `PaginationBar.jsx` | Pagination controls |
| `PublicNavbar.jsx` | Public page navbar |
| `RokkruLogo.jsx` | Branded logo component |
| `ScheduleGridCard.jsx` | Schedule grid item |
| `ScheduleSection.jsx` | Schedule display section |
| `SearchFilter.jsx` | Search + filter combined |
| `SegmentedTabs.jsx` | Segmented tab control |
| `SettingsToggleRow.jsx` | Settings row with toggle |
| `StandalonePageShell.jsx` | Standalone page shell |
| `StatCard.jsx` | Statistics card |
| `StatMetric.jsx` | Stat metric display |
| `Stepper.jsx` | Multi-step indicator |
| `SubjectTabs.jsx` | Subject category tabs |
| `SubscriptionAlerts.jsx` | Subscription status alerts |
| `SupportWrapper.jsx` | Support page wrapper |
| `TabBar.jsx` | Tab navigation bar |
| `TeacherCard.jsx` | Teacher preview card |
| `TeacherList.jsx` | Teacher list display |
| `TeacherRowCard.jsx` | Teacher row card (compact) |
| `WelcomeBanner.jsx` | Welcome greeting banner |

#### `components/backgrounds/` — Visual Effects

| File | Function |
|------|----------|
| `AdminFlowAmbient.jsx` | Admin flow animation |
| `AdminPanelBackground.jsx` | Admin panel background |
| `AmbientColorWash.jsx` | Ambient color wash effect |
| `AnimatedBackground.jsx` | Main animated background |
| `AuthHeroBackground.jsx` | Auth hero panel background |
| `AuthHeroShapes.jsx` | Auth hero geometric shapes |
| `ColorOverlay.jsx` | Color overlay layer |
| `GalaxyBackground.jsx` | Galaxy/stars background |
| `MeshNetworkBackground.jsx` | Mesh network animation |
| `PageBackground.jsx` | Page background layer |
| `PanelBackground.jsx` | Panel background |
| `PolygonBackground.jsx` | Polygon shapes animation |

---

### `pages/` — Route Pages

| Subfolder | Function | Examples |
|-----------|----------|----------|
| `auth/` | Login, Register, Landing | Login, CreateAccount, Landing, AdminLogin |
| `student/` | Student dashboard & features | Home, Schedule, Profile, Messages |
| `teacher/` | Teacher dashboard & features | TeacherHome, Analytics, EditProfile |
| `admin/` | Admin panel | AdminDashboard, UserManagement |
| `community/` | Community features | CommunityDetail, CreateCommunity |
| `onboarding/` | New user setup | ChooseCommunity, CompleteProfile |
| `legal/` | Legal & support pages | Terms, Privacy, Help, Contact + InApp variants |

---

### `hooks/` — Custom Hooks & Context

| File | Function |
|------|----------|
| `AuthContext.jsx` | User authentication state (login/logout) |
| `useAdminUsers.js` | Admin user management |
| `useAmbientPointer.js` | Ambient pointer tracking for glass effects |
| `useBookingForm.js` | Session booking form logic |
| `useChat.js` | Chat/messaging logic |
| `useDashboardStats.js` | Dashboard statistics |
| `useEditableList.js` | Editable list state |
| `useFilterBar.js` | Filter state management |
| `useModal.js` | Modal open/close state |
| `useMultiStepForm.js` | Multi-step form logic |
| `useNotifications.js` | Notifications state |
| `usePagination.js` | Pagination logic |
| `useReviewForm.js` | Review form logic |
| `useRoleEditor.js` | Role editing logic |
| `useSearchFilter.js` | Search & filter combined |
| `useTabState.js` | Tab switching state |
| `useTeacherDashboard.js` | Teacher dashboard data |
| `useTeacherFilters.js` | Teacher filter state |
| `useTeacherProfile.js` | Teacher profile data |
| `useTeachers.js` | Fetch & filter teachers list |
| `useTeacherSubscription.js` | Teacher subscription state |
| `useToggleSet.js` | Toggle set state |

```javascript
import { useAuth } from '@/hooks'
import { useTeachers, useFilterBar } from '@/hooks'
```

---

### `services/` — API Connection Layer

| File | Function |
|------|----------|
| `api.js` | fetch wrapper, JWT token, error handling |
| `apiClient.js` | Base API client |
| `apiErrors.js` | API error types |
| `apiBarrel.js` | API barrel exports |
| `endpoints.js` | API endpoint constants |
| `adminApi.js` | Admin API calls |
| `authApi.js` | Auth API calls |
| `authService.js` | Auth service (Register, Login, Profile) |
| `communitiesApi.js` | Communities API calls |
| `communityService.js` | Community service |
| `filterService.js` | Filter service |
| `notificationService.js` | Notification service |
| `searchService.js` | Search service |
| `sessionsApi.js` | Sessions API calls |
| `sessionService.js` | Session service |
| `subscriptionService.js` | Subscription service |
| `teachersApi.js` | Teachers API calls |
| `teacherService.js` | Teacher service |
| `usersApi.js` | Users API calls |

```javascript
import { login, register } from '@/services/authService'
import { fetchTeachers, fetchTeacherById } from '@/services/teacherService'

const user = await login({ email, password })
const { items } = await fetchTeachers({ major: 'IT' })
```

---

### `constants/` — Static Data & Config

| File | Function |
|------|----------|
| `communities.js` | Community categories & data |
| `env.js` | Environment config (API URL) |
| `filters.js` | Filter constants |
| `homeFilterOptions.js` | Home page filter options |
| `legalContent.js` | Terms, Privacy, FAQ content |
| `meshNetworkPresets.js` | Mesh animation presets |
| `mockData.js` | Demo data (replace with API later) |
| `polygonBackgroundPresets.js` | Polygon animation presets |
| `teacherFilters.js` | Filter options (majors, subjects, locations, sort) |
| `tokens.js` | Design tokens (colors, spacing) |
| `typography.js` | Typography scale constants |
| `majors.json` | Major list (JSON) |
| `subjects.json` | Subject list (JSON) |

---

### `utils/` — Helper Functions

| File | Function |
|------|----------|
| `filterTeachers.js` | Client-side teacher filtering |
| `teacherQuery.js` | Teacher query string building |
| `teacherSubscription.js` | Subscription calculation logic |

---

### `assets/` — Static Assets

| File | Function |
|------|----------|
| `hero.png` | Hero image |
| `vite.svg` | Vite logo |

---

# BACKEND

```bash
cd backend_rokkru
npm install
npm start    # http://localhost:5000
```

## Backend Folder Structure

```
backend_rokkru/
├── app.js              → Express entry + DB connect
├── config/             → Database config
├── models/             → Sequelize Models (Database tables)
├── controllers/        → Business Logic
├── routes/             → API Routes
├── middleware/         → Auth & Validation
├── utils/              → Helper functions
└── data/               → Seed data
```

---

### `config/` — Database Configuration

| File | Function |
|------|----------|
| `database.js` | PostgreSQL connection settings (host, port, db name, user, password) |

---

### `models/` — Database Models (Sequelize)

Each file = 1 database table.

| File | Table | Function |
|------|-------|----------|
| `index.js` | — | Model associations & export all models |
| `User.js` | `users` | User accounts (name, email, password, role) |
| `Teacher.js` | `teachers` | Teacher profiles (major, subject, location, rating) |
| `Session.js` | `sessions` | Tutoring sessions (date, time, status) |
| `Review.js` | `reviews` | Teacher reviews (rating, comment) |
| `Community.js` | `communities` | Community groups |
| `CommunityMember.js` | `community_members` | Who joined which community |
| `Post.js` | `posts` | Community posts |
| `PostLike.js` | `post_likes` | Post likes |
| `Notification.js` | `notifications` | User notifications |
| `Subscription.js` | `subscriptions` | Teacher subscription plans |

---

### `controllers/` — Business Logic

Each controller handles the logic for one feature.

| File | Function |
|------|----------|
| `adminController.js` | List Users, Change Roles, Delete Users, Stats |
| `authController.js` | Register, Login, Get Profile, Update Profile, Change Password |
| `communityController.js` | Create Community, Join, Get Posts, Create Post, Like |
| `filterController.js` | Get Filter Options (majors, subjects, locations from DB) |
| `notificationController.js` | Get Notifications, Mark Read, Mark All Read |
| `searchController.js` | Search teachers by keyword |
| `sessionController.js` | Book Session, Update, Cancel, List Sessions |
| `subscriptionController.js` | Get Plan, Activate, Cancel, Resume, Change Interval |
| `teacherController.js` | Get Teachers (with filter), Get Teacher Detail, Reviews |

---

### `routes/v1/` — API Routes

Each route file maps HTTP methods to controller functions.

| File | Base Path | Methods |
|------|-----------|---------|
| `admin.js` | `/api/v1/admin` | GET /users, PUT /users/:id/role, DELETE /users/:id, GET /stats |
| `auth.js` | `/api/v1/auth` | POST /register, POST /login, GET /me, PUT /profile, PUT /password |
| `communities.js` | `/api/v1/communities` | GET /, GET /:id, POST /, POST /:id/join, GET /:id/posts, POST /:id/posts |
| `filters.js` | `/api/v1/filters` | GET / |
| `notifications.js` | `/api/v1/notifications` | GET /, PUT /:id/read, PUT /read-all |
| `search.js` | `/api/v1/search` | GET / |
| `sessions.js` | `/api/v1/sessions` | GET /, POST /, PUT /:id, DELETE /:id |
| `subscriptions.js` | `/api/v1/subscriptions` | GET /, POST /activate, POST /cancel, POST /resume, PUT /interval |
| `teachers.js` | `/api/v1/teachers` | GET /, GET /:id, PUT /me, GET /:id/reviews, POST /:id/reviews |

---

### `middleware/` — Auth & Validation

| File | Function |
|------|----------|
| `auth.js` | JWT token verification + role-based access (student/teacher/admin) |
| `validate.js` | Request body validation (check required fields) |

---

### `utils/` — Helper Functions

| File | Function |
|------|----------|
| `generateToken.js` | Create JWT token (sign user ID) |
| `pagination.js` | Calculate offset, limit, total pages |

---

### `data/` — Seed Data

| File | Function |
|------|----------|
| `seed.js` | Insert sample data into database for testing |

---

## How Frontend Connects to Backend

```
Frontend (port 5173)  →  Vite Proxy (/api)  →  Backend (port 5000)  →  PostgreSQL (port 5432)
```

1. `services/api.js` uses native `fetch` wrapped in `apiRequest()` function
2. `VITE_API_URL` env variable sets the backend base URL (e.g. `http://localhost:5000/api/v1`)
3. JWT token is auto-attached by `apiRequest()` from `localStorage.getItem('rokkru_token')`
4. If request fails, `ApiError` is thrown with status code and message

---

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| frontend/ | `npm run dev` | Start frontend dev server (port 5173) |
| frontend/ | `npm run build` | Build for production |
| backend_rokkru/ | `npm start` | Start backend server (port 5000) |
| backend_rokkru/ | `npm run seed` | Seed database with sample data |
