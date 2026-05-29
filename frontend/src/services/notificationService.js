import { apiRequest, isApiEnabled } from './api'

const ENDPOINTS = {
  list: '/notifications',
  byId: (id) => `/notifications/${id}`,
  markRead: (id) => `/notifications/${id}/read`,
}

export async function fetchNotifications() {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch notifications.')
  const json = await apiRequest(ENDPOINTS.list)
  return Array.isArray(json) ? json : (json.data ?? [])
}

export async function markNotificationRead(id) {
  if (!isApiEnabled()) throw new Error('Backend API is required to update notification status.')
  return apiRequest(ENDPOINTS.markRead(id), { method: 'PUT' })
}

export async function markAllNotificationsRead() {
  if (!isApiEnabled()) throw new Error('Backend API is required to update notification status.')
  return apiRequest('/notifications/read-all', { method: 'PUT' })
}
