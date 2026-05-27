import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Upload, Plus, X } from 'lucide-react'
import clsx from 'clsx'
import { PageScaffold, PageCard, TabBar, ExperienceSection, PageAmbient } from '@/components'
import Select from '../../components/ui/Select'

const GENDERS = ['Male', 'Female', 'Other']
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const MOCK_EXPERIENCE = [
  { id: 1, role: 'Senior Physics Teacher', org: 'Global Science Academy, Phnom Penh', period: '2018–23' },
  { id: 2, role: 'Research Associate', org: 'Institute of Technology Solvation', period: '2015–18' },
]

const EditProfile = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('detail')
  const [experience, setExperience] = useState(MOCK_EXPERIENCE)
  const [gender, setGender] = useState('Male')
  const [schedule, setSchedule] = useState([
    { id: 1, day: 'Monday', time: '8:00 – 8:45 AM', subject: 'Physics G11' },
    { id: 2, day: 'Wednesday', time: '10:00 – 10:45 AM', subject: 'Math G12' },
    { id: 3, day: 'Friday', time: '2:00 – 2:45 PM', subject: 'Lab Session' },
  ])
  const [form, setForm] = useState({
    firstName: 'Phe',
    lastName: 'Sophy',
    username: 'phe.sophy',
    phone: '+855 12 345 678',
    province: '',
    city: '',
    portFolio: '',
    bio: 'A dedicated Physics educator with a passion for simplifying complex mathematical and mechanics topics for high school students.',
    primarySubject: 'Physics',
    educationPricing: '$45/hr',
  })

  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }))

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent transition-all'

  const labelClass = 'block text-xs font-semibold text-slate-600 mb-1.5'

  const saveActions = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="px-4 py-2 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors"
      >
        Cancel
      </button>
      <button
        type="button"
        className="px-4 py-2 rounded-xl bg-primary-400 text-white text-sm font-semibold hover:bg-primary-500 transition-colors"
      >
        Save Changes
      </button>
    </div>
  )

  return (
    <PageAmbient variant="teacher" className="space-y-6">
      <div className="max-w-6xl mx-auto w-full space-y-5">
      <PageScaffold
        title="Edit Profile"
        subtitle="Manage your public information and educational settings"
        action={saveActions}
      >
        <TabBar
          tabs={[
            { id: 'detail', label: 'DETAIL ABOUT YOU' },
            { id: 'schedule', label: 'SCHEDULE' },
          ]}
          active={tab}
          onChange={setTab}
        />

      {tab === 'detail' && (
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6 items-start">
          <div className="space-y-5 min-w-0">
          <PageCard>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Profile Photo</h2>
            <div className="flex items-center gap-5">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-200 to-primary-300 flex items-center justify-center text-xl font-bold text-white shadow">
                  PS
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-400 rounded-full flex items-center justify-center shadow hover:bg-primary-500"
                >
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload new photo
                </button>
                <p className="text-xs text-slate-400 mt-1.5">JPG, PNG or GIF · Max 5 MB</p>
                <button type="button" className="text-xs text-slate-400 hover:text-red-500 mt-1 transition-colors">
                  Remove photo
                </button>
              </div>
            </div>
          </PageCard>

          <PageCard className="space-y-5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  First name <span className="text-primary-500">*</span>
                </label>
                <input value={form.firstName} onChange={set('firstName')} placeholder="e.g. Phe" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>
                  Last name <span className="text-primary-500">*</span>
                </label>
                <input value={form.lastName} onChange={set('lastName')} placeholder="e.g. Sophy" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Username</label>
              <input value={form.username} onChange={set('username')} placeholder="Username ID" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <div className="flex items-center gap-5 flex-wrap">
                {GENDERS.map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setGender(g)}
                      onKeyDown={(e) => e.key === 'Enter' && setGender(g)}
                      className={clsx(
                        'w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all',
                        gender === g ? 'border-primary-300 bg-primary-400' : 'border-slate-300 bg-white'
                      )}
                    >
                      {gender === g && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm text-slate-700">{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone number</label>
                <input value={form.phone} onChange={set('phone')} placeholder="+855 00 000 000" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Province name</label>
                <input value={form.province} onChange={set('province')} placeholder="Province" className={inputClass} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City/District name</label>
                <input value={form.city} onChange={set('city')} placeholder="City / District" className={inputClass} />
              </div>
              <div>
                <Select
                  label="Province"
                  labelClassName={labelClass}
                  value={form.province || 'Select Province'}
                  onChange={(v) => setForm((prev) => ({ ...prev, province: v }))}
                  options={['Select Province', 'Phnom Penh', 'Siem Reap', 'Battambang', 'Kampong Cham', 'Sihanoukville']}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Portfolio</label>
              <input
                value={form.portFolio}
                onChange={set('portFolio')}
                placeholder="https://yourportfolio.com"
                className={inputClass}
              />
            </div>
          </PageCard>
          </div>

          <div className="space-y-5 min-w-0">
          <PageCard className="space-y-5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Professional Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Select
                  label={
                    <>
                      Primary Subject <span className="text-primary-500">*</span>
                    </>
                  }
                  labelClassName={labelClass}
                  value={form.primarySubject}
                  onChange={(v) => setForm((prev) => ({ ...prev, primarySubject: v }))}
                  options={['Physics', 'Mathematics', 'Data Science', 'Chemistry', 'Biology', 'History']}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Education/Pricing <span className="text-primary-500">*</span>
                </label>
                <input
                  value={form.educationPricing}
                  onChange={set('educationPricing')}
                  placeholder="$0/hr"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Professional Bio</label>
              <textarea
                rows={4}
                value={form.bio}
                onChange={set('bio')}
                className={inputClass + ' resize-none'}
                placeholder="Tell students about yourself..."
              />
              <p className="text-xs text-slate-400 mt-1">{form.bio.length}/500 characters</p>
            </div>
          </PageCard>

          <ExperienceSection experience={experience} onChange={setExperience} />
          </div>
        </div>
      )}

      {tab === 'schedule' && (
        <PageCard className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Availability</h2>
          <p className="text-sm text-slate-500">Add time slots students can book. Shown on your public profile.</p>
          <div className="space-y-3">
            {schedule.map((slot) => (
              <div
                key={slot.id}
                className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center p-3 bg-slate-50 rounded-xl border border-slate-100"
              >
                <Select
                  size="sm"
                  value={slot.day}
                  onChange={(v) =>
                    setSchedule((prev) =>
                      prev.map((s) => (s.id === slot.id ? { ...s, day: v } : s))
                    )
                  }
                  options={DAYS}
                />
                <input
                  value={slot.time}
                  onChange={(e) =>
                    setSchedule((prev) =>
                      prev.map((s) => (s.id === slot.id ? { ...s, time: e.target.value } : s))
                    )
                  }
                  className={inputClass + ' py-2'}
                  placeholder="8:00 – 8:45 AM"
                />
                <input
                  value={slot.subject}
                  onChange={(e) =>
                    setSchedule((prev) =>
                      prev.map((s) => (s.id === slot.id ? { ...s, subject: e.target.value } : s))
                    )
                  }
                  className={inputClass + ' py-2'}
                  placeholder="Subject"
                />
                <button
                  type="button"
                  onClick={() => setSchedule((prev) => prev.filter((s) => s.id !== slot.id))}
                  className="p-2 text-red-400 hover:text-red-600 justify-self-end"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setSchedule((prev) => [
                ...prev,
                { id: Date.now(), day: 'Monday', time: '9:00 – 9:45 AM', subject: '' },
              ])
            }
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-dashed border-primary-200 text-xs font-semibold text-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Time Slot
          </button>
        </PageCard>
      )}

      <div className="flex justify-end gap-3 pb-6">{saveActions}</div>
      </PageScaffold>
      </div>
    </PageAmbient>
  )
}

export default EditProfile
