# Guide: Connect Frontend to Backend API

## Overview

```
┌──────────────────────┐         ┌─────────────────┐         ┌──────────────┐
│   Frontend           │  HTTP   │    Backend      │  SQL    │  PostgreSQL  │
│   React/Vite         │ ──────► │  Express/Node   │ ──────► │   Database   │
│   Tailwind + shadcn  │         │   port: 5000    │         │  port: 5432  │
│   port: 5173         │         │                 │         │              │
└──────────────────────┘         └─────────────────┘         └──────────────┘
```

---

## ដំណាក់កាល 1: Setup Backend

### 1.1 Install Dependencies

```bash
cd backend_rokkru
npm install
```

### 1.2 Setup Database (PostgreSQL)

បង្កើត database ក្នុង PostgreSQL:

```sql
CREATE DATABASE rokkru_db;
```

### 1.3 Configure .env

Edit `backend_rokkru/.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rokkru_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### 1.4 Start Backend

```bash
npm start
```

ត្រូវឃើញ:
```
✓ PostgreSQL connected
✓ Database synced
✓ Server running on port 5000
```

### 1.5 Test Health Check

```bash
curl http://localhost:5000/api/v1/health
```

Response:
```json
{ "status": "ok", "db": "postgresql", "timestamp": "2026-05-26T..." }
```

---

## ដំណាក់កាល 2: Setup Frontend

### 2.1 Install Dependencies

```bash
cd frontend
npm install
```

### 2.2 Configure .env

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 2.3 Start Frontend

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## ដំណាក់កាល 3: យល់ពី API Flow

### Request Flow:

```
User Action (Click Button)
    ↓
Page/Component calls service function
    ↓
services/teacherService.js → apiRequest('/teachers')
    ↓
services/api.js (fetch) adds JWT token from localStorage
    ↓
HTTP request to VITE_API_URL + path → Backend (port 5000)
    ↓
Backend routes/v1/teachers.js receives request
    ↓
Controller queries PostgreSQL via Sequelize
    ↓
Response sent back → Frontend displays data
```

### JWT Auth Flow:

```
1. User login → POST /api/v1/auth/login
2. Backend returns { token, user }
3. Frontend stores token in localStorage ('rokkru_token')
4. Every request → apiRequest() reads token and adds: Authorization: Bearer <token>
5. Backend middleware/auth.js verifies token
6. If failed (401) → ApiError thrown, frontend handles redirect
```

---

## ដំណាក់កាល 4: ភ្ជាប់ Feature ទី 1 — Authentication

### Frontend Side (ក្នុង Login page):

```javascript
import { login } from '@/services/authService'

const handleLogin = async (email, password) => {
  try {
    const user = await login({ email, password })

    localStorage.setItem('rokkru_user', JSON.stringify(user))

    if (user.role === 'student') navigate('/home')
    if (user.role === 'teacher') navigate('/teacher/home')
    if (user.role === 'admin') navigate('/admin')
  } catch (error) {
    setError(error.message || 'Login failed')
  }
}
```

### Backend Side (controllers/authController.js):

```javascript
const login = async (req, res) => {
  const { email, password } = req.body
  
  const user = await User.findOne({ where: { email } })
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  const token = generateToken(user.id)
  res.json({ success: true, token, user: { id: user.id, name: user.name, role: user.role } })
}
```

---

## ដំណាក់កាល 5: ភ្ជាប់ Feature ទី 2 — Get Teachers

### Frontend Side:

```javascript
import { fetchTeachers } from '@/services/teacherService'

const [teachers, setTeachers] = useState([])

useEffect(() => {
  const loadTeachers = async () => {
    try {
      const { items, total } = await fetchTeachers({ major: 'IT', page: 1 })
      setTeachers(items)
    } catch (error) {
      console.error('Failed to load teachers:', error)
    }
  }
  loadTeachers()
}, [])
```

### Backend Side (controllers/teacherController.js):

```javascript
const getTeachers = async (req, res) => {
  const { major, subject, location, sort, page = 1, limit = 10 } = req.query
  
  const where = {}
  if (major) where.major = major
  if (subject) where.subject = subject
  if (location) where.location = location

  const { rows: data, count: total } = await Teacher.findAndCountAll({
    where,
    limit,
    offset: (page - 1) * limit,
    order: [['rating', 'DESC']],
    include: [{ model: User, attributes: ['name', 'email', 'avatar'] }]
  })

  res.json({ success: true, data, total, page, totalPages: Math.ceil(total / limit) })
}
```

---

## ដំណាក់កាល 6: ភ្ជាប់ Feature ផ្សេងៗ

### Pattern ដដែលសម្រាប់គ្រប់ feature:

```
1. Frontend page calls → service function
2. Service function calls → api.js (apiRequest using fetch)
3. apiRequest sends HTTP request with JWT → Backend route
4. Route → Controller → Model (Sequelize) → PostgreSQL
5. Response → Frontend → Display to user
```

### Checklist សម្រាប់ feature ថ្មី:

| Step | Frontend | Backend |
|------|----------|---------|
| 1 | បន្ថែម function ក្នុង `services/*.js` | បន្ថែម route ក្នុង `routes/v1/*.js` |
| 2 | Call service ក្នុង page/hook | បន្ថែម controller function |
| 3 | Handle response & error | Query database via Sequelize model |
| 4 | Display data ក្នុង UI | Return JSON response |

---

## ដំណាក់កាល 7: Error Handling

### Frontend (api.js already handles):

```javascript
// 401 Unauthorized → auto redirect to login
// 403 Forbidden → show "Access denied"
// 404 Not Found → show "Not found"  
// 500 Server Error → show "Something went wrong"
```

### Pattern ក្នុង page:

```javascript
import { ApiError } from '@/services/api'

const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

const loadData = async () => {
  setLoading(true)
  setError(null)
  try {
    const data = await fetchSomething()
  } catch (err) {
    setError(err.message || 'Something went wrong')
  } finally {
    setLoading(false)
  }
}
```

---

## API Endpoints Summary

### Auth (`/api/v1/auth`)

| Method | Endpoint | Description | Auth? |
|--------|----------|-------------|-------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login | No |
| GET | `/me` | Get current user | Yes |
| PUT | `/profile` | Update profile | Yes |
| PUT | `/password` | Change password | Yes |

### Teachers (`/api/v1/teachers`)

| Method | Endpoint | Description | Auth? |
|--------|----------|-------------|-------|
| GET | `/` | List teachers (with filters) | Yes |
| GET | `/:id` | Get teacher detail | Yes |
| PUT | `/me` | Update own profile | Yes (teacher) |
| GET | `/me/dashboard` | Teacher dashboard stats | Yes (teacher) |
| GET | `/:id/reviews` | Get teacher reviews | Yes |
| POST | `/:id/reviews` | Create review | Yes (student) |

### Sessions (`/api/v1/sessions`)

| Method | Endpoint | Description | Auth? |
|--------|----------|-------------|-------|
| GET | `/` | List user sessions | Yes |
| POST | `/` | Book new session | Yes |
| PUT | `/:id` | Update session | Yes |
| DELETE | `/:id` | Cancel session | Yes |

### Communities (`/api/v1/communities`)

| Method | Endpoint | Description | Auth? |
|--------|----------|-------------|-------|
| GET | `/` | List communities | Yes |
| GET | `/:id` | Community detail | Yes |
| POST | `/` | Create community | Yes |
| POST | `/:id/join` | Join community | Yes |
| GET | `/:id/posts` | Community posts | Yes |
| POST | `/:id/posts` | Create post | Yes |
| POST | `/:id/posts/:postId/like` | Like post | Yes |

### Notifications (`/api/v1/notifications`)

| Method | Endpoint | Description | Auth? |
|--------|----------|-------------|-------|
| GET | `/` | List notifications | Yes |
| PUT | `/:id/read` | Mark as read | Yes |
| PUT | `/read-all` | Mark all read | Yes |

### Subscriptions (`/api/v1/subscriptions`)

| Method | Endpoint | Description | Auth? |
|--------|----------|-------------|-------|
| GET | `/` | Get subscription | Yes |
| POST | `/activate` | Activate plan | Yes |
| POST | `/cancel` | Cancel plan | Yes |
| POST | `/resume` | Resume plan | Yes |
| PUT | `/interval` | Change billing interval | Yes |

### Filters (`/api/v1/filters`)

| Method | Endpoint | Description | Auth? |
|--------|----------|-------------|-------|
| GET | `/` | Get filter options (majors, subjects, locations) | No |

### Search (`/api/v1/search`)

| Method | Endpoint | Description | Auth? |
|--------|----------|-------------|-------|
| GET | `/` | Search teachers/content | Yes |

### Admin (`/api/v1/admin`)

| Method | Endpoint | Description | Auth? |
|--------|----------|-------------|-------|
| GET | `/users` | List all users | Yes (admin) |
| PUT | `/users/:id/role` | Change user role | Yes (admin) |
| GET | `/stats` | System statistics | Yes (admin) |
| DELETE | `/users/:id` | Delete user | Yes (admin) |

---

## Testing API with Postman/Thunder Client

### Register:
```
POST http://localhost:5000/api/v1/auth/register
Body: { "name": "Test", "email": "test@mail.com", "password": "123456", "role": "student" }
```

### Login:
```
POST http://localhost:5000/api/v1/auth/login
Body: { "email": "test@mail.com", "password": "123456" }
→ Response: { "token": "eyJhbG...", "user": {...} }
```

### Protected Route:
```
GET http://localhost:5000/api/v1/auth/me
Headers: { "Authorization": "Bearer eyJhbG..." }
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS error | Check backend `.env` → `CLIENT_URL=http://localhost:5173` |
| 401 Unauthorized | Token expired → login again |
| Cannot connect to DB | Check PostgreSQL is running & `.env` credentials |
| Frontend shows blank | Check `npm run dev` console for errors |
| API returns 404 | Check route path matches service URL |
| Network Error | Backend not running → `npm start` in backend folder |
