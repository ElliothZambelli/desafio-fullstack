import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './screens/Home/Home'
import { PaymentPage } from './screens/Payment/PaymentPage'
import { HistoryPage } from './screens/History/HistoryPage'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  )
}
