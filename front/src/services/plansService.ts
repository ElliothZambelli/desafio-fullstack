import { Plan } from '../types/plan'
import { api } from '../lib/api'

export async function getPlans(): Promise<Plan[]> {
  const response = await api.get('/plans')
  return response.data
}
