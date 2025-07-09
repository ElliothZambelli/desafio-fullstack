import { useContractHistory } from '../../hooks/useContractHistory'
import styles from '../../styles/HistoryPage.module.css'

export function HistoryPage() {
  const { history, loading } = useContractHistory()

  if (loading) {
    return (
      <div className={styles.historyWrapper}>
        <p className={styles.loading}>Carregando histórico...</p>
      </div>
    )
  }

  return (
    <div className={styles.historyWrapper}>
      <h1><strong>Histórico de Contratos</strong></h1>

      {history.length === 0 ? (
        <p className={styles.empty}>Nenhum contrato encontrado.</p>
      ) : (
        <div className={styles.tableContainer}>
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
        </div>
      )}
    </div>
  )
}
