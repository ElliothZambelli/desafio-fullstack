import { useEffect, useState } from 'react'
import { getActiveContract } from './useContracts'
import type { Contract } from '../types/plan' 

export function useActiveContract() {
  const [contract, setContract] = useState<Contract | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchContract() {
    try {
      setLoading(true)
      const active = await getActiveContract()
      console.log('Contrato buscado no hook useActiveContract:', active) 
      setContract(active)
    } catch (error) {
      console.error('Erro no fetchContract do hook useActiveContract:', error)
      setContract(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContract()
  }, [])

  return { contract, loading, refresh: fetchContract }
}
