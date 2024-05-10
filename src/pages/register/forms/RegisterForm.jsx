/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { apiCompanyOrgType, apiEmailConfirmation, apiRegisteParticipantNoCaptcha } from '../../../api/api';
import axios from 'axios';
import GetToken from '../../../context/GetToken';
import { Button, Form, Input, message, Select } from 'antd'; // Import Select component from antd
import EmailForm from './EmailForm';
import Loader from './Loader';
import WaveBackground1 from '../../../assets/waves-l.svg'
import WaveBackground2 from '../../../assets/waves-r.svg'
import { useLocation } from 'react-router-dom';

const { Option } = Select; // Destructure Option from Select

const RegisterForm = () => {
  const csrfToken = GetToken();

  const location = useLocation()

  const user = location.state.user;

  console.log("user:", location)
 

  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation:"",
    company_org_other:"",
    military_branch:"",
    phone_no:"",
    viber_no:"",
    whatsapp_no:"",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [hashedCode, setHashedCode] = useState("");
  const [formType, setFormType] = useState(user); // State to track form type

  useEffect(() => {
    const fetchCompanyType = async () => {
      try {
        const response = await axios.get(apiCompanyOrgType);
        console.log("test:", response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanyType();
  }, []);

  const handleRegisterSubmit = async () => {
    // Perform client-side validation
    const fullName = (`${firstName} ${middleName} ${lastName}`).trim();

    if (lastName === '') {
      message.error("Last Name field cannot be empty");
      return;
    }

    if (firstName === '') {
      message.error("First Name field cannot be empty");
      return;
    }


    if (formData.designation === '') {
      message.error("Designation field cannot be empty");
      return;
    }

    if (formData.phone_no === '') {
      message.error("Mobile No field cannot be empty");
      return;
    }

    if (formData.viber_no === '') {
      message.error("Viber No field cannot be empty");
      return;
    }
    
    if (formData.viber_no === '') {
      message.error("Viber No field cannot be empty");
      return;
    }

    if (formData.whatsapp_no === '') {
      message.error("WhatsApp No field cannot be empty");
      return;
    }

    
    if (formData.email === '') {
      message.error("Email address field cannot be empty");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await axios.post(apiRegisteParticipantNoCaptcha, { ...formData, name: fullName }, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      console.log("test:", response);
      setRegistrationSuccess(true); 
    } catch (error) {
      console.error('Error adding register:', error);
      message.error("Failed to register");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const sendEmailConfirmation = async (emailToSend) => {
    setIsSendingEmail(true);
    try {
      const response = await axios.post(apiEmailConfirmation, {
        SendEmailConfirmation: {
          email_to_send: emailToSend
        }
      }, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      console.log(response);
      setHashedCode(response.data.success)
      message.success("OTP sent to your email successfully!");
    } catch (error) {
      console.error('Error sending email confirmation:', error);
      message.error("Failed to send OTP");
    } finally {
      setIsSendingEmail(false);
    }
  };

  useEffect(() => {
    if (registrationSuccess && formData.email) {
      sendEmailConfirmation(formData.email);
    }
  }, [registrationSuccess, formData.email]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='registerFormWrapper'>
      <img src={WaveBackground1}  className='waveBackground1' alt="wave background" />
      <img src={WaveBackground2}  className='waveBackground2' alt="wave background" />
      {!isSendingEmail && !registrationSuccess && (
        <div className="registerForm">
        <h1>Register</h1>
        <Form layout="vertical">
        <Form.Item label="Register As">
        <Select defaultValue={user === "visitor" || user === "exhibitor" ? user : 'visitor'} onChange={(value) => setFormType(value)}>
          <Option value="visitor">Visitor</Option>
          <Option value="exhibitor">Sponsor/Exhibitor</Option>
        </Select>


        </Form.Item>
        </Form>
        {formType === 'visitor' && (
          <Form layout="vertical">
            <Form.Item label="Last Name" required>
              <Input placeholder="Enter Name"  value={lastName}  onChange={(e) => setLastName(e.target.value)} />
            </Form.Item>
            <Form.Item label="First Name" required>
              <Input placeholder="Enter Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Middle Name">
              <Input placeholder="Enter Name" value={middleName}onChange={(e) => setMiddleName(e.target.value)} />
            </Form.Item>

            <Form.Item label="Designation" required>
              <Input placeholder="Enter Designation" value={formData.designation} name="designation" onChange={handleFormChange} />
            </Form.Item>

            <Form.Item label="Organization/Company Name" required>
              <Input placeholder="Enter Organization/Company Name" value={formData.company_org_other} name="company_org_other" onChange={handleFormChange} />
            </Form.Item>

            <Form.Item label="Military Branch of Service" required>
              <Input placeholder="Enter Military Branch of Service" value={formData.military_branch} name="military_branch" onChange={handleFormChange} />
            </Form.Item>

            <Form.Item label="Mobile No" required>
              <Input placeholder="Enter Mobile No" value={formData.phone_no} name="phone_no" onChange={handleFormChange} />
            </Form.Item>


            <Form.Item label="Viber No" required>
              <Input placeholder="Enter Viber No" value={formData.viber_no} name="viber_no" onChange={handleFormChange} />
            </Form.Item>

       

            <Form.Item label="WhatsApp No" required>
              <Input placeholder="Enter WhatsApp No" value={formData.whatsapp_no} name="whatsapp_no" onChange={handleFormChange} />
            </Form.Item>

            <Form.Item label="Email address" required>
              <Input placeholder="Enter Email address" value={formData.email} name="email" onChange={handleFormChange} />
            </Form.Item>

            <Form.Item >
              <Button  type="primary" onClick={handleRegisterSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
            </Form.Item>
          </Form>
        )}
        {formType === 'exhibitor' && ( 
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input placeholder="Enter Name" value={formData.name} name="name" onChange={handleFormChange} />
            </Form.Item>
            
              <Button defaultHoverBg="#000" type="primary" onClick={handleRegisterSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
          </Form>
        )}
      </div>
      )}
      {isSendingEmail && <Loader />} 
      {registrationSuccess && !isSendingEmail && <EmailForm hashedCode={hashedCode} email={formData.email} csrfToken={csrfToken}/>}
    </div>
  );
};

export default RegisterForm;
