import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Image, Smile, Link2, CheckCircle2, Users, ArrowLeft } from 'lucide-react'
import {
  PageScaffold,
  PageCard,
  PageAmbient,
} from '../../components'
import { Avatar } from '../../components'
import { Button } from '../../components'
import { cn } from '../../lib/utils'

const communities = [
  { id: 'g7j', name: 'Grade 7 Junior', short: 'G7', members: 120 },
  { id: 'g8j', name: 'Grade 8 Junior', short: 'G8', members: 98 },
  { id: 'g9j', name: 'Grade 9 Junior', short: 'G9', members: 145 },
  { id: 'g10s', name: 'Grade 10 Senior', short: 'G10', members: 210 },
  { id: 'g11s', name: 'Grade 11 Senior', short: 'G11', members: 187 },
  { id: 'g12s', name: 'Grade 12 Senior', short: 'G12', members: 165 },
]

const COMMUNITY_COLORS = [
  'from-primary-200 to-primary-400 text-primary-800',
  'from-sky-200 to-sky-400 text-sky-900',
  'from-emerald-200 to-emerald-400 text-emerald-900',
  'from-amber-200 to-amber-400 text-amber-900',
  'from-purple-200 to-purple-400 text-purple-900',
  'from-rose-200 to-rose-400 text-rose-900',
]

const StepBadge = ({ n, label, active, done }) => (
  <div
    className={cn(
      'flex items-center gap-2 text-xs font-semibold',
      active || done ? 'text-primary-700' : 'text-slate-500'
    )}
  >
    <span
      className={cn(
        'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold',
        done || active ? 'bg-primary-500 text-white' : 'bg-slate-200 text-slate-600'
      )}
    >
      {done && !active ? '✓' : n}
    </span>
    <span>{label}</span>
  </div>
)

const TeacherCreatePost = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState(null)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [hashtag, setHashtag] = useState('')

  const selectedCommunity = communities.find((c) => c.id === selected)
  const selectedIndex = communities.findIndex((c) => c.id === selected)

  const handleSelectCommunity = (id) => {
    setSelected(id)
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
    setDescription('')
    setLocation('')
    setHashtag('')
  }

  const handleShare = () => {
    navigate('/community')
  }

  return (
    <PageAmbient variant="teacher" className="space-y-6">
      <PageScaffold
        title="Create Post"
        subtitle={
          step === 1
            ? 'Choose the community you want to post to'
            : `Write your post for ${selectedCommunity?.name ?? 'your community'}`
        }
      >
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <StepBadge n={1} label="Community" active={step === 1} done={step > 1} />
          <div className={cn('h-px w-8 sm:w-12 flex-shrink-0', step > 1 ? 'bg-primary-300' : 'bg-slate-200')} />
          <StepBadge n={2} label="Post" active={step === 2} done={false} />
        </div>

        <div className="relative w-full min-h-[28rem]">
          {/* Step 1 — community only */}
          {step === 1 && (
            <PageCard className="w-full max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Choose community</h3>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                Select the grade group you want to post to.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {communities.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCommunity(c.id)}
                    className={cn(
                      'relative rounded-xl p-3.5 text-left border-2 transition-all duration-200',
                      'hover:shadow-md hover:-translate-y-0.5 border-slate-200/90 bg-white/50 hover:border-primary-200'
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold mb-2 bg-gradient-to-br',
                        COMMUNITY_COLORS[i % COMMUNITY_COLORS.length]
                      )}
                    >
                      {c.short}
                    </div>
                    <p className="text-xs font-semibold text-slate-800 leading-snug pr-2">{c.name}</p>
                    <p className="flex items-center gap-1 text-[11px] text-slate-600 mt-1.5 font-medium">
                      <Users className="w-3 h-3" />
                      {c.members}
                    </p>
                  </button>
                ))}
              </div>
            </PageCard>
          )}

          {/* Step 2 — post panel on the right only */}
          {step === 2 && selectedCommunity && (
            <div className="flex justify-center w-full">
              <PageCard className="create-post-step-panel-in w-full max-w-xl flex flex-col">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-primary-700 mb-4 -ml-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change community
                </button>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200/80">
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold bg-gradient-to-br flex-shrink-0',
                      COMMUNITY_COLORS[selectedIndex % COMMUNITY_COLORS.length]
                    )}
                  >
                    {selectedCommunity.short}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-slate-800">{selectedCommunity.name}</p>
                    <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                      <Users className="w-3 h-3" />
                      {selectedCommunity.members} members
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-primary-600 ml-auto flex-shrink-0" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <Avatar name="Phe Sophy" size="md" />
                  <div>
                    <p className="font-semibold text-sm text-slate-800">Phe Sophy</p>
                    <p className="text-xs text-slate-600">Teacher</p>
                  </div>
                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Share an update, resource, or question…"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/90 bg-white/70 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none mb-4"
                  autoFocus
                />

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border border-slate-200/90 bg-white/60">
                    <span className="text-primary-600 text-sm font-bold">#</span>
                    <input
                      value={hashtag}
                      onChange={(e) => setHashtag(e.target.value)}
                      placeholder="Hashtag"
                      className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border border-slate-200/90 bg-white/60">
                    <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Location"
                      className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-medium text-slate-600 mr-1">Add to post</span>
                  {[Image, Link2, Smile, MapPin].map((Icon, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="p-2 rounded-lg hover:bg-primary-50 text-slate-500"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t border-slate-200/80">
                  <Button variant="ghost" size="md" type="button" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleShare}
                    disabled={!description.trim()}
                  >
                    Share post
                  </Button>
                </div>
              </PageCard>
            </div>
          )}
        </div>
      </PageScaffold>
    </PageAmbient>
  )
}

export default TeacherCreatePost
