import { usePlans } from '../hooks/usePlans'
import { PlanCard } from '../components/Card/PlanCard'
import styles from './Home.module.css'

export function Home() {
  const { plans, loading } = usePlans()

  if (loading) {
    return <p className={styles.loadingText}>Carregando planos...</p>
  }

  return (
    <div className={styles.container}>
      {plans.map(plan => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  )
}
