import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Lock,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Crown,
  Calendar,
  Download,
  Eye,
  X,
  FileText,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import {
  PageScaffold,
  PageCard,
  PageAmbient,
  DataTable,
} from '@/components'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { BillingIntervalToggle } from '@/components/common'
import useTeacherSubscription from '../../hooks/useTeacherSubscription'
import { useTranslation } from '@/i18n'
import {
  MONTHLY_PRICE,
  ANNUAL_PRICE,
  getIntervalPrice,
  getMonthlyEquivalent,
  activatePremium,
  cancelAtPeriodEnd,
  resumeSubscription,
  changeBillingInterval,
  calculateProration,
  resolvePaymentFailure,
  formatBillingDate,
  downloadInvoice,
  getStatusLabel,
  SUBSCRIPTION_STATUS,
} from '../../utils/teacherSubscription'

const TeacherBilling = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { subscription, isPremium, hasSubscription, setSubscription } = useTeacherSubscription()

  const [billingInterval, setBillingInterval] = useState(
    searchParams.get('interval') === 'annual' ? 'annual' : subscription.billingInterval || 'monthly'
  )
  const [startTrial, setStartTrial] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [loading, setLoading] = useState(false)
  const [viewInvoice, setViewInvoice] = useState(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const checkoutTotal = getIntervalPrice(billingInterval)
  const prorationPreview = useMemo(
    () =>
      hasSubscription && subscription.billingInterval !== billingInterval
        ? calculateProration(subscription, billingInterval)
        : null,
    [hasSubscription, subscription, billingInterval]
  )

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 6)
    if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const handleCheckout = (e) => {
    e.preventDefault()
    setLoading(true)
    const last4 = cardNumber.replace(/\D/g, '').slice(-4) || '4242'
    setTimeout(() => {
      setSubscription(
        activatePremium({ cardLast4: last4, billingInterval, startTrial })
      )
      setLoading(false)
      setCardNumber('')
      setExpiry('')
      setCvv('')
    }, 1500)
  }

  const handleChangeInterval = () => {
    setSubscription(changeBillingInterval(billingInterval))
  }

  const handleCancel = () => {
    setSubscription(cancelAtPeriodEnd())
    setShowCancelConfirm(false)
  }

  const handleResolvePayment = () => {
    const last4 = cardNumber.replace(/\D/g, '').slice(-4) || subscription.cardLast4
    setSubscription(resolvePaymentFailure(last4))
  }

  const invoiceColumns = [
    {
      key: 'id',
      label: t('billing.invoice'),
      render: (row) => <span className="font-mono text-xs font-semibold text-slate-700">{row.id}</span>,
    },
    {
      key: 'date',
      label: t('billing.date'),
      render: (row) => (
        <span className="text-xs text-slate-600 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {formatBillingDate(row.date)}
        </span>
      ),
    },
    { key: 'description', label: t('billing.description') },
    {
      key: 'amount',
      label: t('billing.amount'),
      render: (row) => (
        <span className="font-semibold text-slate-800">${Number(row.amount).toFixed(2)}</span>
      ),
    },
    {
      key: 'status',
      label: t('billing.status'),
      render: (row) => (
        <Badge variant={row.status === 'paid' ? 'success' : 'warning'} size="sm" dot>
          {row.status === 'paid' ? t('billing.paid') : row.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => setViewInvoice(row)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-primary-600"
            aria-label="View invoice"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => downloadInvoice(row)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-primary-600"
            aria-label="Download invoice"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

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

          {hasSubscription ? (
            <div className="space-y-6">
              <PageCard variant="brand" className="text-white">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/85 uppercase tracking-wide">
                        {getStatusLabel(subscription)}
                      </p>
                      <h2 className="text-xl font-black mt-0.5 text-white">{t('subscription.premium')}</h2>
                      <p className="text-sm text-white/90 mt-1">
                        {subscription.billingInterval === 'annual' ? t('billing.yearly') : t('billing.monthly')} · $
                        {subscription.billingInterval === 'annual' ? ANNUAL_PRICE : MONTHLY_PRICE}
                        {subscription.billingInterval === 'annual' ? '/year' : '/mo'}
                      </p>
                      {subscription.billingAnchorDay && (
                        <p className="text-xs text-white/80 mt-2">
                          {t('billing.billingAnchor', { day: subscription.billingAnchorDay, date: formatBillingDate(subscription.currentPeriodEnd) })}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs text-white/85">{t('billing.nextCharge')}</p>
                    <p className="text-lg font-bold text-white">{formatBillingDate(subscription.nextBilling)}</p>
                    {subscription.status !== SUBSCRIPTION_STATUS.CANCELING && (
                      <p className="text-sm text-white/90 mt-0.5">
                        ${getIntervalPrice(subscription.billingInterval).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </PageCard>

              {subscription.status === SUBSCRIPTION_STATUS.PAST_DUE && (
                <PageCard variant="alert">
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-amber-900">{t('billing.paymentFailed')}</p>
                        <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                          {t('billing.paymentFailedNote', { date: formatBillingDate(subscription.gracePeriodEndsAt) })}
                        </p>
                      </div>
                    </div>
                    <Button variant="primary" size="sm" onClick={handleResolvePayment}>
                      <RefreshCw className="w-4 h-4" />
                      {t('billing.updateRetry')}
                    </Button>
                  </div>
                </PageCard>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <PageCard>
                  <h3 className="text-sm font-bold text-slate-800 mb-3">{t('billing.paymentMethod')}</h3>
                  <div className="flex items-center gap-3 p-3 rounded-xl glass-ios-pill">
                    <CreditCard className="w-8 h-8 text-primary-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        ···· {subscription.cardLast4 || '4242'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {t('billing.recurring')} · {subscription.billingInterval === 'annual' ? t('billing.yearly') : t('billing.monthly')}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                    {t('billing.receiptNote')}
                  </p>
                </PageCard>

                <PageCard>
                  <h3 className="text-sm font-bold text-slate-800 mb-3">{t('billing.changeCycle')}</h3>
                  <BillingIntervalToggle
                    value={billingInterval}
                    onChange={setBillingInterval}
                    className="mb-3 w-full flex"
                  />
                  {prorationPreview && subscription.billingInterval !== billingInterval && (
                    <div className="text-xs text-slate-600 glass-subtle rounded-xl p-3 mb-3 space-y-1 border border-white/40">
                      <p className="font-semibold text-slate-800">{t('billing.prorationEstimate')}</p>
                      <p>{t('billing.creditUnused')}: ${prorationPreview.credit.toFixed(2)}</p>
                      <p>{t('billing.newPlanProrated')}: ${prorationPreview.charge.toFixed(2)}</p>
                      <p className="font-bold text-primary-600">
                        {t('billing.dueToday')}: ${prorationPreview.dueToday.toFixed(2)}
                      </p>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={subscription.billingInterval === billingInterval}
                    onClick={handleChangeInterval}
                  >
                    {t('billing.applyChange')}
                  </Button>
                </PageCard>
              </div>

              <PageCard>
                <h3 className="text-sm font-bold text-slate-800 mb-2">{t('billing.subChanges')}</h3>
                {subscription.status === SUBSCRIPTION_STATUS.CANCELING ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl glass-subtle border border-white/45">
                    <p className="text-sm text-slate-600">
                      {t('billing.cancelsOn', { date: formatBillingDate(subscription.currentPeriodEnd) })}
                    </p>
                    <Button variant="primary" size="sm" onClick={() => setSubscription(resumeSubscription())}>
                      {t('billing.resumeSub')}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                      {t('billing.cancelNote')}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => setShowCancelConfirm(true)}
                    >
                      {t('billing.cancelSub')}
                    </Button>
                  </div>
                )}
              </PageCard>

              <PageCard padding={false} className="overflow-hidden">
                <div className="px-5 py-4 border-b border-white/45 flex justify-between items-center gap-3">
                  <div>
                    <h3 className="font-bold text-slate-800">{t('billing.invoicesTitle')}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {t('billing.invoicesSubtitle')}
                    </p>
                  </div>
                  <Badge variant="primary" size="sm">
                    {subscription.invoices?.length || 0}
                  </Badge>
                </div>
                <div className="hidden md:block">
                  <DataTable
                    columns={invoiceColumns}
                    rows={subscription.invoices || []}
                    emptyMessage={t('billing.noInvoices')}
                  />
                </div>
                <div className="md:hidden divide-y divide-slate-100">
                  {(subscription.invoices || []).map((inv) => (
                    <div key={inv.id} className="px-4 py-4 flex justify-between items-start gap-2">
                      <div>
                        <p className="font-mono text-xs font-bold">{inv.id}</p>
                        <p className="text-xs text-slate-500">{inv.description}</p>
                      </div>
                      <div className="flex gap-1">
                        <button type="button" onClick={() => setViewInvoice(inv)} className="p-2">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => downloadInvoice(inv)} className="p-2">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </PageCard>
            </div>
          ) : (
            <div className="max-w-lg mx-auto space-y-4">
              <PageCard>
                <p className="text-xs font-bold text-primary-600/90 uppercase tracking-wide mb-3">
                  {t('billing.phase1')}
                </p>
                <BillingIntervalToggle value={billingInterval} onChange={setBillingInterval} className="w-full" />
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {t('billing.annualSave', { monthly: getMonthlyEquivalent('annual'), yearly: MONTHLY_PRICE * 12 })}
                </p>
              </PageCard>

              <label className="glass-checkbox-card flex items-start gap-3 p-4 sm:p-5">
                <input
                  type="checkbox"
                  checked={startTrial}
                  onChange={(e) => setStartTrial(e.target.checked)}
                  className="mt-0.5 rounded border-white/60 text-primary-500 focus:ring-primary-300"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{t('billing.freeTrial')}</p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t('billing.freeTrialNote')}
                  </p>
                </div>
              </label>

              <PageCard padding={false} className="overflow-hidden">
                <div className="px-6 py-4 border-b border-white/45">
                  <h2 className="font-bold text-slate-800">{t('billing.paymentSummary')}</h2>
                  <p className="text-xs text-slate-600 mt-1">{t('billing.processedVia')}</p>
                </div>
                <div className="px-6 py-4 space-y-2 border-b border-white/40 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Premium ({billingInterval})</span>
                    <span className="font-semibold">${checkoutTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('billing.tax')}</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold text-slate-800">
                    <span>{startTrial ? t('billing.dueAfterTrial') : t('billing.dueToday')}</span>
                    <span className="text-primary-600">${checkoutTotal.toFixed(2)}</span>
                  </div>
                </div>
                <form onSubmit={handleCheckout} className="px-6 py-5 space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('billing.card')}</p>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength={19}
                      required
                      className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm tracking-widest text-slate-800 placeholder-slate-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YYYY"
                      className="glass-input w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400"
                    />
                    <input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="CVV"
                      className="glass-input w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-primary-400 text-white text-sm font-bold hover:bg-primary-500 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? t('billing.processing') : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        {startTrial ? t('billing.startTrial') : t('billing.subscribe')} — ${checkoutTotal.toFixed(2)}
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    {t('billing.pciNote')}
                  </p>
                </form>
              </PageCard>
            </div>
          )}
        </PageScaffold>
      </div>

      {showCancelConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/40">
          <PageCard className="max-w-md w-full">
            <h3 className="font-bold text-slate-800 mb-2">{t('billing.cancelConfirmTitle')}</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {t('billing.cancelConfirmMsg', { date: formatBillingDate(subscription.currentPeriodEnd) })}
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setShowCancelConfirm(false)}>
                {t('billing.keepPremium')}
              </Button>
              <Button variant="primary" className="bg-red-500 hover:bg-red-600" onClick={handleCancel}>
                {t('billing.confirmCancel')}
              </Button>
            </div>
          </PageCard>
        </div>
      )}

      {viewInvoice && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/40">
          <PageCard className="w-full max-w-md relative">
            <button
              type="button"
              onClick={() => setViewInvoice(null)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-primary-500" />
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold">Invoice</p>
                <p className="font-bold">{viewInvoice.id}</p>
              </div>
            </div>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between">
                <dt className="text-slate-500">{t('billing.amount')}</dt>
                <dd className="font-bold text-primary-600">${Number(viewInvoice.amount).toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">{t('billing.period')}</dt>
                <dd className="text-right text-xs">
                  {formatBillingDate(viewInvoice.periodStart)} –{' '}
                  {formatBillingDate(viewInvoice.periodEnd)}
                </dd>
              </div>
            </dl>
            <Button
              variant="primary"
              className="w-full mt-6"
              onClick={() => downloadInvoice(viewInvoice)}
            >
              <Download className="w-4 h-4" />
              {t('billing.downloadReceipt')}
            </Button>
          </PageCard>
        </div>
      )}
    </PageAmbient>
  )
}

export default TeacherBilling
