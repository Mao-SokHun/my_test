# Mentor API — Contract for Frontend

**Base URL:** `http://localhost:3000/api/v1` (or `VITE_API_URL`)  
**Prefix:** `/mentors`  
**Auth header:** `Authorization: Bearer <jwt>`

## Response format

```json
{ "success": true, "data": { ... } }
{ "success": false, "error": "message" }
```

---

## Mentor profile

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/mentors` | — | List + pagination |
| GET | `/mentors/search` | — | Same as list (filters) |
| GET | `/mentors/:userId` | — | One profile |
| GET | `/mentors/me` | ✓ | Current user mentor row |
| POST | `/mentors` | ✓ | Create profile |
| PUT | `/mentors/:userId` | ✓ owner | Update |
| DELETE | `/mentors/:userId` | ✓ owner | Delete |

### Query (list / search)

| Param | Type | Description |
|-------|------|-------------|
| `q` | string | Search name / description |
| `skillId` | int | Filter by parent skill |
| `subSkillId` | int | Filter by sub-skill |
| `minExperience` | int | `experience_years >=` |
| `sort` | string | `newest` \| `experience` \| `name` |
| `page` | int | Default 1 |
| `limit` | int | Default 20, max 50 |

### Create body (POST `/mentors`)

```json
{
  "firstname": "Sok",
  "lastname": "Dara",
  "gender": "male",
  "phone_number": "+855...",
  "address": "Phnom Penh",
  "experience_years": 5,
  "description": "Math mentor",
  "profile_picture": "https://..."
}
```

---

## Portfolio

| Method | Path | Auth |
|--------|------|------|
| GET | `/mentors/:userId/portfolio` | — |
| POST | `/mentors/:userId/portfolio` | ✓ profile |
| POST | `/mentors/:userId/portfolio/upload` | ✓ multipart |
| PUT | `/mentors/:userId/portfolio/:link` | ✓ |
| DELETE | `/mentors/:userId/portfolio/:link` | ✓ |

`link` in URL must be **encodeURIComponent** (composite PK).

### JSON body (POST portfolio)

```json
{
  "link": "https://github.com/...",
  "link_tag": "project",
  "title": "E-learning app",
  "description": "Built with React",
  "item_type": "project"
}
```

`item_type`: `project` | `experience` | `achievement`

### Upload (POST portfolio/upload)

`multipart/form-data`:

- `file` — image or PDF (max 5MB)
- `title`, `description`, `item_type`, `link_tag` (optional fields)

File URL stored as `/uploads/portfolio/<filename>` — serve from `http://localhost:3000/uploads/...`

---

## Skills

| Method | Path | Auth |
|--------|------|------|
| GET | `/mentors/skills/catalog` | — |
| GET | `/mentors/:userId/skills` | — |
| POST | `/mentors/:userId/skills` | ✓ |
| PUT | `/mentors/:userId/skills/:msId` | ✓ |
| DELETE | `/mentors/:userId/skills/:msId` | ✓ |

### Add skill body

```json
{
  "sub_skill_id": 3,
  "proficiency_level": "expert"
}
```

---

## Posts

| Method | Path | Auth |
|--------|------|------|
| GET | `/mentors/:userId/posts` | — |
| GET | `/mentors/posts/:postId` | — |
| POST | `/mentors/:userId/posts` | ✓ |
| PUT | `/mentors/posts/:postId` | ✓ owner |
| DELETE | `/mentors/posts/:postId` | ✓ owner |

### Create post body

```json
{
  "title": "IELTS tips",
  "description": "...",
  "province_id": 1,
  "sub_skill_id": 2,
  "status": "draft"
}
```

`status`: `draft` | `published` | `archived`

---

## Analytics

| Method | Path | Auth |
|--------|------|------|
| GET | `/mentors/me/analytics` | ✓ profile |

```json
{
  "user_id": 1,
  "portfolio_count": 3,
  "skills_count": 5,
  "posts_count": 10,
  "published_posts_count": 7,
  "profile_views": 0,
  "sessions_count": 0,
  "earnings": 0
}
```

`profile_views`, `sessions_count`, `earnings` — placeholder until session/payment tables are wired.

---

## Frontend mapping

Add to `frontend/src/services/endpoints.js`:

```js
mentors: {
  list: '/mentors',
  search: '/mentors/search',
  catalog: '/mentors/skills/catalog',
  byId: (id) => `/mentors/${id}`,
  me: '/mentors/me',
  analytics: '/mentors/me/analytics',
  portfolio: (id) => `/mentors/${id}/portfolio`,
  skills: (id) => `/mentors/${id}/skills`,
  posts: (id) => `/mentors/${id}/posts`,
},
```

Product UI uses **Teacher** naming; API uses **Mentor**.

---

## Testing checklist

- [ ] GET list without auth
- [ ] POST create mentor with JWT
- [ ] PUT another user → 403
- [ ] Portfolio upload + GET static file
- [ ] Add duplicate skill → 409
- [ ] Post draft → published via PUT
- [ ] Search `?q=math&sort=experience`

See also: [`MENTOR_SYSTEM_TASKS.md`](./MENTOR_SYSTEM_TASKS.md)
