import { Search } from 'lucide-react'
import clsx from 'clsx'
import FilterBar from '@/components/common/FilterBar'
import Button from '@/components/ui/Button'
import { useTranslation } from '@/i18n'
import { useLocalizedFilterOptions } from '@/lib/localizeOptions'

/**
 * Teacher search filter panel.
 * Backend team: each filter maps to a query param on GET /teachers
 *   - major     → ?major=Computer+Science
 *   - subject   → ?subject=React+JS
 *   - location  → ?location=Phnom+Penh
 *   - sort      → ?sort=Highest+Rated
 *   - type      → ?type=Private
 *   - time      → ?time=08:00–10:00
 */
const SearchFilter = ({
  filters = {},
  onFilterChange,
  onReset,
  variant = 'home',
  embedded = false,
  showSearchButton = false,
  onSearch,
  className,
}) => {
  const { t } = useTranslation()
  const opts = useLocalizedFilterOptions()

  const baseFields = [
    { id: 'major', label: t('filters.major'), value: filters.major, options: opts.majors, onChange: (v) => onFilterChange('major', v) },
    { id: 'subject', label: t('filters.subject'), value: filters.subject, options: opts.subjects, onChange: (v) => onFilterChange('subject', v) },
    { id: 'location', label: t('filters.location'), value: filters.location, options: opts.locations, onChange: (v) => onFilterChange('location', v) },
    { id: 'sort', label: t('filters.sortBy'), value: filters.sort, options: opts.sorts, onChange: (v) => onFilterChange('sort', v) },
  ]

  const extendedFields = [
    ...baseFields,
    { id: 'type', label: t('filters.sessionType'), value: filters.type, options: opts.types, onChange: (v) => onFilterChange('type', v) },
    { id: 'time', label: t('filters.time'), value: filters.time, options: opts.times, onChange: (v) => onFilterChange('time', v) },
  ]

  const fields = variant === 'schedule' ? extendedFields : baseFields

  return (
    <div className={clsx(!embedded && 'glass-panel p-5 sm:p-6', className)}>
      <FilterBar fields={fields} onReset={onReset}>
        {showSearchButton && (
          <Button size="sm" onClick={onSearch} className="ml-auto">
            <Search className="w-4 h-4 mr-1.5" />
            {t('filters.search')}
          </Button>
        )}
      </FilterBar>
    </div>
  )
}

export default SearchFilter
