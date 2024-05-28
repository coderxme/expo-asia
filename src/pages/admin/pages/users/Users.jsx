import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined  } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';

const Users = () => {
  const { 
      usersData,
      fetchUsers, 
      deleteUsers, 
      updateUsers,
      createUsers,
      fetchCompany, 
      companyData,
      setCsrfToken 
  } = useAdminStore();

  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingUsers, setUpdatingUsers] = useState(null);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm()

  useEffect(() => {
    fetchUsers();
    fetchCompany();
    setCsrfToken(csrfToken);
  }, [fetchUsers, fetchCompany, setCsrfToken, csrfToken]);

  useEffect(() => {
    if (updatingUsers) {
      form.setFieldsValue(updatingUsers);
    }
  }, [updatingUsers, form]);


  const totalCount = usersData.length;

  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'date_joined',
      key: 'date_joined',
      render: (text, record) => {
        const date = new Date(record.date_joined);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
      },
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
      filters: Array.from(new Set(usersData.map(item => item.username))).map(username => ({
        text: username,
        value: username,
      })),
      onFilter: (value, record) => record.username.includes(value),
      filterSearch: true,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      filters: Array.from(new Set(usersData.map(item => item.first_name))).map(first_name => ({
        text: first_name,
        value: first_name,
      })),
      onFilter: (value, record) => record.first_name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      filters: Array.from(new Set(usersData.map(item => item.last_name))).map(last_name => ({
        text: last_name,
        value: last_name,
      })),
      onFilter: (value, record) => record.last_name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      filters: usersData.map((item) => ({
        text: item.email,
        value: item.email,
      })),
      onFilter: (value, record) => record.email.includes(value),
      filterSearch: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      render: (_, record) => (
        <span className='flex gap-3 flex-col items-center'>
          <Button
            icon={<EditOutlined />}
            size='small'
            onClick={() => handleEdit(record)}
          >
            Update
          </Button>
          <Popconfirm
            title='Are you sure to delete this user?'
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button size='small' icon={<DeleteOutlined />}  danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleEdit = (participant) => {
    setUpdatingUsers(participant);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsers(id, csrfToken);
      message.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting User:', error);
      message.error('Failed to delete User');
    }
  };

  const handleUpdate = async (values) => {
    const {
      first_name,
      last_name,
      email,
      username
    } = values;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !username
    ) {
      message.error('Please fill in all required fields.');
      return;
    }

    const updatedData = {
      first_name,
      last_name,
      email,
      username
    };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingUsers[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateUsers(updatingUsers.id, updatedData, csrfToken);
      setVisible(false);
      message.success('User updated successfully');
    } catch (error) {
      console.error('Error updating User:', error);
      message.error('Failed to update User');
    }
  };


  const handleCreate = async (values) => {
    const {
      password,
      username,
      first_name,
      last_name,
      email,
    } = values;

    if (
      !password ||
      !username ||
      !first_name ||
      !last_name ||
      !email 
    ) {
      message.error('Please fill in all required fields.');
      return;
    }

    const newUser = { 
      password,
      username,
      first_name,
      last_name,
      email,
     };

    try {
      await createUsers(newUser, csrfToken);
      setCreateVisible(false);
      message.success('User created successfully');
      fetchUsers()
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating User:', error);
      message.error('Failed to create User');
    }
  };


  return (
    <div className='tableContainer'>
      <div className="tableHeader">
      <h1 className='tableTitle'>Users</h1>
      <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create User
          </Button>
        <Button
          icon={<ReloadOutlined />}
          type='primary'
          onClick={fetchUsers}
          className="buttonTableHeader"
        >
          Refresh
        </Button>
      </div>
      </div>
      <Table
       bordered
        columns={columns}
        dataSource={usersData}
        scroll={{ x: 1300, y:450 }}
        footer={() => (
          <div style={{ textAlign: 'left' }}>
            <p className='total'>
              Total: <b>{totalCount}</b>
            </p>
          </div>
        )}
      />
      <Modal
        title='Update User'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          className='mt-10'
          onFinish={handleUpdate}
          initialValues={{
            first_name: updatingUsers ? updatingUsers.first_name : '',
            last_name: updatingUsers ? updatingUsers.last_name : '',
            email: updatingUsers ? updatingUsers.email : '',
            username: updatingUsers ? updatingUsers.username : '',
          }}
        >
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
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input username!' }]}
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
      </Modal>


      {/* Create Participant Form */}
      <Modal
        title='Create User'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
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

          <Form.Item>
            <Button className='buttonCreate' type='primary' htmlType='submit'>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
