# Mentor System — Code Fix Checklist

Checklist to reach **feature complete + no bugs**. MVC structure (dedicated controllers) is already done; this document covers remaining fixes only.

**Last reviewed:** routes in `routes/v1/mentors.js`, controllers in `controllers/mentor_system/`.

---

## Summary

| Status | Area |
|--------|------|
| Done | Thin routes, logic in 5 controllers, shared utils (`api-response`, `assert-owner`) |
| Partial | Error handling & validation (~70% inline only; see §12) |
| Needs work | JWT auth, `mentorController` CRUD bugs, `mentorPortfolioController` POST + import |
| Works (public GET) | `listMentors`, `searchMentors`, `getMentorById`, skills list, posts list (after `create_date` fix) |

### Priority legend

- **P0** — Broken / crash / feature missing
- **P1** — Auth, wrong param names, import convention
- **P2** — Polish (typos, HTTP codes, optional validation)

---

## Fix order (recommended)

1. `app.js` — JWT middleware + consistent `request.user` shape
2. `mentorController.js` — create, update, delete, getMyMentor
3. `mentorPortfolioController.js` — import + `creatPortfolio`
4. `routes/v1/mentors.js` — attach auth middleware to protected routes
5. Error handling — implement `error-handler.js` + `validators/mentor_system/` (§12)
6. Test with `mentor-system-routes.txt` (GET first, then POST/PUT/DELETE with Bearer token)
7. P2 polish across files

---

## 1. `app.js` + authentication

| Priority | Task | Why |
|----------|------|-----|
| P0 | Add JWT (or session) middleware that sets `request.user` | `getMyMentor`, analytics, and `assertOwner` read `request.user` — without middleware → **500** |
| P0 | Standardize one property name: `userID` **or** `userId` everywhere | `getMyMentor` uses `userId`; `assert-owner.js` and analytics use `userID` |
| P1 | Apply middleware only on routes that require login | See protected routes table below |

### Protected routes (need auth)

| Method | Path |
|--------|------|
| GET | `/api/v1/mentors/me` |
| GET | `/api/v1/mentors/me/analytics` |
| POST | `/api/v1/mentors` |
| PUT | `/api/v1/mentors/:userId` |
| DELETE | `/api/v1/mentors/:userId` |
| POST | `/api/v1/mentors/:userId/skills` |
| DELETE | `/api/v1/mentors/:userId/skills/:subSkillId` |
| POST | `/api/v1/mentors/:userId/portfolio` |
| PATCH | `/api/v1/mentors/:userId/portfolio/:link` |
| DELETE | `/api/v1/mentors/:userId/portfolio/:link` |
| POST | `/api/v1/mentors/:userId/posts` |
| PATCH | `/api/v1/mentors/posts/:postId` |
| DELETE | `/api/v1/mentors/posts/:postId` |

### Public routes (no auth)

| Method | Path |
|--------|------|
| GET | `/api/v1/mentors`, `/mentors/search`, `/mentors/:userId` |
| GET | `/api/v1/mentors/skill/listAllSkill` |
| GET | `/api/v1/mentors/:userId/skills`, `.../portfolio`, `.../posts` |
| GET | `/api/v1/mentors/posts/:postId`, `.../legacy` |

---

## 2. `controllers/mentor_system/mentorController.js`

| Priority | Function | Line(s) | Issue | Fix |
|----------|----------|---------|-------|-----|
| OK | `listMentors` | ~88–105 | — | Keep as-is |
| OK | `searchMentors` | ~111–113 | Delegates to `listMentors` | Keep as-is |
| OK | `getMentorById` | ~120–134 | — | Keep (optional: 404 instead of 400) |
| P0 | `getMyMentor` | ~143 | `request.user.userId` | Match JWT payload (e.g. `userID`) after middleware exists |
| P0 | `createMentor` | ~158–177 | `request(request.user.userID)` typo; no `Mentor.create`; no success response | Full flow: read user id from JWT → check duplicate → `Mentor.create({ user_id, ...body })` → `return ok(..., 201)` |
| P0 | `updateMentor` | ~187 | `request.params.userID` | Route param is `:userId` → use `request.params.userId` |
| P0 | `updateMentor` | ~193–202 | `allowedFields` without quotes | Use strings: `['firstname','lastname','gender',...]` |
| P0 | `updateMentor` | ~210 | `new Data()` | `new Date()` |
| P0 | `updateMentor` | ~213 | Returns stale `mentor` | `await mentor.reload()` before `ok(response, mentor)` |
| P0 | `deleteMentor` | ~231 | `const Mentor = await Mentor.findByPk` shadows model | `const mentor = await Mentor.findByPk(userId)` |
| P0 | `deleteMentor` | ~235 | `mentor.destroy()` but variable is `Mentor` | Use `mentor.destroy()` |
| P0 | `deleteMentor` | ~187, 230 | `userID` param name | `userId` to match route |
| P2 | `getMentorById` | ~128 | Not found returns 400 | Consider 404 |

### `createMentor` — expected logic (reference)

```javascript
// Pseudocode — implement in controller
const userID = request.user.userID; // or userId, but one name project-wide
const exists = await Mentor.findByPk(userID);
if (exists) return fail(response, 'Mentor profile already exists', 400);

const mentor = await Mentor.create({
  user_id: userID,
  firstname: request.body.firstname,
  // ...other allowed fields
});
return ok(response, mentor, 201);
```

---

## 3. `controllers/mentor_system/mentorPortfolioController.js`

| Priority | Function | Line(s) | Issue | Fix |
|----------|----------|---------|-------|-----|
| P1 | import | ~3 | `import MentorPortfolio from '../../models/mentorPortfolioModel.js'` | `import { MentorPortfolio } from '../../models/index.js'` |
| OK | `listPortfolio` | ~9–24 | — | Keep |
| P0 | `creatPortfolio` | ~36–40 | `mentorId`, `link`, `link_tag` undefined | Parse `mentorId` from params; read `link`, `link_tag` from `request.body` |
| P1 | `creatPortfolio` | — | No validation for required `link` | Return 400 if `link` missing |
| OK | `updatePortfolio` | ~54–89 | — | Keep (needs JWT owner) |
| P1 | `deletePortfolio` | ~101 | No `mentorId === null` check | Same as `listPortfolio` |
| P2 | comments | — | Typo `/motors/` | `/mentors/` |

### `creatPortfolio` — expected logic (reference)

```javascript
// Pseudocode
if (!assertOwner(request, response, request.params.userId)) return;
const mentorId = parseUserId(request.params.userId);
const { link, link_tag } = request.body;
if (!link) return fail(response, 'link is required', 400);

const item = await MentorPortfolio.create({
  mentor_id: mentorId,
  link,
  link_tag: link_tag || null,
});
return ok(response, item, 201);
```

---

## 4. `controllers/mentor_system/mentorPostsController.js`

| Priority | Function | Issue | Fix |
|----------|----------|-------|-----|
| OK | `listPost`, `getPostById`, `createPost`, `updatePost`, `deletePost` | Logic OK; `order: [['create_date', 'DESC']]` | Keep |
| P1 | write handlers | Need JWT + `assertOwner` | Wire auth on routes |
| P2 | `getPostByIdLegacy` | Typo `'Invide post id'` | `'Invalid post id'` |

---

## 5. `controllers/mentor_system/mentorSkillsController.js`

| Priority | Function | Issue | Fix |
|----------|----------|-------|-----|
| OK | All four handlers | Import from `models/index.js`; logic OK | Keep |
| P1 | `addMentorSkill`, `deleteMentorSkill` | Need JWT | Wire auth on routes |
| P2 | `addMentorSkill` | Duplicate skill may 500 on DB unique | Optional: check existing row → 400 |

---

## 6. `controllers/mentor_system/mentorAnalyticsController.js`

| Priority | Issue | Fix |
|----------|-------|-----|
| P0 | `request.user.userID` without middleware | Add JWT middleware |
| P1 | `userID` vs `userId` mismatch with `getMyMentor` | One convention project-wide |
| P2 | `profile_views`, `sessions_count`, `earnings` are `null` | OK if spec allows; note already in response |

---

## 7. `utils/mentor_system/assert-owner.js`

| Priority | Issue | Fix |
|----------|-------|-----|
| P0 | Depends on `request.user` | Works after auth middleware |
| P1 | Uses `request.user.userID` | Must match JWT payload field name |

---

## 8. `routes/v1/mentors.js`

| Priority | Issue | Fix |
|----------|-------|-----|
| OK | Thin router; static paths before `:userId` | Keep |
| P1 | No auth on protected routes | `router.get('/mentors/me', auth, mentorController.getMyMentor)` etc. |

---

## 12. Error Handling & Validation

**Rubric:** Error Handling & Validation — `utils/mentor_system/`, `error-handler.js`, `validators/mentor_system/`

**Actual status:** **Partial (~70%)** — not fully ✅ Done until items below are completed.

### What exists today

| File / folder | Status | Used by controllers? |
|---------------|--------|----------------------|
| `utils/mentor_system/api-response.js` | ✅ Implemented | ✅ All 5 mentor controllers (`ok`, `fail`) |
| `utils/mentor_system/assert-owner.js` | ✅ Implemented | ✅ skills, portfolio, posts, mentor update/delete |
| `utils/mentor_system/error-handler.js` | ❌ **Empty file** | ❌ Not imported anywhere |
| `validators/mentor_system/` | ❌ **Folder does not exist** | — |
| Inline validation in controllers | ✅ Partial | `parseUserID`, required body fields, 404 messages |
| Global error middleware in `app.js` | ❌ Missing | — |

### Response format (already consistent)

Success:

```json
{ "success": true, "data": { ... } }
```

Error:

```json
{ "success": false, "error": "message string" }
```

Source: `utils/mentor_system/api-response.js`

### Inline validation already in controllers (keep or move to validators)

| Controller | Examples |
|------------|----------|
| `mentorController` | Invalid `userId` → 400; mentor not found |
| `mentorSkillsController` | Invalid user id; `sub_skill_id` required; sub-skill not found → 404 |
| `mentorPortfolioController` | Invalid user id; portfolio not found → 404; PATCH rules for `link` |
| `mentorPostsController` | Invalid post id; `title`, `province_id`, `sub_skill_id` required on create |
| `mentorAnalyticsController` | Mentor profile not found → 404 |

### Rubric vs reality

| Requirement | Mark ✅? | Notes |
|-------------|----------|-------|
| Consistent API error shape (`ok` / `fail`) | ✅ | Done |
| Authorization helper (`assertOwner`) | ⚠️ | Code exists; needs JWT + `userID`/`userId` fix |
| `error-handler.js` centralized handler | ❌ | File empty, not wired |
| `validators/mentor_system/` dedicated validators | ❌ | Folder missing |
| Schema / middleware validation (Joi, Zod, express-validator) | ❌ | Not used |

---

### 12.1 Implement `utils/mentor_system/error-handler.js`

| Priority | Task |
|----------|------|
| P0 | Add Express error middleware `(err, req, res, next)` |
| P0 | Map common Sequelize errors to HTTP status (e.g. unique violation → 409, validation → 400) |
| P1 | Log unexpected errors (console or logger); hide stack in production |
| P1 | Register in `app.js` **after** all routes: `app.use(errorHandler)` |

**Reference implementation:**

```javascript
// utils/mentor_system/error-handler.js
import { fail } from './api-response.js';

function errorHandler(err, request, response, next) {
  if (response.headersSent) return next(err);

  // Sequelize unique constraint
  if (err.name === 'SequelizeUniqueConstraintError') {
    return fail(response, 'Resource already exists', 409);
  }
  // Sequelize validation
  if (err.name === 'SequelizeValidationError') {
    const message = err.errors?.map((e) => e.message).join(', ') || err.message;
    return fail(response, message, 400);
  }

  const status = err.status || err.statusCode || 500;
  const message = status === 500 ? 'Internal server error' : err.message;
  return fail(response, message, status);
}

export default errorHandler;
```

**Controller pattern after central handler exists:**

- Option A: `throw err` in `catch` and remove redundant `fail(..., 500)` for unknown errors
- Option B: keep `try/catch` + `fail` for known cases; `next(err)` for unexpected errors

---

### 12.2 Create `validators/mentor_system/`

Suggested folder layout:

```
validators/mentor_system/
  index.js                 # re-export all validators
  mentorValidators.js      # create / update mentor body
  portfolioValidators.js   # create / patch portfolio
  postValidators.js        # create / update post
  skillValidators.js       # add mentor skill body
  validate.js              # tiny helper: run rules → fail() or continue
```

| Priority | File | Validates |
|----------|------|-----------|
| P0 | `portfolioValidators.js` | `link` required (string, max 250); optional `link_tag` |
| P0 | `postValidators.js` | `title`, `province_id`, `sub_skill_id` on create; allowed fields on update |
| P0 | `skillValidators.js` | `sub_skill_id` required, positive integer |
| P1 | `mentorValidators.js` | create mentor body; update allowed fields only |
| P1 | `validate.js` | `validate(request, response, rules)` → returns `false` if already sent `fail` |

**Example validator helper (no extra npm required):**

```javascript
// validators/mentor_system/validate.js
import { fail } from '../../utils/mentor_system/api-response.js';

function requireFields(body, fields) {
  const missing = fields.filter((f) => body[f] === undefined || body[f] === '');
  if (missing.length) return `Missing required fields: ${missing.join(', ')}`;
  return null;
}

function validate(request, response, { required = [], custom } = {}) {
  const msg = requireFields(request.body, required);
  if (msg) {
    fail(response, msg, 400);
    return false;
  }
  if (custom) {
    const customMsg = custom(request.body, request.params);
    if (customMsg) {
      fail(response, customMsg, 400);
      return false;
    }
  }
  return true;
}

export { validate, requireFields };
```

**Example use in controller:**

```javascript
import { validate } from '../../validators/mentor_system/validate.js';

const createPost = async (request, response) => {
  try {
    if (!assertOwner(request, response, request.params.userId)) return;
    if (!validate(request, response, {
      required: ['title', 'province_id', 'sub_skill_id'],
    })) return;
    // ... MentorPost.create
  } catch (error) {
    // next(error) if using global errorHandler
  }
};
```

**Optional (P2):** add `joi` or `express-validator` for stricter schemas instead of hand-written rules.

---

### 12.3 Wire validation on routes (optional pattern)

| Priority | Task |
|----------|------|
| P1 | Middleware on POST/PATCH routes: `router.post('.../posts', auth, validateCreatePost, postsController.createPost)` |
| P2 | Move duplicate checks out of controllers once validators exist |

---

### 12.4 Error handling checklist

- [x] `api-response.js` — `ok` / `fail`
- [x] `assert-owner.js` — owner + invalid id
- [x] Per-handler `try/catch` with `fail(..., 500)`
- [ ] `error-handler.js` — implemented and registered in `app.js`
- [ ] `validators/mentor_system/` — folder + validators for write endpoints
- [ ] Controllers call validators (or route middleware) before DB writes
- [ ] Sequelize errors return 409/400 instead of raw 500 message
- [ ] Auth errors: 401 Unauthorized vs 403 Forbidden (when JWT middleware added)

### 12.5 HTTP status conventions (mentor system)

| Situation | Status | Via |
|-----------|--------|-----|
| Success GET | 200 | `ok(response, data)` |
| Success CREATE | 201 | `ok(response, data, 201)` |
| Bad input / validation | 400 | `fail(response, message, 400)` |
| Not logged in | 401 | JWT middleware (to add) |
| Not owner | 403 | `assertOwner` |
| Not found | 404 | `fail(..., 404)` |
| Duplicate (DB unique) | 409 | `error-handler` Sequelize map |
| Server error | 500 | `fail` or `errorHandler` |

### 12.6 Files to add or change (error & validation)

| File | Action |
|------|--------|
| `utils/mentor_system/error-handler.js` | Implement middleware |
| `app.js` | `import errorHandler from '...'`; `app.use(errorHandler)` last |
| `validators/mentor_system/validate.js` | New — shared helper |
| `validators/mentor_system/postValidators.js` | New |
| `validators/mentor_system/portfolioValidators.js` | New |
| `validators/mentor_system/skillValidators.js` | New |
| `validators/mentor_system/mentorValidators.js` | New |
| `controllers/mentor_system/*.js` | Call validators; optional `next(err)` in catch |

---

## Test plan (after fixes)

### Without token (public)

| Request | Expected |
|---------|----------|
| `GET /api/v1/mentors` | 200 |
| `GET /api/v1/mentors/search?q=...` | 200 |
| `GET /api/v1/mentors/35` | 200 (if mentor exists) |
| `GET /api/v1/mentors/skill/listAllSkill` | 200 |
| `GET /api/v1/mentors/35/skills` | 200 |
| `GET /api/v1/mentors/35/posts` | 200 |
| `GET /api/v1/mentors/999` | 400 or 404 (not found) |

### With Bearer token

| Request | Expected |
|---------|----------|
| `GET /api/v1/mentors/me` | 200 |
| `GET /api/v1/mentors/me/analytics` | 200 + counts |
| `POST /api/v1/mentors` | 201 (new profile) |
| `PUT /api/v1/mentors/:ownUserId` | 200 |
| `PUT /api/v1/mentors/:otherUserId` | 403 |
| `POST /api/v1/mentors/:userId/portfolio` | 201 |
| `POST /api/v1/mentors/:userId/skills` | 201 |

### PowerShell quick loop (example)

```powershell
$base = "http://localhost:3000/api/v1"
$urls = @(
  "$base/mentors",
  "$base/mentors/search",
  "$base/mentors/35/skills"
)
foreach ($u in $urls) {
  $code = (curl.exe -s -o NUL -w "%{http_code}" $u)
  Write-Output "$code $u"
}
```

See also: `mentor-system-routes.txt` for full URL list.

---

## MVC checklist (already satisfied)

- [x] Business logic in `controllers/mentor_system/*.js`
- [x] Routes only map URL → handler
- [x] Models via `models/index.js` (portfolio import is the exception to fix)
- [ ] All handlers run without runtime errors
- [ ] Auth routes work with JWT

## Error handling & validation checklist

- [x] `utils/mentor_system/api-response.js`
- [x] `utils/mentor_system/assert-owner.js`
- [x] Inline validation in controllers (basic)
- [ ] `utils/mentor_system/error-handler.js` (implement + register)
- [ ] `validators/mentor_system/` (create folder + validators)
- [ ] Wire validators on POST/PATCH/PUT write routes

---

## Files touched when implementing fixes

| File | Action |
|------|--------|
| `middleware/auth.js` (new, if missing) | Verify JWT, set `request.user` |
| `app.js` | Register middleware or export for routes |
| `routes/v1/mentors.js` | Add `auth` to protected routes |
| `controllers/mentor_system/mentorController.js` | Fix create / update / delete / me |
| `controllers/mentor_system/mentorPortfolioController.js` | Import + `creatPortfolio` |
| `controllers/mentor_system/mentorAnalyticsController.js` | Align `userID` / `userId` |
| `controllers/mentor_system/mentorPostsController.js` | P2 typo only; use validators |
| `utils/mentor_system/error-handler.js` | Implement Express error middleware |
| `validators/mentor_system/*.js` | New validation modules |
| `app.js` | `app.use(errorHandler)` after routes |

---

*Generated for backend_rokkru mentor system. Update this file as items are completed.*
