// ================ Start useTeacherProfile ================
// ? Teacher detail page — GET /mentors/:userId → mapMentorToTeacher
// ? Requires backend API (no mock fallback in runtime)

import { useState, useEffect } from 'react'
import { isApiEnabled } from '@/constants/env'
import { fetchMentorById } from '@/services/mentorsApi'
import { mapMentorToTeacher } from '@/utils/mentorMapper'

export const useTeacherProfile = (teacherId) => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!teacherId) return

    if (!isApiEnabled()) {
      setError(new Error('Backend API is required to fetch teacher profile.'))
      setProfile(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchMentorById(teacherId)
      .then((mentor) => {
        if (!cancelled) setProfile(mapMentorToTeacher(mentor))
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e)
          setProfile(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [teacherId])

  return { profile, loading, error, setProfile }
}

export default useTeacherProfile
