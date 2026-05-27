import { Link } from 'react-router-dom'
import { Crown, Check, Sparkles, CreditCard, Info } from 'lucide-react'
import { useState } from 'react'
import { PageScaffold, PageCard, PageAmbient } from '@/components'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { BillingIntervalToggle } from '@/components/common'
import clsx from 'clsx'
import { useTranslation } from '@/i18n'
import useTeacherSubscription from '../../hooks/useTeacherSubscription'
import {
  MONTHLY_PRICE,
  ANNUAL_PRICE,
  ANNUAL_DISCOUNT_PERCENT,
  getMonthlyEquivalent,
  getStatusLabel,
  formatBillingDate,
  SUBSCRIPTION_STATUS,
} from '../../utils/teacherSubscription'

const TeacherSubscription = () => {
  const { t } = useTranslation()
  const { subscription, isPremium } = useTeacherSubscription()
  const [previewInterval, setPreviewInterval] = useState('monthly')

  const plans = [
    {
      name: t('subscription.free'),
      price: 0,
      description: t('subscription.freeDesc'),
      features: [t('subscription.basicProfile'), t('subscription.searchProvince'), t('subscription.directContact')],
      premium: false,
    },
    {
      name: t('subscription.premium'),
      description: t('subscription.premiumDesc'),
      features: [
        t('subscription.pinnedSearch'),
        t('subscription.featuredPremium'),
        t('subscription.highlightedCard'),
        t('subscription.priorityMessaging'),
      ],
      premium: true,
    },
  ]

  const displayPrice = previewInterval === 'annual' ? ANNUAL_PRICE : MONTHLY_PRICE
  const priceSuffix = previewInterval === 'annual' ? '/year' : '/mo'

  return (
    <PageAmbient variant="teacher" className="space-y-6">
      <PageScaffold
        title={t('subscription.title')}
        subtitle={t('subscription.subtitle')}
      >
        {isPremium && (
          <PageCard className="bg-emerald-50/80 border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-900">
                  {getStatusLabel(subscription)}
                  {subscription.billingInterval === 'annual' ? ' · Annual' : ' · Monthly'}
                </p>
              </div>
              {subscription.status === SUBSCRIPTION_STATUS.CANCELING && (
                <p className="text-xs text-emerald-800 mt-1">
                  {t('subscription.accessUntil').replace('{{date}}', formatBillingDate(subscription.currentPeriodEnd))}
                </p>
              )}
              {subscription.billingAnchorDay && (
                <p className="text-xs text-slate-600 mt-1">
                  {t('subscription.billingAnchor').replace('{{day}}', subscription.billingAnchorDay)}
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

        <PageCard className="bg-slate-50/80 border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                {t('subscription.paymentNote')} {t('subscription.annualSaving').replace('{{pct}}', ANNUAL_DISCOUNT_PERCENT)}
              </p>
            </div>
            <BillingIntervalToggle value={previewInterval} onChange={setPreviewInterval} />
          </div>
        </PageCard>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl">
          {plans.map((plan) => {
            const isCurrent = plan.premium ? isPremium : !isPremium
            return (
              <PageCard
                key={plan.name}
                className={clsx(
                  'relative',
                  plan.premium && 'ring-2 ring-primary-200 bg-primary-50/30',
                  isCurrent && !plan.premium && 'ring-2 ring-slate-200'
                )}
              >
                {plan.premium && (
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
                  <h3 className="text-lg font-bold text-slate-800">{plan.name}</h3>
                  <p className="text-2xl font-extrabold text-primary-600">
                    {plan.premium ? (
                      <>
                        ${displayPrice}
                        <span className="text-sm font-medium text-slate-400">{priceSuffix}</span>
                      </>
                    ) : (
                      <>
                        $0
                        <span className="text-sm font-medium text-slate-400">/mo</span>
                      </>
                    )}
                  </p>
                </div>
                {plan.premium && previewInterval === 'annual' && (
                  <p className="text-xs text-emerald-700 font-medium mb-2">
                    ≈ ${getMonthlyEquivalent('annual')}/mo · save {ANNUAL_DISCOUNT_PERCENT}% vs monthly
                    (${MONTHLY_PRICE * 12}/yr)
                  </p>
                )}
                <p className="text-sm text-slate-600 mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.premium ? (
                  isPremium ? (
                    <Link to="/teacher/billing">
                      <Button variant="secondary" className="w-full">
                        <CreditCard className="w-4 h-4" />
                        {t('subscription.manageBilling')}
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/teacher/billing?interval=${previewInterval}`}>
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
