import { useState, useEffect } from 'react';
import { motion as m } from "framer-motion";
import { Button, Form, Input, message, Select } from 'antd'; // Import Select component from antd
import WaveBackground from '../../../../assets/wave-background.png';
import { apiCompanOrgType, apiEmailConfirmation } from '../../../../api/api';
import GetToken from '../../../../context/GetToken';
import Loader from './Loader';
import EmailForm from './EmailForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaKey = import.meta.env.VITE_RECAPTCHAKEY


export default function RegisterForm() {
    const csrfToken = GetToken();
    const [companyFormData, setCompanyFormData] = useState({
      invite_details: {
        custom_msg: "This is a test",
        event: 1
      },    
      company_details: {
        name: "",
        address: "",
        phone: "",
        telephone: "",
        email: "",
        website: "",
        is_exhibitor: true,
        company_org_type: null,
      }
    });

      const [isSubmitting, setIsSubmitting] = useState(false);
      const [registrationSuccess, setRegistrationSuccess] = useState(false);
      const [isSendingEmail, setIsSendingEmail] = useState(false);
      const [hashedCode, setHashedCode] = useState("");
      const [captchaValue, setCaptchaValue] = useState(null);
      const [companyOrgDataType, setCompanyOrgDataType] = useState([])


      const fetchCompanyOrgData = async() => {
        const res = await axios.get(apiCompanOrgType)
        setCompanyOrgDataType(res.data.success)
        console.log("Company org type:", res.data.success)
      }

      useEffect(() => {
         fetchCompanyOrgData()
      },[])


        const handleCompanyRegister = () => {
            // Perform client-side validation
            if (companyFormData.company_details.name === '') {
              message.error("Company Name field cannot be empty");
              return;
            }

            if (companyFormData.company_details.email === '') {
              message.error("Email field cannot be empty");
              return;
            }
                  
          console.log('Company Form Data:', companyFormData);
            setRegistrationSuccess(true);
            sendEmailConfirmation()
          };
        
         
          
          const sendEmailConfirmation = async () => {
            try {
              setIsSendingEmail(true);
              const response = await axios.post(apiEmailConfirmation, {
                SendEmailConfirmation: {
                  email_to_send: companyFormData.company_details.email
                }
              }, {
                headers: {
                  'X-CSRFToken': csrfToken
                }
              });
              console.log(response);
              setHashedCode(response.data.success);
              message.success("OTP sent to your email successfully!");
            } catch (error) {
              console.error('Error sending email confirmation:', error);
              message.error("Failed to send OTP");
            } finally {
              setIsSendingEmail(false);
            }
          };
        
        
        
        
          const handleFormChangeCompany = (e) => {
            const { name, value } = e.target;
            const updatedFormData = { ...companyFormData };
            if (name.startsWith('company_details.')) {
              // Extract the nested field name
              const nestedFieldName = name.split('.')[1];
              // Update the nested field
              updatedFormData.company_details[nestedFieldName] = value;
            } else {
              // Update regular fields
              updatedFormData[name] = value;
            }
            setCompanyFormData(updatedFormData);
          };


          const onChange = (value) => {
            console.log("Captcha value:", value);
            setTimeout(() => {
              setCaptchaValue(value);
            },2000)
        };

  return (
    <m.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} className='registerFormWrapper' >
    { !captchaValue && (
        <ReCAPTCHA
            sitekey={recaptchaKey}
            onChange={onChange}
            className='bg-[#00000043] fixed z-40 w-full h-full top-0 flex items-center justify-center'
        />
    )}
      <img src={WaveBackground} className='waveBackground' alt="wave background" />
    
      {!isSendingEmail && !registrationSuccess && (
    
     <div className="registerForm">
        <div className="registerFormHeader">
        <h1>Register as Sponsor/Exhibitor</h1>
         <Link className='buttonLink' to={'/expo-asia/participant'}>
           <Button className='buttonLinkRegister'>Register as Participant instead</Button>
         </Link>
        </div>
         <Form layout="vertical">
     
            <Form.Item label="Name" required>
              <Input placeholder="Enter Name" value={companyFormData.company_details.name} name="company_details.name" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Address" required>
              <Input placeholder="Enter Address" value={companyFormData.company_details.address} name="company_details.address" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Phone" required>
              <Input placeholder="Enter Phone" value={companyFormData.company_details.phone} name="company_details.phone" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Telephone">
              <Input placeholder="Enter Telephone" value={companyFormData.company_details.telephone} name="company_details.telephone" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input placeholder="Enter Email" value={companyFormData.company_details.email} name="company_details.email" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Website" >
              <Input placeholder="Enter Website" value={companyFormData.company_details.website} name="company_details.website" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Company Type" required>
                    <Select defaultValue={companyFormData.company_details.company_org_type} onChange={(value) => handleFormChangeCompany({ target: { name: 'company_details.company_org_type', value } })}>
                       {companyOrgDataType.map((item, index) => (
                         <Option key={index} value={item.id}>{item.name}</Option>
                       ))}
                    </Select>
                </Form.Item>
            <Button
              type="primary"
              onClick={handleCompanyRegister}
              disabled={isSubmitting}
              className='w-full bg-[#11385D] text-white font-opensans' 
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </Button>
          </Form>
      </div>
      )}
      {isSendingEmail && <Loader />} 

       {registrationSuccess && !isSendingEmail && 
        <EmailForm 
        sendEmailConfirmation={sendEmailConfirmation}
          hashedCode={hashedCode} 
          email={companyFormData.company_details.email} 
          formDataReg={companyFormData}
          captchaValue={captchaValue}

        />}
  </m.div>
  )
}
