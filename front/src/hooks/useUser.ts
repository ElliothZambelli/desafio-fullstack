import { useEffect, useState } from 'react'
import axios from 'axios'

export interface User {
  id: number
  name: string
  email: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('/api/user')
        setUser(response.data)
      } catch (err) {
        setError('Erro ao buscar usuário')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  return { user, loading, error }
}
