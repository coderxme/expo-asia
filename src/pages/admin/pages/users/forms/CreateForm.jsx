/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';

const { Option } = Select

export default function CreateForm({ createForm, handleCreate, rolesData, isVerifying }) {
  return (
    <Form
    form={createForm}
    className='mt-10'
    onFinish={handleCreate}
    initialValues={{
      send_email: true,
    }}
    >



   <Form.Item
     label='Username'
     name='username'
     rules={[{ required: true, message: 'Please input username!' }]}
   >
     <Input />
   </Form.Item>

   <Form.Item
  label='Password'
  name='password'
  rules={[
    { required: true, message: 'Please input password!' },
    {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message: 'Password must be at least 8 characters long, containing at least one number, one uppercase letter, and one lowercase letter.',
    }
  ]}
>
  <Input.Password />
</Form.Item>


   <Form.Item
     label='First Name'
     name='first_name'
     rules={[{ required: true, message: 'Please input first name!' }]}
   >
     <Input />
   </Form.Item>

   <Form.Item
     label='Last Name'
     name='last_name'
     rules={[{ required: true, message: 'Please input last name!' }]}
   >
     <Input />
   </Form.Item>



   <Form.Item
     label='Email'
     name='email'
     rules={[
       { required: true, message: 'Please input email!' },
       { type: 'email', message: 'Invalid email format!' },
     ]}
   >
     <Input />
   </Form.Item>

   
   <Form.Item label="Role" name="groups" rules={[{ required: true, message: 'Please select role' }]}>
        <Select>
          {rolesData.map((item, index) => (
            <Option key={index} value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Send Account Credentials to Email" name="send_email">
        <Select>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
        </Select>
      </Form.Item>

   <Form.Item>
     <Button loading={isVerifying} className='buttonCreate' type='primary' htmlType='submit' >
       {isVerifying ? 'Creating...' : 'Create'} 
     </Button>
   </Form.Item>
 </Form>
  )
}
