import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import AuthLayout from '@/components/layout/AuthLayout'
import { requestForgotPasswordOtp } from '@/services/authService'
import { useTranslation } from '@/i18n'

const ForgotPasswordOtp = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [requestingOtp, setRequestingOtp] = useState(false)
  const [error, setError] = useState('')

  const handleRequestOtp = async (event) => {
    event.preventDefault()
    setError('')
    setRequestingOtp(true)

    try {
      await requestForgotPasswordOtp(email)
      navigate(`/forgot-password/verify-otp?email=${encodeURIComponent(email)}`)
    } catch (err) {
      setError(err.message || t('auth.resetOtpSendFailed'))
    } finally {
      setRequestingOtp(false)
    }
  }

  return (
    <AuthLayout
      panelRole="student"
      title={t('auth.forgotHeroTitle')}
      subtitle={t('auth.forgotHeroSubtitle')}
      footer={
        <p className="text-center text-sm text-on-glass-muted mt-6">
          {t('auth.backToLogin')}{' '}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">
            {t('auth.signInLink')}
          </Link>
        </p>
      }
    >
      <div className="text-center mb-6 lg:text-left">
        <h1 className="text-2xl font-bold text-on-glass">{t('auth.forgotPasswordTitle')}</h1>
        <p className="text-on-glass-muted text-sm mt-1">{t('auth.forgotPasswordSubtitle')}</p>
      </div>

      <form onSubmit={handleRequestOtp} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
        )}
        <Input
          label={t('auth.emailAddress')}
          type="email"
          placeholder={t('auth.emailPlaceholder')}
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button type="submit" variant="primary" className="w-full" size="lg" disabled={requestingOtp}>
          {requestingOtp ? '…' : t('auth.sendOtpButton')}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default ForgotPasswordOtp
