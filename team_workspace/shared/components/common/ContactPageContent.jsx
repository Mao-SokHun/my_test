import { useState } from 'react'
import { Mail, MessageSquare, Phone, Clock, Send, CheckCircle, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { PageScaffold, PageCard } from '@/components'
import clsx from 'clsx'

const channels = [
  { icon: Mail, label: 'Email Support', sub: 'support@rokkru.com', color: 'bg-primary-100 text-primary-600', time: '< 24 hrs' },
  { icon: MessageSquare, label: 'Live Chat', sub: 'Chat with our team', color: 'bg-emerald-100 text-emerald-600', time: 'Now online' },
  { icon: Phone, label: 'Phone', sub: '+855 023 456 789', color: 'bg-primary-100 text-primary-600', time: 'Mon–Fri 9–5' },
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
        <h2 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h2>
        <p className="text-sm text-slate-600 mb-6">Our support team will get back to you within 24 hours.</p>
        <Button variant="primary" onClick={() => setSubmitted(false)}>Send Another Message</Button>
      </PageCard>
    )
  }

  return (
    <PageScaffold title="Contact Support" subtitle="Leave a message and our team will respond shortly">
      <div className="grid sm:grid-cols-3 gap-4">
        {channels.map((c) => (
          <PageCard key={c.label} className="flex items-center gap-4 !p-4">
            <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', c.color)}>
              <c.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 text-sm">{c.label}</p>
              <p className="text-xs text-slate-500 truncate">{c.sub}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-500">{c.time}</span>
              </div>
            </div>
          </PageCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <PageCard className="lg:col-span-2">
          <h2 className="font-bold text-slate-800 mb-5">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Your Name"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <Input
              label="Subject"
              placeholder="Briefly describe your issue"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Message</label>
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
                Send Message
              </Button>
            </div>
          </form>
        </PageCard>

        <PageCard>
          <h3 className="font-bold text-slate-800 text-sm mb-3">Common Topics</h3>
          <ul className="space-y-1">
            {['Account & login', 'Booking sessions', 'Teacher profile', 'Payments & billing', 'Community posts'].map((t) => (
              <li key={t}>
                <span className="flex items-center justify-between w-full py-2 text-xs text-slate-600">
                  <span>{t}</span>
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
