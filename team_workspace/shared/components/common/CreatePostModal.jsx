import { useState, useEffect } from 'react'
import { X, MapPin, Image, Smile, Link2 } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import clsx from 'clsx'
import CommunityPicker from './CommunityPicker'
import { findCommunityById } from '../../constants/communities'

const StepBadge = ({ n, label, active, done }) => (
  <div
    className={clsx(
      'flex items-center gap-2 text-xs font-semibold',
      active || done ? 'text-primary-700' : 'text-slate-500'
    )}
  >
    <span
      className={clsx(
        'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold',
        done || active ? 'bg-primary-500 text-white' : 'bg-slate-200 text-slate-600'
      )}
    >
      {done && !active ? '✓' : n}
    </span>
    <span className="hidden sm:inline">{label}</span>
  </div>
)

const CreatePostModal = ({ onClose }) => {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState(null)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [hashtag, setHashtag] = useState('')

  const selectedCommunity = findCommunityById(selected)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const handleNext = () => {
    if (selected) setStep(2)
  }

  const handleShare = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60]" role="presentation">
      <div
        className="create-post-overlay absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />

      <div
        className={clsx(
          'create-post-drawer-right absolute top-16 right-0 bottom-0 flex flex-col overflow-hidden',
          'w-[min(100%,28rem)] sm:w-[min(36rem,42vw)] border-l border-white/60 shadow-[-12px_0_40px_rgba(143,85,98,0.12)] glass-strong'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-post-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-slate-200/80 bg-white/50">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <StepBadge n={1} label="Community" active={step === 1} done={step > 1} />
            <div className={clsx('h-px w-6 sm:w-10 flex-shrink-0', step > 1 ? 'bg-primary-300' : 'bg-slate-200')} />
            <StepBadge n={2} label="Post" active={step === 2} done={false} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100/80 text-slate-500 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="px-5 sm:px-6 pt-6 pb-4">
              <h2 id="create-post-title" className="text-lg sm:text-xl font-bold text-slate-800">
                Choose your community
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-lg">
                Pick a major or subject community. Students in that group will see your update.
              </p>
            </div>

            <div className="px-5 sm:px-6 pb-4 flex-1 min-h-0 flex flex-col overflow-hidden">
              <CommunityPicker fill value={selected} onChange={setSelected} mode="select" />
            </div>

            <div className="px-5 sm:px-6 py-4 border-t border-slate-200/80 bg-white/40 flex justify-end">
              <Button variant="primary" size="md" onClick={handleNext} disabled={!selected}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80">
                <Avatar name="Dr. Phe Sophy" size="md" />
                <div>
                  <p className="font-semibold text-sm text-slate-800">Phe Sophy</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Posting to <span className="font-semibold text-primary-700">{selectedCommunity?.name}</span>
                  </p>
                </div>
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Share an update, resource, or question with this community…"
                className="w-full px-4 py-3 rounded-xl border border-slate-200/90 bg-white/70 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
              />

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border border-slate-200/90 bg-white/60">
                  <span className="text-primary-600 text-sm font-bold">#</span>
                  <input
                    value={hashtag}
                    onChange={(e) => setHashtag(e.target.value)}
                    placeholder="Add hashtag"
                    className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border border-slate-200/90 bg-white/60">
                  <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location (optional)"
                    className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-medium text-slate-600 mr-1">Add to post</span>
                {[
                  { icon: Image, color: 'text-emerald-600', bg: 'hover:bg-emerald-50' },
                  { icon: Link2, color: 'text-sky-600', bg: 'hover:bg-sky-50' },
                  { icon: Smile, color: 'text-amber-600', bg: 'hover:bg-amber-50' },
                  { icon: MapPin, color: 'text-primary-600', bg: 'hover:bg-primary-50' },
                ].map(({ icon: Icon, color, bg }, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={clsx('p-2 rounded-lg border border-transparent transition-colors', bg)}
                  >
                    <Icon className={clsx('w-4 h-4', color)} />
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 sm:px-6 py-4 border-t border-slate-200/80 bg-white/40 flex items-center justify-between gap-3">
              <Button variant="ghost" size="md" type="button" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="primary" size="md" onClick={handleShare} disabled={!description.trim()}>
                Share post
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreatePostModal
