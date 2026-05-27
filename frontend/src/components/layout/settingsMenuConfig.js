import { Users, User, CreditCard, Settings, HelpCircle } from 'lucide-react'

/** Shared settings dropdown menus — student / teacher / admin */
export const SETTINGS_MENUS = {
  student: {
    titleKey: 'settings.title',
    subtitleKey: 'settings.studentSubtitle',
    items: [
      { labelKey: 'settings.myProfile', href: '/profile', icon: Users },
      { labelKey: 'settings.editProfile', href: '/student/edit-profile', icon: User },
    ],
  },
  teacher: {
    titleKey: 'settings.title',
    subtitleKey: 'settings.teacherSubtitle',
    items: [
      { labelKey: 'settings.myProfile', href: '/teacher/my-profile', icon: Users },
      { labelKey: 'settings.editProfile', href: '/teacher/edit-profile', icon: User },
      { labelKey: 'settings.billing', href: '/teacher/billing', icon: CreditCard },
    ],
  },
  admin: {
    titleKey: 'settings.title',
    subtitleKey: 'settings.adminSubtitle',
    items: [
      { labelKey: 'settings.adminSettings', href: '/admin/settings', icon: Settings },
      { labelKey: 'settings.adminBilling', href: '/admin/billing', icon: CreditCard },
      { labelKey: 'settings.helpCenter', href: '/admin/help', icon: HelpCircle },
    ],
  },
}
