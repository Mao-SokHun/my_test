# components/

Quick rule: **ui** = small · **shared** = page blocks · **layout** = shell · **pages/** = full screens

Full guide (Khmer + English): [../COMPONENTS.md](../COMPONENTS.md)

```
ui/           Button, Input, Avatar, Modal
shared/       PageCard, DataTable, TabBar, PageScaffold, WelcomeBanner, Stepper
layout/       AppLayout, AdminLayout, SettingsMenu
backgrounds/  Galaxy, AnimatedBackground (animation only)
auth/         AuthLayout
branding/     RokkruLogo, AppFooter, PublicNavbar
community/    Posts, notifications
legal/        Legal page helpers
```

Import from `@/components` or the category folder (e.g. `@/components/shared`).

Teacher billing widgets live in `@/features/teacher-discovery` (`BillingIntervalToggle`, `SubscriptionAlerts`).
