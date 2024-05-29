import React from 'react'
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';

export default function CreateForm({ createForm, handleCreate, rolesData }) {
  return (
    <Form
    form={createForm}
    className='mt-10'
    onFinish={handleCreate}
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
     type='password'
     rules={[{ required: true, message: 'Please input password!' }]}
   >
     <Input.Password/>
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

   <Form.Item>
     <Button className='buttonCreate' type='primary' htmlType='submit'>
       Create
     </Button>
   </Form.Item>
 </Form>
  )
}
