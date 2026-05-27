import { useState } from 'react'
import { Plus, Edit, Trash2, Shield, ShieldCheck, Users } from 'lucide-react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import Toggle from '../../components/ui/Toggle'
import { PageScaffold, PageCard } from '@/components'
import Modal from '../../components/ui/Modal'
import clsx from 'clsx'

const roles = [
  {
    id: 1, name: 'Super Admin', icon: '👑', color: 'from-primary-400 to-primary-500',
    description: 'Full access to all platform features and settings',
    members: [
      { name: 'Admin User', email: 'admin@rokkru.com' },
    ],
    permissions: { manageUsers: true, manageContent: true, viewReports: true, manageRoles: true, systemSettings: true, billing: true },
  },
  {
    id: 2, name: 'Content Moderator', icon: '🛡️', color: 'from-emerald-500 to-teal-600',
    description: 'Review and moderate posts, communities and media',
    members: [
      { name: 'Panha Rith', email: 'panha@rokkru.com' },
      { name: 'Sreymom Keo', email: 'sreymom@rokkru.com' },
    ],
    permissions: { manageUsers: false, manageContent: true, viewReports: true, manageRoles: false, systemSettings: false, billing: false },
  },
  {
    id: 3, name: 'Support Agent', icon: '🎧', color: 'from-primary-400 to-primary-500',
    description: 'Handle user disputes, tickets and customer support',
    members: [
      { name: 'Davan Chim', email: 'davan@rokkru.com' },
      { name: 'Kosal Seng', email: 'kosal@rokkru.com' },
      { name: 'Theary Ly', email: 'theary@rokkru.com' },
    ],
    permissions: { manageUsers: true, manageContent: false, viewReports: true, manageRoles: false, systemSettings: false, billing: false },
  },
  {
    id: 4, name: 'Finance Manager', icon: '💰', color: 'from-amber-500 to-orange-500',
    description: 'Access financial reports, billing and transaction data',
    members: [
      { name: 'Pich Chanthy', email: 'pich@rokkru.com' },
    ],
    permissions: { manageUsers: false, manageContent: false, viewReports: true, manageRoles: false, systemSettings: false, billing: true },
  },
]

const permissionLabels = {
  manageUsers: 'Manage Users',
  manageContent: 'Manage Content',
  viewReports: 'View Reports',
  manageRoles: 'Manage Roles',
  systemSettings: 'System Settings',
  billing: 'Billing Access',
}

const RoleManagement = () => {
  const [selectedRole, setSelectedRole] = useState(roles[0])
  const [perms, setPerms] = useState(roles[0].permissions)
  const [showCreate, setShowCreate] = useState(false)

  const selectRole = (r) => { setSelectedRole(r); setPerms({ ...r.permissions }) }

  return (
    <PageScaffold
        title="Role Management"
        subtitle="Define and assign admin roles and permissions"
        action={<Button variant="primary" size="sm" onClick={() => setShowCreate(true)}><Plus className="w-4 h-4" />Create Role</Button>}
    >
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Role list */}
        <div className="space-y-3 lg:col-span-1">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => selectRole(r)}
              className={clsx('w-full text-left bg-white rounded-2xl p-4 border transition-all duration-200 hover:shadow-soft',
                selectedRole.id === r.id ? 'border-primary-200 shadow-soft bg-primary-50/30' : 'border-slate-100')}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={clsx('w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg flex-shrink-0', r.color)}>
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{r.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" />{r.members.length} member{r.members.length !== 1 && 's'}
                  </p>
                </div>
                {selectedRole.id === r.id && <ShieldCheck className="w-4 h-4 text-primary-500 flex-shrink-0" />}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{r.description}</p>
            </button>
          ))}
        </div>

        {/* Role editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Permissions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={clsx('w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg', selectedRole.color)}>
                  {selectedRole.icon}
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">{selectedRole.name}</h2>
                  <p className="text-xs text-slate-400">Edit permissions</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm"><Edit className="w-3.5 h-3.5" /></Button>
                {selectedRole.id !== 1 && <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></Button>}
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-4">{selectedRole.description}</p>
            <div className="divide-y divide-slate-50">
              {Object.entries(perms).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-slate-600">{permissionLabels[key]}</span>
                  <Toggle checked={val} onChange={(v) => setPerms((prev) => ({ ...prev, [key]: v }))} />
                </div>
              ))}
            </div>
            <div className="pt-4 flex gap-2">
              <Button variant="primary" size="sm">Save Changes</Button>
              <Button variant="ghost" size="sm" onClick={() => setPerms({ ...selectedRole.permissions })}>Reset</Button>
            </div>
          </div>

          {/* Members */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><Users className="w-4 h-4 text-primary-500" />Members in this role</h3>
              <Button variant="ghost" size="sm"><Plus className="w-3.5 h-3.5" />Add Member</Button>
            </div>
            {selectedRole.members.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">No members assigned</p>
            ) : (
              <div className="space-y-3">
                {selectedRole.members.map((m, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 py-2">
                    <div className="flex items-center gap-3">
                      <Avatar name={m.name} size="sm" />
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{m.name}</p>
                        <p className="text-xs text-slate-400">{m.email}</p>
                      </div>
                    </div>
                    <button className="text-red-400 hover:bg-red-50 p-1.5 rounded-lg transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create New Role"
        description="Define a new admin role and configure its permissions"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setShowCreate(false)}>Create Role</Button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Role Name</label>
            <input className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary-300" placeholder="e.g. Marketing Manager" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
            <textarea className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary-300 resize-none" rows={2} placeholder="Describe this role's responsibilities..." />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Icon</label>
            <div className="flex gap-2 flex-wrap">
              {['🎯','📋','🔐','📊','🌐','⚙️','🔧','📱'].map((icon) => (
                <button key={icon} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-primary-100 text-xl transition-colors">{icon}</button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </PageScaffold>
  )
}

export default RoleManagement
