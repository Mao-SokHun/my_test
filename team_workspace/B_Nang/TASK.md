# B Nang — Admin Pages

## តួនាទី

Admin panel — manage users, roles, settings, reports, content.

## Files

| File | Description |
|------|-------------|
| `admin/AdminDashboard.jsx` | Admin dashboard — stats, overview |
| `admin/UserManagement.jsx` | Manage users (list, search, delete) |
| `admin/RoleManagement.jsx` | Assign/change user roles |
| `admin/AdminSettings.jsx` | System settings |
| `admin/SystemReports.jsx` | Reports + analytics |
| `admin/ContentManagement.jsx` | Manage posts/content |
| `admin/Billing.jsx` | Billing overview |
| `admin/HelpCenter.jsx` | Help/FAQ management |

## Paste Location

```
B_Nang/admin/*.jsx  →  frontend/src/pages/admin/
```

## Imports

```javascript
import { Button, Input, Modal, DataTable, StatCard } from '../../components'
import { PageHeader, PageCard, TabBar, PaginationBar } from '../../components'
import { SettingsToggleRow } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import { useAdminUsers, useDashboardStats, useRoleEditor, usePagination } from '../../hooks'
import { authService } from '../../services'
import { cn } from '../../lib/utils'
```

## Priority Order

1. `AdminDashboard.jsx` — stat cards + charts overview
2. `UserManagement.jsx` — users table + search + delete
3. `RoleManagement.jsx` — role assignment UI
4. `AdminSettings.jsx` — toggle settings
5. `SystemReports.jsx` — data tables + export
6. `ContentManagement.jsx` — posts/content moderation
7. `Billing.jsx` — billing stats + invoices
8. `HelpCenter.jsx` — FAQ management

## Git Branch

```bash
git checkout -b feature/bnang-admin-pages
```
