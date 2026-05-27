import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import AuthRoleTabs from '../../components/common/AuthRoleTabs'
import AuthLayout from '@/components/layout/AuthLayout'
import { useAuth } from '@/hooks'
import { useTranslation } from '@/i18n'

const Login = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student'
  const [showPass, setShowPass] = useState(false)
  const [role, setRole] = useState(initialRole)

  const selectRole = (r) => {
    setRole(r)
    setSearchParams(r === 'teacher' ? { role: 'teacher' } : {}, { replace: true })
  }
  const navigate = useNavigate()
  const { login } = useAuth()

  const heroTitle = role === 'teacher' ? t('auth.loginHeroTeacherTitle') : t('auth.loginHeroStudentTitle')
  const heroSubtitle = role === 'teacher' ? t('auth.loginHeroTeacherSubtitle') : t('auth.loginHeroStudentSubtitle')

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = login(role)
    if (user.role === 'teacher') navigate('/teacher/home')
    else navigate('/home')
  }

  return (
    <AuthLayout
      panelRole={role}
      title={heroTitle}
      subtitle={heroSubtitle}
      roleTabs={<AuthRoleTabs role={role} selectRole={selectRole} />}
      footer={
        <p className="text-center text-sm text-on-glass-muted mt-6">
          {t('auth.noAccount')}{' '}
          <Link
            to={`/create-account?role=${role}`}
            className="text-primary-600 font-semibold hover:underline"
          >
            {t('auth.signUpLink')}
          </Link>
        </p>
      }
    >
      <div className="text-center mb-6 lg:text-left">
        <h1 className="text-2xl font-bold text-on-glass">Rokkru</h1>
        <p className="text-on-glass-muted text-sm mt-1">
          {t('auth.signInAs')} {role === 'teacher' ? t('auth.signInTeacher') : t('auth.signInStudent')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label={t('auth.emailOrPhone')} type="text" placeholder={t('auth.emailPlaceholder')} required />
        <Input
          label={t('auth.password')}
          type={showPass ? 'text' : 'password'}
          placeholder="••••••••"
          required
          rightIcon={
            <button type="button" onClick={() => setShowPass(!showPass)} className="text-slate-400 hover:text-slate-600">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-300 text-primary-500" />
            {t('auth.rememberMe')}
          </label>
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            {t('auth.forgotPassword')}
          </Link>
        </div>
        <Button type="submit" variant="primary" className="w-full" size="lg">
          {t('auth.loginButton')}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200/80" />
        </div>
        <p className="relative text-center text-xs text-slate-500 uppercase tracking-wide px-2 mx-auto w-fit">
          {t('auth.orContinue')}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="py-2.5 glass-subtle rounded-xl text-sm font-medium text-slate-700 hover:bg-white/80 border border-white/60">
          Google
        </button>
        <button type="button" className="py-2.5 glass-subtle rounded-xl text-sm font-medium text-slate-700 hover:bg-white/80 border border-white/60">
          Facebook
        </button>
      </div>

      <p className="text-xs text-slate-500 text-center mt-6 leading-relaxed">
        {t('auth.agreeTerms')}{' '}
        <Link to="/terms" className="text-primary-600 hover:underline">{t('auth.terms')}</Link>
        {' '}{t('auth.and')}{' '}
        <Link to="/privacy" className="text-primary-600 hover:underline">{t('auth.privacy')}</Link>.
      </p>
    </AuthLayout>
  )
}

export default Login
