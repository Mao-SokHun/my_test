// ============= Start mentor skills section =============
// Task #3 — useMentorSkills → mentor-skills-controller.js
// ................................................

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { PageCard } from '@/components'
import { useMentorSkills } from '@/hooks/useMentorSkills'
import { isApiEnabled } from '@/constants/env'

const LEVELS = ['beginner', 'intermediate', 'advanced', 'expert']

const MentorSkillsSection = ({ userId }) => {
  const { skills, subSkillOptions, loading, error, addSkill, removeSkill } = useMentorSkills(userId)
  const [subSkillId, setSubSkillId] = useState('')
  const [level, setLevel] = useState('intermediate')
  const [busy, setBusy] = useState(false)

  if (!isApiEnabled()) {
    return (
      <PageCard>
        <p className="text-sm text-slate-500">Skills sync requires VITE_API_URL.</p>
      </PageCard>
    )
  }

  const handleAdd = async () => {
    if (!subSkillId) return
    setBusy(true)
    try {
      await addSkill(Number(subSkillId), level)
      setSubSkillId('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <PageCard className="space-y-4">
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skills & expertise</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <ul className="space-y-2">
          {skills.length === 0 && <li className="text-sm text-slate-500">No skills added yet.</li>}
          {skills.map((ms) => (
            <li
              key={ms.ms_id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {ms.SubSkill?.skill_name || ms.subSkill?.skill_name || 'Skill'}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {ms.SubSkill?.Skill?.skill_name || ms.subSkill?.skill?.skill_name} · {ms.proficiency_level}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeSkill(ms.ms_id)}
                className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={subSkillId}
          onChange={(e) => setSubSkillId(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm"
        >
          <option value="">Select skill…</option>
          {subSkillOptions.map((opt) => (
            <option key={opt.sub_skill_id} value={opt.sub_skill_id}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-sm capitalize"
        >
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={busy || !subSkillId}
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-primary-400 text-white text-sm font-semibold disabled:opacity-60"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
    </PageCard>
  )
}

export default MentorSkillsSection
