import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined  } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';
import { apiUsers } from '../../../../api/api';
import axios from 'axios';
import CreateForm from './forms/CreateForm';

const Users = () => {
  const { 
      usersData,
      fetchUsers, 
      deleteUsers, 
      updateUsers,
      rolesData,
      createUsers,
      myAccountData
  } = useAdminStore();

  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingUsers, setUpdatingUsers] = useState(null);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm()
  const userRole = myAccountData?.roles[0] || ""


  useEffect(() => {
    if (updatingUsers) {
      form.setFieldsValue(updatingUsers);
    }
  }, [updatingUsers, form]);


  const totalCount = usersData.length;


  const handleUpdateRole = async (userId, newRole) => {
    try {
      await axios.put(`${apiUsers}${userId}`, { groups: [newRole] }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        }
      });
        message.success("User role updated successfully");
    } catch (error) {
      // Handle errors
      console.error('Error updating category:', error.message);
      message.error("Failed to update User role");
    }
  };

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
      title: 'Role',
      filters: rolesData.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      onFilter: (value, record) => {
        if (record && record.roles && record.roles[0]) {
          return record.roles[0].includes(value);
        }
        return false;
      },
      filterSearch: true,
      render: (value, record) => {
        const role = record.roles && record?.roles[0] || "N/A" ;
        return (
          <Select
            defaultValue={role}
            style={{ width: 150 }}
            onChange={(value) => handleUpdateRole(record.id, value)}
          >
            {rolesData.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        );
      },
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
         {userRole === "Administrator" && (
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
         )}
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
      groups,
    } = values;

    if (
      !password ||
      !username ||
      !first_name ||
      !last_name ||
      !email ||
      !groups

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
      groups: [groups]
     };

    try {
      await createUsers(newUser, csrfToken);
      setCreateVisible(false);
      message.success('User created successfully');
      createForm.resetFields();
      fetchUsers()
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
        <CreateForm 
           createForm={createForm}
           handleCreate={handleCreate}
           rolesData={rolesData}
        />
      </Modal>
    </div>
  );
};

export default Users;
