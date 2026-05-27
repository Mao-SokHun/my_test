import { useState } from 'react'
import { Camera, Save, Globe, Lock, Shield } from 'lucide-react'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import { PageScaffold, PageCard, TabBar } from '@/components'
import { SettingsToggleRow } from '@/components'
import clsx from 'clsx'

const colors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6']

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedColor, setSelectedColor] = useState('#6366f1')
  const [notifs, setNotifs] = useState({
    newUsers: true, disputes: true, payments: true, security: true, system: false, marketing: false,
  })
  const [privacy, setPrivacy] = useState({
    twoFactor: true, sessionTimeout: true, ipLock: false, auditLog: true,
  })

  return (
    <PageScaffold title="Settings" subtitle="Manage your admin account and platform settings">
      <TabBar
        tabs={[
          { id: 'profile', label: 'Profile' },
          { id: 'notifications', label: 'Notifications' },
          { id: 'appearance', label: 'Appearance' },
          { id: 'security', label: 'Security' },
          { id: 'platform', label: 'Platform' },
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'profile' && (
        <div className="grid lg:grid-cols-3 gap-5">
          <PageCard className="lg:col-span-2">
            <h2 className="font-bold text-slate-800 mb-5">Profile Information</h2>
            <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-100">
              <div className="relative">
                <Avatar name="Admin User" size="lg" />
                <button type="button" className="absolute bottom-0 right-0 w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-primary-600 transition-colors">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <p className="font-bold text-slate-800">Admin User</p>
                <p className="text-sm text-slate-400">admin@rokkru.com</p>
                <p className="text-xs mt-1 bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full inline-block font-semibold">Super Admin</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'First Name', value: 'Admin', full: false },
                { label: 'Last Name', value: 'User', full: false },
                { label: 'Email', value: 'admin@rokkru.com', full: true },
                { label: 'Phone', value: '+855 012 345 678', full: false },
                { label: 'Department', value: 'Platform Operations', full: false },
              ].map((f) => (
                <div key={f.label} className={f.full ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">{f.label}</label>
                  <input defaultValue={f.value} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary-300 transition-colors" />
                </div>
              ))}
            </div>
            <div className="pt-5">
              <Button variant="primary"><Save className="w-4 h-4" />Save Changes</Button>
            </div>
          </PageCard>

          <div className="space-y-4">
            <PageCard>
              <h3 className="font-bold text-slate-800 text-sm mb-4">Quick Actions</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Change Password', icon: Lock, color: 'text-primary-600' },
                  { label: 'Download My Data', icon: Globe, color: 'text-emerald-600' },
                  { label: 'View Audit Log', icon: Shield, color: 'text-amber-600' },
                ].map((a) => (
                  <button key={a.label} type="button" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left">
                    <a.icon className={clsx('w-4 h-4', a.color)} />
                    <span className="text-sm text-slate-700">{a.label}</span>
                  </button>
                ))}
              </div>
            </PageCard>
            <PageCard className="bg-gradient-to-br from-rose-50 to-red-50 border-red-100">
              <h3 className="font-bold text-red-700 text-sm mb-2">Danger Zone</h3>
              <p className="text-xs text-red-400 mb-3">These actions cannot be undone.</p>
              <Button variant="danger" size="sm">Delete Account</Button>
            </PageCard>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <PageCard className="max-w-xl">
          <h2 className="font-bold text-slate-800 mb-4">Notification Preferences</h2>
          {[
            { key: 'newUsers', label: 'New user registrations', sub: 'Get notified when new users sign up' },
            { key: 'disputes', label: 'User disputes', sub: 'Alerts for new support tickets and disputes' },
            { key: 'payments', label: 'Payment activity', sub: 'Successful and failed payment notifications' },
            { key: 'security', label: 'Security alerts', sub: 'Login attempts and suspicious activity' },
            { key: 'system', label: 'System updates', sub: 'Platform maintenance and update notices' },
            { key: 'marketing', label: 'Marketing reports', sub: 'Weekly and monthly growth reports' },
          ].map((n) => (
            <SettingsToggleRow
              key={n.key}
              label={n.label}
              description={n.sub}
              checked={notifs[n.key]}
              onChange={(v) => setNotifs((prev) => ({ ...prev, [n.key]: v }))}
            />
          ))}
          <div className="pt-4">
            <Button variant="primary"><Save className="w-4 h-4" />Save Preferences</Button>
          </div>
        </PageCard>
      )}

      {activeTab === 'appearance' && (
        <PageCard className="max-w-lg">
          <h2 className="font-bold text-slate-800 mb-5">Appearance</h2>
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide">Accent Color</label>
            <div className="flex gap-3 flex-wrap">
              {colors.map((c) => (
                <button key={c} type="button" onClick={() => setSelectedColor(c)}
                  className={clsx('w-9 h-9 rounded-xl transition-all hover:scale-110', selectedColor === c && 'ring-2 ring-offset-2 ring-slate-400')}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide">Theme Mode</label>
            <div className="flex gap-2">
              {['Light', 'Dark', 'System'].map((t) => (
                <button key={t} type="button" className={clsx('flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                  t === 'Light' ? 'border-primary-200 bg-primary-50 text-primary-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50')}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Button variant="primary"><Save className="w-4 h-4" />Apply Changes</Button>
        </PageCard>
      )}

      {activeTab === 'security' && (
        <PageCard className="max-w-xl">
          <h2 className="font-bold text-slate-800 mb-4">Security Settings</h2>
          {[
            { key: 'twoFactor', label: 'Two-Factor Authentication', sub: 'Require 2FA for admin login' },
            { key: 'sessionTimeout', label: 'Session Timeout (30 min)', sub: 'Auto-logout after inactivity' },
            { key: 'ipLock', label: 'IP Whitelist', sub: 'Restrict login to approved IPs only' },
            { key: 'auditLog', label: 'Audit Logging', sub: 'Record all admin actions' },
          ].map((s) => (
            <SettingsToggleRow
              key={s.key}
              label={s.label}
              description={s.sub}
              checked={privacy[s.key]}
              onChange={(v) => setPrivacy((prev) => ({ ...prev, [s.key]: v }))}
            />
          ))}
          <div className="pt-5">
            <Button variant="ghost" size="sm" className="w-full"><Lock className="w-4 h-4" />Change Admin Password</Button>
          </div>
        </PageCard>
      )}

      {activeTab === 'platform' && (
        <div className="grid lg:grid-cols-2 gap-5 max-w-2xl">
          <PageCard>
            <h3 className="font-bold text-slate-800 text-sm mb-4">Platform Info</h3>
            <div className="space-y-3">
              {[
                { label: 'Platform Name', value: 'RokKru' },
                { label: 'Domain', value: 'rokkru.com' },
                { label: 'Version', value: 'v2.1.4' },
                { label: 'Region', value: 'Southeast Asia (SEA)' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{f.label}</label>
                  <input defaultValue={f.value} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary-300" />
                </div>
              ))}
            </div>
            <div className="pt-4"><Button variant="primary" size="sm"><Save className="w-4 h-4" />Save</Button></div>
          </PageCard>
          <PageCard>
            <h3 className="font-bold text-slate-800 text-sm mb-4">Feature Flags</h3>
            {[
              { label: 'Community Posts', enabled: true },
              { label: 'Teacher Applications', enabled: true },
              { label: 'Referral Program', enabled: false },
              { label: 'Live Q&A Sessions', enabled: true },
              { label: 'AI Study Recommendations', enabled: false },
            ].map((f) => (
              <SettingsToggleRow key={f.label} label={f.label} checked={f.enabled} onChange={() => {}} />
            ))}
          </PageCard>
        </div>
      )}
    </PageScaffold>
  )
}

export default AdminSettings
