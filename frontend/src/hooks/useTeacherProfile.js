// ================ Start useTeacherProfile ================
// ? Teacher detail page — GET /mentors/:userId → mapMentorToTeacher
// ? Without VITE_API_URL uses mockTeachers

import { useState, useEffect } from 'react'
import { isApiEnabled } from '@/constants/env'
import { fetchMentorById } from '@/services/mentorsApi'
import { mapMentorToTeacher } from '@/utils/mentorMapper'
import { teachers as mockTeachers } from '@/constants/mockData'

export const useTeacherProfile = (teacherId) => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!teacherId) return

    if (!isApiEnabled()) {
      setProfile(mockTeachers.find((t) => String(t.id) === String(teacherId)) ?? null)
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
