import { usePlans } from '../../hooks/usePlans'
import { PlanCard } from '../../components/Card/PlanCard'
import styles from './Home.module.css'
import { useActiveContract } from '../../hooks/useActiveContract'
import { useEffect } from 'react'
import { UserInfo } from '../../components/UserInfo'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const { plans, loading } = usePlans()
  const { contract, loading: contractLoading } = useActiveContract()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Contrato atualizado no componente:', contract)
  }, [contract])

  if (loading || contractLoading) {
    return <p className={styles.loadingText}>Carregando planos...</p>
  }

  function handleSubscribe(planId: number) {
    const selectedPlan = plans.find(p => p.id === planId)
    if (!selectedPlan) {
      alert('Plano não encontrado.')
      return
    }

    console.log('Redirecionando para página de pagamento com plano:', selectedPlan)
    navigate('/payment', { state: { plan: selectedPlan } })
  }

  return (
    <div className={styles.pageWrapper}>
      <UserInfo />

      <div className={styles.cardArea}>
        <div className={styles.planGrid}>
          {plans.map(plan => {
            const isActive = Number(contract?.plan_id) === Number(plan.id)
            console.log('plan.id:', plan.id, 'contract.plan_id:', contract?.plan_id, 'active:', isActive)

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
