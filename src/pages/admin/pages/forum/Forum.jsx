import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken';
import useAdminStore from '../../../../store/adminStore';

const Forum = () => {
  const { forumData, deleteForum, updateForum,  createForum } = useAdminStore();
  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingForum, setUpdatingForum] = useState(null);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm(); 

  const totalCount = forumData.length;

  useEffect(() => {
    if (updatingForum) {
      form.setFieldsValue(updatingForum);
    }
  }, [updatingForum, form]);

  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record) => {
        const date = new Date(record.created_at);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      filters: forumData.map((item) => ({
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
          <Popconfirm
            title='Are you sure to delete this forum?'
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button size='small' icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleEdit = (forum) => {
    setUpdatingForum(forum);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteForum(id, csrfToken);
      message.success('Forum deleted successfully');
    } catch (error) {
      console.error('Error deleting Forum:', error);
      message.error('Failed to delete Forum');
    }
  };

  const handleUpdate = async (values) => {
    if (!values.name) {
      message.error('Please enter forum.');
      return;
    }

    const updatedData = { name: values.name };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingForum[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateForum(updatingForum.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Forum updated successfully');
    } catch (error) {
      console.error('Error updating Forum:', error);
      message.error('Failed to update Forum');
    }
  };

  const handleCreate = async (values) => {
    if (!values.name) {
      message.error('Please fill in name.');
      return;
    }

    const newForum = { name: values.name };

    try {
      await createForum(newForum, csrfToken);
      setCreateVisible(false);
      message.success('Forum created successfully');
      // fetchForum();
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating Forum:', error);
      message.error('Failed to create Forum');
    }
  };

  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Forum</h1>
        <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Forum
          </Button>
          <Button
            icon={<ReloadOutlined />}
            type='primary'
            // onClick={fetchForum}
            className='buttonTableHeader'
          >
            Refresh
          </Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={forumData}
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
        title='Update Forum'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleUpdate}
          initialValues={{
            name: updatingForum ? updatingForum.name : '',
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
        title='Create Forum'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
        <Form form={createForm} onFinish={handleCreate} className='mt-10'>
          <Form.Item
            label='Forum Name'
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

export default Forum;
