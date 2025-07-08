import { useLocation, useNavigate } from 'react-router-dom'
import styles from './PaymentPage.module.css'
import { createContract } from '../../hooks/useContracts'

export function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { plan } = location.state || {}

  if (!plan) {
    return <p>Plano não encontrado.</p>
  }

  function formatClientText(numberOfClients: number) {
    return `${numberOfClients} cliente${numberOfClients > 1 ? 's' : ''}`
  }

  const mainDescription = plan.description.split('/')[0].trim()
  const clientText = formatClientText(plan.numberOfClients)

  async function handlePixPayment() {
    await createContract(plan.id)
    alert('Pagamento realizado com sucesso!')
    navigate('/')
  }

  return (
    <div className={styles.paymentContainer}>
      <h1>Pagamento via Pix</h1>
      <p>
        Você está contratando o plano: <strong>{mainDescription} / {clientText}</strong>
      </p>
      <p>
        Valor: <strong>R$ {Number(plan.price).toFixed(2).replace('.', ',')}</strong>
      </p>

      <div className={styles.fakeQrCode}>
        <p>[ QR Code gerado ]</p>
      </div>

      <button onClick={handlePixPayment} className={styles.payButton}>
        Pagar com Pix
      </button>
    </div>
  )
}
