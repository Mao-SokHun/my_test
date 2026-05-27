import { useState } from 'react'
import { CheckCircle, CreditCard, Download, Calendar, DollarSign } from 'lucide-react'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { PageScaffold, PageCard, TabBar, DataTable } from '@/components'
import clsx from 'clsx'

const plans = [
  { id: 'free', name: 'Free', icon: '🌱', price: '$0', period: '/month', desc: 'Perfect for small communities getting started', color: 'from-slate-400 to-slate-500', features: ['Up to 50 students', 'Up to 5 teachers', '5 GB storage', 'Basic analytics', 'Email support'], current: false },
  { id: 'pro', name: 'Pro', icon: '⚡', price: '$49', period: '/month', desc: 'Great for growing platforms with active communities', color: 'from-primary-400 to-primary-500', features: ['Up to 500 students', 'Unlimited teachers', '50 GB storage', 'Advanced analytics', 'Priority support', 'Custom branding', 'API access'], current: true },
  { id: 'elite', name: 'Elite', icon: '👑', price: '$149', period: '/month', desc: 'For large-scale platforms with enterprise needs', color: 'from-amber-500 to-orange-500', features: ['Unlimited students', 'Unlimited teachers', '500 GB storage', 'Full analytics suite', 'Dedicated support', 'White-label option', 'Custom integrations', 'SLA guarantee'], current: false },
]

const transactions = [
  { id: 'TXN-2847', date: '2026-05-01', desc: 'Pro Plan — May 2026', amount: '$49.00', status: 'paid' },
  { id: 'TXN-2681', date: '2026-04-01', desc: 'Pro Plan — April 2026', amount: '$49.00', status: 'paid' },
  { id: 'TXN-2512', date: '2026-03-01', desc: 'Pro Plan — March 2026', amount: '$49.00', status: 'paid' },
  { id: 'TXN-2344', date: '2026-02-01', desc: 'Pro Plan — February 2026', amount: '$49.00', status: 'paid' },
  { id: 'TXN-2180', date: '2026-01-01', desc: 'Pro Plan — January 2026', amount: '$49.00', status: 'paid' },
]

const txColumns = [
  { key: 'id', label: 'Transaction ID', render: (row) => <span className="font-mono text-xs text-slate-500">{row.id}</span> },
  { key: 'date', label: 'Date', render: (row) => <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{row.date}</span> },
  { key: 'desc', label: 'Description' },
  { key: 'amount', label: 'Amount', render: (row) => <span className="font-semibold flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-slate-400" />{row.amount.replace('$', '')}</span> },
  { key: 'status', label: 'Status', render: () => <Badge variant="success" size="sm" dot>Paid</Badge> },
]

const Billing = () => {
  const [activeTab, setActiveTab] = useState('plans')
  const [selectedPlan, setSelectedPlan] = useState('pro')

  return (
    <PageScaffold title="Billing & Subscription" subtitle="Manage your plan and billing information">
      <PageCard variant="brand" className="text-white flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <span className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">⚡</span>
          <div>
            <p className="text-white/85 text-xs font-medium mb-0.5">Current Plan</p>
            <h2 className="text-xl font-black text-white">Pro Plan</h2>
            <p className="text-white/90 text-sm">$49/month · Renews June 1, 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-white/85">Next billing</p>
            <p className="font-bold text-lg text-white">$49.00</p>
          </div>
          <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">Manage Plan</Button>
        </div>
      </PageCard>

      <TabBar tabs={['plans', 'payment', 'transactions']} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'plans' && (
        <div className="space-y-5">
          <PageCard>
            <h2 className="font-bold text-slate-800 mb-1">Your Platform is Live</h2>
            <p className="text-sm text-slate-500">You&apos;re on the <strong>Pro</strong> plan. Upgrade to Elite for unlimited scale.</p>
          </PageCard>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <PageCard
                key={plan.id}
                hover
                className={clsx('cursor-pointer border-2 relative', selectedPlan === plan.id ? 'border-primary-300' : 'border-transparent')}
              >
                {plan.current && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">Current Plan</span>
                )}
                <span className={clsx('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-xl mb-3', plan.color)}>{plan.icon}</span>
                <h3 className="font-bold text-slate-800 text-lg">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-3">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-black text-slate-800">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.current ? 'ghost' : 'primary'} size="sm" className="w-full" disabled={plan.current}>
                  {plan.current ? 'Current Plan' : plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
                </Button>
              </PageCard>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="grid lg:grid-cols-2 gap-5 max-w-2xl">
          <PageCard>
            <h2 className="font-bold text-slate-800 mb-4">Payment Method</h2>
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-5 text-white mb-4">
              <CreditCard className="w-6 h-6 mb-4 text-slate-400" />
              <p className="font-mono text-sm tracking-widest">•••• •••• •••• 4242</p>
              <div className="flex justify-between mt-4">
                <span className="text-xs text-slate-400">Admin User</span>
                <span className="text-xs text-slate-400">12/28</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Change Card</Button>
              <Button variant="ghost" size="sm" className="text-red-400">Remove</Button>
            </div>
          </PageCard>
          <PageCard>
            <h2 className="font-bold text-slate-800 mb-4">Billing Address</h2>
            <div className="space-y-3">
              {[
                { label: 'Name', value: 'RokKru Inc.' },
                { label: 'Address', value: '#123 Monivong Blvd, Daun Penh' },
                { label: 'City', value: 'Phnom Penh' },
                { label: 'Country', value: 'Cambodia' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{f.label}</label>
                  <input defaultValue={f.value} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary-300" />
                </div>
              ))}
            </div>
            <Button variant="primary" size="sm" className="mt-4">Save Address</Button>
          </PageCard>
        </div>
      )}

      {activeTab === 'transactions' && (
        <PageCard padding={false}>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Transaction History</h2>
            <Button variant="ghost" size="sm"><Download className="w-4 h-4" />Export</Button>
          </div>
          <DataTable columns={txColumns} rows={transactions} />
        </PageCard>
      )}
    </PageScaffold>
  )
}

export default Billing
