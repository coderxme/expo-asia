import RegisterForm from './forms/RegisterForm'
import image from '../../assets/carouselImage.svg'
import './Register.css'
import Footer from '../footer/Footer'

export default function Register() {
  return (
    <div className='registerContainer'>
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
