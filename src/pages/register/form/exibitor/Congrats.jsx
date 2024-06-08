/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import image from '../../../../assets/congrats-check.png';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Congrats() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/");
  };


  return (
          <div className="congratsForm">
          <img className='check' src={image} alt="Checkmark" />
          <h2>Congratulations! <br /> You're now registered.</h2>
          <p>
            Your registration has been successfully completed, and we are excited to <br /> 
            have you join us for this event. Our Expo Asia team will be reaching out to <br />
            you shortly to discuss further details about the event. You can expect to <br /> 
            hear from us within the next few  days.
            </p>
            <p>
            In the meantime, if you have any immediate questions or need assistance, <br />
             please do not hesitate to contact us at <br />
              <b>+63 966 944 8936</b> or <b>sales@expoasia.online</b>
            </p>
        
            <h4>
            <b>Note:</b> If you do not see an email from us in your inbox, please check your <br /> junk or spam folder. Sometimes, emails may be filtered incorrectly. <br /> Thank you!
            </h4>
            <Button className='btn2' type="primary" onClick={handleFinish}>
              Finish
            </Button>
          </div>
      
  );
}
