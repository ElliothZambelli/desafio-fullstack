import { useEffect, useState } from 'react';
import axios from 'axios';

interface Plan {
  id: number;
  description: string;
  numberOfClients: number;
  gigabytesStorage: number;
  price: string;
}

export function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/plans')
      .then(res => setPlans(res.data))
      .catch(err => console.error('Erro ao buscar planos:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Escolha seu plano</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-xl shadow-md p-0 overflow-hidden"
          >
            {/* Tarja laranja */}
            <div className="bg-orange-500 text-white text-sm font-semibold px-4 py-2">
              {plan.description}
            </div>

            <div className="px-6 py-4">
              {/* Preço */}
              <div className="text-gray-700 font-bold text-lg mb-1">Preço:</div>
              <div className="text-2xl text-gray-900 font-bold">
                R$ {parseFloat(plan.price).toFixed(2)}
                <span className="text-base text-gray-500 font-normal"> /mês</span>
              </div>

              {/* Armazenamento */}
              <div className="mt-4 text-gray-700 font-medium">Armazenamento:</div>
              <div className="text-2xl font-bold text-gray-800">
                {plan.gigabytesStorage} GB
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
