import { useState } from 'react'
import { Lock, ChevronRight, Download } from 'lucide-react'
import Button from '../../components/ui/Button'
import clsx from 'clsx'
import { privacySections } from '@/constants/legalContent'

const PrivacyPolicy = () => {
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mt-0.5">Last updated: May 2026</p>
        </div>
        <Button variant="outline" size="sm"><Download className="w-4 h-4" />Download PDF</Button>
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 flex items-center gap-3">
        <Lock className="w-5 h-5 text-primary-500 flex-shrink-0" />
        <p className="text-sm text-primary-700">We take your privacy seriously. Your data is never sold to third parties and is protected by industry-leading encryption.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-soft p-4 h-fit sticky top-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Contents</p>
          <ul className="space-y-0.5">
            {privacySections.map((s, i) => (
              <li key={s.title}>
                <button
                  onClick={() => { setActive(i); document.getElementById(`ps-${i}`)?.scrollIntoView({ behavior: 'smooth' }) }}
                  className={clsx('w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all',
                    active === i ? 'bg-primary-50 text-primary-700 font-medium' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800')}
                >
                  <ChevronRight className={clsx('w-3 h-3 flex-shrink-0 transition-transform', active === i && 'rotate-90')} />
                  <span className="truncate">{s.titleKm}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-soft p-6">
          <div className="space-y-8">
            {privacySections.map((s, i) => (
              <section key={s.title} id={`ps-${i}`} className="scroll-mt-6">
                <h2 className="text-base font-bold text-slate-800 mb-0.5">{s.titleKm}</h2>
                <h3 className="text-sm font-semibold text-slate-500 mb-3 pb-2 border-b border-slate-100">{s.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-2">{s.contentKm}</p>
                <p className="text-sm text-slate-500 leading-relaxed italic">{s.content}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
