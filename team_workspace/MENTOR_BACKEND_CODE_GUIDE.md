# Mentor Backend — Code to write (line-by-line)

> **អ្នក copy code ទៅ `backend_rokkru/` ហើយពិនិត្យដោយខ្លួនឯង** — doc នេះជា tutorial មិនមែន auto-generated production code។  
> Checklist: [`MENTOR_SYSTEM_TASKS.md`](./MENTOR_SYSTEM_TASKS.md) · Notion board UI: [`NOTION_BACKEND_TASKS_BOARD.md`](./NOTION_BACKEND_TASKS_BOARD.md)

---

## 1. លំដាប់ធ្វើ (MVC)

```text
Request
  → routes/v1/mentors.js      (URL + HTTP method)
  → middleware/auth.js          (JWT — optional per route)
  → controllers/mentorsController.js   (logic)
  → models/Mentor.js          (database)
  → Response JSON
```

**Pattern ដែល team មានរួច:** `userTypesController.js` + `routes/v1/userTypes.js` + mount in `app.js`.

---

## 2. Files ដែលអ្នកត្រូវបង្កើត

```text
backend_rokkru/
├── middleware/
│   └── auth.js                 ← NEW
├── utils/
│   └── apiResponse.js          ← NEW (optional but recommended)
├── controllers/
│   └── mentorsController.js    ← NEW
└── routes/v1/
    └── mentors.js              ← NEW
```

កែ `app.js` — mount router។ Models (`Mentor.js`, …) **មានរួច** នៅ `models/`។

---

## 3. `utils/apiResponse.js` — response ដូចគ្នារាល់ endpoint

```js
// utils/apiResponse.js

/** @param {import('express').Response} res */
function ok(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}

/** @param {import('express').Response} res */
function fail(res, message, status = 400) {
  return res.status(status).json({ success: false, error: message });
}

module.exports = { ok, fail };
```

| Line | Meaning |
|------|---------|
| `function ok(...)` | Helper បញ្ជូន success JSON |
| `success: true` | Frontend ងាយពិនិត្យ |
| `data` | Payload ពិត (mentor object, array, …) |
| `fail(...)` | Error ដូចគ្នា — `success: false` + `error` message |
| `module.exports` | Import ក្នុង controller: `const { ok, fail } = require('../utils/apiResponse')` |

---

## 4. `middleware/auth.js` — JWT (ពិនិត្យ token)

```js
// middleware/auth.js
const jwt = require('jsonwebtoken');
const { fail } = require('../utils/apiResponse');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

/**
 * Reads: Authorization: Bearer <token>
 * Sets: req.user = { userId, ... } from token payload
 */
function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return fail(res, 'Missing or invalid Authorization header', 401);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Adjust keys to match YOUR login controller (user_id vs id)
    req.user = {
      userId: payload.user_id ?? payload.userId ?? payload.id,
      role: payload.role,
    };
    return next();
  } catch (err) {
    return fail(res, 'Invalid or expired token', 401);
  }
}

module.exports = { authRequired };
```

| Line | Meaning |
|------|---------|
| `jwt.verify` | Decode token — invalid/expired → catch |
| `Authorization: Bearer` | Standard header format |
| `req.user = { ... }` | Controller ប្រើ `req.user.userId` ពិនិត្យ owner |
| `next()` | Token OK → បន្តទៅ controller |
| `fail(..., 401)` | Unauthorized |

**`.env` (add):**

```env
JWT_SECRET=your-long-random-secret
```

> បើ team មាន `middleware/auth.js` រួចពី Student feature — **reuse** វា កុំបង្កើតថ្មី។

---

## 5. `controllers/mentorsController.js` — Mentor CRUD

```js
// controllers/mentorsController.js
const { Op } = require('sequelize');
const { Mentor } = require('../models');
const { ok, fail } = require('../utils/apiResponse');

/**
 * GET /api/v1/mentors
 * List mentors — pagination + simple search
 */
exports.listMentors = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, parseInt(req.query.limit, 10) || 20);
    const offset = (page - 1) * limit;
    const q = (req.query.q || '').trim();

    const where = {};
    if (q) {
      where[Op.or] = [
        { firstname: { [Op.iLike]: `%${q}%` } },
        { lastname: { [Op.iLike]: `%${q}%` } },
      ];
    }

    const { rows, count } = await Mentor.findAndCountAll({
      where,
      limit,
      offset,
      order: [['create_date', 'DESC']],
    });

    return ok(res, {
      items: rows,
      total: count,
      page,
      limit,
    });
  } catch (err) {
    return fail(res, err.message, 500);
  }
};

/**
 * GET /api/v1/mentors/:userId
 */
exports.getMentorById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const mentor = await Mentor.findByPk(userId);
    if (!mentor) return fail(res, 'Mentor not found', 404);
    return ok(res, mentor);
  } catch (err) {
    return fail(res, err.message, 500);
  }
};

/**
 * GET /api/v1/mentors/me
 * Requires auth — current user's mentor profile
 */
exports.getMyMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByPk(req.user.userId);
    if (!mentor) return fail(res, 'Mentor profile not found', 404);
    return ok(res, mentor);
  } catch (err) {
    return fail(res, err.message, 500);
  }
};

/**
 * POST /api/v1/mentors
 * Create mentor row for logged-in user
 */
exports.createMentor = async (req, res) => {
  try {
    const userId = req.user.userId;
    const exists = await Mentor.findByPk(userId);
    if (exists) return fail(res, 'Mentor profile already exists', 409);

    const {
      firstname,
      lastname,
      gender,
      phone_number,
      address,
      experience_years,
      description,
      profile_picture,
    } = req.body;

    if (!firstname || !lastname) {
      return fail(res, 'firstname and lastname are required', 400);
    }

    const mentor = await Mentor.create({
      user_id: userId,
      firstname,
      lastname,
      gender,
      phone_number,
      address,
      experience_years,
      description,
      profile_picture,
      create_date: new Date(),
    });

    return ok(res, mentor, 201);
  } catch (err) {
    return fail(res, err.message, 500);
  }
};

/**
 * PUT /api/v1/mentors/:userId
 * Owner only
 */
exports.updateMentor = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (req.user.userId !== userId) {
      return fail(res, 'Forbidden', 403);
    }

    const mentor = await Mentor.findByPk(userId);
    if (!mentor) return fail(res, 'Mentor not found', 404);

    const allowed = [
      'firstname', 'lastname', 'gender', 'phone_number', 'address',
      'experience_years', 'description', 'profile_picture',
    ];
    const updates = {};
  allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });
    updates.update_date = new Date();

    await mentor.update(updates);
    return ok(res, mentor);
  } catch (err) {
    return fail(res, err.message, 500);
  }
};

/**
 * DELETE /api/v1/mentors/:userId
 */
exports.deleteMentor = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (req.user.userId !== userId) {
      return fail(res, 'Forbidden', 403);
    }

    const mentor = await Mentor.findByPk(userId);
    if (!mentor) return fail(res, 'Mentor not found', 404);

    await mentor.destroy();
    return ok(res, { deleted: true });
  } catch (err) {
    return fail(res, err.message, 500);
  }
};
```

### Line-by-line — `listMentors`

| Lines | Meaning |
|-------|---------|
| `Op` from `sequelize` | Operators for `WHERE` (`iLike`, `or`, …) |
| `page`, `limit`, `offset` | Pagination — `limit` max 50 កុំ overload DB |
| `where[Op.or]` | Search name in `firstname` OR `lastname` |
| `findAndCountAll` | Returns `rows` + `count` (for total pages) |
| `order: [['create_date', 'DESC']]` | Newest first |
| `ok(res, { items, total, page, limit })` | Same shape frontend expects (`teachersApi.js`) |

### Line-by-line — `getMentorById`

| Lines | Meaning |
|-------|---------|
| `findByPk(userId)` | PK of `mentor` table = `user_id` |
| `404` | No row |

### Line-by-line — `getMyMentor`

| Lines | Meaning |
|-------|---------|
| `req.user.userId` | From `auth` middleware after JWT verify |
| `findByPk(req.user.userId)` | Current logged-in mentor |

### Line-by-line — `createMentor`

| Lines | Meaning |
|-------|---------|
| `findByPk` before create | Prevent duplicate profile (`409`) |
| `req.body` destructuring | Fields match `models/Mentor.js` |
| `user_id: userId` | Link mentor row to `users` table |
| `201` | Created |

### Line-by-line — `updateMentor` / `deleteMentor`

| Lines | Meaning |
|-------|---------|
| `req.user.userId !== userId` | Only owner can edit/delete (`403`) |
| `allowed` array | Whitelist fields — avoid updating `user_id` |
| `update_date` | Your model has no Sequelize `timestamps` — set manually |

---

## 6. `routes/v1/mentors.js` — wire URLs to controller

```js
// routes/v1/mentors.js
const express = require('express');
const router = express.Router();
const mentorsController = require('../../controllers/mentorsController');
const { authRequired } = require('../../middleware/auth');

// Public
router.get('/', mentorsController.listMentors);
router.get('/:userId', mentorsController.getMentorById);

// Auth required
router.get('/me/profile', authRequired, mentorsController.getMyMentor);
router.post('/', authRequired, mentorsController.createMentor);
router.put('/:userId', authRequired, mentorsController.updateMentor);
router.delete('/:userId', authRequired, mentorsController.deleteMentor);

module.exports = router;
```

| Line | Meaning |
|------|---------|
| `express.Router()` | Mini-app for `/mentors` paths |
| `router.get('/')` | `GET /api/v1/mentors` |
| `authRequired` before handler | Runs JWT check first |
| `/:userId` | Must be **after** `/me/profile` or `"me"` will be treated as id |

> **Fix route order:** put `/me/profile` **before** `/:userId`:

```js
router.get('/me/profile', authRequired, mentorsController.getMyMentor);
router.get('/:userId', mentorsController.getMentorById);
```

---

## 7. `app.js` — mount router

Add after `user-types` route (around line 56):

```js
const mentorsRouter = require('./routes/v1/mentors');
app.use('/api/v1/mentors', mentorsRouter);
```

| Line | Meaning |
|------|---------|
| `require('./routes/v1/mentors')` | Load route file |
| `app.use('/api/v1/mentors', mentorsRouter)` | All paths in router get prefix `/api/v1/mentors` |

---

## 8. Test with Postman

| Method | URL | Headers | Body |
|--------|-----|---------|------|
| GET | `http://localhost:3000/api/v1/mentors?page=1&limit=10` | — | — |
| GET | `http://localhost:3000/api/v1/mentors/1` | — | — |
| POST | `http://localhost:3000/api/v1/mentors` | `Authorization: Bearer <token>` | JSON profile |
| PUT | `http://localhost:3000/api/v1/mentors/1` | Bearer | `{ "description": "..." }` |

---

## 9. Next features — same pattern

### Portfolio (`MentorPortfolio`)

```js
// In mentorsController or mentorPortfolioController.js
const { MentorPortfolio } = require('../models');

exports.listPortfolio = async (req, res) => {
  const mentorId = req.params.userId;
  const items = await MentorPortfolio.findAll({ where: { mentor_id: mentorId } });
  return ok(res, items);
};
```

| Line | Meaning |
|------|---------|
| `mentor_id` | FK in `mentor_portfolio` table |
| Composite PK `(mentor_id, link)` | UPDATE/DELETE need both keys in URL |

### Skills (`MentorSkill` + `SubSkill`)

```js
const { MentorSkill, SubSkill, Skill } = require('../models');

exports.listSkills = async (req, res) => {
  const items = await MentorSkill.findAll({
    where: { user_id: req.params.userId },
    include: [{ model: SubSkill, include: [Skill] }],
  });
  return ok(res, items);
};
```

Add `proficiency_level` column to model first if required by test.

### Posts (`MentorPost`)

Same CRUD pattern — `where: { user_id }`, validate `title`, `province_id`, `sub_skill_id`.

### Search (`GET /mentors/search`)

Extend `listMentors` with query params: `skillId`, `minExperience`, `page`, `limit` — build `where` + `include` on `MentorSkill`.

### Analytics

Start with `GET /mentors/me/analytics` returning counts from DB queries (posts count, portfolio count) — add `MentorAnalytics` table later if needed.

---

## 10. Compare with existing code in repo

Your team already has this **working example**:

```6:12:backend_rokkru/controllers/userTypesController.js
exports.getUserTypes = async (req, res) => {
  try {
    const userTypes = await UserType.findAll();
    res.json(userTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

Mentor controller = same `try/catch` + Sequelize, but:

- use `ok` / `fail` for consistent JSON
- add `authRequired` on write routes
- add pagination on list

---

## 11. Link to frontend (later)

When APIs work, add to `frontend/src/services/endpoints.js`:

```js
mentors: {
  list: '/mentors',
  byId: (id) => `/mentors/${id}`,
  me: '/mentors/me/profile',
},
```

See [`CONNECT_API_GUIDE.md`](./CONNECT_API_GUIDE.md).

---

## Quick map: test task → file

| Task | File(s) to write |
|------|------------------|
| Mentor CRUD | `mentorsController.js`, `routes/v1/mentors.js`, `app.js` |
| Portfolio | `mentorPortfolioController.js` or methods in mentors controller |
| Skills | `mentorSkillsController.js` + maybe update `MentorSkill.js` |
| Posts | `mentorPostsController.js` |
| Search | `listMentors` or `searchMentors` with filters |
| Analytics | `getAnalytics` on `/me/analytics` |
| Auth | `middleware/auth.js` |
| Validation | `express-validator` in routes or controller checks |

Mark progress on Notion board: [`NOTION_BACKEND_TASKS_BOARD.md`](./NOTION_BACKEND_TASKS_BOARD.md).
