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
  if (!isApiEnabled()) throw new Error('Backend API is required for subscription data.')
  return apiRequest(ENDPOINTS.current)
}

export async function fetchPlans() {
  if (!isApiEnabled()) throw new Error('Backend API is required for subscription plans.')
  const json = await apiRequest(ENDPOINTS.plans)
  return Array.isArray(json) ? json : (json.data ?? [])
}

export async function subscribe(planData) {
  if (!isApiEnabled()) throw new Error('Backend API is required for subscription actions.')
  return apiRequest(ENDPOINTS.subscribe, {
    method: 'POST',
    body: JSON.stringify(planData),
  })
}

export async function cancelSubscription() {
  if (!isApiEnabled()) throw new Error('Backend API is required for subscription actions.')
  return apiRequest(ENDPOINTS.cancel, { method: 'POST' })
}

export async function resumeSubscription() {
  if (!isApiEnabled()) throw new Error('Backend API is required for subscription actions.')
  return apiRequest(ENDPOINTS.resume, { method: 'POST' })
}

export async function changeSubscriptionPlan(planData) {
  if (!isApiEnabled()) throw new Error('Backend API is required for subscription actions.')
  return apiRequest(ENDPOINTS.changePlan, {
    method: 'POST',
    body: JSON.stringify(planData),
  })
}
