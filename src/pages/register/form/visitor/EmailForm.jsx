/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button, Form, Input, message, Modal, Spin } from 'antd';
import { apiEmailConfirmation,  apiRegisterParticipant, apiQRCode} from '../../../../api/api';
import axios from 'axios';
import Congrats from './Congrats';
import useCsrfTokenStore from '../../../../store/csrfTokenStore';

export default function EmailForm({ hashedCode, formDataReg, sendEmailConfirmation }) {
  const csrfToken = useCsrfTokenStore((state) => state.csrfToken);
  const [otp, setOTP] = useState('');
  const [isResendOTP, setIsResendOTP] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [successInvite, setSuccessInvite] = useState(false); 
  const [uniqueID, setUniqueID] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  console.log('Form Data of Participant:', formDataReg);

  

  const handleSubmitQRCode = async () => {
    try {
      const response = await axios.get(
        `${apiQRCode}${uniqueID}`,
        {}, // pass empty object as the second parameter
        {
          headers: {
            'X-CSRFToken': csrfToken
          }
        }
      );
      console.log("qrcode:", response);
      setQrCode(response.request.responseURL);
    } catch (error) {
      console.error('Failed to get QR code:', error);
    } 
  };


  useEffect(() => {
    if (successInvite) {
      handleSubmitQRCode()
    }
  }, [handleSubmitQRCode]);


  const handleVerify = async () => {
    try {
      const response = await axios.post(apiEmailConfirmation, {
        VerifyEmailConfirmation: {
          email_sent_to: formDataReg.participant_details.email,
          code: otp,
          hashed_code: hashedCode,
        }
      }, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      console.log("Verify Test:", response);
      handleRegisterParticipantSubmit()
    } catch (error) {
        message.error("Incorrect confirmation code!");
        console.log(error);
    } 
  };

  const handleChangeOTP = (number) => {
    console.log('otp:', number);
    setOTP(number);
    
  };

  const sharedProps = {
    handleChangeOTP,
  };

  
  const handleRegisterParticipantSubmit = async () => {
    setIsVerifying(true);
    try {
      const response = await axios.post(apiRegisterParticipant, formDataReg, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });

      setUniqueID(response.data.data.unique_id);
      console.log("Invite Data:", response);
      message.success("Verify successfully!");
      setSuccessInvite(true)
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.response.data.error.participant_details.email} Please refresh the page to register again!`);
      setErrorModalVisible(true);
      message.error("Failed to verify");
    }  finally {
      setIsVerifying(false);
    }
  };


  

 
  if (successInvite) {
    return <Congrats qrCode={qrCode}  uniqueID={uniqueID}  />;
  }

  return (
   <>
     <Modal
        title="Error"
        visible={errorModalVisible}
        onCancel={() => setErrorModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setErrorModalVisible(false)}>
            Close
          </Button>
        ]}
      >
        <p>{errorMessage}</p>
        <Button type="primary" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </Modal>

      <Modal
        title="Verifying..."
        visible={isVerifying}
        footer={null}
        closable={false}
        centered
      >
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <p style={{ marginTop: 20 }}>Please wait while we verify your details...</p>
        </div>
      </Modal>

    <div className="emailForm">
      <h2>Verify your Email Address</h2>
      <p>An email with a verification code was just sent to your email address.</p>
      <p><b>Note:</b> If you do not see an email from us in your inbox, please check <br />
      your junk or spam folder. Sometimes, emails may be filtered incorrectly. <br />
        Thank you!
      </p>
      <Form layout="vertical" className='emailFormBox'>
        <Input.OTP length={6} {...sharedProps}
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChangeOTP}
        />
        <div className="emailFormBtn">
          <Button className="btn1" type="text" onClick={sendEmailConfirmation} disabled={isResendOTP}>
            {isResendOTP ? "Resending..." : "Resend again"}
          </Button>
          <Button disabled={isVerifying} loading={isVerifying} className='btn2' type="primary" onClick={handleVerify}>
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </Form>
    </div>
   </>
  );
}
