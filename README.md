# RokKru Platform

Cambodia's #1 Private Tutoring Platform — connecting students with verified teachers for Grades 7–12.

## Project Overview

```
Rok Kru Platform/
├── frontend/            → React + Vite (Client App)
├── backend_rokkru/      → Node.js + Express + PostgreSQL (API Server)
├── docs/                → Project Documentation & Guides
├── team_workspace/      → Team Member Workspace & Tasks
└── shared/              → Shared Resources
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS + shadcn/ui, fetch API, React Router |
| **Backend** | Node.js, Express, PostgreSQL, Sequelize ORM, JWT |
| **Icons** | Lucide React |
| **Styling** | Tailwind CSS, class-variance-authority (cva), tailwind-merge |

## Quick Start

### 1. Backend

```bash
cd backend_rokkru
npm install
# Configure .env (see docs/CONNECT_API_GUIDE.md)
npm start
# ✓ Server running on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# ✓ Running on http://localhost:5173
```

### 3. Full Stack

```bash
# Terminal 1 — Backend
cd backend_rokkru && npm start

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Open browser: http://localhost:5173

## Architecture

```
┌──────────────────────┐         ┌─────────────────┐         ┌──────────────┐
│   Frontend           │  HTTP   │    Backend       │  SQL    │  PostgreSQL  │
│   React + Vite       │ ──────► │  Express + Node  │ ──────► │   Database   │
│   port: 5173         │         │   port: 5000     │         │  port: 5432  │
└──────────────────────┘         └─────────────────┘         └──────────────┘
```

## Team Members

| Member | Role | Pages |
|--------|------|-------|
| **Rint** | Student Core (Team Lead) | Home, Schedule, SearchResults, Leaderboard, TeacherDetail, BookSession |
| **Heang** | Student Social | Profile, Messages, Notifications, Community, SessionReview, StudentEditProfile |
| **Hun** | Teacher | TeacherHome, Analytics, TeacherMyProfile, TeacherPublicProfile, TeacherCreatePost, EditProfile, ProfileSetting |
| **Phy** | Auth + Onboarding | Login, CreateAccount, Landing, AdminLogin, ChooseCommunity, CompleteProfile, TeacherBilling, TeacherSubscription |
| **B Nang** | Admin | AdminDashboard, UserManagement, RoleManagement, AdminSettings, SystemReports, ContentManagement, Billing, HelpCenter |
| **B Ratanak** | Legal + Community | Contact, Help, Privacy, Terms, CommunityDetail, CreateCommunity, ContactSupport, NotFound |

## Documentation

| Document | Location | Description |
|----------|----------|-------------|
| Project Structure | `docs/PROJECT_STRUCTURE.md` | Full project structure (frontend + backend) |
| Folder Function Guide | `docs/GUIDE_FUNCTION_FOLDER.md` | What each folder/file does |
| API Connection Guide | `docs/CONNECT_API_GUIDE.md` | How to connect frontend to backend API |
| Frontend README | `frontend/README.md` | Frontend setup & usage |
| Team Workspace | `team_workspace/README.md` | Task assignments & file placement guide |
| Setup Guide | `team_workspace/SETUP_GUIDE.md` | Step-by-step paste & run guide |

## User Roles

| Role | Access |
|------|--------|
| **Guest** | Landing, Login, Register, Legal pages |
| **Student** | Home, Schedule, Profile, Messages, Community, Search |
| **Teacher** | Dashboard, Analytics, Profile, Billing, Subscription |
| **Admin** | Dashboard, User Management, Reports, Settings |

## Key Features

- Student-teacher matching with filters (major, subject, location)
- Session booking & scheduling
- Community posts & discussions
- Teacher subscription plans
- Admin dashboard & role management
- Bilingual support (English / Khmer)
- Background animations on auth & landing pages
