/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

export default function UpdateForm({ updateForm, handleUpdate, updatingParticipant,  militaryBranchData, forumData, category  }) {
  const [isOtherMilitaryBranch, setIsOtherMilitaryBranch] = useState(false);

  useEffect(() => {
    if (updatingParticipant) {
      setIsOtherMilitaryBranch(updatingParticipant.military_branch === 'others');
    }
  }, [updatingParticipant]);

  const handleSelectChange = (type, value) => {
  if (type === 'military') {
      setIsOtherMilitaryBranch(value === 'others');
      if (value === 'others') {
        updateForm.setFieldsValue({ military_branch2: "" });
      }
    }
  };

  return (
    <Form
      layout='vertical'
      form={updateForm}
      className='mt-10'
      onFinish={handleUpdate}
      initialValues={{
        last_name: updatingParticipant ? updatingParticipant.last_name : '',
        first_name: updatingParticipant ? updatingParticipant.first_name : '',
        middle_name: updatingParticipant ? updatingParticipant.middle_name : '',
        designation: updatingParticipant ? updatingParticipant.designation : '',
        company_org_other: updatingParticipant ? updatingParticipant.company_org_other : '',
        military_branch2: updatingParticipant ? updatingParticipant.military_branch2 : '',
        email: updatingParticipant ? updatingParticipant.email : '',
        phone_no: updatingParticipant ? updatingParticipant.phone_no : '',
        forum: updatingParticipant ? updatingParticipant.forum : '',
        // preferred_attendance: updatingParticipant ? updatingParticipant.preferred_attendance : '',
      }}
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


      
        <Form.Item label="Category" name="participant_categ" rules={[
          { required: true, message: 'Please select category' }]}>
              <Select>
                {category.map((item, index) => (
                  <Option key={index} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>


      <Form.Item
        label='Last Name'
        name='last_name'
        rules={[
          { required: true, message: 'Please input last name!' },
          {min: 2, message: 'Last name must be at least 2 characters long!'},
          {max: 15, message: 'Last name must be at most 15 characters long!'},
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='First Name'
        name='first_name'
        rules={[
          { required: true, message: 'Please input first name!' },
          {min: 2, message: 'First name must be at least 2 characters long!'},
          {max: 15, message: 'First name must be at most 15 characters long!'},
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Middle Name' name='middle_name'>
        <Input />
      </Form.Item>

      <Form.Item
        label='Designation'
        name='designation'
        rules={[
          { required: true, message: 'Please input designation!' },
          {min: 4, message: 'Designation must be at least 4 characters long!'},
          {max: 30, message: 'Designation must be at most 30 characters long!'},
        ]}
      >
        <Input />
      </Form.Item>


        <Form.Item
          label='Unit/Organization/Company Name'
          name='company_org_other'
          rules={[
            { required: true, message: 'Please input Unit/Organization/Company Name!' },
            {min: 4, message: 'Company name must be at least 4 characters long!'},
            {max: 30, message: 'Company name must be at most 30 characters long!'},
          ]}

        >
          <Input />
        </Form.Item>

      <Form.Item
        label="Military Branch of Service"
        name="military_branch2"
        className='mt-3'
      >
        <Select onChange={(value) => handleSelectChange('military', value)}>
          {militaryBranchData.map((item, index) => (
            <Option key={index} value={item.id}>{item.abrv}</Option>
          ))}
          <Option value="others">Others</Option>
        </Select>
      </Form.Item>

      {isOtherMilitaryBranch && (
        <Form.Item
          label='Please specify your military branch'
          name='military_branch'
          rules={[
            { required: true, message: 'Please specify your military branch!' },
            {min: 4, message: 'Branch name must be at least 4 characters long!'},
            {max: 30, message: 'Branch name must be at most 30 characters long!'},
          ]}
        >
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

      <Form.Item
        label='Email'
        name='email'
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}

