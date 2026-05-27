// ================ Start API client ================
// ? Shared by mentorsApi.js — all mentor calls go through apiRequest
// ? Enable backend: VITE_API_URL=http://localhost:3000/api/v1

// ? true when .env has VITE_API_URL — teacherService uses real API vs mock
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

  // ? Task #10 — must match backend auth.js: Authorization: Bearer <jwt>
  const token = typeof window !== 'undefined' ? localStorage.getItem('rokkru_token') : null
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, { ...init, headers })

  if (!res.ok) {
    let body = {}
    let message = res.statusText
    try {
      body = await res.json()
      message = body.message ?? body.error ?? message // ? backend fail() uses "error"
    } catch { /* ignore */ }
    throw new ApiError(message, res.status, body)
  }

  if (res.status === 204) return null
  return res.json()
}

export { isApiEnabled, getApiBaseUrl, apiRequest, ApiError }
// ================ End API client ================
