import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, BookOpen, BarChart2, Shield, LayoutList,
  HelpCircle, FileText, Lock, CreditCard, Settings,
  Bell, Search, ChevronDown, Menu, X,
  LogOut, AlertTriangle
} from 'lucide-react'
import clsx from 'clsx'
import Avatar from '../ui/Avatar'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import Logo from './Logo'
import AdminPanelBackground from '../backgrounds/AdminPanelBackground'
import { useAuth } from '@/hooks'
import SettingsMenu from './SettingsMenu'
import { useAmbientPointer } from '../../hooks/useAmbientPointer'
import { useTranslation } from '@/i18n'

const navGroups = [
  {
    labelKey: 'admin.main',
    items: [
      { icon: LayoutDashboard, labelKey: 'admin.dashboard',       href: '/admin' },
      { icon: Users,           labelKey: 'admin.userManagement',  href: '/admin/users' },
      { icon: BookOpen,        labelKey: 'admin.content',         href: '/admin/content' },
      { icon: BarChart2,       labelKey: 'admin.reports',         href: '/admin/reports' },
      { icon: Shield,          labelKey: 'admin.roles',           href: '/admin/roles' },
      { icon: LayoutList,      labelKey: 'admin.backendTasks',    href: '/admin/backend-tasks' },
    ],
  },
  {
    labelKey: 'admin.support',
    items: [
      { icon: HelpCircle, labelKey: 'admin.helpCenter',      href: '/admin/help' },
      { icon: FileText,   labelKey: 'admin.termsOfService',  href: '/admin/terms' },
      { icon: Lock,       labelKey: 'admin.privacyPolicy',   href: '/admin/privacy' },
    ],
  },
  {
    labelKey: 'admin.account',
    items: [
      { icon: CreditCard, labelKey: 'admin.billing',   href: '/admin/billing' },
      { icon: Settings,   labelKey: 'admin.settings',  href: '/admin/settings' },
    ],
  },
]

const LogoutModal = ({ onClose, onConfirm, t }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 backdrop-blur-md p-4">
    <div className="glass-ios p-6 w-full max-w-sm">
      <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 text-center mb-2">{t('admin.signOutConfirm')}</h3>
      <p className="text-sm text-slate-500 text-center mb-6">
        {t('admin.signOutMessage')}
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {t('admin.cancel')}
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
        >
          {t('admin.signOut')}
        </button>
      </div>
    </div>
  </div>
)

const AdminLayout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const { ambientShellProps } = useAmbientPointer()
  const { t } = useTranslation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const SidebarContent = ({ mobile = false }) => (
    <>
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 h-14 sm:h-16 border-b border-white/40 flex-shrink-0">
        <Logo to="/admin" size="sm" showText={mobile || sidebarOpen} />
        {(mobile || sidebarOpen) && (
          <p className="text-xs text-primary-600 font-semibold">{t('admin.panel')}</p>
        )}
        {!mobile && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto p-1.5 rounded-lg glass-ios-nav-item text-slate-400 flex-shrink-0"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        )}
        {mobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-1.5 rounded-lg glass-ios-nav-item text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide py-4 space-y-4 px-2">
        {navGroups.map((group) => (
          <div key={group.labelKey}>
            {(mobile || sidebarOpen) && (
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest px-2 mb-1.5">
                {t(group.labelKey)}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = location.pathname === item.href
                const label = t(item.labelKey)
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      title={(!mobile && !sidebarOpen) ? label : undefined}
                      className={clsx(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium group relative glass-ios-nav-item',
                        active
                          ? 'glass-ios-nav-item--active text-primary-700'
                          : 'text-slate-600 hover:text-slate-800'
                      )}
                    >
                      <item.icon
                        className={clsx('flex-shrink-0', active ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600')}
                        style={{ width: 18, height: 18 }}
                      />
                      {(mobile || sidebarOpen) && <span className="truncate">{label}</span>}
                      {active && (mobile || sidebarOpen) && (
                        <span className="ml-auto w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      )}
                      {!mobile && !sidebarOpen && (
                        <span className="absolute left-full ml-3 bg-slate-800 text-white text-xs font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {label}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/40 p-3 flex-shrink-0">
        <button
          onClick={() => setShowLogout(true)}
          className={clsx(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 glass-ios-nav-item hover:text-red-600',
            !mobile && !sidebarOpen && 'justify-center'
          )}
          title={(!mobile && !sidebarOpen) ? t('admin.signOut') : undefined}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {(mobile || sidebarOpen) && <span>{t('admin.signOut')}</span>}
        </button>
      </div>
    </>
  )

  return (
    <div
      className={clsx(
        'h-screen max-h-screen h-dvh max-h-dvh flex overflow-hidden admin-glass-scope glass-ios-26-shell relative',
        ambientShellProps.className
      )}
      style={ambientShellProps.style}
      onMouseMove={ambientShellProps.onMouseMove}
      onMouseLeave={ambientShellProps.onMouseLeave}
    >
      <AdminPanelBackground className="fixed inset-0 z-0" />

      {showLogout && (
        <LogoutModal
          t={t}
          onClose={() => setShowLogout(false)}
          onConfirm={handleLogout}
        />
      )}

      {/* ── Desktop sidebar ── */}
      <aside
        className={clsx(
          'hidden md:flex flex-shrink-0 glass-ios-sidebar z-10 flex-col h-full min-h-0 transition-all duration-300',
          sidebarOpen ? 'w-60' : 'w-16'
        )}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-10 w-64 glass-ios-sidebar h-full overflow-y-auto scrollbar-hide shadow-2xl">
            <SidebarContent mobile />
          </aside>
        </div>
      )}

      {/* Main content — only <main> scrolls; header stays pinned */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full relative z-10">
        {/* Top bar */}
        <header className="glass-ios-nav h-14 sm:h-16 flex flex-shrink-0 items-center justify-between px-4 sm:px-6 z-20 overflow-visible">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl glass-ios-nav-item text-slate-500"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">{t('admin.panel')}</p>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 leading-tight capitalize">
                {location.pathname.replace('/admin/', '').replace('/admin', 'Dashboard').replace(/-/g, ' ') || 'Dashboard'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-visible">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 glass-ios-pill rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                placeholder={t('admin.searchPlaceholder')}
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-36"
              />
            </div>

            <LanguageSwitcher className="hidden sm:inline-flex" />

            <SettingsMenu role="admin" tone="admin" onLogout={() => setShowLogout(true)} />

            {/* Notifications */}
            <div className="relative overflow-visible">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-xl glass-ios-nav-item"
              >
                <Bell className="w-5 h-5 text-slate-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-400 rounded-full ring-2 ring-white" />
              </button>
              {notifOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-72 glass-ios-popover z-[60]"
                  onMouseLeave={() => setNotifOpen(false)}
                >
                  <div className="p-4 border-b border-white/50">
                    <h4 className="font-semibold text-slate-800 text-sm">{t('nav.notifications')}</h4>
                  </div>
                  <div className="py-1">
                  {[
                    { text: '3 new teacher applications pending', time: '2 min ago', dot: 'bg-primary-300' },
                    { text: 'Monthly revenue report is ready', time: '1 hr ago', dot: 'bg-primary-300' },
                    { text: '2 dispute cases need review', time: '3 hrs ago', dot: 'bg-amber-400' },
                    { text: 'New community created: Physics Club', time: '1 day ago', dot: 'bg-emerald-400' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-3 px-3 py-2.5 mx-1 glass-ios-menu-item border-b border-white/40 last:border-0">
                      <span className={clsx('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', n.dot)} />
                      <div>
                        <p className="text-xs text-slate-700 leading-snug">{n.text}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin profile */}
            <div className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl glass-ios-nav-item cursor-pointer">
              <Avatar name={user?.name || 'Admin'} size="sm" />
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-slate-800 leading-none">{t('admin.superAdmin')}</p>
                <p className="text-xs text-slate-400 mt-0.5">admin@rokkru.com</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
