import RegisterForm from './Form'
import image from '../../../../assets/carouselImage.png'
import '../../Register.css'
import Footer from '../../../footer/Footer'
import { useState, useEffect } from 'react'
import ModalLoader from './ModalLoader'

export default function Register() {
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

  return (
    <div className='registerContainer'>
    <ModalLoader visible={isOffline} />
        <div className="registerHeader">
            <img src={image} alt="image" />
            <p>Join the biggest Pre-Anniversary celebration of the Philippine Air Force <br />
              June 13-14, 2024 | Marriott Grand Ballroom Manila <br />
              <b>Air Force Symposium & Expo 2024</b></p>
        </div>
        <div className="registerContainerForm">
          <RegisterForm />
        </div>
        <Footer />
    </div>
  )
}
