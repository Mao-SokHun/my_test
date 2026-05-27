// ? Task #4 — mentorsApi posts → mentorPostsController

import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { PageCard } from '@/components'
import { isApiEnabled } from '@/constants/env'
import { MENTOR_PROVINCE_OPTIONS } from '@/constants/mentorProvinces'
import {
  fetchMentorPosts,
  createMentorPost,
  deleteMentorPost,
} from '@/services/mentorsApi'
import { useMentorSkills } from '@/hooks/useMentorSkills'

const MentorPostsSection = ({ userId }) => {
  const { subSkillOptions } = useMentorSkills(userId)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subSkillId, setSubSkillId] = useState('')
  const [provinceId, setProvinceId] = useState('')
  const [status, setStatus] = useState('draft')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    if (!userId || !isApiEnabled()) return
    setLoading(true)
    setError('')
    try {
      const list = await fetchMentorPosts(userId)
      setPosts(Array.isArray(list) ? list : [])
    } catch (e) {
      setError(e.message || 'Failed to load posts')
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  const handleCreate = async () => {
    if (!title.trim() || !subSkillId || !provinceId) {
      setError('Title, skill, and province are required.')
      return
    }
    setBusy(true)
    setError('')
    try {
      await createMentorPost(userId, {
        title: title.trim(),
        description: description.trim(),
        sub_skill_id: Number(subSkillId),
        province_id: Number(provinceId),
        status,
      })
      setTitle('')
      setDescription('')
      setSubSkillId('')
      await load()
    } catch (e) {
      setError(e.message || 'Failed to create post')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (postId) => {
    setBusy(true)
    try {
      await deleteMentorPost(postId)
      await load()
    } catch (e) {
      setError(e.message || 'Failed to delete')
    } finally {
      setBusy(false)
    }
  }

  if (!isApiEnabled()) {
    return (
      <PageCard>
        <p className="text-sm text-slate-500">Posts sync requires VITE_API_URL.</p>
      </PageCard>
    )
  }

  return (
    <PageCard className="space-y-4">
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mentor posts</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <ul className="space-y-2">
          {posts.length === 0 && <li className="text-sm text-slate-500">No posts yet.</li>}
          {posts.map((p) => (
            <li
              key={p.post_id}
              className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">{p.title}</p>
                <p className="text-xs text-slate-500 capitalize">{p.status}</p>
              </div>
              <button
                type="button"
                disabled={busy}
                onClick={() => handleDelete(p.post_id)}
                className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-2 pt-2 border-t border-slate-100">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm resize-none"
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={subSkillId}
            onChange={(e) => setSubSkillId(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm"
          >
            <option value="">Skill…</option>
            {subSkillOptions.map((opt) => (
              <option key={opt.sub_skill_id} value={opt.sub_skill_id}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={provinceId}
            onChange={(e) => setProvinceId(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm"
          >
            <option value="">Province…</option>
            {MENTOR_PROVINCE_OPTIONS.map((p) => (
              <option key={p.province_id} value={p.province_id}>
                {p.province_name}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={handleCreate}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary-400 text-white text-sm font-semibold disabled:opacity-60"
        >
          <Plus className="w-4 h-4" /> Create post
        </button>
      </div>
    </PageCard>
  )
}

export default MentorPostsSection
