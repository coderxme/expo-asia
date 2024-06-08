import { Outlet } from "react-router-dom"
import { useFetchData } from '../hooks/participantHook'
import Loader from '../components/loader/Loader'
import ModalLoader from "./ModalLoader";
import { useState, useEffect } from 'react'
import useFetchCsrfToken from '../hooks/useFetchCsrfToken'


export default function LayoutAdmin() {
  useFetchCsrfToken();
  const { isLoading, error } = useFetchData();

  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error.message}</div>;
}

  return (
    <div className="mainContainer">
      <ModalLoader visible={isOffline} />
      <Outlet />
    </div>
  )
}
