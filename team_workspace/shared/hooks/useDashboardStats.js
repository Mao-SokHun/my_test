import { useState, useEffect } from 'react'

export const useDashboardStats = () => {
  const [stats, setStats] = useState({ students: 0, sessions: 0, rating: 0, revenue: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => { setStats({ students: 120, sessions: 45, rating: 4.8, revenue: 1250 }); setLoading(false) }, 300)
  }, [])

  return { stats, loading }
}

export default useDashboardStats
