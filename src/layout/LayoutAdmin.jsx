import { Outlet } from "react-router-dom"
import { useFetchData } from '../hooks/participantHook'
import Loader from '../components/loader/Loader'

export default function LayoutAdmin() {
  const { isLoading, error } = useFetchData();

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error.message}</div>;
}

  return (
    <div className="mainContainer">
      <Outlet />
    </div>
  )
}
