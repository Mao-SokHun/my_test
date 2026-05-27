// ? Task #2 — useMentorPortfolio → mentorPortfolioController

import { useState } from 'react'
import { Link2, Upload, Trash2, Plus } from 'lucide-react'
import { PageCard } from '@/components'
import { useMentorPortfolio } from '@/hooks/useMentorPortfolio'
import { isApiEnabled } from '@/constants/env'

const MentorPortfolioSection = ({ userId }) => {
  const { items, loading, error, addLink, removeLink, uploadFile } = useMentorPortfolio(userId)
  const [newLink, setNewLink] = useState('')
  const [tag, setTag] = useState('project')
  const [busy, setBusy] = useState(false)

  if (!isApiEnabled()) {
    return (
      <PageCard>
        <p className="text-sm text-slate-500">Portfolio sync requires VITE_API_URL.</p>
      </PageCard>
    )
  }

  const handleAddLink = async () => {
    if (!newLink.trim()) return
    setBusy(true)
    try {
      await addLink(newLink.trim(), tag)
      setNewLink('')
    } finally {
      setBusy(false)
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try {
      await uploadFile(file, 'file')
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  return (
    <PageCard className="space-y-4">
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Portfolio</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <ul className="space-y-2">
          {items.length === 0 && <li className="text-sm text-slate-500">No portfolio items yet.</li>}
          {items.map((item) => (
            <li
              key={item.link}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-primary-600 uppercase">{item.link_tag}</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-slate-700 truncate hover:text-primary-600"
                >
                  {item.title || item.link}
                </a>
              </div>
              <button
                type="button"
                onClick={() => removeLink(item.link)}
                className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                aria-label="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          placeholder="https://github.com/you/project"
          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-sm"
        >
          <option value="project">Project</option>
          <option value="certificate">Certificate</option>
          <option value="website">Website</option>
        </select>
        <button
          type="button"
          disabled={busy}
          onClick={handleAddLink}
          className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-primary-400 text-white text-sm font-semibold disabled:opacity-60"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-primary-200 text-sm font-medium text-primary-600 cursor-pointer hover:bg-primary-50">
        <Upload className="w-4 h-4" />
        Upload file (JPG, PNG, PDF — max 5MB)
        <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleUpload} />
      </label>
      <p className="text-xs text-slate-400 flex items-center gap-1">
        <Link2 className="w-3 h-3" /> Links and files appear on your public profile.
      </p>
    </PageCard>
  )
}

export default MentorPortfolioSection
