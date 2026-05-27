import { useState, useEffect } from 'react'

export const useTeacherProfile = (teacherId) => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!teacherId) return
    setLoading(true)
    setTimeout(() => { setProfile(null); setLoading(false) }, 300)
  }, [teacherId])

  return { profile, loading, setProfile }
}

export default useTeacherProfile
