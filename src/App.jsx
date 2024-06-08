import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import LayoutPage from './layout/LayoutPage'
import RoutePage from './routes/RoutePage'
import LayoutAdmin from './layout/LayoutAdmin'
import PrivateRoute from './auth/PrivateRoute'
import RouteAdmin from './routes/RouteAdmin'
import 'animate.css';

export default function App() {
  
  return (
   <Router>
     <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<LayoutPage />} >
         <Route path='/expo-asia/*' element={
                <RoutePage />
         } />
      </Route>

      <Route element={<LayoutPage />} >
         <Route path='/*' element={
                <RoutePage />
         } />
      </Route>

      <Route element={<LayoutAdmin />} >
         <Route path='/expo-asia-admin/*' element={
                <PrivateRoute>
                    <RouteAdmin />
                </PrivateRoute>
         } />
      </Route>
    </Routes>
   </Router>
  )
}
