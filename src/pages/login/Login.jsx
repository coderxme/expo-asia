/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import axios from 'axios';
import { apiLogin } from '../../api/api';
import GetToken from '../../context/GetToken';
import { Input, Button, Form, message } from 'antd';
import './Login.css'
import { Link } from 'react-router-dom';

export default function Login() {
  const csrfToken = GetToken();
  const [loading, setLoading] = useState(false);
  const { authState, dispatch } = useAuth();
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post(apiLogin, formData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      message.success("Login success!")

      if (response.data.error) {
        message.error(response.data.error);
      } else {
        const { token } = response.data;
        dispatch({ type: 'LOGIN', payload: { user: formData.username, token } });
        setTimeout(() => {
          navigate('/expo-asia-admin/admin');
        },2000)
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        message.error('Wrong credentials. Please try again.');
      } else {
        message.error('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    handleSubmit(values);
  };

  return (
    <div className='loginContainer'>
      <Form
        className='loginForm'
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button className='w-full' htmlType="submit" loading={loading} type='primary'>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <Link to={"/"}>
           <Button  className='mt-2'>Go to Home</Button>
          </Link>
        </Form.Item>
      </Form>

     
    </div>
  );
}
