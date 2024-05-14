import { Outlet } from "react-router-dom"  
export default function LayoutAdmin() {
  return (
    <div className="mainContainer">
      <Outlet />
    </div>
  )
}
