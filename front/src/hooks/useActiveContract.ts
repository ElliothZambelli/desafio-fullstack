import { useState, useEffect } from 'react'

interface Contract {
  id: number
  user_id: number
  plan_id: number
  is_active: boolean
  started_at: string
  ended_at?: string | null
  created_at: string
  updated_at: string
  credit_remaining?: number 
}

export function useActiveContract() {
  const [contract, setContract] = useState<Contract | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchContract() {
    setLoading(true)
    const response = await fetch('/api/contracts/active')
    const data = await response.json()
    setContract(data)  // Certifique-se que data.plan está presente
    setLoading(false)
  }

  useEffect(() => {
    fetchContract()
  }, [])

  return { contract, loading, refresh: fetchContract }
}

