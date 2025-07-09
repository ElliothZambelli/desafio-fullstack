import { useEffect, useState } from 'react'
import axios from 'axios'

interface ContractHistory {
  plan: string
  price: number
  credit_applied: number
  amount_paid: number
  paid_at: string
}

export function useContractHistory() {
  const [history, setHistory] = useState<ContractHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/contracts/history')
      .then(res => setHistory(res.data))
      .catch(err => console.error('Erro ao carregar histórico:', err))
      .finally(() => setLoading(false))
  }, [])

  return { history, loading }
}
