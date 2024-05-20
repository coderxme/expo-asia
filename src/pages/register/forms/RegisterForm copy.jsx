/* eslint-disable react-hooks/exhaustive-deps */
import {  Form, Select } from 'antd'; // Import Select component from antd
import WaveBackground from '../../../assets/wave-background.png';
import { useLocation } from 'react-router-dom';
import { motion as m } from "framer-motion";
import VisitorForm from './visitor/RegisterForm'
import ExibitorForm from './exibitor/RegisterForm'
import { useState, useEffect } from 'react';

// import ReCAPTCHA from 'react-google-recaptcha';

const { Option } = Select; // Destructure Option from Select

const RegisterForm = () => {
  const location = useLocation();
  const user = location.state.user;
  const [formType, setFormType] = useState(user); // State to track form type

  
  
  return (
    <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className='registerFormWrapper'
    >
      <div className="absolute z-30">
      </div>
      <img src={WaveBackground} className='waveBackground' alt="wave background" />
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
            <VisitorForm />
          )}
          {formType === 'exhibitor' && (
            <ExibitorForm />
          )}
        </div>
    </m.div>
  );
};

export default RegisterForm;
