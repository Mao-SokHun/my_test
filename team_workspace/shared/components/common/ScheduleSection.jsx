import { useState } from 'react'
import { Plus, X, Edit2, Check, Clock } from 'lucide-react'
import PageCard from './PageCard'
import Select from '../ui/Select'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const inputClass =
  'w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-200'

const ScheduleSection = ({ schedule, onChange }) => {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(schedule)

  const startEdit = () => {
    setDraft(schedule)
    setEditing(true)
  }

  const confirm = () => {
    onChange(draft)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(schedule)
    setEditing(false)
  }

  const updateSlot = (id, field, value) => {
    setDraft((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const removeSlot = (id) => {
    setDraft((prev) => prev.filter((s) => s.id !== id))
  }

  const addSlot = () => {
    setDraft((prev) => [
      ...prev,
      { id: Date.now(), day: 'Monday', time: '9:00 – 9:45 AM', subject: '' },
    ])
  }

  const rows = editing ? draft : schedule

  return (
    <PageCard padding={false} className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Weekly Schedule</h3>
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
      <div className="p-5 space-y-3">
        {rows.length === 0 && !editing && (
          <p className="text-sm text-slate-400 text-center py-4">No availability added yet.</p>
        )}
        {rows.map((slot) => (
          <div
            key={slot.id}
            className={editing ? 'space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-100 relative' : 'flex gap-3'}
          >
            {editing ? (
              <>
                <Select
                  size="sm"
                  value={slot.day}
                  onChange={(v) => updateSlot(slot.id, 'day', v)}
                  options={DAYS}
                />
                <input
                  value={slot.time}
                  onChange={(e) => updateSlot(slot.id, 'time', e.target.value)}
                  placeholder="8:00 – 8:45 AM"
                  className={inputClass}
                />
                <input
                  value={slot.subject}
                  onChange={(e) => updateSlot(slot.id, 'subject', e.target.value)}
                  placeholder="Subject"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeSlot(slot.id)}
                  className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600"
                  aria-label="Remove slot"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-primary-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{slot.day}</p>
                  <p className="text-xs text-slate-500">{slot.time}</p>
                  <p className="text-xs text-primary-600 font-medium mt-0.5">{slot.subject}</p>
                </div>
              </>
            )}
          </div>
        ))}
        {editing && (
          <button
            type="button"
            onClick={addSlot}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-dashed border-primary-200 text-xs font-semibold text-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Time Slot
          </button>
        )}
      </div>
    </PageCard>
  )
}

export default ScheduleSection
