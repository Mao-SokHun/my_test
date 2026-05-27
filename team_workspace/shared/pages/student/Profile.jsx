import { Link } from 'react-router-dom'
import { Edit3, MapPin, GraduationCap, Mail, Phone, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks'
import { PageScaffold, PageCard, PageAmbient } from '@/components'
import { useTranslation } from '@/i18n'
import Avatar from '../../components/ui/Avatar'

const Profile = () => {
  const { user, logout } = useAuth()
  const { t, labelFor } = useTranslation()
  const displayName = user?.name || t('auth.student')
  const firstName = displayName.split(' ')[0]
  const studentId = user?.id?.toString().padStart(5, '0') || '10001'
  const grade = 'Grade 10'
  const location = 'Phnom Penh'

  return (
    <PageAmbient variant="ambient">
      <PageScaffold
        title={t('profile.studentTitle')}
        subtitle={t('profile.studentSubtitle')}
        action={
          <Link
            to="/student/edit-profile"
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:border-primary-200 hover:text-primary-600 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            {t('settings.editProfile')}
          </Link>
        }
      >
        <div className="grid lg:grid-cols-3 gap-5">
          <PageCard className="flex flex-col items-center text-center gap-3">
            <Avatar name={displayName} size="xl" />
            <div>
              <h2 className="text-base font-bold text-slate-800">{displayName}</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('profile.studentId')}: {studentId}
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full pt-3 border-t border-slate-100 text-sm text-slate-600">
              <p className="flex items-center justify-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary-500" />
                {labelFor(grade)}
              </p>
              <p className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-primary-500" />
                {labelFor(location)}
              </p>
            </div>
          </PageCard>

          <div className="lg:col-span-2 space-y-4">
            <PageCard>
              <h3 className="font-bold text-slate-800 text-sm mb-4">{t('profile.contactDetails')}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{t('profile.email')}</p>
                    <p className="text-sm font-medium text-slate-700 truncate">{user?.email || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{t('profile.mobile')}</p>
                    <p className="text-sm font-medium text-slate-700">+855 12 345 678</p>
                  </div>
                </div>
              </div>
            </PageCard>

            <PageCard>
              <h3 className="font-bold text-slate-800 text-sm mb-2">{t('profile.aboutMe')}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('profile.defaultBio', { name: firstName })}
              </p>
            </PageCard>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t('auth.logout')}
          </button>
        </div>
      </PageScaffold>
    </PageAmbient>
  )
}

export default Profile
