import React, { useState } from 'react';
import useAdminStore from '../../../../store/adminStore';
import { Modal, Form, Input, message } from 'antd';
import "./Account.css";
import GetToken from "../../../../context/GetToken";
import { useNavigate } from 'react-router-dom';
import { apiMyAccount } from '../../../../api/api';
import axios from 'axios';
import UpdateForm from './form/UpdateForm';
import ButtonUpdate from './button/ButtonUpdate';
import ButtonChangedPass from './button/ButtonChangedPass';
import ChangePassForm from './form/ChangePassForm';

export default function Account() {
  const csrfToken = GetToken();
  const { myAccountData, createMyAccount, fetchMyAccount } = useAdminStore();
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [passwordForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const navigate = useNavigate();

  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  const handlePasswordOk = () => {
    passwordForm.validateFields().then(values => {
      createMyAccount({
        changepass: {
          current_password: values.current_password,
          password: values.password,
          password2: values.password2,
        }
      }, csrfToken);
      message.success("Successfully changed the password");
      setIsPasswordModalVisible(false);
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    }).catch(info => {
      console.log('Validate Failed:', info);
      message.error("Failed to change password");
    });
  };



  const handleSubmitUpdate = () => {
    updateForm.validateFields().then(values => {
      const requestData = {
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
      };
  
      axios.put(apiMyAccount, requestData, {
        headers: {
          'X-CSRFToken': csrfToken, 
        }
      })
      .then(() => {
        message.success("Successfully updated personal information");
        fetchMyAccount()
      })
      .catch(error => {
        console.error("Failed to update personal information:", error);
        message.error("Failed to update personal information");
      });
    }).catch(info => {
      console.log('Validate Failed:', info);
      message.error("Failed to update personal information");
    });
  };

  const handlePasswordCancel = () => {
    setIsPasswordModalVisible(false);
  };


  return (
    <div className='accountContainer'>
      <div className='accountHeader'>
        <h1 className='accountTitle'>Personal Information</h1>
      </div>

      <UpdateForm 
         updateForm={updateForm}
         myAccountData={myAccountData}
      />

      <div className="accountBtnBox">
        <ButtonChangedPass showPasswordModal={showPasswordModal} />
        <ButtonUpdate handleSubmitUpdate={handleSubmitUpdate} />
      </div>

      <Modal
        title="Change Password"
        visible={isPasswordModalVisible}
        onOk={handlePasswordOk}
        onCancel={handlePasswordCancel}
      >
       <ChangePassForm passwordForm={passwordForm} />
      </Modal>

   
    </div>
  );
}
