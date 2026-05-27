import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Image, Smile, Link2, CheckCircle2, Users, ArrowLeft } from 'lucide-react'
import {
  PageScaffold,
  PageCard,
  PageAmbient,
} from '@/components'
import { useTranslation } from '@/i18n'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import clsx from 'clsx'
import CommunityPicker from '@/components/common/CommunityPicker'
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
    <span>{label}</span>
  </div>
)

const TeacherCreatePost = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState(null)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [hashtag, setHashtag] = useState('')

  const selectedCommunity = findCommunityById(selected)

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
        title={t('createPost.title')}
        subtitle={
          step === 1
            ? t('createPost.chooseCommunitySubtitle')
            : t('createPost.writePostFor').replace('{{name}}', selectedCommunity?.name ?? '')
        }
      >
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <StepBadge n={1} label={t('createPost.community')} active={step === 1} done={step > 1} />
          <div className={clsx('h-px w-8 sm:w-12 flex-shrink-0', step > 1 ? 'bg-primary-300' : 'bg-slate-200')} />
          <StepBadge n={2} label={t('createPost.post')} active={step === 2} done={false} />
        </div>

        <div className="relative w-full min-h-[28rem]">
          {/* Step 1 — community only */}
          {step === 1 && (
            <PageCard
              padding={false}
              className="w-full max-w-3xl mx-auto overflow-hidden flex flex-col max-h-[min(40rem,78vh)]"
            >
              <div className="flex-shrink-0 px-5 pt-5 pb-3">
                <h3 className="text-lg font-bold text-slate-800 mb-1">{t('createPost.chooseCommunity')}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('createPost.selectCommunity')}
                </p>
              </div>
              <div className="flex-1 min-h-0 px-5 pb-5 flex flex-col">
                <CommunityPicker
                  fill
                  mode="navigate"
                  value={selected}
                  onChange={setSelected}
                  onSelect={handleSelectCommunity}
                />
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
                  {t('createPost.changeCommunity')}
                </button>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200/80">
                  <div
                    className={clsx(
                      'w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold bg-gradient-to-br flex-shrink-0',
                      selectedCommunity.badgeGradient
                    )}
                  >
                    {selectedCommunity.short}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-slate-800">{selectedCommunity.name}</p>
                    <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                      <Users className="w-3 h-3" />
                      {selectedCommunity.members} {t('createPost.members')}
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-primary-600 ml-auto flex-shrink-0" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <Avatar name="Phe Sophy" size="md" />
                  <div>
                    <p className="font-semibold text-sm text-slate-800">Phe Sophy</p>
                    <p className="text-xs text-slate-600">{t('createPost.teacher')}</p>
                  </div>
                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder={t('createPost.placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/90 bg-white/70 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none mb-4"
                  autoFocus
                />

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border border-slate-200/90 bg-white/60">
                    <span className="text-primary-600 text-sm font-bold">#</span>
                    <input
                      value={hashtag}
                      onChange={(e) => setHashtag(e.target.value)}
                      placeholder={t('createPost.hashtag')}
                      className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border border-slate-200/90 bg-white/60">
                    <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t('createPost.location')}
                      className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-medium text-slate-600 mr-1">{t('createPost.addToPost')}</span>
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
                    {t('createPost.back')}
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleShare}
                    disabled={!description.trim()}
                  >
                    {t('createPost.sharePost')}
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
