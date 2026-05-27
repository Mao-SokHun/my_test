import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Check } from 'lucide-react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import AuthRoleTabs from '../../components/common/AuthRoleTabs'
import AuthLayout from '@/components/layout/AuthLayout'
import clsx from 'clsx'
import { useTranslation } from '@/i18n'
import { useAuth } from '@/hooks'
import { isApiEnabled } from '@/constants/env'
import { register as apiRegister } from '@/services/authService'

const CreateAccount = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student'
  const [role, setRole] = useState(initialRole)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const selectRole = (r) => {
    setRole(r)
    setSearchParams(r === 'teacher' ? { role: 'teacher' } : {}, { replace: true })
  }
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const heroTitle =
    role === 'teacher' ? t('auth.signupHeroTeacherTitle') : t('auth.signupHeroStudentTitle')
  const heroSubtitle =
    role === 'teacher' ? t('auth.signupHeroTeacherSubtitle') : t('auth.signupHeroStudentSubtitle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreed) return

    setError('')
    setSubmitting(true)
    try {
      if (isApiEnabled()) {
        await apiRegister({
          email,
          password,
          role,
          mentorProfile:
            role === 'teacher'
              ? {
                  firstname: firstName,
                  lastname: lastName,
                  experience_years: 0,
                }
              : undefined,
        })
        const user = await login({ email, password, role })
        if (user) {
          navigate(role === 'teacher' ? '/teacher/home' : '/onboarding/complete-profile')
        }
      } else {
        if (role === 'student') navigate('/onboarding/complete-profile')
        else navigate('/teacher/home')
      }
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      panelRole={role}
      title={heroTitle}
      subtitle={heroSubtitle}
      roleTabs={<AuthRoleTabs role={role} selectRole={selectRole} />}
      footer={
        <p className="text-center text-sm text-on-glass-muted mt-6">
          {t('auth.alreadyHaveAccount')}{' '}
          <Link to={`/login?role=${role}`} className="text-primary-600 font-semibold hover:underline">
            {t('auth.signInLink')}
          </Link>
        </p>
      }
    >
      <div className="text-center mb-6 lg:text-left">
        <h1 className="text-2xl font-bold text-on-glass">{t('auth.signupTitle')}</h1>
        <p className="text-on-glass-muted text-sm mt-1">
          {role === 'teacher' ? t('auth.signupSubtitleTeacher') : t('auth.signupSubtitleStudent')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label={t('auth.firstName')}
            placeholder="Alex"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label={t('auth.lastName')}
            placeholder="Johnson"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <Input
          label={t('auth.emailAddress')}
          type="email"
          placeholder={t('auth.emailPlaceholder')}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label={t('auth.password')}
          type={showPass ? 'text' : 'password'}
          placeholder={t('auth.passwordMinPlaceholder')}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <label className="flex items-start gap-2.5 cursor-pointer">
          <button
            type="button"
            onClick={() => setAgreed(!agreed)}
            className={clsx(
              'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
              agreed ? 'bg-primary-500 border-primary-400' : 'border-slate-300'
            )}
          >
            {agreed && <Check className="w-3 h-3 text-white" />}
          </button>
          <span className="text-xs text-slate-500 leading-relaxed">
            {t('auth.agreeRokkruPrefix')}{' '}
            <Link to="/terms" className="text-primary-600 hover:underline font-medium">
              {t('auth.terms')}
            </Link>{' '}
            {t('auth.and')}{' '}
            <Link to="/privacy" className="text-primary-600 hover:underline font-medium">
              {t('auth.privacy')}
            </Link>
          </span>
        </label>

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={!agreed || submitting}>
          {submitting ? '…' : role === 'teacher' ? t('auth.createTeacherAccount') : t('auth.createAccount')}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200/80" />
        </div>
        <p className="relative text-center text-xs text-slate-500 uppercase tracking-wide px-2 mx-auto w-fit">
          {t('auth.orSignUpWith')}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="py-2.5 glass-subtle rounded-xl text-sm font-medium text-slate-700 hover:bg-white/80 border border-white/60"
        >
          Google
        </button>
        <button
          type="button"
          className="py-2.5 glass-subtle rounded-xl text-sm font-medium text-slate-700 hover:bg-white/80 border border-white/60"
        >
          Facebook
        </button>
      </div>

      <p className="text-xs text-slate-500 text-center mt-6 leading-relaxed">
        {t('auth.agreeTerms')}{' '}
        <Link to="/terms" className="text-primary-600 hover:underline">
          {t('auth.terms')}
        </Link>{' '}
        {t('auth.and')}{' '}
        <Link to="/privacy" className="text-primary-600 hover:underline">
          {t('auth.privacy')}
        </Link>
        .
      </p>
    </AuthLayout>
  )
}

export default CreateAccount
