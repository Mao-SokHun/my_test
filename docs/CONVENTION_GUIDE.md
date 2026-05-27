# RokKru — Convention Guide (Team Standard)

Follow this guide for **Mentor System** and all new backend/frontend code.  
Short checklist: [`CODING_CONVENTIONS.md`](./CODING_CONVENTIONS.md)

---

## 1. Additional convention (naming rules)

| Rule | Do | Don't |
|------|-----|--------|
| **Consistency** | Same style in every file | Mix `mentorController` and `mentor-controller` |
| **No abbreviations** | `totalTasks`, `userEmail` | `tt`, `ue`, `temp` |
| **Self-explanatory** | Name shows purpose | `data`, `item`, `x` |
| **Reserved words** | Never use as variable names | `class`, `return`, `let` as names |
| **Boolean prefix** | `is`, `has`, `can`, `should` | `loggedIn` alone |
| **Nouns vs verbs** | Variable = noun, function = verb | `function userEmail()` |

**Boolean examples:** `isLoggedIn`, `hasPermission`, `canEdit`, `shouldRefresh`

**Examples:**

```js
// Good
const userEmail = 'teacher@rokkru.com';
const isAuthenticated = true;

function calculateTotal(items) { /* ... */ }

// Bad
const ue = 'teacher@rokkru.com';
const auth = true;
```

---

## 2. File names

- **All lowercase**
- **Hyphens between words** (kebab-case)
- **Descriptive** — modern systems allow long names

| Good | Bad |
|------|-----|
| `mentors-controller.js` | `mentorsController.js` |
| `api-response.js` | `apiResponse.js` |
| `mentor-portfolio-section.jsx` | `MentorPortfolioSection.jsx` |
| `create-task.html` | `createTask.html` |

---

## 3. Variable & class capitalization

| Kind | Style | Example |
|------|--------|---------|
| Variables | camelCase | `firstName`, `userAge` |
| Functions | camelCase (verb) | `calculateTotal`, `fetchMentorById` |
| Classes / Sequelize models | PascalCase | `Mentor`, `UserAccount` |
| React components | PascalCase (name inside file) | `function MentorPortfolioSection()` |
| Constants (optional) | UPPER_SNAKE | `MAX_PAGE_SIZE` |

```js
let userAge = 25;

function calculateTotal() { /* ... */ }

class UserAccount { /* ... */ }
```

---

## 4. Comments — Best practice

Use **two levels** of block comments. Between Start and End, use a line of dots.

### 4.1 Large block (many lines / whole feature)

**Backend (JavaScript):**

```js
// ============= Start signup =============
// ................................................

// ... many lines of logic ...

// ============= End signup =============
```

**HTML:**

```html
<!-- ============= Start root ============= -->

<!-- ... content ... -->

<!-- ============= End root ============= -->
```

### 4.2 Small block (few lines / one step)

```js
// Start create token for signup
// ................................................

const token = jwt.sign(payload, jwtSecret);

// End create token for signup
// ................................................
```

### 4.3 Example: `auth.js` style

```js
// ============= Start auth middleware =============
// ................................................

const jwt = require('jsonwebtoken');

// Start read authorization header
// ................................................
const authorizationHeader = request.headers.authorization || '';
// End read authorization header
// ................................................

// ============= End auth middleware =============
```

### 4.4 React / JSX

**Large component:**

```jsx
// ============ Start create user component ============

export default function CreateUser() {
  return (
  <div>
    {/* Organization name field */}
    <input name="orgName" />
  </div>
  );
}

// ============ End create user component ============
```

| Place | Style |
|-------|--------|
| File / big section | `// ============ Start ... ============` |
| Small UI block | `{/* Field label */}` |

### 4.5 Learning comments (`// ?`) — optional

Some mentor files also use `// ?` on a line to explain **why** (task number, API link):

```js
// ? Task #10 — JWT must match frontend localStorage rokkru_token
```

**Search in project:** `// ?` or `// Start` in `backend_rokkru/**/mentor_system/`

| Has comments | Files |
|--------------|--------|
| ✅ Task #1–#6 | `controllers/mentor_system/*-controller.js` |
| ✅ Routes | `routes/v1/mentor_system/mentors.js` |
| ✅ Auth / upload | `middleware/mentor_system/` |
| ✅ Utils | `api-response.js`, `assert-owner.js` |
| ✅ Validators | `mentor-validators.js` |
| ✅ Core models | `mentor.js`, `mentor-portfolio.js`, `mentor-skill.js`, `mentor-post.js` |
| ⚪ Shared DB only | `User.js`, `AccountHistory.js`, … (no extra notes — not mentor-only) |

---

## 5. Mentor System — folder layout

**Do not** put one big `mentor_system/` at repo root with `controllers/` inside it.

**Do** use folder `mentor_system` **inside each MVC layer**:

```text
backend_rokkru/
├── app.js
├── controllers/
│   ├── mentor_system/              ← your controllers
│   │   ├── mentors-controller.js
│   │   ├── mentor-portfolio-controller.js
│   │   └── README.md
│   └── userTypesController.js      ← other modules (outside)
├── middleware/
│   └── mentor_system/
│       ├── auth.js
│       ├── require-mentor.js
│       ├── upload.js
│       └── error-handler.js
├── models/
│   └── mentor_system/
│       ├── index.js
│       ├── mentor.js
│       └── mentor-portfolio.js
├── routes/v1/
│   ├── mentor_system/
│   │   └── mentors.js
│   └── userTypes.js
├── validators/
│   └── mentor_system/
│       └── mentor-validators.js
└── utils/
    └── mentor_system/
        ├── api-response.js
        └── assert-owner.js
```

---

## 6. Require paths (after folder move)

Wrong paths cause `Cannot find module`.

| File location | To import models | To import api-response |
|---------------|------------------|-------------------------|
| `controllers/mentor_system/*.js` | `require('../../models/mentor_system')` | `require('../../utils/mentor_system/api-response')` |
| `middleware/mentor_system/*.js` | `require('../../models/mentor_system')` | `require('../../utils/mentor_system/api-response')` |
| `routes/v1/mentor_system/mentors.js` | — | `require('../../../controllers/mentor_system/mentors-controller')` |
| `app.js` (root) | `require('./models/mentor_system')` | `require('./routes/v1/mentor_system/mentors')` |

**Verify paths:**

```bash
cd backend_rokkru
npm run check:mentor-paths
```

---

## 7. API & JSON convention

All mentor endpoints use the same shape:

```json
{ "success": true, "data": { } }
```

```json
{ "success": false, "error": "Message here" }
```

Helpers: `utils/mentor_system/api-response.js` → `ok()`, `fail()`

---

## 8. MVC flow (Mentor)

```text
HTTP request
  → routes/v1/mentor_system/mentors.js
  → middleware/mentor_system/auth.js (if protected)
  → controllers/mentor_system/*-controller.js
  → models/mentor_system/
  → JSON response
```

Mount in `app.js`:

```js
const mentorsRouter = require('./routes/v1/mentor_system/mentors');
app.use('/api/v1/mentors', mentorsRouter);
```

---

## 9. Frontend (Teacher UI ↔ Mentor API)

| UI name | API path |
|---------|----------|
| Teacher | `/api/v1/mentors` |
| Env | `VITE_API_URL=http://localhost:3000/api/v1` |
| Token | `localStorage.rokkru_token` |

Details: [`MENTOR_FRONTEND_CONNECT.md`](./MENTOR_FRONTEND_CONNECT.md)

---

## 10. Related documents

| Doc | Purpose |
|-----|---------|
| [`MENTOR_SYSTEM_TASKS.md`](./MENTOR_SYSTEM_TASKS.md) | Your 13 tasks checklist |
| [`MENTOR_API.md`](./MENTOR_API.md) | Postman / endpoints |
| [`MENTOR_BACKEND_CODE_GUIDE.md`](./MENTOR_BACKEND_CODE_GUIDE.md) | Line-by-line tutorial |
| [`CODING_CONVENTIONS.md`](./CODING_CONVENTIONS.md) | Quick reference |
| [`controllers/mentor_system/README.md`](../backend_rokkru/controllers/mentor_system/README.md) | Folder map in repo |

---

## Quick checklist before submit

- [ ] Files are **lowercase + hyphens**
- [ ] Variables **camelCase**, classes **PascalCase**
- [ ] Booleans use **is/has/can/should**
- [ ] Large blocks: `// ============= Start ... =============` + dots
- [ ] Small blocks: `// Start ...` / `// End ...` + dots
- [ ] Code lives in **`*/mentor_system/`** per layer (not one root module)
- [ ] `npm run check:mentor-paths` passes
- [ ] Postman tests done ([`MENTOR_API.md`](./MENTOR_API.md))
