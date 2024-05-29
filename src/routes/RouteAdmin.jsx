import { Routes, Route } from 'react-router-dom'
import Admin from '../pages/admin/Admin'
import Account from '../pages/admin/pages/account/Account'
import AutoLogout from '../auth/AutoLogout'
import SessionTimeOut from '../auth/SessionTimeOut'


export default function App() {


  return (
    <AutoLogout>
      <SessionTimeOut /> 
      <Routes>
      <Route index element={<Admin />} />
      <Route path='/dashboard' element={<Admin />} />
    </Routes>
    </AutoLogout>
  )
}
