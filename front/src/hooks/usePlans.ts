import { useEffect, useState } from 'react'
import { getPlans } from '../services/plansService'
import { Plan } from '../types/plan'

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPlans()
      .then(setPlans)
      .catch((err) => {
        console.error('Erro ao buscar planos:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { plans, loading }
}
