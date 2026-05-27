import { getApiBaseUrl } from '@/constants/env'
import { ApiError } from './errors'

/**
 * @param {string} path — e.g. `/teachers`
 * @param {RequestInit} [init]
 */
export async function apiRequest(path, init = {}) {
  const base = getApiBaseUrl()
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`

  /** @type {Record<string, string>} */
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(init.headers && typeof init.headers === 'object' && !(init.headers instanceof Headers)
      ? init.headers
      : {}),
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('rokkru_token') : null
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, { ...init, headers })

  if (!res.ok) {
    /** @type {import('./errors').ApiErrorBody} */
    let body = {}
    let message = res.statusText
    try {
      body = await res.json()
      message = body.message ?? body.error ?? message
    } catch {
      /* ignore */
    }
    throw new ApiError(message, res.status, body)
  }

  if (res.status === 204) return null
  return res.json()
}
