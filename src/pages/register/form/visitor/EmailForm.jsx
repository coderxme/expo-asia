/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { apiEmailConfirmation,  apiRegisterParticipant, apiQRCode} from '../../../../api/api';
import axios from 'axios';
import Congrats from './Congrats';
import GetToken from '../../../../context/GetToken';

export default function EmailForm({ email,  hashedCode, formDataReg, captchaValue, sendEmailConfirmation }) {
  const csrfToken = GetToken()
  const [otp, setOTP] = useState('');
  const [isResendOTP, setIsResendOTP] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false); 
  const [successInvite, setSuccessInvite] = useState(false); 
  const [uniqueID, setUniqueID] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData] = useState({
    SendEmailConfirmation: {
      email_to_send: email
    }
  });

  const [formInviteData, setFormInviteData] = useState({
    invite_details: {
      custom_msg: "This is a test",
      event: 1
    },
    g_recaptcha_response: captchaValue,
    participant_details: {
      forum: formDataReg?.participant_details?.forum || null,
      first_name: formDataReg?.participant_details?.first_name || "",
      last_name: formDataReg?.participant_details?.last_name || "",
      middle_name: formDataReg?.participant_details?.middle_name || "",
      email: formDataReg?.participant_details?.email || "",
      designation: formDataReg?.participant_details?.designation || "",
      company_org_other: formDataReg?.participant_details?.company_org_other || "",
      military_branch: formDataReg?.participant_details?.military_branch || "",
      phone_no: formDataReg?.participant_details?.phone_no || "",
    }
  });

  
  


  console.log('Form Data:', formDataReg);
  console.log("uniqueID:", uniqueID);


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

  // const handleSubmitOTP = async () => {
  //   setIsResendOTP(true);
  //   try {
  //     const response = await axios.post(apiEmailConfirmation, formData, {
  //       headers: {
  //         'X-CSRFToken': csrfToken
  //       }
  //     });
  //     console.log("test:", response);
  //     message.success("OTP Sent to your email");
  //   } catch (error) {
  //     console.error('Error adding register:', error);
  //     message.error("Failed to register");
  //   } finally {
  //     setIsResendOTP(false);
  //   }
  // };

 

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
      setVerificationSuccess(true); // Set verification success
      handleRegisterParticipantSubmit()
  
    } catch (error) {
        message.error("Incorrect OTP");
    } 
  };

  
  const handleRegisterParticipantSubmit = async () => {
    setIsVerifying(true);
    try {
      const response = await axios.post(apiRegisterParticipant, formInviteData, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });

      setUniqueID(response.data.data.unique_id);
      console.log("Invite Data:", response);
      message.success("Verify successfully!");
      setSuccessInvite(true)
    } catch (error) {
      setErrorMessage(`${error.response.data.error.participant_details.email} Please refresh the page to register again!`);
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
