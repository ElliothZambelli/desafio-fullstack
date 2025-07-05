import { useEffect, useState } from 'react'
import { Plan } from '../types/plan'
import { getPlans } from '../services/plansService'

export function Home() {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    getPlans()
      .then(setPlans)
      .catch((err) => console.error('Erro ao buscar planos:', err))
  }, [])

  return (
    <div className="p-6 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {plans.map(plan => (
        <div key={plan.id} className="bg-white rounded-xl shadow p-6">
          {/* Barra laranja no topo */}
          <div className="bg-orange-600 rounded-t-lg px-4 py-2 mb-4">
            <p className="text-white font-bold text-sm leading-tight">
              Até {plan.numberOfClients} vistorias
            </p>
            <p className="text-white text-xs mt-0.5">/clientes ativos</p>
          </div>

          {/* Conteúdo */}
          <div className="mb-4">
            <p className="text-gray-700 text-sm">
              Preço:
            </p>
            <p className="text-gray-900 font-extrabold text-2xl flex items-baseline">
              <span className="text-base font-bold mr-1">R$</span>
              {parseFloat(plan.price).toFixed(2).replace('.', ',')}
              <span className="text-gray-500 text-sm ml-2">/mês</span>
            </p>
          </div>

          <div>
            <p className="text-gray-700 text-sm">Armazenamento:</p>
            <p className="text-gray-900 font-extrabold text-lg">{plan.gigabytesStorage} GB</p>
          </div>
        </div>
      ))}
    </div>
  )
}
