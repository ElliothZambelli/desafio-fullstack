import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './screens/Home/Home'
import { PaymentPage } from './screens/Payment/PaymentPage'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  )
}
