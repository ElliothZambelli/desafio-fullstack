import { useActiveContract } from '../../hooks/useActiveContract'
import styles from './CurrentPlanInfo.module.css'

export function CurrentPlanInfo() {
  const { contract, loading } = useActiveContract()

  if (loading) {
    return <p className={styles.loading}>Carregando plano atual...</p>
  }

  if (!contract || !contract.plan) {
    return <p className={styles.noPlan}>Nenhum plano contratado no momento.</p>
  }

  const { plan, started_at } = contract
  const startDate = new Date(started_at)
  const formattedDate = startDate.toLocaleDateString('pt-BR')

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Plano atual</h2>
      <p className={styles.description}><strong>{plan.description}</strong></p>
      <p><strong>Clientes incluídos:</strong> {plan.numberOfClients}</p>
      <p><strong>Preço mensal:</strong> R$ {Number(plan.price).toFixed(2).replace('.', ',')}</p>
      <p><strong>Início do plano:</strong> {formattedDate}</p>
    </div>
  )
}
