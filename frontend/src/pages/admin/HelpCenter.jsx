import { useState } from 'react'
import { Search, ChevronRight, BookOpen, MessageSquare, Video, FileText, HelpCircle, Mail, Zap, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageScaffold, PageCard } from '@/components'
import clsx from 'clsx'

const categories = [
  { icon: BookOpen, label: 'Getting Started', count: 12, color: 'bg-primary-100 text-primary-600' },
  { icon: Zap, label: 'Features & Tools', count: 28, color: 'bg-amber-100 text-amber-600' },
  { icon: Shield, label: 'Account & Privacy', count: 15, color: 'bg-emerald-100 text-emerald-600' },
  { icon: FileText, label: 'Billing & Plans', count: 9, color: 'bg-primary-100 text-primary-600' },
  { icon: Video, label: 'Video Guides', count: 21, color: 'bg-purple-100 text-purple-600' },
  { icon: MessageSquare, label: 'Community Help', count: 7, color: 'bg-teal-100 text-teal-600' },
]

const faqs = [
  { q: "How do I reset a user's password?", a: 'Go to User Management, find the user, click the menu, and select Reset Password.', section: 'Account' },
  { q: 'How do I approve a teacher application?', a: 'Navigate to User Management, filter by Pending, review documents, then Approve or Reject.', section: 'Teachers' },
  { q: 'How do I export platform reports?', a: 'On any reports or dashboard page, click Export to download data as CSV or PDF.', section: 'Reports' },
  { q: 'Can I create custom admin roles?', a: 'Yes — go to Role Management, click Create Role, configure permissions, and assign members.', section: 'Roles' },
  { q: 'How do I suspend a user account?', a: 'In User Management, find the user, open the menu, and select Deactivate.', section: 'Account' },
  { q: 'Where can I see all transactions?', a: 'Navigate to Billing → Transactions for a full payment ledger.', section: 'Billing' },
]

const HelpCenter = () => {
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const filtered = faqs.filter((f) =>
    f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageScaffold title="Help Center" subtitle="Browse articles and FAQs for the admin panel">
      <PageCard variant="brand" className="text-white text-center">
        <HelpCircle className="w-12 h-12 mx-auto mb-3 text-primary-100" />
        <h2 className="text-xl font-bold mb-2">How can we help you?</h2>
        <p className="text-primary-100 text-sm mb-5">Search help articles or browse by category</p>
        <div className="max-w-md mx-auto flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-lg">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help articles..."
            className="flex-1 outline-none text-slate-700 text-sm placeholder-slate-400 bg-transparent"
          />
        </div>
      </PageCard>

      <div>
        <h2 className="font-bold text-slate-800 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <button key={c.label} type="button" className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2', c.color)}>
                <c.icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-700 leading-tight">{c.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{c.count} articles</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <PageCard padding={false} className="lg:col-span-2 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-400 mt-0.5">{filtered.length} results{search && ` for "${search}"`}</p>
          </div>
          <div className="divide-y divide-slate-50">
            {filtered.map((faq, i) => (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors text-left"
                >
                  <div>
                    <p className="text-xs font-bold text-primary-500 mb-0.5">{faq.section}</p>
                    <p className="text-sm font-semibold text-slate-800">{faq.q}</p>
                  </div>
                  <ChevronRight className={clsx('w-4 h-4 text-slate-400 flex-shrink-0 ml-3 transition-transform', openFaq === i && 'rotate-90')} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <div className="bg-primary-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </PageCard>

        <div className="space-y-4">
          <PageCard>
            <h3 className="font-bold text-slate-800 mb-4">Still need help?</h3>
            <Link to="/admin/contact" className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all group">
              <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">Leave a Message</p>
                <p className="text-xs text-slate-400">Get support from our team</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500" />
            </Link>
          </PageCard>
          <PageCard className="bg-primary-50 border-primary-100">
            <h4 className="font-bold text-primary-700 text-sm mb-1">Popular Articles</h4>
            <ul className="space-y-2 mt-3">
              {['How to approve teachers', 'Export data to CSV', 'Manage community rules', 'Set up billing plans'].map((a) => (
                <li key={a}>
                  <span className="flex items-center gap-2 text-xs text-slate-600">
                    <ChevronRight className="w-3 h-3 text-slate-300" />{a}
                  </span>
                </li>
              ))}
            </ul>
          </PageCard>
        </div>
      </div>
    </PageScaffold>
  )
}

export default HelpCenter
