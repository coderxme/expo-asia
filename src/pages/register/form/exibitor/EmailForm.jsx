/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Form, Input, message, Modal, Spin } from 'antd';
import { apiEmailConfirmation, apiRegisterCompany} from '../../../../api/api';
import axios from 'axios';
import Congrats from './Congrats';
import useCsrfTokenStore from '../../../../store/csrfTokenStore';

export default function EmailForm({  email, hashedCode, formDataReg,  sendEmailConfirmation }) {
  const csrfToken = useCsrfTokenStore((state) => state.csrfToken);
  const [otp, setOTP] = useState('');
  const [isResendOTP, setIsResendOTP] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [successInvite, setSuccessInvite] = useState(false); 
  const [uniqueID, setUniqueID] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  
  console.log('FormData of Sponsors/Exhibitors:', formDataReg);


  const handleVerify = async () => {
    try {
      const response = await axios.post(apiEmailConfirmation, {
        VerifyEmailConfirmation: {
          email_sent_to: email,
          code: otp,
          hashed_code: hashedCode,
        }
      }, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      console.log("test:", response);
      handleCompanySubmit()
  
    } catch (error) {
        message.error("Incorrect confirmation code!");
        console.error(error);
    } 
  };

  
  const handleCompanySubmit = async () => {
    setIsVerifying(true);
    try {
      const response = await axios.post(apiRegisterCompany, formDataReg, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });

      setUniqueID(response.data.data.unique_id);
      console.log("Invite Data:", response);
      message.success("Verify successfully!");

        setSuccessInvite(true)

    } catch (error) {
      setErrorMessage(`${error.response.data.error.company_details.email} Please refresh the page to register again!`);
      setErrorModalVisible(true);
    }  finally {
      setIsVerifying(false);
    }
  };


  

  const handleChangeOTP = (number) => {
    console.log('otp:', number);
    setOTP(number);
  };

  const sharedProps = {
    handleChangeOTP,
  };
  if (successInvite) {
    return <Congrats  uniqueID={uniqueID}  />;
  }

  return (
 <>
    <Modal title="Error" visible={errorModalVisible} onCancel={() => setErrorModalVisible(false)} footer={[
          <Button key="close" onClick={() => setErrorModalVisible(false)}>
            Close
          </Button>
        ]}>

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
          <Button loading={isVerifying} className='btn2' type="primary" onClick={handleVerify}>
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </Form>
    </div>
 </>
  );
}
