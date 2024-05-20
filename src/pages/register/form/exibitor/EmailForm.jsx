/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { apiEmailConfirmation,  apiRegisterCompany, apiQRCode} from '../../../../api/api';
import axios from 'axios';
import Congrats from './Congrats';

export default function EmailForm({ email, csrfToken, hashedCode, formDataReg, captchaValue }) {
  const [otp, setOTP] = useState('');
  const [isResendOTP, setIsResendOTP] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false); 
  const [successInvite, setSuccessInvite] = useState(false); 
  const [uniqueID, setUniqueID] = useState("");
  const [qrCode, setQrCode] = useState("");

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
    company_details: {
      name: formDataReg?.company_details?.name || "",
      address: formDataReg?.company_details?.address || "",
      phone:formDataReg?.company_details?.phone || "",
      telephone:formDataReg?.company_details?.telephone || "",
      email:formDataReg?.company_details?.email ||  "",
      website:formDataReg?.company_details?.website || "",
      is_exhibitor: true,
      company_org_type:1,
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

  const handleSubmitOTP = async () => {
    setIsResendOTP(true);
    try {
      const response = await axios.post(apiEmailConfirmation, formData, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      console.log("test:", response);
      message.success("OTP Sent to your email");
    } catch (error) {
      console.error('Error adding register:', error);
      message.error("Failed to register");
    } finally {
      setIsResendOTP(false);
    }
  };

 

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
      handleCompanySubmit()
  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error("Incorrect OTP");
      } else {
        message.error("Failed to verify");
      }
    } 
  };

  
  const handleCompanySubmit = async () => {
    setIsVerifying(true);
    try {
      const response = await axios.post(apiRegisterCompany, formInviteData, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });

      setUniqueID(response.data.data.unique_id);
      console.log("Invite Data:", response);
      message.success("Verify successfully!");

        setSuccessInvite(true)

    } catch (error) {
      message.error("Failed to invite");
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
    <div className="emailForm">
      <h2>Verify your Email Address</h2>
      <p>An email with a verification code was just sent to your email address.</p>
      <Form layout="vertical" className='emailFormBox'>
        <Input.OTP length={6} {...sharedProps}
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChangeOTP}
        />
        <div className="emailFormBtn">
          <Button className="btn1" type="text" onClick={handleSubmitOTP} disabled={isResendOTP}>
            {isResendOTP ? "Resending..." : "Resend again"}
          </Button>
          <Button className='btn2' type="primary" onClick={handleVerify}>
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
