import { useState, useEffect, useCallback } from 'react'
import { fetchCurrentSubscription } from '@/services/subscriptionService'

export const useTeacherSubscription = () => {
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(() => {
    setLoading(true)
    setError('')
    fetchCurrentSubscription()
      .then((data) => {
        setSubscription(data?.data ?? data ?? null)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load subscription')
        setSubscription(null)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return {
    subscription,
    isPremium: subscription?.plan === 'premium',
    hasSubscription: subscription?.plan === 'premium',
    loading,
    error,
    refresh,
    setSubscription,
  }
}

export default useTeacherSubscription
