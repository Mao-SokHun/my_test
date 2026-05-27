# Hun — Teacher Pages

## តួនាទី

Teacher features — dashboard, analytics, profile management, create posts.

## Files

| File | Description |
|------|-------------|
| `teacher/TeacherHome.jsx` | Teacher dashboard — stats, upcoming sessions |
| `teacher/Analytics.jsx` | Charts, revenue, student data |
| `teacher/TeacherMyProfile.jsx` | Teacher's own profile view |
| `teacher/TeacherPublicProfile.jsx` | Public profile (student-facing) |
| `teacher/TeacherCreatePost.jsx` | Create post for community |
| `teacher/EditProfile.jsx` | Edit teacher info form |
| `teacher/ProfileSetting.jsx` | Settings (notification, privacy) |

## Paste Location

```
Hun/teacher/*.jsx  →  frontend/src/pages/teacher/
```

## Imports

```javascript
import { Button, Input, StatCard, PageCard, FilterBar } from '../../components'
import { DataTable, PageHeader, TabBar } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import { useTeacherDashboard, useTeacherProfile } from '../../hooks'
import { teacherService } from '../../services'
import { cn } from '../../lib/utils'
```

## Priority Order

1. `TeacherHome.jsx` — dashboard with stats cards + session list
2. `Analytics.jsx` — charts (recharts) + data tables
3. `TeacherMyProfile.jsx` — profile view
4. `TeacherPublicProfile.jsx` — public-facing profile
5. `TeacherCreatePost.jsx` — create/edit post form
6. `EditProfile.jsx` — edit form (name, bio, subjects)
7. `ProfileSetting.jsx` — toggle settings

## Git Branch

```bash
git checkout -b feature/hun-teacher-pages
```
