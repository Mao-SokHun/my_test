# Phy — Auth + Onboarding Pages

## តួនាទី

Authentication (login/register), onboarding (new user setup), and teacher billing.

## Files

| File | Description |
|------|-------------|
| `auth/Login.jsx` | Login form (email + password) |
| `auth/CreateAccount.jsx` | Register form (student/teacher) |
| `auth/Landing.jsx` | Landing/hero page |
| `auth/AdminLogin.jsx` | Admin login (separate) |
| `onboarding/ChooseCommunity.jsx` | Choose community after register |
| `onboarding/CompleteProfile.jsx` | Complete profile after register |
| `teacher/TeacherBilling.jsx` | Billing/payment info |
| `teacher/TeacherSubscription.jsx` | Subscription plans |

## Paste Location

```
Phy/auth/*.jsx        →  frontend/src/pages/auth/
Phy/onboarding/*.jsx  →  frontend/src/pages/onboarding/
Phy/teacher/*.jsx     →  frontend/src/pages/teacher/
```

## Imports

```javascript
import { Button, Input, Stepper, PageCard, AuthLayout } from '../../components'
import { AnimatedBackground, AuthHeroShapes } from '../../components'
import { BillingIntervalToggle, SubscriptionAlerts } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import { useMultiStepForm, useTeacherSubscription } from '../../hooks'
import { authService, subscriptionService } from '../../services'
import { cn } from '../../lib/utils'
```

## Priority Order

1. `Landing.jsx` — hero section, features, CTA buttons
2. `Login.jsx` — login form + validation
3. `CreateAccount.jsx` — multi-step register form
4. `AdminLogin.jsx` — admin-only login
5. `ChooseCommunity.jsx` — community selection
6. `CompleteProfile.jsx` — fill profile details
7. `TeacherBilling.jsx` — payment method management
8. `TeacherSubscription.jsx` — choose/manage plans

## Git Branch

```bash
git checkout -b feature/phy-auth-onboarding
```
