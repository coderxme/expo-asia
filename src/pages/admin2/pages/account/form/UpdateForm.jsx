import { Form, Input } from 'antd';

export default function UpdateForm({ updateForm, myAccountData,  }) {
  return (
    <Form
          className='flex flex-col items-start'
          form={updateForm}
          layout="vertical"
          name="update_account_form"
          initialValues={{
            username: myAccountData?.username,
            first_name: myAccountData?.first_name,
            last_name: myAccountData?.last_name,
            email: myAccountData?.email,
          }}
        >

          <div className="flex gap-2">
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ message: 'Please input your first name!' }]}
          >
            <Input className='formInput' />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ message: 'Please input your last name!' }]}
          >
            <Input  className='formInput'  />
          </Form.Item>
          </div>

        <div className="flex gap-2">
        <Form.Item
            name="username"
            label="Username"
            rules={[{ message: 'Please input your username!' }]}
          >
            <Input  className='formInput' />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email', message: 'Please input a valid email address!' }]}
          >
            <Input  className='formInput'/>
          </Form.Item>
        </div>
        </Form>
  )
}
