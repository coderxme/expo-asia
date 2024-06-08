/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Form, Input, Select } from 'antd';

export default function UpdateForm({ updateForm, handleUpdate, eventData, companyData, usersData, isLoading }) {
  return (
    <Form
    form={updateForm}
    onFinish={handleUpdate}
  >
    <Form.Item
      label='Name'
      name='name'
      rules={[{ required: true, message: 'Please input name!' },
        {min: 4, message: 'Name must be at least 4 characters long'},
        {max: 30, message: 'Name must be at most 30 characters long'},
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label='Event'
      name='event'
      rules={[{ required: true, message: 'Please select event!' }]}
    >
      <Select placeholder="Select an event">
        {eventData.map((type) => (
          <Select.Option key={type.id} value={type.id}>
            {type.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item
      label='Company'
      name='company_org'
    >
      <Select mode="multiple" placeholder="Select a Company">
        {companyData.map((type) => (
          <Select.Option key={type.id} value={type.id}>
            {type.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item
      label='User Manager'
      name='user_manager'
    >
      <Select mode="multiple" placeholder="Select a Company">
        {usersData.map((type) => (
          <Select.Option key={type.id} value={type.id}>
            {type.username}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item>
      <Button loading={isLoading} type='primary' className='buttonCreate' htmlType='submit'>
        {isLoading ? 'Updating...' : 'Update'}
      </Button>
    </Form.Item>
  </Form>
  )
}
