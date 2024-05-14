import { Outlet } from "react-router-dom"  
import Navbar from '../components/navbar/Navbar'

export default function LayoutPage() {
  return (
    <div className="mainContainer">
      <Navbar />
      <Outlet />
    </div>
  )
}
