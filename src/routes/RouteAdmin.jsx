import { Routes, Route } from 'react-router-dom'
import Admin from '../pages/admin/Admin'


export default function App() {
  return (
    <Routes>
      <Route index element={<Admin />} />
      <Route path='/admin' element={<Admin />} />
    </Routes>
  )
}
