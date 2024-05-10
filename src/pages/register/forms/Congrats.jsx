/* eslint-disable react/no-unescaped-entities */
import image from '../../../assets/congrats-check.svg'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Congrats() {
  const navigate = useNavigate()


  const handleFinish = () => {
    navigate("/home")
  }

  return (
    <div className="congratsForm">
        <img src={image} alt="" />
        <h2>Congratulations!  <br /> You're now registered.</h2>
        <h4>Your unique QR code will be sent to your email shortly. <br />
      You can use it to check in at the event venue.</h4>

      <Button className='btn2' type="primary" onClick={handleFinish}>
        Finish
      </Button>
   </div>
  )
}
