import { Plan } from '../../types/plan'
import styles from './PlanCard.module.css'

interface PlanCardProps {
  plan: Plan
}

export function PlanCard({ plan }: PlanCardProps) {
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
      {/* 
      <div className={styles.content}>
        <p className={styles.storage}>Armazenamento: {plan.gigabytesStorage} GB</p>
        <p className={styles.price}>R$ {plan.price}</p>
      </div>
      */}
      
    </div>
  )
}
