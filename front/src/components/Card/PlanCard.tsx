// src/components/Card/PlanCard.tsx
import { Plan } from '../../types/plan'
import styles from './PlanCard.module.css'

interface PlanCardProps {
  plan: Plan
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className={styles.card}>
      <div>
        <h2 className={styles.title}>{plan.description}</h2>
        <p className={styles.info}>Clientes: {plan.numberOfClients}</p>
        <p className={styles.storage}>Armazenamento: {plan.gigabytesStorage} GB</p>
        <p className={styles.price}>R$ {plan.price}</p>
      </div>

      <button className={styles.button}>
        Assinar
      </button>
    </div>
  )
}
