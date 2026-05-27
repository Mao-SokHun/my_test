function isApiEnabled() {
  const url = import.meta.env.VITE_API_URL
  return typeof url === 'string' && url.trim().length > 0
}

function getApiBaseUrl() {
  return (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
}

class ApiError extends Error {
  constructor(message, status, body) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

async function apiRequest(path, init = {}) {
  const base = getApiBaseUrl()
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`

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
    let body = {}
    let message = res.statusText
    try {
      body = await res.json()
      message = body.message ?? body.error ?? message
    } catch { /* ignore */ }
    throw new ApiError(message, res.status, body)
  }

  if (res.status === 204) return null
  return res.json()
}

export { isApiEnabled, getApiBaseUrl, apiRequest, ApiError }
