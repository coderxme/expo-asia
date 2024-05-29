import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken';
import useAdminStore from '../../../../store/adminStore';

const Roles = () => {
  const { rolesData,  deleteRole, updateRole,  createRole, fetchRoles, myAccountData } = useAdminStore();
  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(null);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm(); 

  const totalCount = rolesData.length;

  const userRole = myAccountData?.roles[0] || ""



  useEffect(() => {
    if (updatingRole) {
      form.setFieldsValue(updatingRole);
    }
  }, [updatingRole, form]);

  const columns = [
    // {
    //   title: 'Date/Time',
    //   dataIndex: 'created_at',
    //   key: 'created_at',
    //   render: (text, record) => {
    //     const date = new Date(record.created_at);
    //     const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    //     return date.toLocaleString('en-US', options);
    //   },
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      filters: rolesData.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      onFilter: (value, record) => record.name.includes(value),
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
          {userRole === "Administrator" && (
            <Popconfirm
            title='Are you sure to delete this role?'
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button size='small' icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
          )}
        </span>
      ),
    },
  ];

  const handleEdit = (forum) => {
    setUpdatingRole(forum);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id, csrfToken);
      message.success('Role deleted successfully');
    } catch (error) {
      console.error('Error deleting Role:', error);
      message.error('Failed to delete Role');
    }
  };

  const handleUpdate = async (values) => {
    if (!values.name) {
      message.error('Please enter Role.');
      return;
    }

    const updatedData = { name: values.name };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingRole[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateRole(updatingRole.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Role updated successfully');
      fetchRoles();
    } catch (error) {
      console.error('Error updating Role:', error);
      message.error('Failed to update Role');
    }
  };

  const handleCreate = async (values) => {
    if (!values.name) {
      message.error('Please fill in name.');
      return;
    }

    const newRole = { name: values.name };

    try {
      await createRole(newRole, csrfToken);
      setCreateVisible(false);
      message.success('Role created successfully');
      fetchRoles();
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating Role:', error);
      message.error('Failed to create Role');
    }
  };

  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Role</h1>
        <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Role
          </Button>
          <Button
            icon={<ReloadOutlined />}
            type='primary'
            onClick={fetchRoles}
            className='buttonTableHeader'
          >
            Refresh
          </Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={rolesData}
        scroll={{ x: 1300, y: 450 }}
        footer={() => (
          <div style={{ textAlign: 'left' }}>
            <p className='total'>
              Total: <b>{totalCount}</b>
            </p>
          </div>
        )}
      />
      <Modal
        title='Update Role'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleUpdate}
          initialValues={{
            name: updatingRole ? updatingRole.name : '',
          }}
        >
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' className='buttonCreate' htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Create Role'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
        <Form form={createForm} onFinish={handleCreate} className='mt-10'>
          <Form.Item
            label='Role Name'
            name='name'
            rules={[{ required: true, message: 'Please input name!' }]}
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

export default Roles;
