import { useState, useEffect } from 'react'

export const useTeacherDashboard = () => {
  const [data, setData] = useState({ upcomingSessions: [], recentReviews: [], stats: {} })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setData({ upcomingSessions: [], recentReviews: [], stats: { students: 0, sessions: 0 } })
      setLoading(false)
    }, 300)
  }, [])

  return { ...data, loading }
}

export default useTeacherDashboard
