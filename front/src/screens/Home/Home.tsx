import { usePlans } from '../../hooks/usePlans'
import { PlanCard } from '../../components/Card/PlanCard'
import styles from '../../styles/Home.module.css'
import { useActiveContract } from '../../hooks/useActiveContract'
import { useEffect } from 'react'
import { UserInfo } from '../../components/UserInfo/UserInfo'
import { useNavigate } from 'react-router-dom'
import { CurrentPlanInfo } from '../../components/CurrentPlanInfo/CurrentPlanInfo'
import type { Plan, Contract } from '../../types/plan'

export function Home() {
  const { plans, loading } = usePlans()

  const {
    contract,
    loading: contractLoading,
  }: { contract: Contract | null; loading: boolean } = useActiveContract()

  const navigate = useNavigate()

  useEffect(() => {
    console.log('Contrato atualizado no componente:', contract)
  }, [contract])

  if (loading || contractLoading) {
    return <p className={styles.loadingText}>Carregando planos...</p>
  }

  function handleSubscribe(planId: number) {
    const selectedPlan = plans.find((p: Plan) => p.id === planId)
    if (!selectedPlan) {
      alert('Plano não encontrado.')
      return
    }

    navigate('/payment', {
      state: {
        plan: selectedPlan,
        credit_remaining: contract?.credit_remaining ?? 0,
      },
    })
  }

  return (
  <div className={styles.pageWrapper}>
    {/* TOPO DA TELA */}
    <div className="w-full max-w-6xl flex flex-col gap-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <UserInfo />
        <button
          onClick={() => navigate('/history')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
        >
          Ver Histórico
        </button>
      </div>

      <CurrentPlanInfo />
    </div>

    {/* ÁREA DE PLANOS */}
    <div className={styles.cardArea}>
      <div className={styles.planGrid}>
        {plans.map((plan: Plan) => {
          const isActive = contract?.plan_id === plan.id
          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSubscribe={handleSubscribe}
              active={isActive}
            />
          )
        })}
      </div>
    </div>
  </div>
)

}
