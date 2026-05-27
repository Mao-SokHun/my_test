import { useState, useEffect, useRef } from 'react'
import { fetchTeachers } from '@/services/teacherService'

/**
 * Fetches teacher list from API (or mock fallback).
 * Backend team: this calls GET /teachers with query params from filters.
 * Expected response: { data: Teacher[], total: number, page?, pageSize? }
 */
export function useTeachers(filters = {}) {
  const [teachers, setTeachers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchTeachers(filters)
      .then((result) => {
        if (cancelled) return
        setTeachers(result.items)
        setTotal(result.total)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err)
        setTeachers([])
        setTotal(0)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [
    filters.major,
    filters.subject,
    filters.location,
    filters.sort,
    filters.type,
    filters.time,
    filters.page,
    filters.pageSize,
  ])

  return { teachers, total, loading, error }
}

export default useTeachers
