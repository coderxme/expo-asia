import { Form, Input } from 'antd';

export default function ChangePassForm({ passwordForm }) {
  return (
    <Form
      className='mt-5'
      form={passwordForm}
      layout="vertical"
      name="change_password_form"
    >
      <Form.Item
        name="current_password"
        label="Current Password"
        rules={[{ required: true, message: 'Please input your current password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="password"
        label="New Password"
        rules={[
          { required: true, message: 'Please input your new password!' },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
            message: 'Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="password2"
        label="Confirm New Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your new password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
}
