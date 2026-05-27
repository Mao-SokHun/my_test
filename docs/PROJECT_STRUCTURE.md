# RokKru Platform — Project Structure

## Project Overview

```
Rok Kru Platform/
├── frontend/             → React + Vite (Client)
├── backend_rokkru/       → Node.js + Express + PostgreSQL (Server)
├── docs/                 → Documentation & Guides
├── team_workspace/       → Team Member Workspace & Tasks
│   ├── Rint/             → Student Core pages
│   ├── Heang/            → Student Social pages
│   ├── Hun/              → Teacher pages
│   ├── Phy/              → Auth + Onboarding pages
│   ├── B_Nang/           → Admin pages
│   ├── B_Ratanak/        → Legal + Community pages
│   ├── shared/           → Copy of all shared files (components, hooks, services, etc.)
│   ├── README.md         → Task assignments & file placement guide
│   └── SETUP_GUIDE.md    → Step-by-step paste & run guide
├── shared/               → Shared resources
└── README.md             → Project overview
```

---

## Frontend Structure

**Tech:** React 18, Vite, Tailwind CSS + shadcn/ui, fetch API, React Router

```
frontend/
├── public/
├── src/
│   ├── App.jsx                    # Router & Route Config
│   ├── main.jsx                   # Entry Point
│   ├── index.css                  # Tailwind Global Styles
│   ├── i18n.js                    # i18n barrel (re-exports from lib/)
│   │
│   ├── components/                # Reusable Components
│   │   ├── index.js               # Barrel export (import all from here)
│   │   ├── ui/                    # UI Primitives
│   │   │   ├── index.js
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── StarRating.jsx
│   │   │   ├── Textarea.jsx
│   │   │   └── Toggle.jsx
│   │   ├── layout/                # Page Structure & Navigation
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AppLayout.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SettingsMenu.jsx
│   │   │   ├── settingsMenuConfig.js
│   │   │   └── StandalonePageShell.jsx
│   │   ├── common/                # Shared Feature Components
│   │   │   ├── index.js
│   │   │   ├── AdminOrPublicSupport.jsx
│   │   │   ├── AppFooter.jsx
│   │   │   ├── AuthRoleTabs.jsx
│   │   │   ├── BillingIntervalToggle.jsx
│   │   │   ├── CommunityPicker.jsx
│   │   │   ├── CommunityPostCard.jsx
│   │   │   ├── CommunityPostComposer.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactPageContent.jsx
│   │   │   ├── CreatePostModal.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── LegalPageRoute.jsx
│   │   │   ├── LegalWrapper.jsx
│   │   │   ├── NotificationItem.jsx
│   │   │   ├── PageAmbient.jsx
│   │   │   ├── PageCard.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   ├── PageScaffold.jsx
│   │   │   ├── PageSection.jsx
│   │   │   ├── PageWrapper.jsx
│   │   │   ├── PaginationBar.jsx
│   │   │   ├── PublicNavbar.jsx
│   │   │   ├── RokkruLogo.jsx
│   │   │   ├── ScheduleGridCard.jsx
│   │   │   ├── ScheduleSection.jsx
│   │   │   ├── SearchFilter.jsx
│   │   │   ├── SegmentedTabs.jsx
│   │   │   ├── SettingsToggleRow.jsx
│   │   │   ├── StandalonePageShell.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── StatMetric.jsx
│   │   │   ├── Stepper.jsx
│   │   │   ├── SubjectTabs.jsx
│   │   │   ├── SubscriptionAlerts.jsx
│   │   │   ├── SupportWrapper.jsx
│   │   │   ├── TabBar.jsx
│   │   │   ├── TeacherCard.jsx
│   │   │   ├── TeacherList.jsx
│   │   │   ├── TeacherRowCard.jsx
│   │   │   └── WelcomeBanner.jsx
│   │   └── backgrounds/           # Visual Effects & Animations
│   │       ├── index.js
│   │       ├── AdminFlowAmbient.jsx
│   │       ├── AdminPanelBackground.jsx
│   │       ├── AmbientColorWash.jsx
│   │       ├── AnimatedBackground.jsx
│   │       ├── AuthHeroBackground.jsx
│   │       ├── AuthHeroShapes.jsx
│   │       ├── ColorOverlay.jsx
│   │       ├── GalaxyBackground.jsx
│   │       ├── MeshNetworkBackground.jsx
│   │       ├── PageBackground.jsx
│   │       ├── PanelBackground.jsx
│   │       └── PolygonBackground.jsx
│   │
│   ├── pages/                     # Route Pages (by role)
│   │   ├── index.js
│   │   ├── NotFound.jsx
│   │   ├── auth/                  # Authentication
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── CreateAccount.jsx
│   │   │   ├── Landing.jsx
│   │   │   └── Login.jsx
│   │   ├── onboarding/            # New User Setup
│   │   │   ├── ChooseCommunity.jsx
│   │   │   └── CompleteProfile.jsx
│   │   ├── student/               # Student Pages
│   │   │   ├── BookSession.jsx
│   │   │   ├── Community.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Notifications.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Schedule.jsx
│   │   │   ├── SearchResults.jsx
│   │   │   ├── SessionReview.jsx
│   │   │   ├── StudentEditProfile.jsx
│   │   │   └── TeacherDetail.jsx
│   │   ├── teacher/               # Teacher Pages
│   │   │   ├── Analytics.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── ProfileSetting.jsx
│   │   │   ├── TeacherBilling.jsx
│   │   │   ├── TeacherCreatePost.jsx
│   │   │   ├── TeacherHome.jsx
│   │   │   ├── TeacherMyProfile.jsx
│   │   │   ├── TeacherPublicProfile.jsx
│   │   │   └── TeacherSubscription.jsx
│   │   ├── admin/                 # Admin Pages
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminSettings.jsx
│   │   │   ├── Billing.jsx
│   │   │   ├── ContactSupport.jsx
│   │   │   ├── ContentManagement.jsx
│   │   │   ├── HelpCenter.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   ├── RoleManagement.jsx
│   │   │   ├── SystemReports.jsx
│   │   │   ├── TermsOfService.jsx
│   │   │   └── UserManagement.jsx
│   │   ├── community/             # Community Pages
│   │   │   ├── CommunityDetail.jsx
│   │   │   └── CreateCommunity.jsx
│   │   └── legal/                 # Legal & Support
│   │       ├── Contact.jsx
│   │       ├── ContactInApp.jsx
│   │       ├── Help.jsx
│   │       ├── HelpSupport.jsx
│   │       ├── Privacy.jsx
│   │       ├── PrivacyInApp.jsx
│   │       ├── Terms.jsx
│   │       └── TermsInApp.jsx
│   │
│   ├── hooks/                     # Custom Hooks & Context
│   │   ├── index.js
│   │   ├── AuthContext.jsx
│   │   ├── useAdminUsers.js
│   │   ├── useAmbientPointer.js
│   │   ├── useBookingForm.js
│   │   ├── useChat.js
│   │   ├── useDashboardStats.js
│   │   ├── useEditableList.js
│   │   ├── useFilterBar.js
│   │   ├── useModal.js
│   │   ├── useMultiStepForm.js
│   │   ├── useNotifications.js
│   │   ├── usePagination.js
│   │   ├── useReviewForm.js
│   │   ├── useRoleEditor.js
│   │   ├── useSearchFilter.js
│   │   ├── useTabState.js
│   │   ├── useTeacherDashboard.js
│   │   ├── useTeacherFilters.js
│   │   ├── useTeacherProfile.js
│   │   ├── useTeachers.js
│   │   ├── useTeacherSubscription.js
│   │   └── useToggleSet.js
│   │
│   ├── services/                  # API Connection Layer
│   │   ├── index.js
│   │   ├── api.js                 # fetch wrapper + JWT auto-attach
│   │   ├── adminApi.js
│   │   ├── apiBarrel.js
│   │   ├── apiClient.js
│   │   ├── apiErrors.js
│   │   ├── authApi.js
│   │   ├── authService.js
│   │   ├── communitiesApi.js
│   │   ├── communityService.js
│   │   ├── endpoints.js
│   │   ├── filterService.js
│   │   ├── notificationService.js
│   │   ├── searchService.js
│   │   ├── sessionsApi.js
│   │   ├── sessionService.js
│   │   ├── subscriptionService.js
│   │   ├── teachersApi.js
│   │   ├── teacherService.js
│   │   └── usersApi.js
│   │
│   ├── constants/                 # Static Data & Config
│   │   ├── index.js
│   │   ├── communities.js
│   │   ├── env.js
│   │   ├── filters.js
│   │   ├── homeFilterOptions.js
│   │   ├── legalContent.js
│   │   ├── majors.json
│   │   ├── meshNetworkPresets.js
│   │   ├── mockData.js
│   │   ├── polygonBackgroundPresets.js
│   │   ├── subjects.json
│   │   ├── teacherFilters.js
│   │   ├── tokens.js
│   │   └── typography.js
│   │
│   ├── lib/                       # Utility Libraries & i18n
│   │   ├── index.js
│   │   ├── utils.js               # cn() function (tailwind-merge + clsx)
│   │   ├── entities.js
│   │   ├── i18n.js
│   │   ├── kmOptionLabels.js
│   │   ├── kmTeacherProfiles.js
│   │   ├── LanguageProvider.jsx
│   │   ├── localeEn.js
│   │   ├── localeKm.js
│   │   ├── localizeOptions.js
│   │   ├── types.js
│   │   └── useTeacherDisplay.js
│   │
│   ├── utils/                     # Utility Functions
│   │   ├── index.js
│   │   ├── filterTeachers.js
│   │   ├── teacherQuery.js
│   │   └── teacherSubscription.js
│   │
│   └── assets/                    # Static Assets
│       ├── hero.png
│       └── vite.svg
│
├── .env                           # Environment variables
├── .env.example
├── components.json                # shadcn/ui CLI config
├── eslint.config.js
├── index.html
├── jsconfig.json                  # Path alias (@/)
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js                 # Vite + Proxy config
└── README.md                      # Frontend guide
```

---

## Backend Structure

**Tech:** Node.js, Express, PostgreSQL, Sequelize ORM, JWT

```
backend_rokkru/
├── app.js                         # Express app entry + DB connect
├── package.json
├── .env                           # Environment variables
├── .gitignore
│
├── config/
│   └── database.js                # Sequelize DB config
│
├── models/                        # Database Models (Sequelize)
│   ├── index.js                   # Model associations & export
│   ├── User.js
│   ├── Teacher.js
│   ├── Session.js
│   ├── Review.js
│   ├── Community.js
│   ├── CommunityMember.js
│   ├── Post.js
│   ├── PostLike.js
│   ├── Notification.js
│   └── Subscription.js
│
├── controllers/                   # Business Logic
│   ├── adminController.js
│   ├── authController.js
│   ├── communityController.js
│   ├── filterController.js
│   ├── notificationController.js
│   ├── searchController.js
│   ├── sessionController.js
│   ├── subscriptionController.js
│   └── teacherController.js
│
├── routes/                        # API Routes
│   ├── index.js                   # Route aggregator
│   └── v1/
│       ├── admin.js
│       ├── auth.js
│       ├── communities.js
│       ├── filters.js
│       ├── notifications.js
│       ├── search.js
│       ├── sessions.js
│       ├── subscriptions.js
│       └── teachers.js
│
├── middleware/
│   ├── auth.js                    # JWT verification & role check
│   └── validate.js                # Request validation
│
├── utils/
│   ├── generateToken.js           # JWT token generation
│   └── pagination.js              # Pagination helper
│
└── data/
    └── seed.js                    # Database seed data
```

---

## How They Connect

```
Frontend (services/)          Backend (routes/v1/)         Database (models/)
─────────────────────         ────────────────────         ──────────────────
authService.js        ──►     auth.js        ──►          User.js
teacherService.js     ──►     teachers.js    ──►          Teacher.js, Review.js
sessionService.js     ──►     sessions.js    ──►          Session.js
communityService.js   ──►     communities.js ──►          Community.js, Post.js
notificationService.js──►     notifications.js──►         Notification.js
subscriptionService.js──►     subscriptions.js──►         Subscription.js
filterService.js      ──►     filters.js     ──►          Teacher.js (distinct values)
searchService.js      ──►     search.js      ──►          Teacher.js, User.js
```

---

## Role-Based Access

| Role | Frontend Pages | Backend Access |
|------|---------------|----------------|
| **Guest** | Landing, Login, Register, Legal | Public routes only |
| **Student** | Home, Schedule, Profile, Messages, Community | All student endpoints |
| **Teacher** | TeacherHome, Analytics, EditProfile, Billing | Teacher + student endpoints |
| **Admin** | AdminDashboard, UserManagement, Reports | All endpoints |

---

## Key Config Files

| File | Location | Purpose |
|------|----------|---------|
| `vite.config.js` | frontend/ | Dev server, proxy, path alias |
| `components.json` | frontend/ | shadcn/ui CLI configuration |
| `.env` | frontend/ | `VITE_API_URL` |
| `jsconfig.json` | frontend/ | `@/` path alias for IDE |
| `tailwind.config.js` | frontend/ | Tailwind + shadcn theme config |
| `app.js` | backend/ | Express setup, DB connect |
| `.env` | backend/ | DB credentials, JWT secret, PORT |
| `config/database.js` | backend/ | Sequelize DB config |
| `models/index.js` | backend/ | Model associations |
| `routes/index.js` | backend/ | Route registration |

---

## Quick Start

```bash
# Terminal 1 — Backend
cd backend_rokkru
npm install
npm start
# ✓ Server running on port 5000

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev
# ✓ Running on http://localhost:5173
```

---

## Team Workspace

Each team member has their own folder in `team_workspace/` with page files to work on:

| Member | Folder | Pages |
|--------|--------|-------|
| **Rint** | `Rint/student/` | Home, Schedule, SearchResults, Leaderboard, TeacherDetail, BookSession |
| **Heang** | `Heang/student/` | Profile, Messages, Notifications, Community, SessionReview, StudentEditProfile |
| **Hun** | `Hun/teacher/` | TeacherHome, Analytics, TeacherMyProfile, TeacherPublicProfile, TeacherCreatePost, EditProfile, ProfileSetting |
| **Phy** | `Phy/auth/`, `Phy/onboarding/`, `Phy/teacher/` | Login, CreateAccount, Landing, AdminLogin, ChooseCommunity, CompleteProfile, TeacherBilling, TeacherSubscription |
| **B Nang** | `B_Nang/admin/` | AdminDashboard, UserManagement, RoleManagement, AdminSettings, SystemReports, ContentManagement, Billing, HelpCenter |
| **B Ratanak** | `B_Ratanak/legal/`, `B_Ratanak/community/`, `B_Ratanak/admin/` | Contact, Help, Privacy, Terms, CommunityDetail, CreateCommunity, ContactSupport, TermsOfService, PrivacyPolicy, NotFound |

> See `team_workspace/SETUP_GUIDE.md` for step-by-step file placement instructions.

---

## Important Notes

### Background Animations
- Used **ONLY** on Login, Register, and Home/Landing pages
- Student and Teacher pages do **NOT** use background animations

### Import Aliases
- All imports use `@/` prefix → maps to `frontend/src/`
- Configured in `jsconfig.json` and `vite.config.js`

```javascript
import { Button } from '@/components/ui'
import { useAuth } from '@/hooks'
import { teacherService } from '@/services'
import { cn } from '@/lib/utils'
```

---

## Documentation

| File | Content |
|------|---------|
| `README.md` | Project overview & team members |
| `frontend/README.md` | Frontend setup & folder structure |
| `docs/PROJECT_STRUCTURE.md` | This file — full project structure |
| `docs/GUIDE_FUNCTION_FOLDER.md` | What each folder/file does |
| `docs/CONNECT_API_GUIDE.md` | Step-by-step API connection guide |
| `docs/MENTOR_SYSTEM_TASKS.md` | Backend mentor test checklist (your API work) |
| `docs/MENTOR_BACKEND_CODE_GUIDE.md` | Sample mentor API code with line-by-line explanations |
| `docs/NOTION_BACKEND_TASKS_BOARD.md` | Notion-style team task board (frontend reference UI) |
| `team_workspace/README.md` | Task assignments & file placement |
| `team_workspace/SETUP_GUIDE.md` | Paste & run guide for team members |
