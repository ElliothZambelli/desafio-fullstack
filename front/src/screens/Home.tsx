import { usePlans } from '../hooks/usePlans'
import { PlanCard } from '../components/Card/PlanCard'
import styles from './Home.module.css'
import { createContract } from '../hooks/useContracts'
import { useActiveContract } from '../hooks/useActiveContract'
import { useEffect } from 'react'
import { UserInfo } from '../components/UserInfo' // 👈 Adicionado aqui

export function Home() {
  const { plans, loading } = usePlans()
  const { contract, loading: contractLoading, refresh } = useActiveContract()

  useEffect(() => {
    console.log('Contrato atualizado no componente:', contract)
  }, [contract])

  if (loading || contractLoading) {
    return <p className={styles.loadingText}>Carregando planos...</p>
  }

  async function handleSubscribe(planId: number) {
    try {
      console.log('Iniciando assinatura do plano', planId)
      await createContract(planId)
      alert(`Plano contratado com sucesso!`)

      console.log('Chamando refresh() para atualizar contrato ativo')
      await refresh()

      console.log('Contrato atualizado após refresh:', contract)
    } catch (error) {
      alert('Erro ao criar contrato.')
      console.error(error)
    }
  }

  return (
    <div className={styles.pageWrapper}>
      {/* 👇 Exibição dos dados do usuário */}
      <UserInfo />

      <div className={styles.cardArea}>
        <div className={styles.planGrid}>
          {plans.map(plan => {
            console.log(
              'plan.id:', plan.id,
              'contract.plan_id:', contract?.plan_id,
              'active:', Number(contract?.plan_id) === Number(plan.id)
            )
            return (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSubscribe={handleSubscribe}
                active={Number(contract?.plan_id) === Number(plan.id)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
