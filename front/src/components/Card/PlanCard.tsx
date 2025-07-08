import { Plan } from '../../types/plan'
import styles from './PlanCard.module.css'

interface PlanCardProps {
  plan: Plan
  onSubscribe: (planId: number) => void
  active?: boolean
}

export function PlanCard({ plan, onSubscribe, active = false }: PlanCardProps) {
  const main = plan.description.split('/')[0].trim()

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {main}
          <br />
          <span className={styles.subTitle}>
            / {plan.numberOfClients} cliente{plan.numberOfClients > 1 ? 's' : ''}
          </span>
        </h2>
      </div>
      <div className={styles.priceBlock}>
        <p className={styles.priceLabel}>Preço:</p>
        <div className={styles.priceContainer}>
          <span className={styles.price}>
            R$ {Number(plan.price).toFixed(2).replace('.', ',')}
          </span>
          <span className={styles.perMonth}>/mês</span>
        </div>
      </div>
      <button
          className={styles.button}
          onClick={() => onSubscribe(plan.id)}
          disabled={active}
        >
          {active ? 'Plano Ativo' : 'Assinar'}
        </button>
      
    </div>
  )
}
