import { useMemo } from 'react'
import { useTranslation } from './LanguageProvider.jsx'
import kmTeacherProfiles from './kmTeacherProfiles'

export function useTeacherDisplay(teacher) {
  const { lang, labelFor, t } = useTranslation()

  return useMemo(() => {
    if (!teacher) return null

    const id = String(teacher.id ?? '')
    const kmProfile = lang === 'km' ? kmTeacherProfiles[id] : null

    return {
      title: kmProfile?.title ?? teacher.title ?? '',
      bio:
        lang === 'km'
          ? kmProfile?.bio ?? t('teacherCard.defaultBio')
          : teacher.bio ?? '',
      major: teacher.major ? labelFor(teacher.major) : '',
      location: teacher.location ? labelFor(teacher.location) : '',
      subjects: (teacher.subjects ?? []).map((s) => labelFor(s)),
      experienceLabel: t('teacherCard.yearsExp', { count: teacher.experience ?? 0 }),
    }
  }, [teacher, lang, labelFor, t])
}
