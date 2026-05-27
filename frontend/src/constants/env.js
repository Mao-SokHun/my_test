/** @returns {boolean} True when frontend should call the real backend */
export function isApiEnabled() {
  const url = import.meta.env.VITE_API_URL
  return typeof url === 'string' && url.trim().length > 0
}

export function getApiBaseUrl() {
  return (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
}
