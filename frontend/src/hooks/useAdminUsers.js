import { useState, useEffect } from 'react'

export const useAdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => { setUsers([]); setLoading(false) }, 500)
  }, [])

  return { users, loading, setUsers }
}

export default useAdminUsers
