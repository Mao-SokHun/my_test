import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Users, Clock, Edit2, Check, X, ExternalLink } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import { PageCard, PageScaffold, ExperienceSection, ScheduleSection, PageAmbient } from '@/components'
import { useAuth } from '@/hooks'
import { useTeacherProfile } from '@/hooks/useTeacherProfile'
import { useMentorPortfolio } from '@/hooks/useMentorPortfolio'
import { useMentorSkills } from '@/hooks/useMentorSkills'
import { isApiEnabled } from '@/constants/env'

const MOCK_BIO = `A dedicated Physics educator with a passion for simplifying complex topics for high school students.`

const MOCK_SCHEDULE = [
  { id: 1, day: 'Monday', time: '8:00 – 8:45 AM', subject: 'Physics G11' },
]

const MOCK_EXPERIENCE = [
  { id: 1, role: 'Senior Physics Teacher', org: 'Global Science Academy', period: '2018–23' },
]

const SectionCard = ({ title, children, onEdit, onConfirm, onCancel, editing }) => (
  <PageCard padding={false} className="overflow-hidden">
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</h3>
      <div className="flex items-center gap-2">
        {!editing ? (
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Edit2 className="w-3 h-3" /> Edit
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onConfirm}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-400 text-white text-xs font-semibold hover:bg-primary-500 transition-colors"
            >
              <Check className="w-3.5 h-3.5" /> Confirm
            </button>
            <button
              type="button"
              onClick={onCancel}
              aria-label="Cancel"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
    <div className="p-5">{children}</div>
  </PageCard>
)

const TeacherMyProfile = () => {
  const { user } = useAuth()
  const userId = user?.user_id ?? user?.id
  const { profile, loading } = useTeacherProfile(null, { currentUser: true })
  const { items: portfolio } = useMentorPortfolio(userId)
  const { skills } = useMentorSkills(userId)

  const [bioEditing, setBioEditing] = useState(false)
  const [bioText, setBioText] = useState(MOCK_BIO)
  const [bioTemp, setBioTemp] = useState(MOCK_BIO)
  const [schedule, setSchedule] = useState(MOCK_SCHEDULE)
  const [experience, setExperience] = useState(MOCK_EXPERIENCE)

  const displayName = profile?.name || user?.name || 'Teacher'
  const displayBio = profile?.bio || (isApiEnabled() ? '' : MOCK_BIO)

  const confirmBio = () => {
    setBioText(bioTemp)
    setBioEditing(false)
  }

  return (
    <PageAmbient variant="teacher" className="space-y-6">
      <PageScaffold
        title="My Profile"
        subtitle="Public view — how students see your teaching profile"
        action={
          <Link
            to="/teacher/edit-profile"
            className="px-4 py-2 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500"
          >
            Edit profile
          </Link>
        }
      >
        {loading && isApiEnabled() ? (
          <p className="text-sm text-slate-500">Loading profile…</p>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <Avatar name={displayName} size="xl" />
              <div className="flex-1">
                <h1 className="text-xl font-bold text-slate-800">{displayName}</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  {profile?.subjects?.join(' · ') || 'Mentor'}
                  {profile?.experience ? ` · ${profile.experience}+ yrs` : ''}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <Star className="w-4 h-4 text-slate-200" />
                  <span className="text-xs text-slate-400 ml-1">
                    {profile?.rating ?? 4.5} · {profile?.reviewCount ?? 0} reviews
                  </span>
                </div>
                <div className="flex items-center gap-5 mt-3 text-xs text-slate-500 flex-wrap">
                  {profile?.location && (
                    <span className="text-slate-600">{profile.location}</span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary-500" />
                    <strong className="text-slate-800">{profile?.experience ?? 0} yrs</strong> experience
                  </span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-5 mt-6">
              <div className="lg:col-span-2 space-y-5">
                <SectionCard
                  title="Detail About Me"
                  editing={bioEditing}
                  onEdit={() => {
                    setBioTemp(displayBio || bioText)
                    setBioEditing(true)
                  }}
                  onConfirm={confirmBio}
                  onCancel={() => {
                    setBioTemp(bioText)
                    setBioEditing(false)
                  }}
                >
                  {bioEditing ? (
                    <textarea
                      value={bioTemp}
                      onChange={(e) => setBioTemp(e.target.value)}
                      rows={7}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                  ) : (
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {displayBio || bioText || 'Add your bio in Edit Profile.'}
                    </p>
                  )}
                </SectionCard>

                {isApiEnabled() && skills.length > 0 && (
                  <PageCard>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((ms) => (
                        <span
                          key={ms.ms_id}
                          className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-medium capitalize"
                        >
                          {ms.SubSkill?.skill_name || 'Skill'} · {ms.proficiency_level}
                        </span>
                      ))}
                    </div>
                  </PageCard>
                )}

                {isApiEnabled() && portfolio.length > 0 && (
                  <PageCard>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Portfolio</h3>
                    <ul className="space-y-2">
                      {portfolio.map((item) => (
                        <li key={item.link}>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
                          >
                            {item.link_tag}: {item.link}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </PageCard>
                )}

                <ExperienceSection experience={experience} onChange={setExperience} />
              </div>

              <div>
                <ScheduleSection schedule={schedule} onChange={setSchedule} />
              </div>
            </div>
          </>
        )}
      </PageScaffold>
    </PageAmbient>
  )
}

export default TeacherMyProfile
