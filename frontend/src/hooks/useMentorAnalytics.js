// ============= Start useMentorAnalytics =============
// Task #6 — GET /mentors/me/analytics
// Used in teacher/Analytics.jsx when VITE_API_URL is set
// ................................................

import { useState, useEffect, useCallback } from 'react'
import { isApiEnabled } from '@/constants/env'
import { fetchMyAnalytics } from '@/services/mentorsApi'

export function useMentorAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (!isApiEnabled()) throw new Error('Backend API is required to load analytics.')
      setData(await fetchMyAnalytics())
    } catch (loadError) {
      setError(loadError.message || 'Failed to load analytics')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, reload: load }
}

export default useMentorAnalytics

// ============= End useMentorAnalytics =============
