import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { getTeacherSubscription, hasPremiumAccess } from '../utils/teacherSubscription'

/** Keeps billing/subscription UI in sync with localStorage. */
export const useTeacherSubscription = () => {
  const location = useLocation()
  const [subscription, setSubscription] = useState(getTeacherSubscription)

  const refresh = useCallback(() => {
    setSubscription(getTeacherSubscription())
  }, [])

  useEffect(() => {
    refresh()
  }, [location.pathname, refresh])

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'rokkru_teacher_subscription') refresh()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [refresh])

  return {
    subscription,
    isPremium: hasPremiumAccess(subscription),
    hasSubscription: subscription.plan === 'premium',
    refresh,
    setSubscription,
  }
}

export default useTeacherSubscription
