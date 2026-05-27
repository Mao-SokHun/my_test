# Rint — Student Core Pages

## តួនាទី

Student main pages — browse teachers, filter, search, book sessions, view schedules.

## Files

| File | Description |
|------|-------------|
| `student/Home.jsx` | Student home — browse teachers, filter, search |
| `student/Schedule.jsx` | View session schedule |
| `student/SearchResults.jsx` | Search results page |
| `student/Leaderboard.jsx` | Top teachers / students ranking |
| `student/TeacherDetail.jsx` | Teacher profile detail page |
| `student/BookSession.jsx` | Book a session with teacher |

## Paste Location

```
Rint/student/*.jsx  →  frontend/src/pages/student/
```

## Imports

```javascript
import { Button, Input, FilterBar, PageCard, TeacherCard } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import { useTeachers, useFilterBar, useSearchFilter } from '../../hooks'
import { teacherService, sessionService } from '../../services'
import { majorOptions, subjectOptions, locationOptions } from '../../constants/teacherFilters'
import { teachers } from '../../constants/mockData'
import { cn } from '../../lib/utils'
```

## Priority Order

1. `Home.jsx` — filter + search + teachers list
2. `Schedule.jsx` — calendar/list view of sessions
3. `SearchResults.jsx` — search results display
4. `Leaderboard.jsx` — ranking of teachers/students
5. `TeacherDetail.jsx` — teacher full profile + reviews
6. `BookSession.jsx` — booking form for session

## Git Branch

```bash
git checkout -b feature/rint-student-core
```
