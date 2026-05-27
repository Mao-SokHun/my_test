// ============= Start useMentorPortfolio =============
// Task #2 — portfolio list, link, file upload
// Backend: mentor-portfolio-controller.js, upload.js
// ................................................

import { useState, useEffect, useCallback } from 'react'
import { isApiEnabled, getApiBaseUrl } from '@/constants/env'
import {
  fetchMentorPortfolio,
  addPortfolioItem,
  deletePortfolioItem,
} from '@/services/mentorsApi'

export function useMentorPortfolio(userId) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Start load portfolio from API
  // ................................................
  const load = useCallback(async () => {
    if (!userId || !isApiEnabled()) {
      setItems([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const list = await fetchMentorPortfolio(userId)
      setItems(Array.isArray(list) ? list : [])
    } catch (loadError) {
      setError(loadError.message || 'Failed to load portfolio')
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [userId])
  // End load portfolio from API
  // ................................................

  useEffect(() => {
    load()
  }, [load])

  // Start add portfolio link (JSON)
  // ................................................
  const addLink = async (link, link_tag = 'project', extra = {}) => {
    const item = await addPortfolioItem(userId, { link, link_tag, ...extra })
    setItems((previous) => [...previous, item])
    return item
  }
  // End add portfolio link
  // ................................................

  const removeLink = async (link) => {
    await deletePortfolioItem(userId, link)
    setItems((previous) => previous.filter((item) => item.link !== link))
  }

  // Start upload portfolio file (multipart FormData)
  // ................................................
  const uploadFile = async (file, link_tag = 'file') => {
    const base = getApiBaseUrl()
    const token = localStorage.getItem('rokkru_token')
    const form = new FormData()
    form.append('file', file)
    form.append('link_tag', link_tag)

    const response = await fetch(`${base}/mentors/${userId}/portfolio/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    })

    const json = await response.json()
    if (!response.ok || json.success === false) {
      throw new Error(json.error || 'Upload failed')
    }
    const item = json.data ?? json
    setItems((previous) => [...previous, item])
    return item
  }
  // End upload portfolio file
  // ................................................

  return { items, loading, error, reload: load, addLink, removeLink, uploadFile }
}

export default useMentorPortfolio

// ============= End useMentorPortfolio =============
