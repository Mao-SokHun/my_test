# Connect Mentor Backend → Frontend

## 1. Environment

`frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

`backend_rokkru/.env`:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
```

## 2. Comment style (`// ?`)

- **`// ?`** = explain this line/block for learning (Khmer/English OK in headers).
- Search in IDE: `// ?` to jump all mentor-task explanations.

### Backend (all files commented)

| File | Task |
|------|------|
| `middleware/auth.js` | #10 JWT |
| `middleware/requireMentor.js` | #10 role + profile |
| `middleware/upload.js` | #11 multer |
| `middleware/errorHandler.js` | #12 errors |
| `utils/apiResponse.js` | JSON `{ success, data }` |
| `utils/assertOwner.js` | #10 owner check |
| `validators/mentorValidators.js` | #12 validation |
| `models/Mentor.js` … `MentorPost.js` | #7 |
| `controllers/mentorsController.js` | #1, #5 |
| `controllers/mentorPortfolioController.js` | #2 |
| `controllers/mentorSkillsController.js` | #3 |
| `controllers/mentorPostsController.js` | #4 |
| `controllers/mentorAnalyticsController.js` | #6 |
| `routes/v1/mentors.js` | #9 routes + frontend path |
| `app.js` | mount `/api/v1/mentors`, `/uploads` |

### Frontend (connect layer)

| File | Task |
|------|------|
| `services/api.js` | Bearer token → auth.js |
| `services/mentorsApi.js` | All HTTP paths |
| `services/teacherService.js` | Search/detail bridge |
| `services/endpoints.js` | Path constants |
| `utils/mentorMapper.js` | API → UI shape |
| `hooks/useTeacherProfile.js` | GET one mentor |
| `hooks/useMentorPortfolio.js` | #2 |
| `hooks/useMentorSkills.js` | #3 |
| `hooks/useMentorAnalytics.js` | #6 |
| `pages/teacher/EditProfile.jsx` | PUT profile + tabs Portfolio / Skills / Posts |
| `pages/teacher/Analytics.jsx` | analytics UI |
| `components/common/Mentor*Section.jsx` | portfolio, skills, posts UI |
| `constants/mentorProvinces.js` | province_id for posts (match DB) |

## 3. File map (13 tasks)

| Task | Backend | Frontend |
|------|---------|----------|
| CRUD | `mentorsController.js` | `mentorsApi.js`, `teacherService.js`, `useTeacherProfile.js`, `EditProfile.jsx` |
| Portfolio | `mentorPortfolioController.js` | `useMentorPortfolio.js` |
| Skills | `mentorSkillsController.js` | `useMentorSkills.js` |
| Posts | `mentorPostsController.js` | `mentorsApi.js` |
| Search | `GET /mentors/search` | `teacherService` → `searchMentors` |
| Analytics | `mentorAnalyticsController.js` | `useMentorAnalytics.js` → `Analytics.jsx` |
| Models | `models/Mentor*.js` | — |
| Controllers | `controllers/mentor*.js` | — |
| Routes | `routes/v1/mentors.js` | `mentorsApi.js` paths |
| Auth | `auth.js`, `requireMentor.js` | `api.js` token |
| Upload | `upload.js` | `useMentorPortfolio.uploadFile` |
| Validation | `mentorValidators.js` | — |
| Testing | Postman | `MENTOR_API.md` |

## 4. Data flow

```
Home / Search  → useTeachers → teacherService → searchMentors → GET /mentors/search
Teacher detail → useTeacherProfile → fetchMentorById → GET /mentors/:id
Edit profile   → updateMentorProfile → PUT /mentors/:id (needs JWT in localStorage)
Analytics      → useMentorAnalytics → GET /mentors/me/analytics
Portfolio      → useMentorPortfolio → GET/POST /mentors/:id/portfolio
Skills         → useMentorSkills → catalog + CRUD skills
```

## 5. Auth (wired)

- `Login.jsx` → `AuthContext.login({ email, password, role })` → `authService.login`
- Sets `rokkru_token` + `rokkru_user` automatically (API or mock `teacher@rokkru.com`)
- Mock without API: `login(role)` still sets `mock-token`

Protected mentor routes use the token from `api.js` (`Authorization: Bearer …`).

## 6. API reference

See [`MENTOR_API.md`](./MENTOR_API.md).
