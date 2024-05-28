import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

export default function UpdateForm({ updateForm, handleUpdate, updatingParticipant, companyData,  militaryBranchData }) {
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
      company_org_other: updatingParticipant
        ? updatingParticipant.company_org_other
        : '',
        company_org: updatingParticipant
        ? updatingParticipant.company_org
        : '',
      military_branch: updatingParticipant
        ? updatingParticipant.military_branch
        : '',
      email: updatingParticipant ? updatingParticipant.email : '',
      phone_no: updatingParticipant ? updatingParticipant.phone_no : '',
    }}
  >

    <Form.Item
      label='Last Name'
      name='last_name'
      rules={[{ required: true, message: 'Please input last name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label='First Name'
      name='first_name'
      rules={[{ required: true, message: 'Please input first name!' }]}
    >
      <Input />
    </Form.Item>
   
    <Form.Item label='Middle Name' name='middle_name'>
      <Input />
    </Form.Item>
 
    <Form.Item
      label='Designation'
      name='designation'
      rules={[{ required: true, message: 'Please input designation!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item label="Unit/Organization/Company Name" name="company_org" rules={[{ required: true, message: 'Please select organization!' }]}>
            <Select>
                {companyData.map((item, index) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                ))}
            </Select>
        </Form.Item>

        <Form.Item label="Military Branch of Service" name="military_branch2" className='mt-3'>
            <Select>
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
   
    <Form.Item>
      <Button className='buttonCreate' type='primary' htmlType='submit'>
        Update
      </Button>
    </Form.Item>
  </Form>
  )
}
