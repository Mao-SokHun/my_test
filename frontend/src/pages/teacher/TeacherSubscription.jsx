import { Link } from 'react-router-dom'
import { Crown, Check, Sparkles, CreditCard } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PageScaffold, PageCard, PageAmbient } from '@/components'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import clsx from 'clsx'
import { useTranslation } from '@/i18n'
import useTeacherSubscription from '../../hooks/useTeacherSubscription'
import { fetchPlans } from '@/services/subscriptionService'

const TeacherSubscription = () => {
  const { t } = useTranslation()
  const { subscription, isPremium, loading, error } = useTeacherSubscription()
  const [plans, setPlans] = useState([])
  const [plansError, setPlansError] = useState('')

  useEffect(() => {
    fetchPlans()
      .then((list) => {
        setPlans(Array.isArray(list) ? list : [])
      })
      .catch((err) => {
        setPlans([])
        setPlansError(err.message || 'Failed to load plans')
      })
  }, [])

  return (
    <PageAmbient variant="teacher" className="space-y-6">
      <PageScaffold
        title={t('subscription.title')}
        subtitle={t('subscription.subtitle')}
      >
        {(error || plansError) && (
          <PageCard className="bg-red-50 border-red-200">
            <p className="text-sm text-red-700">{error || plansError}</p>
          </PageCard>
        )}

        {isPremium && (
          <PageCard className="bg-emerald-50/80 border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-900">
                  {subscription?.status || 'active'}
                  {subscription?.billingInterval ? ` · ${subscription.billingInterval}` : ''}
                </p>
              </div>
              {subscription?.currentPeriodEnd && (
                <p className="text-xs text-slate-600 mt-1">
                  {t('subscription.accessUntil').replace('{{date}}', subscription.currentPeriodEnd)}
                </p>
              )}
            </div>
            <Link to="/teacher/billing">
              <Button variant="outline" size="sm">
                <CreditCard className="w-4 h-4" />
                {t('subscription.billingInvoices')}
              </Button>
            </Link>
          </PageCard>
        )}

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl">
          {!loading && plans.length === 0 && (
            <PageCard>
              <p className="text-sm text-slate-600">No plans available.</p>
            </PageCard>
          )}
          {plans.map((plan) => {
            const planName = plan.name || plan.plan || t('subscription.free')
            const premium = planName.toLowerCase().includes('premium')
            const isCurrent = subscription?.plan ? subscription.plan === (plan.plan || planName.toLowerCase()) : (premium ? isPremium : !isPremium)
            const price = Number(plan.price ?? plan.amount ?? 0)
            const interval = plan.interval || 'monthly'
            return (
              <PageCard
                key={plan.id || planName}
                className={clsx(
                  'relative',
                  premium && 'ring-2 ring-primary-200 bg-primary-50/30',
                  isCurrent && !premium && 'ring-2 ring-slate-200'
                )}
              >
                {premium && (
                  <Badge variant="primary" size="sm" className="absolute top-4 right-4">
                    <Crown className="w-3 h-3" />
                    {t('subscription.recommended')}
                  </Badge>
                )}
                {isCurrent && (
                  <Badge variant="success" size="sm" className="absolute top-4 left-4">
                    {t('subscription.currentPlan')}
                  </Badge>
                )}
                <div className="flex items-baseline gap-2 mb-2 mt-6 flex-wrap">
                  <h3 className="text-lg font-bold text-slate-800">{planName}</h3>
                  <p className="text-2xl font-extrabold text-primary-600">
                    ${price}
                    <span className="text-sm font-medium text-slate-400">/{interval}</span>
                  </p>
                </div>
                <p className="text-sm text-slate-600 mb-4">{plan.description || ''}</p>
                <ul className="space-y-2 mb-6">
                  {(plan.features || []).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                {premium ? (
                  isPremium ? (
                    <Link to="/teacher/billing">
                      <Button variant="secondary" className="w-full">
                        <CreditCard className="w-4 h-4" />
                        {t('subscription.manageBilling')}
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/teacher/billing?planId=${encodeURIComponent(plan.id || '')}`}>
                      <Button variant="primary" className="w-full">
                        <Sparkles className="w-4 h-4" />
                        {t('subscription.continueCheckout')}
                      </Button>
                    </Link>
                  )
                ) : (
                  <Button variant="secondary" className="w-full" disabled={isCurrent}>
                    {isCurrent ? t('subscription.currentPlan') : t('subscription.included')}
                  </Button>
                )}
              </PageCard>
            )
          })}
        </div>
      </PageScaffold>
    </PageAmbient>
  )
}

export default TeacherSubscription
