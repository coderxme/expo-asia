/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import GetToken from '../../../../context/GetToken';
import { Button, Form, Input, message, Select } from 'antd'; // Import Select component from antd
import EmailForm from './EmailForm';
import Loader from './Loader';
import { apiCompanyOrgType, apiEmailConfirmation} from '../../../../api/api';

const { Option } = Select; // Destructure Option from Select

const RegisterForm = () => {
  const csrfToken = GetToken();

  const [uniqueID, setUniqueID] = useState("");
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
      company_org_type: 1,
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [hashedCode, setHashedCode] = useState("");

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

  const handleCompanyRegister = () => {
    console.log('Company Form Data:', companyFormData);
    setRegistrationSuccess(true);
    sendEmailConfirmation()
  };

 
  
  const sendEmailConfirmation = async () => {
    try {
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
  





  return (

     <>
      {!isSendingEmail && !registrationSuccess && (
            <Form layout="vertical">
            <Form.Item label="Name">
              <Input placeholder="Enter Name" value={companyFormData.company_details.name} name="company_details.name" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Address">
              <Input placeholder="Enter Address" value={companyFormData.company_details.address} name="company_details.address" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Phone">
              <Input placeholder="Enter Phone" value={companyFormData.company_details.phone} name="company_details.phone" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Telephone">
              <Input placeholder="Enter Telephone" value={companyFormData.company_details.telephone} name="company_details.telephone" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Email">
              <Input placeholder="Enter Email" value={companyFormData.company_details.email} name="company_details.email" onChange={handleFormChangeCompany} />
            </Form.Item>
            <Form.Item label="Website">
              <Input placeholder="Enter Website" value={companyFormData.company_details.website} name="company_details.website" onChange={handleFormChangeCompany} />
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
      )}
      {isSendingEmail && <Loader />} 
      {registrationSuccess && !isSendingEmail && 
        <EmailForm 
          hashedCode={hashedCode} 
          email={companyFormData.company_details.email} 
          uniqueID={uniqueID} 
          csrfToken={csrfToken}
          formDataReg={companyFormData}
        />}
     </>
  );
};

export default RegisterForm;
