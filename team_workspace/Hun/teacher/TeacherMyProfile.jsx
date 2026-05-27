import { useState } from 'react'
import { Star, Users, Clock, Edit2, Check, X } from 'lucide-react'
import { Avatar } from '../../components'
import { PageCard, PageScaffold, ExperienceSection, ScheduleSection, PageAmbient } from '../../components'

const MOCK_BIO = `A dedicated Physics educator with a passion for simplifying complex quantum mechanics and thermodynamics for high school students. Over the past 8 years, I have developed a unique teaching methodology that blends theoretical physics with hands-on experiments to guide students to better understand how the world works.

Formerly at Lead Researcher, Volunteer at Global Field Corp. I have also practiced in the how to manually type equations for all students who are intrinsic, analytical, and highly committed to your specific career goal.`

const MOCK_SCHEDULE = [
  { id: 1, day: 'Monday', time: '8:00 – 8:45 AM', subject: 'Physics G11' },
  { id: 2, day: 'Monday', time: '10:00 – 10:45 AM', subject: 'Math G12' },
  { id: 3, day: 'Wednesday', time: '8:00 – 8:45 AM', subject: 'Physics G12' },
  { id: 4, day: 'Friday', time: '2:00 – 2:45 PM', subject: 'Lab Session' },
]

const MOCK_EXPERIENCE = [
  { id: 1, role: 'Senior Physics Teacher', org: 'Global Science Academy, Phnom Penh', period: '2018–23' },
  { id: 2, role: 'Research Associate', org: 'Institute of Technology Solvation', period: '2015–18' },
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
  const [bioEditing, setBioEditing] = useState(false)
  const [bioText, setBioText] = useState(MOCK_BIO)
  const [bioTemp, setBioTemp] = useState(MOCK_BIO)
  const [schedule, setSchedule] = useState(MOCK_SCHEDULE)
  const [experience, setExperience] = useState(MOCK_EXPERIENCE)

  const confirmBio = () => {
    setBioText(bioTemp)
    setBioEditing(false)
  }

  return (
    <PageAmbient variant="teacher" className="space-y-6">
      <PageScaffold
        title="My Profile"
        subtitle="Public view — how students see your teaching profile"
      >
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Avatar name="Phe Sophy" size="xl" />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-800">Phe Sophy</h1>
            <p className="text-sm text-slate-500 mt-0.5">Physics Specialist of Data Science &amp; AI</p>
            <div className="flex items-center gap-1.5 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <Star className="w-4 h-4 text-slate-200" />
              <span className="text-xs text-slate-400 ml-1">4.5 · 128 reviews</span>
            </div>
            <div className="flex items-center gap-5 mt-3 text-xs text-slate-500 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-primary-500" />
                Group Session: <strong className="text-slate-800 ml-0.5">24 Students</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary-500" />
                <strong className="text-slate-800">31 hrs</strong> taught
              </span>
              <span className="text-slate-800 font-semibold">$45/hr</span>
            </div>
          </div>
        </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <SectionCard
            title="Detail About Me"
            editing={bioEditing}
            onEdit={() => {
              setBioTemp(bioText)
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
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{bioText}</p>
            )}
          </SectionCard>

          <ExperienceSection experience={experience} onChange={setExperience} />
        </div>

        <div>
          <ScheduleSection schedule={schedule} onChange={setSchedule} />
        </div>
      </div>
      </PageScaffold>
    </PageAmbient>
  )
}

export default TeacherMyProfile
