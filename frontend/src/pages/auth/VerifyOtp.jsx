import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import AuthLayout from '@/components/layout/AuthLayout'
import { verifyForgotPasswordOtp } from '@/services/authService'
import { useTranslation } from '@/i18n'

const VerifyOtp = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const email = searchParams.get('email') ?? ''
  const [otpCode, setOtpCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleVerifyOtp = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!email) {
      setError(t('auth.missingEmailForOtp'))
      return
    }

    setSubmitting(true)
    try {
      await verifyForgotPasswordOtp({ email, otp: otpCode })
      setSuccess(t('auth.verifyOtpSuccess'))
      window.setTimeout(() => navigate('/login'), 1000)
    } catch (err) {
      setError(err.message || t('auth.verifyOtpFailed'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      panelRole="student"
      title={t('auth.verifyOtpHeroTitle')}
      subtitle={t('auth.verifyOtpHeroSubtitle')}
      footer={
        <p className="text-center text-sm text-on-glass-muted mt-6">
          <Link to="/forgot-password" className="text-primary-600 font-semibold hover:underline">
            {t('auth.useAnotherEmail')}
          </Link>
        </p>
      }
    >
      <div className="text-center mb-6 lg:text-left">
        <h1 className="text-2xl font-bold text-on-glass">{t('auth.verifyOtpTitle')}</h1>
        <p className="text-on-glass-muted text-sm mt-1">
          {t('auth.verifyOtpSubtitle')} {email ? `(${email})` : ''}
        </p>
      </div>

      <form onSubmit={handleVerifyOtp} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
        )}
        {success && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-3 py-2">{success}</p>
        )}
        <Input
          label={t('auth.otpCode')}
          placeholder={t('auth.otpPlaceholder')}
          required
          value={otpCode}
          onChange={(event) => setOtpCode(event.target.value)}
        />
        <Button type="submit" variant="primary" className="w-full" size="lg" disabled={submitting}>
          {submitting ? '…' : t('auth.verifyOtpButton')}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default VerifyOtp
