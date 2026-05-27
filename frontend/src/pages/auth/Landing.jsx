import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import { PublicNavbar, AppFooter, TeacherRowCard, AnimatedBackground } from '@/components'
import { useTranslation } from '@/i18n'
import { teachers } from '@/constants/mockData'

const Landing = () => {
  const { t } = useTranslation()
  const features = t('landing.features')
  const featureList = Array.isArray(features) ? features : []

  const stats = [
    { value: '12,000+', label: t('landing.statStudents') },
    { value: '800+', label: t('landing.statTeachers') },
    { value: '50+', label: t('landing.statSubjects') },
    { value: '4.9★', label: t('landing.statRating') },
  ]

  return (
    <div className="min-h-screen flex flex-col glass-ios-26-shell">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl" />
          <AnimatedBackground variant="landing" intensity="normal" style="both" className="absolute inset-0" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary-300 uppercase tracking-widest mb-3">
              {t('landing.eyebrow')}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              {t('landing.heroLine1')}{' '}
              <span className="text-white">{t('landing.heroLine2')}</span>
              <br />
              <span className="text-primary-300">{t('landing.heroBrand')}</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              {t('landing.heroDesc')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/create-account">
                <Button size="lg" className="bg-gradient-to-r from-primary-300 to-primary-400 hover:from-primary-500 hover:to-primary-500 border-0 shadow-xl">
                  {t('landing.ctaLearn')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/create-account?role=teacher">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-white/5">
                  {t('landing.ctaTeach')}
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {['Alex', 'Sokha', 'Bopha', 'Dara'].map((name) => (
                  <Avatar key={name} name={name} size="xs" className="ring-2 ring-slate-800" />
                ))}
              </div>
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white">12,000+</span> {t('landing.studentsLearning')}
              </p>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="teachers" className="relative py-20 overflow-hidden">
        <AnimatedBackground variant="community" intensity="soft" style="both" className="absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold text-on-glass mb-2">{t('landing.teachersTitle')}</h2>
              <p className="text-on-glass-muted">{t('landing.teachersSubtitle')}</p>
            </div>
            <Link to="/create-account">
              <Button variant="outline" size="md">
                {t('landing.viewAllTeachers')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {teachers.slice(0, 4).map((teacher) => (
              <TeacherRowCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <AnimatedBackground variant="cta" intensity="soft" style="both" className="absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4">{t('landing.ctaTitle')}</h2>
          <p className="text-primary-100 text-lg mb-8">{t('landing.ctaSubtitle')}</p>
          <Link to="/create-account">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50 border-0 shadow-xl font-bold">
              {t('landing.ctaButton')}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-100">
            {featureList.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary-200 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppFooter variant="full" className="mt-0" />
    </div>
  )
}

export default Landing
