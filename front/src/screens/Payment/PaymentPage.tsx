import { useLocation, useNavigate } from 'react-router-dom'
import { createContract } from '../../hooks/useContracts'
import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import styles from './PaymentPage.module.css'

export function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { plan, credit_remaining = 0 } = location.state || {}

  const [amountToPay, setAmountToPay] = useState(0)
  const [creditApplied, setCreditApplied] = useState(0)

  useEffect(() => {
    if (!plan) return
    const priceNum = typeof plan.price === 'string' ? parseFloat(plan.price) : plan.price
    const creditNum = typeof credit_remaining === 'string' ? parseFloat(credit_remaining) : credit_remaining
    const finalAmount = Math.max(priceNum - creditNum, 0)
    setAmountToPay(finalAmount)
    setCreditApplied(priceNum - finalAmount)
  }, [plan, credit_remaining])

  if (!plan) {
    return <p>Plano não encontrado.</p>
  }

  function formatCurrency(value: number) {
    return value.toFixed(2).replace('.', ',')
  }

  async function handlePixPayment() {
    await createContract(plan.id)
    alert('Pagamento realizado com sucesso!')
    navigate('/')
  }

  const pixCode = `00020126580014br.gov.bcb.pix0114+556199999999902145204000053039865405802BR59256304ABCD`

  return (
    <div className={styles.paymentContainer}>
      <h1>Pagamento via Pix</h1>
      <p className={styles.planDescription}>
        {plan.description.split('/')[0].trim()}
        <br />
        <span className={styles.planClients}>
          / {plan.numberOfClients} cliente{plan.numberOfClients > 1 ? 's' : ''}
        </span>
      </p>
      <p><strong>Preço original:</strong> R$ {formatCurrency(Number(plan.price))}</p>
      <p><strong>Crédito aplicado:</strong> R$ {formatCurrency(creditApplied)}</p>
      <p><strong>Valor final a pagar:</strong> R$ {formatCurrency(amountToPay)}</p>

      <div className={styles.qrCodeContainer}>
        <QRCodeSVG value={pixCode} size={180} />
        <p className={styles.barcode}>{pixCode}</p>
      </div>

      <button
        onClick={handlePixPayment}
        disabled={amountToPay <= 0}
        className={styles.payButton}
      >
        {amountToPay <= 0 ? 'Crédito suficiente - Plano ativado' : 'Pagar com Pix'}
      </button>
    </div>
  )
}
