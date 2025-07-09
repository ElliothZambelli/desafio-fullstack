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

  async function handlePixPayment() {
    await createContract(plan.id)
    alert('Pagamento realizado com sucesso!')
    navigate('/')
  }

  return (
    <div className={styles.paymentContainer}>
      <h1>Pagamento via Pix</h1>

      <p>
        Você está contratando o plano: <strong>{plan.description}</strong>
      </p>
      <p>
        Valor: <strong>R$ {Number(plan.price).toFixed(2).replace('.', ',')}</strong>
      </p>

      <div className={styles.fakeQrCode}>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=Plano%20${plan.id}%20-%20R$${plan.price}&size=200x200`}
          alt="QR Code Pix Simulado"
        />
      </div>

      <p style={{ fontFamily: 'monospace', marginTop: '1rem' }}>
        23790.12345 60000.123456 78901.123456 1 90000000000000
      </p>

      <button onClick={handlePixPayment} className={styles.payButton}>
        Pagar com Pix
      </button>
    </div>
  )
}
