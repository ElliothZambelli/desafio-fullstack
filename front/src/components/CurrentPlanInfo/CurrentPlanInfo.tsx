import { useActiveContract } from '../../hooks/useActiveContract'
import styles from '../../styles/CurrentPlanInfo.module.css'

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
  console.log(plan)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Plano Atual</h2>

      <div className={styles.planHighlight}>
        <p className={styles.planDescription}>
          <strong>{plan.description.split('/')[0].trim()}</strong>
        </p>
      </div>

      <div className={styles.details}>
        <p><strong>👥 Clientes incluídos:</strong> {plan.numberOfClients}</p>
        <p><strong>💰 Preço mensal:</strong> R$ {Number(plan.price).toFixed(2).replace('.', ',')}</p>
        <p><strong>📅 Início do plano:</strong> {formattedDate}</p>
      </div>
    </div>

  )
}
