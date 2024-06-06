/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Form, Input, Select } from 'antd'; // Import Select component from antd
const { Option } = Select;

export default function CreateForm({ onFinish,  createForm, militaryBranchData, forumData }) {
  const [isOtherMilitaryBranch, setIsOtherMilitaryBranch] = useState(false);

  const handleSelectChange = (type, value) => {
    if (type === 'military') {
      setIsOtherMilitaryBranch(value === 'others');
      if (value == 'others') {
        createForm.setFieldsValue({ military_branch2: "" });
      }
    }
  };



  // const handleSelectChange = (type, value) => {
  //   if (type === 'company') {
  //     setIsOtherCompany(value === 'others');
  //     if (value === 'others') {
  //       createForm.setFieldsValue({ company_org: "" });
  //     }
  //   } else if (type === 'military') {
  //     setIsOtherMilitaryBranch(value === 'others');
  //     if (value == 'others') {
  //       createForm.setFieldsValue({ military_branch2: "" });
  //     }
  //   }
  // };
 

  return (
    <Form
      className='mt-10'
      onFinish={onFinish}
      form={createForm}
      layout='vertical'
    >
      {/* <Form.Item label="What is your preferred mode of attendance for the event?" name="preferred_attendance" required className='mt-3'>
        <Select rules={[{ required: true, message: 'Please select Preferred Attendance' }]}>
          <Option value="online">Online</Option>
          <Option value="f2f">Face-to-Face (F2F)</Option>
        </Select>
      </Form.Item> */}

      <Form.Item label="Which forum will you be attending?" name="forum" rules={[{ required: true, message: 'Please select Forum' }]}>
        <Select>
          {forumData.map((item, index) => (
            <Option key={index} value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label='Last Name' name='last_name' 
      rules={[
        { required: true, message: 'Please input last name!' },
        {min: 2, message: 'Last name must be at least 2 characters long!'},
        {max: 15, message: 'Last name must be at most 15 characters long!'},
      ]}>
        <Input />
      </Form.Item>

      <Form.Item label='First Name' name='first_name' rules={[
        { required: true, message: 'Please input first name!' },
        {min: 2, message: 'First name must be at least 2 characters long!'},
        {max: 15, message: 'First name must be at most 15 characters long!'},
        ]}>
        <Input />
      </Form.Item>

      <Form.Item label='Middle Name' name='middle_name'>
        <Input />
      </Form.Item>

      <Form.Item label='Designation' name='designation' rules={[
        { required: true, message: 'Please input designation!' },
        {min: 4, message: 'Designation must be at least 4 characters long!'},
        {max: 30, message: 'Designation must be at most 30 characters long!'},
      ]}>
        <Input />
      </Form.Item>

      {/* <Form.Item label="Unit/Organization/Company Name" name="company_org">
        <Select onChange={(value) => handleSelectChange('company', value)}>
          {companyData.map((item, index) => (
            <Option key={index} value={item.id}>{item.name}</Option>
          ))}
          <Option value="others">Others</Option>
        </Select>
      </Form.Item> */}

        <Form.Item label="Unit/Organization/Company Name" name='company_org_other' 
        rules={[
          { required: true, message: 'Please specify your company!' },
          {min: 4, message: 'Company name must be at least 4 characters long!'},
          {max: 30, message: 'Company name must be at most 30 characters long!'},

        ]}>
          <Input />
        </Form.Item>

      <Form.Item label="Military Branch of Service" name="military_branch2" className='mt-3'>
        <Select onChange={(value) => handleSelectChange('military', value)}>
          <Option value={null}>Not Applicable</Option>
          {militaryBranchData.map((item, index) => (
            <Option key={index} value={item.id}>{item.abrv}</Option>
          ))}
          <Option value="others">Others</Option>
        </Select>
      </Form.Item>

      {isOtherMilitaryBranch && (
        <Form.Item label='Please specify your military branch' name='military_branch' rules={[
          { required: true, message: 'Please specify your military branch!' },
          {min: 4, message: 'Branch name must be at least 4 characters long!'},
          {max: 30, message: 'Branch name must be at most 30 characters long!'},
          ]}>
          <Input />
        </Form.Item>
      )}

      <Form.Item
        label='Contact Number'
        name='phone_no'
        rules={[
          { required: true, message: 'Please input Contact Number!' },
          { pattern: /^09\d{9}$/, message: 'Contact Number must start with "09" and be 11 digits long!' },
          { max: 11, message: 'Contact Number must be 11 digits long!' },
          { min: 11, message: 'Contact Number must be 11 digits long!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Email Address' name='email'
        rules={[
          { required: true, message: 'Please input email!' },
          { type: 'email', message: 'Invalid email format!' },
          {
            validator(_, value) {
              if (value && !value.includes('@')) {
                return Promise.reject('Email must contain "@" symbol!');
              } else {
                return Promise.resolve();
              }
            },
          },
          {min: 6, message: 'Email must be at least 6 characters long!'},
          {max: 30, message: 'Email must be at most 30 characters long!'},
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


