// ================ Start useMentorSkills ================
// ? Task #3 — catalog (dropdown) + mentor's skills list
// ? Backend: GET /mentors/skills/catalog, GET/POST/DELETE /mentors/:userId/skills

import { useState, useEffect, useCallback } from 'react'
import { isApiEnabled } from '@/constants/env'
import {
  fetchSkillCatalog,
  fetchMentorSkills,
  addMentorSkill,
  removeMentorSkill,
} from '@/services/mentorsApi'

export function useMentorSkills(userId) {
  const [skills, setSkills] = useState([])
  const [catalog, setCatalog] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!isApiEnabled()) return
    setLoading(true)
    setError(null)
    try {
      const [cat, mine] = await Promise.all([
        fetchSkillCatalog(),
        userId ? fetchMentorSkills(userId) : Promise.resolve([]),
      ])
      setCatalog(Array.isArray(cat) ? cat : [])
      setSkills(Array.isArray(mine) ? mine : [])
    } catch (e) {
      setError(e.message || 'Failed to load skills')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  const addSkill = async (sub_skill_id, proficiency_level = 'intermediate') => {
    const item = await addMentorSkill(userId, { sub_skill_id, proficiency_level })
    setSkills((prev) => [...prev, item])
    return item
  }

  const removeSkill = async (msId) => {
    await removeMentorSkill(userId, msId)
    setSkills((prev) => prev.filter((s) => s.ms_id !== msId))
  }

  // ? Flat list for <select> — Skill name + SubSkill name
  const subSkillOptions = catalog.flatMap((skill) =>
    (skill.SubSkills || skill.subSkills || []).map((sub) => ({
      sub_skill_id: sub.sub_skill_id,
      label: `${skill.skill_name} — ${sub.skill_name}`,
      skill_id: skill.skill_id,
    }))
  )

  return {
    skills,
    catalog,
    subSkillOptions,
    loading,
    error,
    reload: load,
    addSkill,
    removeSkill,
  }
}

export default useMentorSkills
