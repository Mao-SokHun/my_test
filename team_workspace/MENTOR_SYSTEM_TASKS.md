# Mentor System — Backend test checklist (your task)

## ⚠️ Scope rule (សំខាន់)

**Backend ធ្វើតែតាម task list ខាងក្រោម (#1–#13) — កុំធ្វើលើសពីនោះ។**

| ✅ In scope (តែរបស់អ្នក) | ❌ Out of scope (កុំធ្វើ) |
|-------------------------|-------------------------|
| Mentor CRUD, Portfolio, Skills, Posts, Search, Analytics | Student / Admin / Community APIs |
| Models, Controllers, Routes, Auth, Upload, Validation | Frontend pages, `mentorsApi.js`, UI changes |
| Test + document **your** endpoints in `MENTOR_API.md` | Rating/availability search បើ DB មិនមាន table |
| MVC under `/api/v1/mentors` | Refactor code ផ្សេងទៅ nje ដែលមិនមានក្នុង task |

**Owner:** Hun — mentor backend test only. Teammates / AI: ask before adding any endpoint or file not listed below.

---

> **Code in repo:** `backend_rokkru/` (controllers, routes, middleware)  
> **Line-by-line guide:** [`MENTOR_BACKEND_CODE_GUIDE.md`](./MENTOR_BACKEND_CODE_GUIDE.md)  
> **API contract:** [`MENTOR_API.md`](./MENTOR_API.md)  
> **Notion board UI:** [`NOTION_BACKEND_TASKS_BOARD.md`](./NOTION_BACKEND_TASKS_BOARD.md)

**Branch:** `feature/05/Mentor-System`  
**API prefix:** `/api/v1/mentors`

---

## Implementation status

| # | Task | Status | Location |
|---|------|--------|----------|
| 1 | Mentor CRUD | ✅ Done | `controllers/mentorsController.js` |
| 2 | Portfolio Management | ✅ Done | `mentorPortfolioController.js` + upload |
| 3 | Skills Management | ✅ Done | `mentorSkillsController.js` + `proficiency_level` |
| 4 | Mentor Posts | ✅ Done | `mentorPostsController.js` |
| 5 | Mentor Search | ✅ Done | `GET /mentors`, `/search` + filters, sort, pagination |
| 6 | Analytics | ⚠️ Partial | `mentorAnalyticsController.js` — counts OK; views/earnings need more tables |
| 7 | Models | ✅ Done | `Mentor`, `MentorPortfolio`, `MentorSkill`, `MentorPost`, `Skill`, `SubSkill` |
| 8 | Controllers | ✅ Done | Dedicated files per resource |
| 9 | Routes | ✅ Done | `routes/v1/mentors.js` |
| 10 | Auth & Authorization | ✅ Done | `middleware/auth.js`, `requireMentor.js`, owner checks |
| 11 | File Uploads | ✅ Done | `POST .../portfolio/upload` (multer) |
| 12 | Error Handling & Validation | ✅ Done | `apiResponse.js`, `errorHandler.js`, `mentorValidators.js` |
| 13 | Testing | ☐ Your turn | Postman — see `MENTOR_API.md` checklist |

---

## Feature tasks (detail)

| Task | Notes |
|------|-------|
| **Mentor CRUD** | `GET/POST /mentors`, `GET/PUT/DELETE /mentors/:userId`, `GET /mentors/me` |
| **Portfolio** | CRUD + `title`, `description`, `item_type`; file upload endpoint |
| **Skills** | CRUD + `GET /mentors/skills/catalog` |
| **Posts** | CRUD + status draft/published/archived |
| **Search** | `q`, `skillId`, `subSkillId`, `minExperience`, `sort`, `page`, `limit` |
| **Analytics** | Portfolio/skills/posts counts; wire sessions/earnings when DB ready |

---

## Search limits (current DB)

| Filter | Supported |
|--------|-----------|
| Text `q` | ✅ |
| Skills | ✅ `skillId`, `subSkillId` |
| Experience | ✅ `minExperience` |
| Sort | ✅ `newest`, `experience`, `name` |
| Rating | ❌ Needs reviews table |
| Availability | ❌ Add column/schedule table if required |

---

## References

- MVC: Models → Controllers → Routes → Middlewares
- JWT: set `JWT_SECRET` in `.env`; token payload `user_id` or `userId`
- Consistent JSON: `{ success, data }` / `{ success: false, error }`
- Frontend: map Mentor API → Teacher UI (`teachersApi.js`)

---

## Track progress (optional)

Update status in `frontend/src/constants/backendTasksTeam.js` (Notion board rows tagged `Mentor`).
