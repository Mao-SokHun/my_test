# Notion-style Backend Tasks Board (Frontend reference)

ឯកសារនេះពិពណ៌នា **frontend UI តាមដានកិច្ចការ backend** (ដូច Notion database table) — **មិនមែន** API implementation ឬ mentor backend logic។

**អ្នកធ្វើ backend test** → មើល [`MENTOR_SYSTEM_TASKS.md`](./MENTOR_SYSTEM_TASKS.md)  
**អ្នកធ្វើ UI / sync data** → មើលឯកសារនេះ

---

## គោលបំណង

- បង្ហាញ task របស់ team backend ក្នុង admin panel (read-only)
- UI dark table ដូច sample Notion team board
- Mentor System test tasks (row id `30`–`39`) ស្ថិតក្នុង data file ដើម្បីតាមដាន progress — **អ្នក implement API នៅ `backend_rokkru/`**

---

## មើលក្នុង app (optional)

| Item | Path |
|------|------|
| Route | `/admin/backend-tasks` |
| Page | `frontend/src/pages/admin/BackendTasksTeam.jsx` |
| Data | `frontend/src/constants/backendTasksTeam.js` |
| Sidebar | Admin → **Backend Tasks** (`admin.backendTasks` in locale) |

Login as admin → open **Backend Tasks**.

---

## File structure

```
frontend/src/
├── constants/backendTasksTeam.js   ← columns + rows (Notion data)
└── pages/admin/BackendTasksTeam.jsx  ← table UI, search, filter
```

**Team workspace mirror:** `team_workspace/shared/` (same paths under `shared/`).

---

## UI features (Notion-style)

| Feature | Description |
|---------|-------------|
| Dark board | Background `#191919`, borders `#2f2f2f` |
| Columns | Name, Status, Tags, Member, Day, Priority, Description |
| Status pills | `Done` (grey), `In Progress` (red tint) |
| Search | Filters name, tags, member, description |
| Status filter | All / Done / In Progress |
| Counter | Done · In Progress · Total |

---

## Data format

### Columns — `BACKEND_TASK_COLUMNS`

```js
{ id: 'name' | 'status' | 'tags' | 'member' | 'day' | 'priority' | 'description', label, width }
```

### Rows — `BACKEND_TASK_ROWS`

Each row:

```js
{
  id: '30',              // string, unique
  name: 'Mentor CRUD',
  status: 'Done' | 'In Progress',
  tags: 'Mentor',       // category label
  member: 'HUN',        // assignee
  day: 'Test',          // sprint / date range
  priority: 'High',     // Critical | High | ...
  description: '...',   // full task text
}
```

### កែ / បន្ថែម task

1. Open `frontend/src/constants/backendTasksTeam.js`
2. Add object to `BACKEND_TASK_ROWS`
3. Sync to `team_workspace/shared/constants/backendTasksTeam.js` if your team uses shared folder
4. Refresh `/admin/backend-tasks`

**មិនត្រូវការ backend API** សម្រាប់ board នេះ — static data only.

---

## Mentor System rows (your backend test)

Rows tagged **`Mentor`** in `backendTasksTeam.js` (ids `30`+) map to your test checklist in `MENTOR_SYSTEM_TASKS.md`:

| Row name | Backend work |
|----------|----------------|
| Mentor CRUD | `controllers/`, `routes/v1/mentors` |
| Portfolio Management | `MentorPortfolio` model + endpoints |
| Skills Management | `MentorSkill` + proficiency field if added |
| Mentor Posts | `MentorPost` CRUD |
| Mentor Search | `GET /mentors/search` + pagination |
| Analytics | read-only stats endpoint |
| Models / Controllers / Routes / Auth / Uploads / Validation / Testing | infrastructure tasks |

When you finish a backend item, update **`status`** in `backendTasksTeam.js` to `Done` (for team visibility only).

---

## អ្វីដែល **មិន** ជា part នៃ doc នេះ

| Topic | Where |
|-------|--------|
| Sequelize models, MVC, JWT | [`MENTOR_SYSTEM_TASKS.md`](./MENTOR_SYSTEM_TASKS.md) |
| API paths `/api/v1/mentors` | `backend_rokkru/` + `CONNECT_API_GUIDE.md` |
| Student/Teacher app features | `GUIDE_FUNCTION_FOLDER.md` |

---

## Frontend ↔ backend naming

| Backend | Frontend (RokKru product) |
|---------|---------------------------|
| Mentor | Teacher (`pages/teacher/*`, `teachersApi.js`) |

When your mentor APIs are ready, document contracts in `CONNECT_API_GUIDE.md` — the Notion board does **not** call those APIs.

---

## Related docs

- [`MENTOR_SYSTEM_TASKS.md`](./MENTOR_SYSTEM_TASKS.md) — **your** backend test checklist
- [`CONNECT_API_GUIDE.md`](./CONNECT_API_GUIDE.md) — how frontend calls backend
- [`GUIDE_FUNCTION_FOLDER.md`](./GUIDE_FUNCTION_FOLDER.md) — folder map
