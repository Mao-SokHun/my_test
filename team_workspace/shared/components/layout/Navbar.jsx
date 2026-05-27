import { Link } from 'react-router-dom'
import { useAuth, getStoredUser } from '@/hooks'
import { useTranslation } from '@/i18n'
import RokkruLogo from './Logo'
import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import LanguageSwitcher from '../ui/LanguageSwitcher'

const guestNavTabs = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.schedule', href: '/login' },
  { labelKey: 'nav.community', href: '/login' },
]

/** Guest navbar — or compact bar when logged in on public support/legal pages */
const PublicNavbar = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const activeUser = user ?? getStoredUser()
  const isAppUser = activeUser?.role === 'student' || activeUser?.role === 'teacher'

  if (isAppUser) {
    const homeHref = activeUser.role === 'teacher' ? '/teacher/home' : '/home'
    return (
      <header className="glass-public-nav">
        <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 flex items-center gap-4">
          <RokkruLogo to={homeHref} size="sm" />
          <Link
            to={homeHref}
            className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            {t('nav.backToApp')}
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <LanguageSwitcher />
            <Avatar name={activeUser.name || 'User'} size="sm" />
            <span className="text-xs font-medium text-slate-600 capitalize hidden sm:inline">
              {t(`auth.${activeUser.role}`)}
            </span>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="glass-public-nav">
      <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 flex items-center gap-3 sm:gap-4">
        <RokkruLogo to="/" size="sm" />

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {guestNavTabs.map((tab) => (
            <Link
              key={tab.href + tab.labelKey}
              to={tab.href}
              className="px-3 py-2 text-xs font-bold tracking-wide text-slate-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-white/50"
            >
              {t(tab.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex flex-1 max-w-xs ml-auto">
          <input
            type="search"
            placeholder={t('search.tutors')}
            className="w-full px-4 py-2 text-sm glass-subtle rounded-full placeholder-slate-500 text-slate-800 outline-none focus:ring-2 focus:ring-primary-200/80 border border-white/60"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <LanguageSwitcher />
          <Link to="/login">
            <Button variant="ghost" size="sm">{t('auth.login')}</Button>
          </Link>
          <Link to="/create-account">
            <Button variant="primary" size="sm">{t('auth.signup')}</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default PublicNavbar
