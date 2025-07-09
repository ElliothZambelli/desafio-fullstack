import { Plan } from '../../types/plan'
import styles from '../../styles/PlanCard.module.css'

interface PlanCardProps {
  plan: Plan
  onSubscribe: (planId: number) => void
  active?: boolean
}

export function PlanCard({ plan, onSubscribe, active = false }: PlanCardProps) {
  const main = plan.description.split('/')[0].trim()

  const handleClick = () => {
    if (!active) {
      onSubscribe(plan.id)
    }
  }

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ cursor: active ? 'default' : 'pointer' }}
    >
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

      <div className={styles.storageBlock}>
        <p className={styles.priceLabel}>Armazenamento:</p>
        <div className={styles.storageContainer}>
          <span className={styles.storage}>{plan.gigabytesStorage} GB</span>
        </div>
      </div>
    </div>
  )
}