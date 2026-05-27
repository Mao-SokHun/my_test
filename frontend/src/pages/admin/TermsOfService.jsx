import { useState } from 'react'
import { FileText, ChevronRight, CheckCircle } from 'lucide-react'
import Button from '../../components/ui/Button'
import clsx from 'clsx'
import { termsSections } from '@/constants/legalContent'

const TermsOfService = () => {
  const [active, setActive] = useState(0)
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Terms of Service</h1>
          <p className="text-slate-500 text-sm mt-0.5">Last updated: May 2026</p>
        </div>
        <Button variant="outline" size="sm"><FileText className="w-4 h-4" />Download PDF</Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-soft p-4 h-fit sticky top-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Contents</p>
          <ul className="space-y-0.5">
            {termsSections.map((s, i) => (
              <li key={s.title}>
                <button
                  onClick={() => { setActive(i); document.getElementById(`ts-${i}`)?.scrollIntoView({ behavior: 'smooth' }) }}
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
            {termsSections.map((s, i) => (
              <section key={s.title} id={`ts-${i}`} className="scroll-mt-6">
                <h2 className="text-base font-bold text-slate-800 mb-0.5">{s.titleKm}</h2>
                <h3 className="text-sm font-semibold text-slate-500 mb-3 pb-2 border-b border-slate-100">{s.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-2">{s.contentKm}</p>
                <p className="text-sm text-slate-500 leading-relaxed italic">{s.content}</p>
              </section>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="bg-primary-50 rounded-2xl p-5 flex items-start gap-4">
              <button
                onClick={() => setAgreed(!agreed)}
                className={clsx('w-5 h-5 rounded flex-shrink-0 mt-0.5 border-2 flex items-center justify-center transition-all',
                  agreed ? 'bg-primary-500 border-primary-400' : 'border-slate-300')}
              >
                {agreed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
              </button>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">I have read and agree to the Terms of Service</p>
                <p className="text-xs text-slate-400 mt-0.5">By checking this box you agree to the terms outlined above.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="primary" disabled={!agreed}>Accept Terms</Button>
              <Button variant="ghost">Decline</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
