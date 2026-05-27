import { useState } from 'react'
import { Camera, Save, Plus, X, DollarSign, Clock, Globe, BookOpen } from 'lucide-react'
import { Input } from '../../components'
import { Button } from '../../components'
import { Badge } from '../../components'
import { PageScaffold, PageCard, TabBar, PageAmbient } from '../../components'
import { cn } from '../../lib/utils'

const tabs = ['Personal Info', 'Teaching', 'Availability', 'Pricing', 'Preview']

const ProfileSetting = () => {
  const [activeTab, setActiveTab] = useState('Personal Info')
  const [subjects, setSubjects] = useState(['Data Science', 'Machine Learning', 'Python'])
  const [newSubject, setNewSubject] = useState('')
  const [availability, setAvailability] = useState(['Mon', 'Wed', 'Fri'])

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects((prev) => [...prev, newSubject.trim()])
      setNewSubject('')
    }
  }

  const toggleDay = (d) =>
    setAvailability((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d])

  return (
    <PageAmbient variant="teacher" className="space-y-6">
      <div className="max-w-4xl mx-auto w-full page-shell">
      <PageScaffold
        title="Teacher Profile Settings"
        subtitle="Keep your profile up to date to attract more students"
      >
        <PageCard className="p-0 overflow-hidden">
        <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} className="rounded-none border-b border-slate-100" />

        <div className="p-6">
          {activeTab === 'Personal Info' && (
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sky-400 to-primary-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    PS
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors shadow-md">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Profile Photo</p>
                  <p className="text-xs text-slate-400 mt-1">JPG, PNG or WebP. Max 5MB. Recommended 400×400px</p>
                  <Button variant="outline" size="sm" className="mt-2">Upload Photo</Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="First Name" defaultValue="Phe" />
                <Input label="Last Name" defaultValue="Sophy" />
                <Input label="Email" type="email" defaultValue="phe.sophy@example.com" />
                <Input label="Phone" type="tel" defaultValue="+855 12 345 678" />
                <Input label="Location" defaultValue="Siem Reap, Cambodia" />
                <Input label="Professional Title" defaultValue="Senior Professor of Data Science" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio / About</label>
                <textarea
                  rows={4}
                  defaultValue="Passionate data scientist with expertise in ML algorithms and big data analytics. Published researcher with 20+ academic papers."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent hover:border-slate-300 transition-all"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    <Globe className="w-4 h-4 inline mr-1.5 text-primary-500" />
                    Languages
                  </label>
                  <Input defaultValue="Khmer, English" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    <BookOpen className="w-4 h-4 inline mr-1.5 text-primary-500" />
                    Highest Credential
                  </label>
                  <Input defaultValue="PhD in Data Science" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Teaching' && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subjects You Teach</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {subjects.map((s) => (
                    <Badge key={s} variant="primary" className="gap-1.5 pr-1.5">
                      {s}
                      <button
                        onClick={() => setSubjects((prev) => prev.filter((x) => x !== s))}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a subject..."
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                  />
                  <Button variant="outline" size="md" onClick={addSubject}>
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Teaching Style</label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {['Interactive', 'Project-based', 'Lecture', 'Socratic', 'Flipped Classroom', 'Hybrid'].map((style) => (
                    <label key={style} className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-primary-50 transition-colors">
                      <input type="checkbox" className="rounded text-primary-600" defaultChecked={['Interactive', 'Project-based'].includes(style)} />
                      <span className="text-sm text-slate-700">{style}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Input
                label="Years of Teaching Experience"
                type="number"
                defaultValue="8"
                leftIcon={<Clock className="w-4 h-4" />}
              />
            </div>
          )}

          {activeTab === 'Availability' && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Available Days</label>
                <div className="flex flex-wrap gap-2">
                  {days.map((d) => (
                    <button
                      key={d}
                      onClick={() => toggleDay(d)}
                      className={cn(
                        'w-14 h-14 rounded-2xl text-sm font-semibold transition-all',
                        availability.includes(d)
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-primary-100 hover:text-primary-700'
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Time</label>
                  <Input type="time" defaultValue="09:00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">End Time</label>
                  <Input type="time" defaultValue="18:00" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Session Duration</label>
                <div className="flex flex-wrap gap-2">
                  {['30 min', '45 min', '60 min', '90 min', '120 min'].map((d) => (
                    <button
                      key={d}
                      className={cn(
                        'px-4 py-2 rounded-xl text-sm font-medium border transition-all',
                        d === '60 min'
                          ? 'bg-primary-500 text-white border-primary-400'
                          : 'border-slate-200 text-slate-600 hover:border-primary-200 hover:text-primary-600'
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Pricing' && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Hourly Rate (USD)" type="number" defaultValue="55" leftIcon={<DollarSign className="w-4 h-4" />} />
                <Input label="Trial Session Rate (USD)" type="number" defaultValue="25" leftIcon={<DollarSign className="w-4 h-4" />} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Package Offers</label>
                <div className="space-y-3">
                  {[
                    { sessions: 5, discount: '10%', price: '$247.50' },
                    { sessions: 10, discount: '20%', price: '$440' },
                    { sessions: 20, discount: '30%', price: '$770' },
                  ].map((pkg) => (
                    <div key={pkg.sessions} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{pkg.sessions} Sessions Package</p>
                        <p className="text-xs text-slate-400 mt-0.5">{pkg.discount} discount applied</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary-600">{pkg.price}</p>
                        <Badge variant="success" size="sm">{pkg.discount} off</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Preview' && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-slate-500">This is how students will see your profile</p>
              <div className="w-full max-w-md bg-gradient-to-br from-slate-50 to-primary-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-primary-500 flex items-center justify-center text-xl font-bold text-white">
                    PS
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Dr. Phe Sophy</h3>
                    <p className="text-sm text-slate-500">Senior Professor of Data Science</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-xs">★</span>
                      ))}
                      <span className="text-xs text-slate-400 ml-1">4.8 (256)</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {subjects.map((s) => <Badge key={s} variant="primary" size="sm">{s}</Badge>)}
                </div>
                <Button variant="secondary" size="sm" className="w-full">Book Session · $55/hr</Button>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center">
          <p className="text-xs text-slate-400">Changes are saved automatically</p>
          <Button variant="primary" size="md">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </PageCard>
      </PageScaffold>
      </div>
    </PageAmbient>
  )
}

export default ProfileSetting
