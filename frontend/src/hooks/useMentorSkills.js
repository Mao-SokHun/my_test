// ============= Start useMentorSkills =============
// Task #3 — skill catalog and mentor skills list
// Backend: mentor-skills-controller.js
// ................................................

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
    if (!isApiEnabled()) {
      setError('Backend API is required to load skills.')
      setSkills([])
      setCatalog([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const [catalogData, mentorSkills] = await Promise.all([
        fetchSkillCatalog(),
        userId ? fetchMentorSkills(userId) : Promise.resolve([]),
      ])
      setCatalog(Array.isArray(catalogData) ? catalogData : [])
      setSkills(Array.isArray(mentorSkills) ? mentorSkills : [])
    } catch (loadError) {
      setError(loadError.message || 'Failed to load skills')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  const addSkill = async (sub_skill_id, proficiency_level = 'intermediate') => {
    const item = await addMentorSkill(userId, { sub_skill_id, proficiency_level })
    setSkills((previous) => [...previous, item])
    return item
  }

  const removeSkill = async (msId) => {
    await removeMentorSkill(userId, msId)
    setSkills((previous) => previous.filter((skill) => skill.ms_id !== msId))
  }

  // Start flat options for select — skill name + sub-skill name
  // ................................................
  const subSkillOptions = catalog.flatMap((skill) =>
    (skill.SubSkills || skill.subSkills || []).map((subSkill) => ({
      sub_skill_id: subSkill.sub_skill_id,
      label: `${skill.skill_name} — ${subSkill.skill_name}`,
      skill_id: skill.skill_id,
    }))
  )
  // End flat options for select
  // ................................................

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

// ============= End useMentorSkills =============
