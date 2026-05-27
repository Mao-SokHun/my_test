export const MONTHLY_PRICE = 29
export const ANNUAL_DISCOUNT_PERCENT = 17
export const ANNUAL_PRICE = Math.round(MONTHLY_PRICE * 12 * (1 - ANNUAL_DISCOUNT_PERCENT / 100))
export const PREMIUM_PRICE = MONTHLY_PRICE

const STORAGE_KEY = 'rokkru_teacher_subscription'

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  TRIALING: 'trialing',
  PAST_DUE: 'past_due',
  CANCELING: 'canceling',
  CANCELED: 'canceled',
}

const defaultState = () => ({
  plan: 'free',
  status: null,
  billingInterval: 'monthly',
  subscribedAt: null,
  billingAnchorDay: null,
  currentPeriodStart: null,
  currentPeriodEnd: null,
  nextBilling: null,
  cancelAtPeriodEnd: false,
  canceledAt: null,
  cardLast4: null,
  paymentFailures: 0,
  lastPaymentFailedAt: null,
  gracePeriodEndsAt: null,
  scheduledChange: null,
  trialEndsAt: null,
  invoices: [],
})

const toDate = (iso) => {
  if (!iso) return null
  return new Date(iso.length === 10 ? `${iso}T12:00:00` : iso)
}

const toIsoDate = (date) => date.toISOString().slice(0, 10)

const addMonths = (date, months) => {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

export const getIntervalPrice = (interval) =>
  interval === 'annual' ? ANNUAL_PRICE : MONTHLY_PRICE

export const getMonthlyEquivalent = (interval) =>
  interval === 'annual' ? (ANNUAL_PRICE / 12).toFixed(2) : MONTHLY_PRICE.toFixed(2)

const normalizeSubscription = (parsed) => {
  const base = defaultState()
  if (!parsed || typeof parsed !== 'object') return base

  const merged = { ...base, ...parsed }

  if (merged.plan === 'premium' && !merged.status) {
    merged.status = merged.cancelAtPeriodEnd
      ? SUBSCRIPTION_STATUS.CANCELING
      : SUBSCRIPTION_STATUS.ACTIVE
    merged.billingInterval = merged.billingInterval || 'monthly'
    merged.billingAnchorDay =
      merged.billingAnchorDay || toDate(merged.subscribedAt)?.getDate() || new Date().getDate()
    merged.currentPeriodStart =
      merged.currentPeriodStart || merged.subscribedAt?.slice(0, 10) || toIsoDate(new Date())
    merged.currentPeriodEnd = merged.currentPeriodEnd || merged.nextBilling
  }

  return merged
}

export const getTeacherSubscription = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    return normalizeSubscription(JSON.parse(raw))
  } catch {
    return defaultState()
  }
}

export const saveTeacherSubscription = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const hasPremiumAccess = (sub = getTeacherSubscription()) => {
  if (sub.plan !== 'premium') return false
  if (sub.status === SUBSCRIPTION_STATUS.CANCELED) return false

  const now = new Date()
  const periodEnd = toDate(sub.currentPeriodEnd)

  if (periodEnd && now > periodEnd && sub.status === SUBSCRIPTION_STATUS.CANCELING) {
    return false
  }

  if (sub.status === SUBSCRIPTION_STATUS.PAST_DUE) {
    const graceEnd = toDate(sub.gracePeriodEndsAt)
    if (graceEnd && now > graceEnd) return false
  }

  return [
    SUBSCRIPTION_STATUS.ACTIVE,
    SUBSCRIPTION_STATUS.TRIALING,
    SUBSCRIPTION_STATUS.PAST_DUE,
    SUBSCRIPTION_STATUS.CANCELING,
  ].includes(sub.status)
}

export const isPremiumSubscribed = () => hasPremiumAccess()

const formatInvoiceMonth = (date) =>
  date.toLocaleString('en-US', { month: 'long', year: 'numeric' })

const makeInvoice = (date, amount, interval, seq) => {
  const periodEnd =
    interval === 'annual' ? addMonths(date, 12) : addMonths(date, 1)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const label = interval === 'annual' ? 'Premium Annual' : 'Premium Monthly'
  return {
    id: `INV-${y}${m}-${String(seq).padStart(3, '0')}`,
    date: toIsoDate(date),
    description: `${label} — ${formatInvoiceMonth(date)}`,
    amount,
    status: 'paid',
    periodStart: toIsoDate(date),
    periodEnd: toIsoDate(periodEnd),
    billingInterval: interval,
  }
}

/** New subscription checkout (Stripe/Paddle would run here in production). */
export const activatePremium = ({
  cardLast4 = '4242',
  billingInterval = 'monthly',
  startTrial = false,
} = {}) => {
  const now = new Date()
  const anchorDay = now.getDate()
  const months = billingInterval === 'annual' ? 12 : 1
  const periodEnd = addMonths(now, months)
  const amount = getIntervalPrice(billingInterval)

  const existing = getTeacherSubscription()
  const isNew = existing.plan !== 'premium' || existing.status === SUBSCRIPTION_STATUS.CANCELED

  let invoices = [...(existing.invoices || [])]
  if (isNew) {
    const past1 = addMonths(now, -1)
    const past2 = addMonths(now, -2)
    invoices = [
      makeInvoice(now, amount, billingInterval, 1),
      makeInvoice(past1, MONTHLY_PRICE, 'monthly', 2),
      makeInvoice(past2, MONTHLY_PRICE, 'monthly', 3),
    ]
  } else {
    invoices = [makeInvoice(now, amount, billingInterval, invoices.length + 1), ...invoices]
  }

  const trialEnds = startTrial ? new Date(now) : null
  if (startTrial) trialEnds.setDate(trialEnds.getDate() + 14)

  const sub = {
    plan: 'premium',
    status: startTrial ? SUBSCRIPTION_STATUS.TRIALING : SUBSCRIPTION_STATUS.ACTIVE,
    billingInterval,
    subscribedAt: existing.subscribedAt || now.toISOString(),
    billingAnchorDay: anchorDay,
    currentPeriodStart: toIsoDate(now),
    currentPeriodEnd: toIsoDate(periodEnd),
    nextBilling: toIsoDate(periodEnd),
    cancelAtPeriodEnd: false,
    canceledAt: null,
    cardLast4: String(cardLast4).replace(/\D/g, '').slice(-4) || '4242',
    paymentFailures: 0,
    lastPaymentFailedAt: null,
    gracePeriodEndsAt: null,
    scheduledChange: null,
    trialEndsAt: startTrial ? toIsoDate(trialEnds) : null,
    invoices,
  }
  saveTeacherSubscription(sub)
  return sub
}

/** Cancel at end of billing period — access retained until currentPeriodEnd. */
export const cancelAtPeriodEnd = () => {
  const sub = getTeacherSubscription()
  if (sub.plan !== 'premium') return sub
  const next = {
    ...sub,
    status: SUBSCRIPTION_STATUS.CANCELING,
    cancelAtPeriodEnd: true,
    scheduledChange: { type: 'downgrade', plan: 'free', effectiveDate: sub.currentPeriodEnd },
  }
  saveTeacherSubscription(next)
  return next
}

export const resumeSubscription = () => {
  const sub = getTeacherSubscription()
  if (sub.plan !== 'premium') return sub
  const next = {
    ...sub,
    status: SUBSCRIPTION_STATUS.ACTIVE,
    cancelAtPeriodEnd: false,
    canceledAt: null,
    scheduledChange: null,
  }
  saveTeacherSubscription(next)
  return next
}

/** Switch monthly ↔ annual with proration (demo calculation). */
export const calculateProration = (sub, newInterval) => {
  if (sub.plan !== 'premium' || !sub.currentPeriodEnd) {
    return { credit: 0, charge: getIntervalPrice(newInterval), dueToday: getIntervalPrice(newInterval) }
  }

  const now = new Date()
  const periodEnd = toDate(sub.currentPeriodEnd)
  const periodStart = toDate(sub.currentPeriodStart) || now
  const totalMs = periodEnd - periodStart
  const remainingMs = Math.max(0, periodEnd - now)
  const ratio = totalMs > 0 ? remainingMs / totalMs : 0

  const oldPrice = getIntervalPrice(sub.billingInterval)
  const newPrice = getIntervalPrice(newInterval)
  const credit = Math.round(oldPrice * ratio * 100) / 100
  const newCharge = Math.round(newPrice * ratio * 100) / 100
  const dueToday = Math.max(0, Math.round((newCharge - credit) * 100) / 100)

  return { credit, charge: newCharge, dueToday, newPrice, oldPrice }
}

export const changeBillingInterval = (newInterval) => {
  const sub = getTeacherSubscription()
  if (sub.plan !== 'premium') return sub

  const proration = calculateProration(sub, newInterval)
  const now = new Date()
  const months = newInterval === 'annual' ? 12 : 1
  const periodEnd = addMonths(now, months)

  const next = {
    ...sub,
    billingInterval: newInterval,
    status: SUBSCRIPTION_STATUS.ACTIVE,
    currentPeriodStart: toIsoDate(now),
    currentPeriodEnd: toIsoDate(periodEnd),
    nextBilling: toIsoDate(periodEnd),
    invoices: [
      makeInvoice(now, proration.dueToday, newInterval, (sub.invoices?.length || 0) + 1),
      ...(sub.invoices || []),
    ],
  }
  saveTeacherSubscription(next)
  return next
}

/** Dunning: simulate failed payment (demo). */
export const simulatePaymentFailure = () => {
  const sub = getTeacherSubscription()
  if (sub.plan !== 'premium') return sub
  const now = new Date()
  const grace = new Date(now)
  grace.setDate(grace.getDate() + 7)
  const next = {
    ...sub,
    status: SUBSCRIPTION_STATUS.PAST_DUE,
    paymentFailures: (sub.paymentFailures || 0) + 1,
    lastPaymentFailedAt: now.toISOString(),
    gracePeriodEndsAt: toIsoDate(grace),
  }
  saveTeacherSubscription(next)
  return next
}

export const resolvePaymentFailure = (cardLast4) => {
  const sub = getTeacherSubscription()
  const next = {
    ...sub,
    status: sub.cancelAtPeriodEnd ? SUBSCRIPTION_STATUS.CANCELING : SUBSCRIPTION_STATUS.ACTIVE,
    paymentFailures: 0,
    lastPaymentFailedAt: null,
    gracePeriodEndsAt: null,
    cardLast4: cardLast4 ? String(cardLast4).replace(/\D/g, '').slice(-4) : sub.cardLast4,
  }
  saveTeacherSubscription(next)
  return next
}

export const getStatusLabel = (sub) => {
  if (sub.plan === 'free') return 'Free plan'
  switch (sub.status) {
    case SUBSCRIPTION_STATUS.TRIALING:
      return 'Free trial'
    case SUBSCRIPTION_STATUS.PAST_DUE:
      return 'Payment issue'
    case SUBSCRIPTION_STATUS.CANCELING:
      return 'Canceling at period end'
    case SUBSCRIPTION_STATUS.CANCELED:
      return 'Canceled'
    default:
      return 'Active'
  }
}

export const formatBillingDate = (iso) => {
  if (!iso) return '—'
  return toDate(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const downloadInvoice = (invoice, companyName = 'Rok Kru Platform') => {
  const lines = [
    `${companyName.toUpperCase()} — TAX INVOICE / RECEIPT`,
    '================================',
    `Invoice ID: ${invoice.id}`,
    `Issue date: ${invoice.date}`,
    `Status: ${(invoice.status || 'paid').toUpperCase()}`,
    '',
    `Bill to: Teacher account`,
    `Description: ${invoice.description}`,
    `Service period: ${invoice.periodStart} → ${invoice.periodEnd}`,
    invoice.billingInterval ? `Billing cycle: ${invoice.billingInterval}` : '',
    '',
    `Amount: $${Number(invoice.amount).toFixed(2)} USD`,
    '',
    'Payment processed securely. For billing questions: billing@rokkru.com',
    'Rok Kru · Phnom Penh, Cambodia',
  ].filter(Boolean)
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${invoice.id}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
