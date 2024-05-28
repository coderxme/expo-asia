import { useState, useEffect } from 'react';
import { motion as m } from "framer-motion";
import { Button, Form, Input, message, Select } from 'antd'; // Import Select component from antd
import WaveBackground from '../../../../assets/wave-background.png';
import { apiEmailConfirmation } from '../../../../api/api';
import GetToken from '../../../../context/GetToken';
import Loader from './Loader';
import EmailForm from './EmailForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import useAdminStore from '../../../../store/adminStore';
const { Option } = Select; 
const recaptchaKey = import.meta.env.VITE_RECAPTCHAKEY

export default function RegisterForm() {
    const csrfToken = GetToken();
   
    const { 
       forumData,
       fetchForum, 
       fetchEvent,
       fetchMilitaryBranch,
       fetchCompany,

       companyData,
       eventData,
       militaryBranchData
        } = useAdminStore()
    const [formData, setFormData] = useState({
        participant_details: {
          first_name: "",
          last_name: "",
          middle_name: "",
          email: "",
          designation: "",
          company_org:"",
          company_org_other: "",
          military_branch: "",
          military_branch2: null,
          phone_no: "",
          forum:null,
          preferred_attendance:""
        }
      });  

      const [isSubmitting, setIsSubmitting] = useState(false);
      const [registrationSuccess, setRegistrationSuccess] = useState(false);
      const [isSendingEmail, setIsSendingEmail] = useState(false);
      const [hashedCode, setHashedCode] = useState("");
      const [captchaValue, setCaptchaValue] = useState(null);
      const [showOtherInput, setShowOtherInput] = useState({
        company: false,
        military: false
    });
      useEffect(() => {
        fetchForum()
        fetchEvent()
        fetchMilitaryBranch()
        fetchCompany()
      },[fetchForum, fetchEvent, fetchMilitaryBranch, fetchCompany])

    
     



        const handleRegisterParticipantSubmit = () => {
            // Perform client-side validation

            if (formData.participant_details.forum === null) {
              message.error("Please select Forum Attending");
              return;
            }

            if (formData.participant_details.preferred_attendance === '') {
              message.error("Please select Preferred Attendance");
              return;
            }


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

            
            if (formData.participant_details.company_org === '' && formData.participant_details.company_org_other === '') {
              message.error("Please select Unit/Organization/Company Name or specify it if 'Others'");
              return;
          }
        
            if (formData.participant_details.phone_no === '') {
              message.error("Contact Number field cannot be empty");
              return;
            }
        
        
          
        
            if (formData.participant_details.email === '') {
              message.error("Email address field cannot be empty");
              return;
            }


           

            if (formData.participant_details.forum === '') {
              message.error("Please select forum");
              return;
            }

        
            // If the validation passes, just log the formData
            console.log('Form Data:', formData);
            setRegistrationSuccess(true);
            sendEmailConfirmation()
          };
        
         
          
          const sendEmailConfirmation = async () => {
            try {
              setIsSendingEmail(true);
              const response = await axios.post(apiEmailConfirmation, {
                SendEmailConfirmation: {
                  email_to_send: formData.participant_details.email
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
            }  finally {
              setIsSendingEmail(false);
            }
          };
        
        
          const handleSelectChange = (name, value) => {
            const updatedFormData = { ...formData };
            if (name === 'military_branch2') {
                setShowOtherInput((prevState) => ({ ...prevState, military: value === "others" }));
                updatedFormData.participant_details[name] = value === "others" ? "" : value;
            } else if (name === 'company_org') {
                setShowOtherInput((prevState) => ({ ...prevState, company: value === "others" }));
                updatedFormData.participant_details[name] = value === "others" ? "" : value;
            }
            setFormData(updatedFormData);
        };
        
          const handleFormChangeParticipant = (e) => {
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
         <h1>Register as Participant</h1>
         <Link className='buttonLink' to={'/expo-asia/exhibitor'}>
           <Button className='buttonLinkRegister'>Register as Sponsor/Exhibitor instead</Button>
         </Link>
         </div>
         <Form layout="vertical">
             <Form.Item label="Which forum will you be attending?" required className='mt-3'>
                    <Select defaultValue={formData.participant_details.forum} onChange={(value) => handleFormChangeParticipant({ target: { name: 'participant_details.forum', value } })}>
                       {forumData.map((item, index) => (
                         <Option key={index} value={item.id}>{item.name}</Option>
                       ))}
                    </Select>
                </Form.Item>

                <Form.Item label="What is your preferred mode of attendance for the event?" required className='mt-3'>
                    <Select defaultValue={formData.participant_details.preferred_attendance} onChange={(value) => handleFormChangeParticipant({ target: { name: 'participant_details.preferred_attendance', value } })}>
                         <Option  value="online">Online</Option>
                         <Option  value="f2f">Face-to-Face (F2F)</Option>
                    </Select>
                </Form.Item>  
                
              <Form.Item label="Last Name" required>
                <Input placeholder="Enter Last Name" value={formData.participant_details.last_name} name="participant_details.last_name" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="First Name" required>
                <Input placeholder="Enter First Name" value={formData.participant_details.first_name} name="participant_details.first_name" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="Middle Name">
                <Input placeholder="Enter Middle Name" value={formData.participant_details.middle_name} name="participant_details.middle_name" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="Designation" required>
                <Input placeholder="Enter Designation" value={formData.participant_details.designation} name="participant_details.designation" onChange={handleFormChangeParticipant} />
              </Form.Item>
              {/* <Form.Item label="Unit/Organization/Company Name" required>
                <Input placeholder="Enter Organization/Company Name" value={formData.participant_details.company_org_other} name="participant_details.company_org_other" onChange={handleFormChangeParticipant} />
              </Form.Item> */}
              
              <Form.Item label="Unit/Organization/Company Name" required>
                            <Select defaultValue={formData.participant_details.company_org} onChange={(value) => handleSelectChange('company_org', value)}>
                                {companyData.map((item, index) => (
                                    <Option key={index} value={item.id}>{item.name}</Option>
                                ))}
                                <Option value="others">Others</Option>
                            </Select>
                            {showOtherInput.company && (
                                 <Form.Item  className='mt-1 border rounded-lg p-3 '   label="Please specify your organization">
                                  <Input 
                                    placeholder="Enter your organization..." 
                                    value={formData.participant_details.company_org_other} 
                                    name="participant_details.company_org_other" 
                                    onChange={handleFormChangeParticipant} 
                                />
                                </Form.Item>
                            )}
                        </Form.Item>

              <Form.Item label="Military Branch of Service" className='mt-3'>
                    <Select defaultValue={formData.participant_details.military_branch2}  onChange={(value) => handleSelectChange('military_branch2', value)}>
                    <Option  value={null}>Not Applicable</Option>
                       {militaryBranchData.map((item, index) => (
                         <Option key={index} value={item.id}>{item.abrv}</Option>
                       ))}
                      <Option value="others">Others</Option> 
                    </Select>
                    {showOtherInput.military && (
                              <Form.Item className='mt-1 border rounded-lg p-3' label="Please specify your military branch">
                                  <Input 
                                    placeholder="Enter your military branch" 
                                    value={formData.participant_details.military_branch} 
                                    name="participant_details.military_branch" 
                                    onChange={handleFormChangeParticipant} 
                                />
                              </Form.Item>
                            )}
                </Form.Item>

              <Form.Item label="Contact Number" required
                  rules={[
                    { required: true, message: 'Please input Contact Number!' },
                    { pattern: /^09\d{9}$/, message: 'Contact Number must start with "09" and be 11 digits long!' },
                  ]}>
                <Input placeholder="Enter Contact Number" value={formData.participant_details.phone_no} name="participant_details.phone_no" onChange={handleFormChangeParticipant} />
              </Form.Item>
          
              <Form.Item label="Email address" required>
                <Input placeholder="Enter Email address" value={formData.participant_details.email} name="participant_details.email" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item>
                <Button loading={isSubmitting} type="primary" className='w-full bg-[#11385D] text-white font-opensans' onClick={handleRegisterParticipantSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Register"}
                </Button>
              </Form.Item>
            </Form>
      </div>
      )}
      {isSendingEmail && <Loader />} 
       {registrationSuccess && !isSendingEmail && 
        <EmailForm 
        sendEmailConfirmation={sendEmailConfirmation}
          hashedCode={hashedCode} 
          email={formData.participant_details.email} 
          formDataReg={formData}
          captchaValue={captchaValue}
          eventData={eventData}
        />}
  </m.div>
  )
}
