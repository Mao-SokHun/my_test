import { Shield } from 'lucide-react'
import { brand } from '@/constants/tokens'
import Logo from './Logo'
import AuthHeroBackground from '../backgrounds/AuthHeroBackground'
import clsx from 'clsx'
import { useTranslation } from '@/i18n'

/**
 * Split auth layout — left brand hero + right form
 * @param {'student'|'teacher'} panelRole — tweaks hero gradient (login/signup)
 * @param {'default'|'admin'} variant
 */
const AuthLayout = ({
  title,
  subtitle,
  roleTabs,
  children,
  footer,
  variant = 'default',
  panelRole = 'student',
}) => {
  const { t } = useTranslation()
  const isAdmin = variant === 'admin'

  const panelClass = clsx(
    'hidden lg:flex lg:w-[42%] flex-col justify-between p-10 xl:p-12 relative overflow-hidden text-white',
    isAdmin && 'auth-hero-panel auth-hero-panel--admin',
    !isAdmin && panelRole === 'teacher' && 'auth-hero-panel auth-hero-panel--teacher',
    !isAdmin && panelRole !== 'teacher' && 'auth-hero-panel'
  )

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className={panelClass}>
        {/* Soft mesh glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-16 w-[28rem] h-[28rem] rounded-full bg-primary-400/30 blur-[100px]" />
          <div className="absolute top-[38%] -left-28 w-72 h-72 rounded-full bg-primary-500/20 blur-[88px]" />
          <div className="absolute -bottom-32 right-[12%] w-[22rem] h-[22rem] rounded-full bg-primary-600/25 blur-[96px]" />
          {!isAdmin && panelRole === 'teacher' && (
            <div className="absolute top-[18%] right-[20%] w-48 h-48 rounded-full bg-amber-500/10 blur-[72px]" />
          )}
        </div>

        <div className="absolute inset-0 z-[1]">
          <AuthHeroBackground variant={isAdmin ? 'admin' : 'auth'} meshStyle="both" />
        </div>

        {/* Grid + vignette */}
        <div className="absolute inset-0 auth-hero-grid opacity-80 pointer-events-none z-[2]" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-slate-950/30 pointer-events-none z-[2]"
          aria-hidden
        />

        <div className="relative flex items-center gap-3 z-10">
          <Logo to="/" size="lg" className="[&_span]:text-white [&_span]:capitalize" />
          {isAdmin && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-500/20 border border-primary-400/30 text-[10px] font-bold uppercase tracking-wider text-primary-200">
              <Shield className="w-3 h-3" />
              Admin
            </span>
          )}
        </div>

        <div className="relative max-w-md z-10">
          <p className="text-primary-200/90 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            {isAdmin ? t('brand.restricted') : t('brand.tagline')}
          </p>
          <h2
            key={title}
            className="text-3xl xl:text-4xl font-bold leading-tight mb-4 text-white drop-shadow-sm transition-opacity duration-300"
          >
            {title}
          </h2>
          <p
            key={subtitle}
            className="text-slate-300/95 text-base leading-relaxed transition-opacity duration-300"
          >
            {subtitle}
          </p>
        </div>

        <p className="relative text-xs text-slate-500/90 z-10">{brand.copyright}</p>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-10 sm:px-10 bg-gradient-to-br from-slate-100/80 via-slate-50 to-primary-50/40">
        <div className="lg:hidden mb-8 flex justify-center">
          <Logo to="/" size="md" />
        </div>
        <div className="w-full max-w-md mx-auto glass-auth-card">
          {roleTabs}
          {children}
          {footer}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
