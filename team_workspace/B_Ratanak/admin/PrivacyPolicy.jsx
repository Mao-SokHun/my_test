import { useState } from 'react'
import { Lock, ChevronRight, Download } from 'lucide-react'
import Button from '../../components/ui/Button'
import clsx from 'clsx'

const sections = [
  { id: 'collection', title: '1. Information We Collect', content: `We collect information you provide directly to us, such as when you create an account, book a session, or contact us for support. This includes:\n\n• Personal identification: name, email address, phone number, and profile photo.\n• Account credentials: encrypted passwords and authentication tokens.\n• Payment information: billing address and payment method (card data is handled by our secure payment partner and never stored on our servers).\n• Session data: bookings, session history, and teacher/student feedback.` },
  { id: 'use', title: '2. How We Use Your Information', content: `We use the information we collect to:\n\n• Provide, maintain, and improve our platform services.\n• Process transactions and send related notifications.\n• Match students with suitable teachers based on their preferences.\n• Monitor platform security and prevent fraud or abuse.\n• Send administrative messages, updates, and promotional offers (with your consent).` },
  { id: 'sharing', title: '3. Information Sharing', content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:\n\n• Service providers who assist us in operating the platform (e.g., payment processors, analytics tools).\n• Law enforcement when required by applicable law or to protect the rights of RokKru and its users.\n• Other users on the platform only to the extent necessary for the services (e.g., teachers can see student profiles for booked sessions).` },
  { id: 'security', title: '4. Data Security', content: `We implement industry-standard security measures to protect your personal data, including:\n\n• SSL/TLS encryption for all data in transit.\n• AES-256 encryption for sensitive data at rest.\n• Regular security audits and penetration testing.\n• Strict internal access controls and audit logging.` },
  { id: 'rights', title: '5. Your Rights', content: `Depending on your location, you may have the following rights regarding your personal data:\n\n• Right to access: request a copy of the personal data we hold about you.\n• Right to rectification: correct inaccurate personal data.\n• Right to erasure: request deletion of your personal data.\n• Right to portability: receive your data in a machine-readable format.\n• Right to object: object to certain types of data processing.` },
  { id: 'cookies', title: '6. Cookies and Tracking', content: `We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences. Disabling cookies may affect some platform functionality.` },
  { id: 'contact', title: '7. Contact Us', content: `If you have any questions about this Privacy Policy or how we handle your data, please contact our Privacy Team at:\n\nprivacy@rokkru.com\nRokKru Inc.\nPhnom Penh, Cambodia` },
]

const PrivacyPolicy = () => {
  const [active, setActive] = useState('collection')

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mt-0.5">Last updated: January 1, 2026 · Effective: February 1, 2026</p>
        </div>
        <Button variant="outline" size="sm"><Download className="w-4 h-4" />Download PDF</Button>
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 flex items-center gap-3">
        <Lock className="w-5 h-5 text-primary-500 flex-shrink-0" />
        <p className="text-sm text-primary-700">We take your privacy seriously. Your data is never sold to third parties and is protected by industry-leading encryption.</p>
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
          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-6">
                <h2 className="text-base font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100">{s.title}</h2>
                {s.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed mb-3 whitespace-pre-line">{para}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
