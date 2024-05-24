import { Routes, Route } from 'react-router-dom'
import Admin from '../pages/admin/Admin'
import Account from '../pages/admin/pages/account/Account'


export default function App() {
  return (
    <Routes>
      <Route index element={<Admin />} />
      <Route path='/dashboard' element={<Admin />} />
    </Routes>
  )
}
