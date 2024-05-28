import { useState } from 'react';
import { Button, Form, Input, Select } from 'antd'; // Import Select component from antd
const { Option } = Select;

export default function CreateForm({ onFinish, companyData, createForm, militaryBranchData, forumData }) {


  return (
    <Form
      className='mt-10'
      onFinish={onFinish}
      form={createForm}
      layout='vertical'
    >
      <Form.Item label="What is your preferred mode of attendance for the event?" name="preferred_attendance" required className='mt-3'>
        <Select rules={[{ required: true, message: 'Please select Preferred Attendance' }]}>
          <Option value="online">Online</Option>
          <Option value="f2f">Face-to-Face (F2F)</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Which forum will you be attending?" name="forum" rules={[{ required: true, message: 'Please select Forum' }]}>
        <Select>
          {forumData.map((item, index) => (
            <Option key={index} value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label='Last Name' name='last_name' rules={[{ required: true, message: 'Please input last name!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label='First Name' name='first_name' rules={[{ required: true, message: 'Please input first name!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label='Middle Name' name='middle_name'>
        <Input />
      </Form.Item>

      <Form.Item label='Designation' name='designation' rules={[{ required: true, message: 'Please input designation!' }]}>
        <Input />
      </Form.Item>
      

      <Form.Item label="Unit/Organization/Company Name" name="company_org">
        <Select onChange={(value) => handleSelectChange('company', value)}>
            {companyData.map((item, index) => (
            <Option key={index} value={item.id}>{item.name}</Option>
            ))}
        </Select>
      </Form.Item>


        <Form.Item label="Military Branch of Service" name="military_branch2" className='mt-3'>
            <Select onChange={(value) => handleSelectChange('military', value)}>
                <Option value={null}>Not Applicable</Option>
                {militaryBranchData.map((item, index) => (
                <Option key={index} value={item.id}>{item.abrv}</Option>
                ))}
            </Select>
       
            </Form.Item>


      <Form.Item
        label='Contact Number'
        name='phone_no'
        rules={[
          { required: true, message: 'Please input Contact Number!' },
          { pattern: /^09\d{9}$/, message: 'Contact Number must start with "09" and be 11 digits long!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Email Address' name='email'
        rules={[
          { required: true, message: 'Please input email!' },
          { type: 'email', message: 'Invalid email format!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button className='buttonCreate' type='primary' htmlType='submit'>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}
