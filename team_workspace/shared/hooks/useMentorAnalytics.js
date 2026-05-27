// ================ Start useMentorAnalytics ================
// ? Task #6 — GET /mentors/me/analytics (JWT + mentor profile required)
// ? Used in teacher/Analytics.jsx when VITE_API_URL is set

import { useState, useEffect, useCallback } from 'react'
import { isApiEnabled } from '@/constants/env'
import { fetchMyAnalytics } from '@/services/mentorsApi'

const MOCK_ANALYTICS = {
  profile_views: 0,
  portfolio_count: 0,
  skills_count: 0,
  posts_count: 0,
  published_posts_count: 0,
}

export function useMentorAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (isApiEnabled()) {
        setData(await fetchMyAnalytics())
      } else {
        setData(MOCK_ANALYTICS)
      }
    } catch (e) {
      setError(e.message || 'Failed to load analytics')
      setData(MOCK_ANALYTICS)
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
