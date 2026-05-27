import clsx from 'clsx'
import EmptyState from '@/components/ui/EmptyState'
import TeacherCard from './TeacherCard'
import { useTranslation } from '@/i18n'

const TeacherList = ({
  teachers = [],
  loading = false,
  variant = 'list',
  emptyTitle,
  emptyDescription,
  className,
}) => {
  const { t } = useTranslation()
  const resolvedTitle = emptyTitle ?? t('filters.noTeachers')
  const resolvedDesc = emptyDescription ?? t('filters.noTeachersHint')
  if (loading) {
    return (
      <div className={clsx('grid gap-4', variant === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : '', className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-panel p-5 rounded-2xl animate-pulse h-40" />
        ))}
      </div>
    )
  }

  if (!teachers.length) {
    return <EmptyState title={resolvedTitle} description={resolvedDesc} />
  }

  return (
    <div className={clsx('grid gap-4', variant === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : '', className)}>
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  )
}

export default TeacherList
