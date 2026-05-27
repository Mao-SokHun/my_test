import { PageScaffold, PageCard, PageAmbient } from '@/components'
import { useAuth } from '@/hooks/AuthContext'
import { privacySections } from '@/constants/legalContent'

const PrivacyInApp = () => {
  const { user } = useAuth()
  const ambientVariant = user?.role === 'teacher' ? 'teacher' : 'ambient'

  return (
    <PageAmbient variant={ambientVariant} className="space-y-6">
      <div className="max-w-3xl mx-auto w-full">
        <PageScaffold title="Privacy Policy" subtitle="Last updated: May 2026">
          <div className="space-y-5">
            {privacySections.map((s) => (
              <PageCard key={s.title}>
                <h2 className="font-bold text-slate-800 text-base mb-1">{s.titleKm}</h2>
                <h3 className="font-semibold text-slate-500 text-sm mb-3">{s.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-2">{s.contentKm}</p>
                <p className="text-sm text-slate-500 leading-relaxed italic">{s.content}</p>
              </PageCard>
            ))}
          </div>
        </PageScaffold>
      </div>
    </PageAmbient>
  )
}

export default PrivacyInApp
