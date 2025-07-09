import { useContractHistory } from '../../hooks/useContractHistory'
import styles from './HistoryPage.module.css'

export function HistoryPage() {
  const { history, loading } = useContractHistory()

  if (loading) {
    return <p>Carregando histórico...</p>
  }

  return (
    <div className={styles.historyWrapper}>
      <h1>Histórico de Contratos</h1>
      {history.length === 0 ? (
        <p>Nenhum contrato encontrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Plano</th>
              <th>Preço original</th>
              <th>Crédito aplicado</th>
              <th>Valor pago</th>
              <th>Data do pagamento</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.plan}</td>
                <td>R$ {item.price.toFixed(2).replace('.', ',')}</td>
                <td>R$ {item.credit_applied.toFixed(2).replace('.', ',')}</td>
                <td>R$ {item.amount_paid.toFixed(2).replace('.', ',')}</td>
                <td>
                  {item.paid_at === 'N/A'
                    ? 'Sem pagamento'
                    : new Date(item.paid_at).toLocaleDateString('pt-BR')}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
