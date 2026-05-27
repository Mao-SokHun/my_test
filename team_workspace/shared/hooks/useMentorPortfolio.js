// ================ Start useMentorPortfolio ================
// ? Task #2 — wraps mentorsApi portfolio + upload (multipart, not JSON)
// ? Backend: mentorPortfolioController + upload.js

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
    } catch (e) {
      setError(e.message || 'Failed to load portfolio')
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  // ? POST /mentors/:userId/portfolio — JSON { link, title, ... }
  const addLink = async (link, link_tag = 'project', extra = {}) => {
    const item = await addPortfolioItem(userId, { link, link_tag, ...extra })
    setItems((prev) => [...prev, item])
    return item
  }

  const removeLink = async (link) => {
    await deletePortfolioItem(userId, link)
    setItems((prev) => prev.filter((i) => i.link !== link))
  }

  // ? POST /mentors/:userId/portfolio/upload — FormData field "file"
  const uploadFile = async (file, link_tag = 'file') => {
    const base = getApiBaseUrl()
    const token = localStorage.getItem('rokkru_token')
    const form = new FormData()
    form.append('file', file)
    form.append('link_tag', link_tag)

    const res = await fetch(`${base}/mentors/${userId}/portfolio/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    })

    const json = await res.json()
    if (!res.ok || json.success === false) {
      throw new Error(json.error || 'Upload failed')
    }
    const item = json.data ?? json
    setItems((prev) => [...prev, item])
    return item
  }

  return { items, loading, error, reload: load, addLink, removeLink, uploadFile }
}

export default useMentorPortfolio
