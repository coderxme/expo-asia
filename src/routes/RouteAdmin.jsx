import { Routes, Route } from 'react-router-dom'
import Admin from '../pages/admin/Admin'
import Admin2 from '../pages/admin2/Admin'
import AutoLogout from '../auth/AutoLogout'
import SessionTimeOut from '../auth/SessionTimeOut'

export default function App() {

  return (
    <AutoLogout>
      <SessionTimeOut /> 
      <Routes>
      <Route index element={<Admin />} />
      <Route path='/dashboard' element={<Admin />} />
      <Route path='/dashboard-2' element={<Admin2 />} />
    </Routes>
    </AutoLogout>
  )
}
