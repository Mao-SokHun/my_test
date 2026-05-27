import { useState, useCallback } from 'react'
import { DEFAULT_TEACHER_FILTERS } from '@/constants/teacherFilters'

/**
 * Manages teacher search/filter state.
 * Backend team: filters map 1-to-1 with query params sent to GET /teachers
 */
export function useTeacherFilters(initialFilters = DEFAULT_TEACHER_FILTERS) {
  const [filters, setFilters] = useState(initialFilters)

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => {
    setFilters(DEFAULT_TEACHER_FILTERS)
  }, [])

  return { filters, setFilter, setFilters, reset }
}

export default useTeacherFilters
