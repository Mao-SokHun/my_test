/**
 * HTTP API layer — import from `@/api` or `@/api/teachers`.
 * Mock fallback when `VITE_API_URL` is unset (see `config/env.js`).
 */

export { apiRequest } from './client'
export { ApiError } from './errors'
export { ENDPOINTS } from './endpoints'

export * from './auth'
export * from './teachers'
export * from './communities'
export * from './sessions'
export * from './users'
export * from './admin'
