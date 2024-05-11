/* eslint-disable react/prop-types */
import { useState} from 'react';
import { Button, Form, Input, message } from 'antd';
import { apiEmailConfirmation, apiQRCode } from '../../../api/api';
import axios from 'axios';
import Congrats from './Congrats';

export default function EmailForm({ email, csrfToken, hashedCode, uniqueID }) {
    const [otp, setOTP] = useState('');
    const [isResendOTP, setIsResendOTP] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false); // Track verification status
    const [formData ] = useState({
        SendEmailConfirmation: {
            email_to_send: email
            }
      });

    const [qrCode, setQrCode] = useState("")

      console.log("uniqueID:", uniqueID)

    const handleSubmitOTP = async () => {
        setIsResendOTP(true);
        try {
          const response = await axios.post(apiEmailConfirmation, formData, {
            headers: {
              'X-CSRFToken': csrfToken
            }
          });
          console.log("test:", response);
          message.success("OTP Sent to your email")
        } catch (error) {
          console.error('Error adding register:', error);
          message.error("Failed to register");
        } finally {
          setIsResendOTP(false);
        }
      };

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
        console.error('Failed to get qr code:', error);
    } finally {
        setIsResendOTP(false);
    }
};



      const handleVerify = async () => {
        setIsVerifying(true);
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
            message.success("Verify successfully!");
            // If verification is successful, call handleSubmitQRCode
            if (response.status === 200) {
                handleSubmitQRCode();
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                message.error("Incorrect OTP");
            } else {
                message.error("Failed to verify");
            }
        } finally {
            setIsVerifying(false);
        }
    };
    


  
    const handleChangeOTP = (number) => {
        console.log('otp:', number);
        setOTP(number)
      };

    const sharedProps = {
        handleChangeOTP,
      };

  if (verificationSuccess) {
    return <Congrats qrCode={qrCode} />;
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
        <Button  className="btn1" type="text" onClick={handleSubmitOTP} disabled={isResendOTP}>
           {isResendOTP ? "Resending..." : "Resend again"}
        </Button>

        <Button className='btn2' type="primary"  onClick={handleVerify}>
           {isVerifying ? "Verifying..." : "Verify"}
        </Button>
        </div>
    </Form>
      </div>
  );
}
