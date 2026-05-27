import { useState } from 'react'
import { Mail, MessageSquare, Phone, Clock, Send, CheckCircle, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { PageScaffold, PageCard } from '@/components'
import clsx from 'clsx'

const channels = [
  { icon: Mail, label: 'Email Support', labelKm: '\u17A2\u17CA\u17B8\u1798\u17C2\u179B\u1787\u17C6\u1793\u17BD\u1799', sub: 'support@rokkru.com', color: 'bg-primary-100 text-primary-600', time: '< 24 hrs', timeKm: '< \u17E2\u17E4 \u1798\u17C9\u17C4\u1784' },
  { icon: MessageSquare, label: 'Live Chat', labelKm: '\u1787\u17C2\u178F\u1795\u17D2\u1791\u17B6\u179B\u17CB', sub: 'Chat with our team', subKm: '\u1787\u17C2\u178F\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u179A\u17BB\u1798\u1799\u17BE\u1784', color: 'bg-emerald-100 text-emerald-600', time: 'Now online', timeKm: '\u17A2\u17CA\u17B8\u1793\u17A1\u17B6\u1789' },
  { icon: Phone, label: 'Phone', labelKm: '\u1791\u17BC\u179A\u179F\u17D0\u1796\u17D2\u1791', sub: '+855 023 456 789', color: 'bg-primary-100 text-primary-600', time: 'Mon\u2013Fri 9\u20135', timeKm: '\u1785\u17D0\u1793\u17D2\u1791\u2013\u179F\u17BB\u1780\u17D2\u179A \u17E9\u2013\u17E5' },
]

const commonTopics = [
  { en: 'Account & login', km: '\u1782\u178E\u1793\u17B8 \u1793\u17B7\u1784\u1780\u17B6\u179A\u1785\u17BC\u179B' },
  { en: 'Booking sessions', km: '\u1780\u17B6\u179A\u1780\u1780\u17CB\u179C\u1782\u17D2\u1782' },
  { en: 'Teacher profile', km: '\u1794\u17D2\u179A\u17BC\u17A0\u17D2\u179C\u17B6\u179B\u1782\u17D2\u179A\u17BC' },
  { en: 'Payments & billing', km: '\u1780\u17B6\u179A\u1791\u17BC\u1791\u17B6\u178F\u17CB \u1793\u17B7\u1784\u179C\u17B7\u1780\u17D2\u1780\u1799\u1794\u178F\u17D2\u179A' },
  { en: 'Community posts', km: '\u1794\u17D2\u179A\u1780\u17B6\u179F\u179F\u17A0\u1782\u1798\u1793\u17CD' },
]

const ContactPageContent = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', priority: 'normal' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <PageCard className="max-w-sm mx-auto text-center py-12">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">{'\u179F\u17B6\u179A\u178F\u17D2\u179A\u17BC\u179C\u1794\u17B6\u1793\u1795\u17D2\u1789\u17BE!'}</h2>
        <p className="text-sm text-slate-500 mb-1">Message Sent!</p>
        <p className="text-sm text-slate-700 mt-3">{'\u1780\u17D2\u179A\u17BB\u1798\u1787\u17C6\u1793\u17BD\u1799\u179A\u1794\u179F\u17CB\u1799\u17BE\u1784\u1793\u17B9\u1784\u1786\u17D2\u179B\u17BE\u1799\u178F\u1794\u17A2\u17D2\u1793\u1780\u1780\u17D2\u1793\u17BB\u1784\u179A\u1799\u17C8\u1796\u17C1\u179B \u17E2\u17E4 \u1798\u17C9\u17C4\u1784\u17D4'}</p>
        <p className="text-xs text-slate-500 italic mb-6">Our support team will get back to you within 24 hours.</p>
        <Button variant="primary" onClick={() => setSubmitted(false)}>
          {'\u1795\u17D2\u1789\u17BE\u179F\u17B6\u179A\u1798\u17BD\u1799\u1791\u17C0\u178F'} / Send Another Message
        </Button>
      </PageCard>
    )
  }

  return (
    <PageScaffold
      title="Contact Support"
      subtitle="Leave a message and our team will respond shortly"
    >
      <div className="grid sm:grid-cols-3 gap-4">
        {channels.map((c) => (
          <PageCard key={c.label} className="flex items-center gap-4 !p-4">
            <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', c.color)}>
              <c.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm">{c.labelKm}</p>
              <p className="text-xs font-medium text-slate-500">{c.label}</p>
              <p className="text-xs text-slate-500 truncate mt-0.5">{c.subKm || c.sub}</p>
              {c.subKm && <p className="text-xs text-slate-400 truncate italic">{c.sub}</p>}
              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-500">{c.timeKm}</span>
                <span className="text-xs text-slate-400 italic">({c.time})</span>
              </div>
            </div>
          </PageCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <PageCard className="lg:col-span-2">
          <h2 className="font-bold text-slate-800">{'\u1795\u17D2\u1789\u17BE\u179F\u17B6\u179A\u1798\u1780\u1799\u17BE\u1784'}</h2>
          <p className="text-sm text-slate-500 mb-5">Send us a message</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label={'\u1788\u17D2\u1798\u17C4\u17C7\u179A\u1794\u179F\u17CB\u17A2\u17D2\u1793\u1780 / Your Name'}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label={'\u17A2\u17B6\u179F\u1799\u178A\u17D2\u1790\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B / Email Address'}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <Input
              label={'\u1794\u17D2\u179A\u1792\u17B6\u1793\u1794\u1791 / Subject'}
              placeholder="Briefly describe your issue"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">{'\u179F\u17B6\u179A / Message'}</label>
              <textarea
                rows={5}
                placeholder="Describe your issue in detail..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-primary-300 resize-none"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary">
                <Send className="w-4 h-4" />
                {'\u1795\u17D2\u1789\u17BE\u179F\u17B6\u179A'} / Send
              </Button>
            </div>
          </form>
        </PageCard>

        <PageCard>
          <h3 className="font-bold text-slate-800 text-sm">{'\u1794\u17D2\u179A\u1792\u17B6\u1793\u1794\u1791\u1791\u17BC\u179C\u17C5'}</h3>
          <p className="text-xs text-slate-500 mb-3">Common Topics</p>
          <ul className="space-y-1">
            {commonTopics.map((t) => (
              <li key={t.en}>
                <span className="flex items-center justify-between w-full py-2 text-xs text-slate-600">
                  <span>
                    <span className="block font-medium text-slate-700">{t.km}</span>
                    <span className="block text-slate-400 italic">{t.en}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </span>
              </li>
            ))}
          </ul>
        </PageCard>
      </div>
    </PageScaffold>
  )
}

export default ContactPageContent
