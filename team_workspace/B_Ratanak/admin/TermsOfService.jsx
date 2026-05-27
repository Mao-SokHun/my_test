import { useState } from 'react'
import { FileText, ChevronRight, CheckCircle } from 'lucide-react'
import Button from '../../components/ui/Button'
import clsx from 'clsx'

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms', content: `By accessing or using the RokKru platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you may not use the Platform.\n\nThese Terms apply to all visitors, users, and others who access or use the Platform, including administrators, teachers, and students.` },
  { id: 'use', title: '2. Use of Services', content: `You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to use the Platform:\n\n• In any way that violates applicable local, national, or international law or regulation.\n• To transmit any unsolicited advertising or promotional material.\n• To impersonate or attempt to impersonate the Company, an employee, another user, or any other person.\n• To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Platform.` },
  { id: 'accounts', title: '3. User Accounts', content: `To access certain features of the Platform, you must register for an account. When you create an account, you must:\n\n• Provide accurate, current, and complete information.\n• Maintain and promptly update your account information.\n• Maintain the security of your password and accept all risks of unauthorized access.\n• Promptly notify us if you discover or suspect any security breaches related to the Platform.` },
  { id: 'teachers', title: '4. Teacher Responsibilities', content: `Teachers on the Platform agree to:\n\n• Provide accurate credentials and qualifications.\n• Deliver sessions in a professional and respectful manner.\n• Honor all confirmed bookings or provide adequate notice for cancellations.\n• Not engage in soliciting students outside of the Platform for services covered by the Platform.` },
  { id: 'payments', title: '5. Payments and Refunds', content: `All payments are processed securely through our payment partners. Teachers receive payouts according to the agreed schedule minus platform fees. Refund requests must be submitted within 48 hours of a session. Disputed payments will be reviewed by our admin team within 5 business days.` },
  { id: 'content', title: '6. Content Policy', content: `Users are responsible for all content they post. The Platform reserves the right to remove any content that violates these Terms, including but not limited to content that is: illegal, harmful, threatening, abusive, harassing, defamatory, or offensive.` },
  { id: 'termination', title: '7. Termination', content: `We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Platform will immediately cease.` },
  { id: 'changes', title: '8. Changes to Terms', content: `We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.` },
]

const TermsOfService = () => {
  const [active, setActive] = useState('acceptance')
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Terms of Service</h1>
          <p className="text-slate-500 text-sm mt-0.5">Last updated: January 1, 2026</p>
        </div>
        <Button variant="outline" size="sm"><FileText className="w-4 h-4" />Download PDF</Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        {/* Sidebar TOC */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-soft p-4 h-fit sticky top-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Contents</p>
          <ul className="space-y-0.5">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => { setActive(s.id); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }) }}
                  className={clsx('w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all',
                    active === s.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800')}
                >
                  <ChevronRight className={clsx('w-3 h-3 flex-shrink-0 transition-transform', active === s.id && 'rotate-90')} />
                  <span className="truncate">{s.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-soft p-6">
          <div className="prose prose-sm max-w-none space-y-8">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-6">
                <h2 className="text-base font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100">{s.title}</h2>
                {s.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed mb-3 whitespace-pre-line">{para}</p>
                ))}
              </section>
            ))}
          </div>

          {/* Agreement */}
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
