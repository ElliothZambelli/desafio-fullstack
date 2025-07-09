import axios from 'axios'

export async function createContract(planId: number) {
  const response = await axios.post('http://localhost:8000/api/contracts', {
    plan_id: planId
  })
  return response.data 
}

export async function getActiveContract() {
  try {
    const response = await axios.get('http://localhost:8000/api/contracts/active')
    console.log('Resposta completa do backend getActiveContract:', response.data)
    return response.data  
  } catch (error) {
    console.error('Erro ao buscar contrato ativo:', error)
    return null
  }
}

