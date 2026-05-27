import { useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import {

  Sparkles, Home, Calendar, Users, Bell, Settings,

  BarChart2, CreditCard, PenSquare, LogOut, Search,

  Menu, X, Grid3x3, User,

} from 'lucide-react'

import clsx from 'clsx'

import { useAuth } from '@/hooks'

import Avatar from '../ui/Avatar'

import RokkruLogo from './Logo'
import AppFooter from './Footer'
import { SubscriptionAlerts } from '@/components/common'
import useTeacherSubscription from '../../hooks/useTeacherSubscription'
import { resumeSubscription } from '../../utils/teacherSubscription'
import SettingsMenu from './SettingsMenu'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { useTranslation } from '@/i18n'



/* ─────────────────────────────────────

   Shared top-nav tabs

───────────────────────────────────── */

const topNavTabs = [

  { labelKey: 'nav.home', href: '/home' },

  { labelKey: 'nav.schedule', href: '/schedule' },

  { labelKey: 'nav.community', href: '/community' },

]



const isTabActive = (pathname, href) => {

  if (href === '/home') return pathname === '/home' || pathname === '/'

  if (href === '/community') return pathname === '/community' || pathname.startsWith('/community/')

  return pathname === href || pathname.startsWith(`${href}/`)

}



const teacherSideNav = [

  { icon: Grid3x3,   labelKey: 'nav.dashboard',    href: '/teacher/home' },

  { icon: BarChart2, labelKey: 'nav.reports',      href: '/teacher/analytics' },

  { icon: CreditCard,labelKey: 'nav.subscription', href: '/teacher/subscription' },

  { icon: PenSquare, labelKey: 'nav.createPost',  href: '/teacher/create-post' },

]



const studentSideNav = [

  { icon: Home,     labelKey: 'nav.home',          href: '/home' },

  { icon: Calendar, labelKey: 'nav.schedule',      href: '/schedule' },

  { icon: Users,    labelKey: 'nav.community',     href: '/community' },

  { icon: Bell,     labelKey: 'nav.notifications', href: '/notifications' },

  { icon: Settings, labelKey: 'nav.profile',       href: '/profile' },

]



/* ─────────────────────────────────────

   Page footer (shared)

───────────────────────────────────── */

/* ─────────────────────────────────────

   Sidebar

───────────────────────────────────── */

const Sidebar = ({ mobile, onClose, onAction }) => {

  const location = useLocation()

  const navigate = useNavigate()

  const { user, logout } = useAuth()

  const { t } = useTranslation()

  const isTeacher = user?.role === 'teacher'

  const navItems  = isTeacher ? teacherSideNav : studentSideNav



  const handleLogout = () => {

    logout()

    navigate('/')

    onClose?.()

  }



  const handleClick = (item) => {

    if (item.action) {

      onAction?.(item.action)

      onClose?.()

    } else {

      onClose?.()

    }

  }



  return (

    <div className="relative z-[1] flex flex-col h-full min-h-0 overflow-hidden">

      {/* Role header */}

      <div className="px-4 py-4 border-b border-white/40 flex-shrink-0">

        <div className="flex items-center gap-2.5 min-w-0">

          <Avatar name={user?.name || 'User'} size="md" className="flex-shrink-0" />

          <p className="text-sm font-semibold text-slate-800 truncate leading-snug">

            {user?.name || 'User'}

          </p>

        </div>

      </div>



      {/* Nav items */}

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">

        {navItems.map((item) => {

          const active = item.href && location.pathname === item.href

          return item.href ? (

            <Link

              key={item.labelKey}

              to={item.href}

              onClick={() => handleClick(item)}

              className={clsx(

                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium group glass-ios-nav-item',

                active

                  ? 'glass-ios-nav-item--active text-primary-600'

                  : 'text-slate-600 hover:text-slate-800'

              )}

            >

              <item.icon className={clsx('w-4 h-4 flex-shrink-0', active ? 'text-primary-500' : 'text-slate-400 group-hover:text-slate-600')} />

              {t(item.labelKey)}

              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-300" />}

            </Link>

          ) : null

        })}

      </nav>



      {/* Logout */}

      <div className="border-t border-white/40 p-3 flex-shrink-0">

        <button

          onClick={handleLogout}

          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 glass-ios-nav-item hover:text-red-500"

        >

          <LogOut className="w-4 h-4" />

          {t('auth.logout')}

        </button>

      </div>

    </div>

  )

}



/* ─────────────────────────────────────

   Main Layout

───────────────────────────────────── */

const MainLayout = ({ children }) => {

  const location   = useLocation()

  const navigate   = useNavigate()

  const { user }   = useAuth()

  const { t } = useTranslation()

  const isTeacher  = user?.role === 'teacher'

  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false)

  const [searchQuery,     setSearchQuery]     = useState('')

  const { subscription, setSubscription } = useTeacherSubscription()

  const handleResumeSubscription = () => {
    setSubscription(resumeSubscription())
  }

  const handleSearch = (e) => {

    if (e.key === 'Enter' && searchQuery.trim()) {

      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)

      setSearchQuery('')

    }

  }



  return (

    <div
      className="h-screen max-h-screen h-dvh max-h-dvh flex flex-col overflow-hidden app-glass-scope glass-ios-26-shell relative bg-slate-50"
      data-role={user?.role ?? 'student'}
    >

      {/* ══════════════════ FULL-WIDTH TOP NAVBAR ══════════════════ */}

      <header className="glass-ios-nav z-50 h-16 flex flex-shrink-0 items-center overflow-visible">

        {/* Logo — same width as sidebar */}

        <RokkruLogo
          to={user?.role === 'teacher' ? '/teacher/home' : '/home'}
          size="md"
          className={clsx('px-5 sm:px-6 flex-shrink-0', isTeacher ? 'w-44' : 'w-auto')}
        />



        {/* Top nav tabs */}

        <nav className="hidden md:flex items-center gap-0 flex-1">

          {topNavTabs.map((tab) => {

            const active = isTabActive(location.pathname, tab.href)

            return (

              <Link

                key={tab.href}

                to={tab.href}

                className={clsx(

                  'px-6 h-16 flex items-center text-sm font-semibold tracking-widest transition-all border-b-2',

                  active

                    ? 'border-primary-300 text-primary-600'

                    : 'border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300'

                )}

              >

                {t(tab.labelKey)}

              </Link>

            )

          })}

        </nav>



        {/* Right: search + icons + avatar */}

        <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 ml-auto overflow-visible">

          <div className="hidden sm:flex items-center gap-2.5 glass-ios-pill rounded-full px-4 py-2.5 min-h-[2.5rem]">

            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />

            <input

              value={searchQuery}

              onChange={(e) => setSearchQuery(e.target.value)}

              onKeyDown={handleSearch}

              placeholder={t('search.teachers')}

              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-40 lg:w-52 focus:w-56 transition-all duration-300"

            />

          </div>



          {/* Bell */}

          <Link to="/notifications" className="relative p-2.5 rounded-xl glass-ios-nav-item">

            <Bell className="w-5 h-5 text-slate-500" />

            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-400 rounded-full ring-1 ring-white" />

          </Link>



          <LanguageSwitcher className="hidden sm:inline-flex" />

          <SettingsMenu role={isTeacher ? 'teacher' : 'student'} tone="app" />



          {/* Mobile hamburger */}

          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-xl glass-ios-nav-item">

            <Menu className="w-5 h-5 text-slate-500" />

          </button>

        </div>

      </header>



      {/* ══════════════════ PAGE BODY ══════════════════ */}

      <div className="flex flex-1 min-h-0">



        {/* Desktop sidebar — teachers only */}

        {isTeacher && (

          <aside className="hidden md:flex flex-col w-44 z-30 glass-ios-sidebar glass-ios-sidebar--teacher flex-shrink-0 min-h-0 overflow-hidden relative">

            <div className="relative z-[2] flex flex-col flex-1 min-h-0 min-w-0">
              <Sidebar />
            </div>

          </aside>

        )}



        {/* Mobile sidebar overlay */}

        {mobileMenuOpen && (

          <div className="fixed inset-0 z-40 flex">

            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />

            <aside className="relative w-64 glass-ios-sidebar glass-ios-sidebar--teacher flex flex-col shadow-2xl h-full overflow-hidden z-50">

              <button onClick={() => setMobileMenuOpen(false)} className="absolute top-3 right-3 z-[2] p-1.5 rounded-lg glass-ios-nav-item text-slate-400">

                <X className="w-4 h-4" />

              </button>

              <div className="relative z-[1] px-4 pt-16 pb-3 border-b border-white/40">

                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Navigate</p>

                {topNavTabs.map((tab) => (

                  <Link

                    key={tab.href}

                    to={tab.href}

                    onClick={() => setMobileMenuOpen(false)}

                    className={clsx(

                      'block px-3 py-2.5 rounded-xl text-sm font-semibold tracking-wide mb-0.5 transition-all',

                      isTabActive(location.pathname, tab.href) ? 'glass-ios-nav-item--active text-primary-600' : 'text-slate-600 glass-ios-nav-item'

                    )}

                  >

                    {t(tab.labelKey)}

                  </Link>

                ))}

              </div>

              {isTeacher ? (

                <div className="relative z-[2] flex-1 min-h-0 flex flex-col">
                  <Sidebar mobile onClose={() => setMobileMenuOpen(false)} />
                </div>

              ) : (

                <div className="relative z-[1] px-4 py-3 space-y-1">

                  <Link

                    to="/notifications"

                    onClick={() => setMobileMenuOpen(false)}

                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 glass-ios-nav-item"

                  >

                    <Bell className="w-4 h-4 text-slate-400" /> Notifications

                  </Link>

                  <Link

                    to="/profile"

                    onClick={() => setMobileMenuOpen(false)}

                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 glass-ios-nav-item"

                  >

                    <Settings className="w-4 h-4 text-slate-400" /> Profile

                  </Link>

                </div>

              )}

            </aside>

          </div>

        )}



        {/* Main content + footer — sidebar offset only for teachers */}

        <main className="relative z-[1] flex-1 min-w-0 min-h-0 flex flex-col overflow-y-auto overflow-x-hidden bg-transparent">

          {isTeacher && (
            <SubscriptionAlerts
              subscription={subscription}
              onResume={handleResumeSubscription}
            />
          )}

          <div className="flex-1 p-5 sm:p-6 max-w-7xl w-full mx-auto">

            {children}

          </div>

          <AppFooter variant="app" />

        </main>

      </div>



      {/* Create Post modal */}

    </div>

  )

}



export default MainLayout
