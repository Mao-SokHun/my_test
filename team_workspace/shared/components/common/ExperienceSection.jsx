import { useState } from 'react'
import { Plus, X, Edit2, Check } from 'lucide-react'
import PageCard from './PageCard'

const ExperienceSection = ({ experience, onChange }) => {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(experience)

  const startEdit = () => {
    setDraft(experience)
    setEditing(true)
  }

  const confirm = () => {
    onChange(draft)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(experience)
    setEditing(false)
  }

  const updateItem = (id, field, value) => {
    setDraft((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeItem = (id) => {
    setDraft((prev) => prev.filter((item) => item.id !== id))
  }

  const addItem = () => {
    setDraft((prev) => [
      ...prev,
      { id: Date.now(), role: '', org: '', period: '' },
    ])
  }

  const rows = editing ? draft : experience

  return (
    <PageCard padding={false} className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Professional Experience</h3>
        <div className="flex items-center gap-2">
          {!editing ? (
            <button
              type="button"
              onClick={startEdit}
              className="flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={confirm}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-400 text-white text-xs font-semibold hover:bg-primary-500 transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Confirm
              </button>
              <button
                type="button"
                onClick={cancel}
                aria-label="Cancel"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="p-5 space-y-4">
        {rows.map((item) => (
          <div key={item.id} className="relative pl-4 border-l-2 border-primary-200">
            {editing ? (
              <div className="space-y-2 pr-8">
                <input
                  value={item.role}
                  onChange={(e) => updateItem(item.id, 'role', e.target.value)}
                  placeholder="Role / title"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <input
                  value={item.org}
                  onChange={(e) => updateItem(item.id, 'org', e.target.value)}
                  placeholder="Organization"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <input
                  value={item.period}
                  onChange={(e) => updateItem(item.id, 'period', e.target.value)}
                  placeholder="2018–23"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="absolute top-0 right-0 p-1.5 text-red-400 hover:text-red-600"
                  aria-label="Remove experience"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold text-slate-800">{item.role}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.org}</p>
                <p className="text-xs text-primary-500 font-medium mt-1">{item.period}</p>
              </>
            )}
          </div>
        ))}
        {editing && (
          <button
            type="button"
            onClick={addItem}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-dashed border-primary-200 text-xs font-semibold text-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Experience
          </button>
        )}
      </div>
    </PageCard>
  )
}

export default ExperienceSection
