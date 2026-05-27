import { useState, useMemo } from 'react'
import { PageAmbient, PageSection, PaginationBar } from '@/components/common'
import { SearchFilter, TeacherList } from '@/components/common'
import { useTeacherFilters, useTeachers } from '@/hooks'
import { useTranslation } from '@/i18n'

const PAGE_SIZE = 12

const Schedule = () => {
  const { t } = useTranslation()
  const { filters, setFilter, reset } = useTeacherFilters()
  const [page, setPage] = useState(1)

  const listFilters = useMemo(
    () => ({ ...filters, page: 1, pageSize: 9999 }),
    [
      filters.major,
      filters.subject,
      filters.location,
      filters.sort,
      filters.type,
      filters.time,
    ]
  )
  const { teachers: allTeachers, total, loading } = useTeachers(listFilters)

  const paged = allTeachers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleReset = () => {
    reset()
    setPage(1)
  }

  const handleFilterChange = (key, value) => {
    setFilter(key, value)
    setPage(1)
  }

  return (
    <PageAmbient variant="schedule" className="space-y-12 sm:space-y-14">
      <SearchFilter
        variant="schedule"
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        showSearchButton
        onSearch={() => setPage(1)}
      />

      <PageSection
        className="pt-2 sm:pt-4"
        title={t('filters.findTeachers')}
        subtitle={t('filters.teachersAvailable', { count: total })}
      >
        <TeacherList teachers={paged} variant="grid" loading={loading} />
      </PageSection>

      <PaginationBar page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
    </PageAmbient>
  )
}

export default Schedule
