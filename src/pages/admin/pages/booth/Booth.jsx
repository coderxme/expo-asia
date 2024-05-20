import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';

const Booth = () => {
  const { boothData, fetchBooths, deleteBooth, updateBooth, setCsrfToken } = useAdminStore();
  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [updatetingBooth, setUpdatingBooth] = useState(null);


  useEffect(() => {
    fetchBooths();
    setCsrfToken(csrfToken);
  }, [fetchBooths, setCsrfToken, csrfToken]);

  const totalCount = boothData.length;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: boothData.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Event Name',
      dataIndex: 'event_details.name',
      render: (text, record) => record.event_details.name,
      filters: Array.from(new Set(boothData.map(item => item.event_details.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.event_details.name.includes(value),
      filterSearch: true,
    },
    
    {
      title: 'Event Description',
      dataIndex: 'event_details.description',
      render: (text, record) => record.event_details.description,
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
            title='Are you sure to delete this booth?'
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

  const handleEdit = (booth) => {
    setUpdatingBooth(booth);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooth(id, csrfToken);
      message.success('Booth deleted successfully');
    } catch (error) {
      console.error('Error deleting Booth:', error);
      message.error('Failed to delete Booth');
    }
  };

  const handleUpdate = async (values) => {
    const {
      name,
   
    } = values;

    if (
      !name
    
    ) {
      message.error('Please fill in all required fields.');
      return;
    }

    const updatedData = {
      name,
     
    };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatetingBooth[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateBooth(updatetingBooth.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Booth updated successfully');
    } catch (error) {
      console.error('Error updating Booth:', error);
      message.error('Failed to update Booth');
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className='font-montserrat text-lg'>Booth</h1>
        <Button
          icon={<ReloadOutlined />}
          type='primary'
          onClick={fetchBooths}
          style={{ marginBottom: 16 }}
        >
          Refresh
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={boothData}
        scroll={{ x: 1300 }}
        footer={() => (
          <div style={{ textAlign: 'left' }}>
            <p className='text-sm font-opensans border-b'>
              Total: <b>{totalCount}</b>
            </p>
          </div>
        )}
      />
      <Modal
        title='Update Participant'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          onFinish={handleUpdate}
          initialValues={{
            name: updatetingBooth ? updatetingBooth.name : '',
         
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
            <Button type='primary' htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Booth;
