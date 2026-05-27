import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { PageAmbient, PageSection } from '@/components/common'
import { WelcomeBanner } from '@/components'
import { SearchFilter, TeacherList } from '@/components/common'
import { useTeacherFilters, useTeachers } from '@/hooks'
import { useTranslation } from '@/i18n'
import { TEXT } from '@/constants/typography'

const Home = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] || t('auth.student')
  const { filters, setFilter, reset } = useTeacherFilters()
  const { teachers, total, loading } = useTeachers(filters)

  return (
    <PageAmbient variant="home" className="space-y-14 sm:space-y-16">
      <section className="glass-panel overflow-visible">
        <div className="p-4 sm:p-5 pb-0">
          <WelcomeBanner
            title={t('student.hello', { name: firstName })}
            subtitle={t('student.homeSubtitle')}
          />
        </div>

        <div className="p-4 sm:p-5 pt-6 sm:pt-7 pb-5 sm:pb-6">
          <SearchFilter
            variant="home"
            embedded
            filters={filters}
            onFilterChange={setFilter}
            onReset={reset}
          />
        </div>
      </section>

      <PageSection
        className="pt-2 sm:pt-4"
        title={t('student.topTeachers')}
        subtitle={t('student.topTeachersSubtitle', { count: total })}
      >
        <TeacherList
          teachers={teachers}
          loading={loading}
          emptyDescription={t('student.emptyHint')}
        />
      </PageSection>

      <div className="text-center pt-2">
        <Link to="/schedule" className={TEXT.link}>
          {t('student.browseSchedule')}
        </Link>
      </div>
    </PageAmbient>
  )
}

export default Home
