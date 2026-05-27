# Heang — Student Social Pages

## តួនាទី

Student social features — profile, messaging, notifications, community, reviews.

## Files

| File | Description |
|------|-------------|
| `student/Profile.jsx` | Student profile page |
| `student/Messages.jsx` | Chat/messaging page |
| `student/Notifications.jsx` | Notifications list |
| `student/Community.jsx` | Community feed with posts |
| `student/SessionReview.jsx` | Review a completed session |
| `student/StudentEditProfile.jsx` | Edit profile form |

## Paste Location

```
Heang/student/*.jsx  →  frontend/src/pages/student/
```

## Imports

```javascript
import { Button, Input, Avatar, Badge, PageCard, Modal } from '../../components'
import { NotificationItem, CommunityPostCard } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import { useChat, useNotifications, useReviewForm } from '../../hooks'
import { notificationService, communityService } from '../../services'
import { cn } from '../../lib/utils'
```

## Priority Order

1. `Profile.jsx` — student info, avatar, stats
2. `Messages.jsx` — chat UI
3. `Notifications.jsx` — notification list + mark read
4. `Community.jsx` — community feed, posts, comments
5. `SessionReview.jsx` — star rating + review form
6. `StudentEditProfile.jsx` — edit name, avatar, bio

## Git Branch

```bash
git checkout -b feature/heang-student-social
```
