import { useState, useEffect } from 'react'
import type { Plan } from '../types/plan' 

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
  plan?: Plan
}

export function useActiveContract() {
  const [contract, setContract] = useState<Contract | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchContract() {
    setLoading(true)
    const response = await fetch('/api/contracts/active')
    const data = await response.json()
    setContract(data)  
    setLoading(false)
  }

  useEffect(() => {
    fetchContract()
  }, [])

  return { contract, loading, refresh: fetchContract }
}

