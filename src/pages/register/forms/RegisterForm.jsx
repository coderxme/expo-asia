/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { apiCompanyOrgType, apiEmailConfirmation, apiRegisterParticipantNoCaptcha } from '../../../api/api';
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
  const [uniqueID, setUniqueID] = useState("")

  const [formData, setFormData] = useState({
    invite_details:{
      custom_msg:"This is a test",
      event:1
    },
    participant_details:{
      first_name: "",
      last_name:"",
      middle_name:"",
      email: "",
      designation:"",
      company_org_other:"",
      military_branch:"",
      phone_no:"",
      viber_no:"",
      whatsapp_no:"",
    }
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

    if (formData.participant_details.last_name === '') {
      message.error("Last Name field cannot be empty");
      return;
    }

    if (formData.participant_details.first_name === '') {
      message.error("First Name field cannot be empty");
      return;
    }


    if (formData.participant_details.designation === '') {
      message.error("Designation field cannot be empty");
      return;
    }

    if (formData.participant_details.phone_no === '') {
      message.error("Mobile No field cannot be empty");
      return;
    }

    if (formData.participant_details.viber_no === '') {
      message.error("Viber No field cannot be empty");
      return;
    }
    

    if (formData.participant_details.whatsapp_no === '') {
      message.error("WhatsApp No field cannot be empty");
      return;
    }

    
    if (formData.participant_details.email === '') {
      message.error("Email address field cannot be empty");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await axios.post(apiRegisterParticipantNoCaptcha, formData, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      console.log("test:", response);
      setUniqueID(response.data.data.unique_id)
      setRegistrationSuccess(true); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error && error.response.data.error.participant_details && error.response.data.error.participant_details.email) {
        // If the error is related to an existing email
        const errorMessage = error.response.data.error.participant_details.email[0];
        message.error(errorMessage);
      } else {
        message.error("Failed to register");
      }
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
    if (registrationSuccess && formData.participant_details.email) {
      sendEmailConfirmation(formData.participant_details.email);
    }
  }, [registrationSuccess, formData.email]);


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };
    // Check if the field belongs to the participant_details object
    if (name.startsWith('participant_details.')) {
      // Extract the nested field name
      const nestedFieldName = name.split('.')[1];
      // Update the nested field
      updatedFormData.participant_details[nestedFieldName] = value;
    } else {
      // Update regular fields
      updatedFormData[name] = value;
    }
    setFormData(updatedFormData);
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
              <Input placeholder="Enter Last Name"  value={formData.participant_details.last_name} name="participant_details.last_name" onChange={handleFormChange}/>
            </Form.Item>
            <Form.Item label="First Name" required>
              <Input placeholder="Enter First Name" value={formData.participant_details.first_name} name="participant_details.first_name" onChange={handleFormChange} />
            </Form.Item>
            <Form.Item label="Middle Name">
              <Input placeholder="Enter Middle Name" value={formData.participant_details.middle_name} name="participant_details.middle_name" onChange={handleFormChange} />
            </Form.Item>

            <Form.Item label="Designation" required>
              <Input placeholder="Enter Designation" value={formData.participant_details.designation} name="participant_details.designation" onChange={handleFormChange} />
            </Form.Item>

            <Form.Item label="Organization/Company Name" required>
              <Input placeholder="Enter Organization/Company Name" value={formData.participant_details.company_org_other} name="participant_details.company_org_other" onChange={handleFormChange} />
            </Form.Item>

            <Form.Item label="Military Branch of Service" required>
              <Input placeholder="Enter Military Branch of Service" value={formData.participant_details.military_branch} name="participant_details.military_branch" onChange={handleFormChange} />
            </Form.Item>

            <Form.Item label="Mobile No" required>
              <Input placeholder="Enter Mobile No" value={formData.participant_details.phone_no} name="participant_details.phone_no" onChange={handleFormChange} />
            </Form.Item>


            <Form.Item label="Viber No" required>
              <Input placeholder="Enter Viber No" value={formData.participant_details.viber_no} name="participant_details.viber_no" onChange={handleFormChange} />
            </Form.Item>

       

            <Form.Item label="WhatsApp No" required>
              <Input placeholder="Enter WhatsApp No" value={formData.participant_details.whatsapp_no} name="participant_details.whatsapp_no" onChange={handleFormChange} />
            </Form.Item>

            <Form.Item label="Email address" required>
              <Input placeholder="Enter Email address" value={formData.participant_details.email} name="participant_details.email" onChange={handleFormChange} />
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
      {registrationSuccess && !isSendingEmail && 
         <EmailForm hashedCode={hashedCode} 
         email={formData.participant_details.email} 
         uniqueID={uniqueID} 
         csrfToken={csrfToken}
         />}
    </div>
  );
};

export default RegisterForm;
