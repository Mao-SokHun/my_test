import { apiRequest, isApiEnabled } from './api'

const ENDPOINTS = {
  current: '/subscriptions/current',
  plans: '/subscriptions/plans',
  subscribe: '/subscriptions',
  cancel: '/subscriptions/cancel',
  resume: '/subscriptions/resume',
  changePlan: '/subscriptions/change-plan',
}

export async function fetchCurrentSubscription() {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.current)
  }
  return null
}

export async function fetchPlans() {
  if (isApiEnabled()) {
    const json = await apiRequest(ENDPOINTS.plans)
    return Array.isArray(json) ? json : (json.data ?? [])
  }
  return [
    { id: 'free', name: 'Free', price: 0 },
    { id: 'premium', name: 'Premium', price: 29 },
  ]
}

export async function subscribe(planData) {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.subscribe, {
      method: 'POST',
      body: JSON.stringify(planData),
    })
  }
  return { plan: planData.plan, status: 'active' }
}

export async function cancelSubscription() {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.cancel, { method: 'POST' })
  }
  return { status: 'canceling' }
}

export async function resumeSubscription() {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.resume, { method: 'POST' })
  }
  return { status: 'active' }
}
