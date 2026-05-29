import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CreditCard } from 'lucide-react'
import { PageScaffold, PageCard, PageAmbient } from '@/components'
import Button from '../../components/ui/Button'
import useTeacherSubscription from '../../hooks/useTeacherSubscription'
import { useTranslation } from '@/i18n'
import {
  fetchPlans,
  subscribe,
  cancelSubscription,
  resumeSubscription,
  changeSubscriptionPlan,
} from '@/services/subscriptionService'

const TeacherBilling = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { subscription, refresh, loading, error } = useTeacherSubscription()
  const [plans, setPlans] = useState([])
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState('')
  const [planId, setPlanId] = useState(searchParams.get('planId') || '')

  useEffect(() => {
    fetchPlans()
      .then((list) => setPlans(Array.isArray(list) ? list : []))
      .catch((err) => setActionError(err.message || 'Failed to load plans'))
  }, [])

  const runAction = async (fn) => {
    setActionLoading(true)
    setActionError('')
    try {
      await fn()
      await refresh()
    } catch (err) {
      setActionError(err.message || 'Action failed')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <PageAmbient variant="teacher" className="space-y-6">
      <div className="max-w-4xl mx-auto w-full">
        <PageScaffold
          title={t('billing.title')}
          subtitle={hasSubscription ? t('billing.subtitleActive') : t('billing.subtitleCheckout')}
        >
          <Link
            to="/teacher/subscription"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-600 -mt-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('billing.viewPlans')}
          </Link>

          {(error || actionError) && (
            <PageCard className="bg-red-50 border-red-200 mb-4">
              <p className="text-sm text-red-700">{error || actionError}</p>
            </PageCard>
          )}

          <div className="space-y-4">
            <PageCard>
              <h3 className="text-sm font-bold text-slate-800 mb-3">Current subscription</h3>
              {loading ? (
                <p className="text-sm text-slate-600">Loading subscription...</p>
              ) : (
                <div className="space-y-1 text-sm text-slate-700">
                  <p>Plan: {subscription?.plan || 'free'}</p>
                  <p>Status: {subscription?.status || 'active'}</p>
                  {subscription?.billingInterval && <p>Interval: {subscription.billingInterval}</p>}
                  {subscription?.nextBilling && <p>Next billing: {subscription.nextBilling}</p>}
                </div>
              )}
            </PageCard>

            <PageCard>
              <h3 className="text-sm font-bold text-slate-800 mb-3">Actions</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  disabled={actionLoading || !planId}
                  onClick={() => runAction(() => subscribe({ planId }))}
                >
                  <CreditCard className="w-4 h-4" />
                  {t('billing.subscribe')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={actionLoading || !planId}
                  onClick={() => runAction(() => changeSubscriptionPlan({ planId }))}
                >
                  {t('billing.applyChange')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={actionLoading}
                  onClick={() => runAction(() => cancelSubscription())}
                >
                  {t('billing.cancelSub')}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={actionLoading}
                  onClick={() => runAction(() => resumeSubscription())}
                >
                  {t('billing.resumeSub')}
                </Button>
              </div>
            </PageCard>

            <PageCard>
              <h3 className="text-sm font-bold text-slate-800 mb-3">Available plans</h3>
              {plans.length === 0 ? (
                <p className="text-sm text-slate-600">No plans available.</p>
              ) : (
                <div className="space-y-2">
                  {plans.map((p) => (
                    <label key={p.id || p.plan} className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                      <div className="text-sm">
                        <p className="font-semibold text-slate-800">{p.name || p.plan || p.id}</p>
                        <p className="text-slate-500">${Number(p.price ?? p.amount ?? 0)} / {p.interval || 'monthly'}</p>
                      </div>
                      <input
                        type="radio"
                        name="plan"
                        value={p.id || p.plan || ''}
                        checked={planId === String(p.id || p.plan || '')}
                        onChange={(e) => setPlanId(e.target.value)}
                      />
                    </label>
                  ))}
                </div>
              )}
            </PageCard>
          </div>
        </PageScaffold>
      </div>
    </PageAmbient>
  )
}

export default TeacherBilling
