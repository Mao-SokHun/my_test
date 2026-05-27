import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PublicNavbar, AppFooter, PageScaffold, PageCard } from '@/components'
import { termsSections } from '@/constants/legalContent'

const Terms = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col">
    <PublicNavbar />
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary-500 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <PageScaffold title="Terms of Service" subtitle="Last updated: May 2026">
      <div className="mt-6 space-y-4">
        {termsSections.map((s) => (
          <PageCard key={s.title}>
            <h2 className="font-bold text-slate-800 mb-2">{s.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{s.content}</p>
          </PageCard>
        ))}
      </div>
      </PageScaffold>
    </main>
    <AppFooter variant="full" />
  </div>
)

export default Terms
