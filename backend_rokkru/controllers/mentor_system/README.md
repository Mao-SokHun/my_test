# Mentor controllers (Hun — tasks #1–#6, #8)

Your mentor **controller** files live here only.

## Related folders (same `mentor_system` name per layer)

```
backend_rokkru/
├── controllers/mentor_system/     ← you are here
├── middleware/mentor_system/
├── models/mentor_system/
├── routes/v1/mentor_system/
├── validators/mentor_system/
└── utils/mentor_system/
```

## Files

| File | Task |
|------|------|
| `mentors-controller.js` | #1 CRUD, #5 search |
| `mentor-portfolio-controller.js` | #2 portfolio |
| `mentor-skills-controller.js` | #3 skills |
| `mentor-posts-controller.js` | #4 posts |
| `mentor-analytics-controller.js` | #6 analytics |

API mount: `app.js` → `routes/v1/mentor_system/mentors.js` → `/api/v1/mentors`

**Convention guide:** [`docs/CONVENTION_GUIDE.md`](../../../docs/CONVENTION_GUIDE.md) · Quick: [`docs/CODING_CONVENTIONS.md`](../../../docs/CODING_CONVENTIONS.md)

## Require paths (from `controllers/mentor_system/`)

| Import | Path |
|--------|------|
| Models | `require('../../models/mentor_system')` |
| Utils | `require('../../utils/mentor_system/api-response')` |
| Assert owner | `require('../../utils/mentor_system/assert-owner')` |

From `routes/v1/mentor_system/mentors.js` use `../../../controllers/mentor_system/...`

## Verify after moving files

```bash
cd backend_rokkru
node scripts/check-mentor-paths.js
```
