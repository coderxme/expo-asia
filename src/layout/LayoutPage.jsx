import { Outlet } from "react-router-dom"  
import Navbar from '../components/navbar/Navbar'
import useFetchCsrfToken from '../hooks/useFetchCsrfToken'

export default function LayoutPage() {
  useFetchCsrfToken();
  return (
    <div className="mainContainer">
      <Navbar />
      <Outlet />
    </div>
  )
}
