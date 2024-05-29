import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';

const Booth = () => {
  const {myAccountData, companyData, boothData, deleteBooth, updateBooth, createBooth, eventData, fetchBooths } = useAdminStore();
  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingBooth, setUpdatingBooth] = useState(null);
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm();
  const userRole = myAccountData?.roles[0] || ""

  useEffect(() => {
    if (updatingBooth) {
      updateForm.setFieldsValue(updatingBooth);
    }
  }, [updatingBooth, updateForm]);

  const totalCount = boothData.length;

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
      render: (text, record) => record.event_details?.name || "",
      filters: Array.from(new Set(boothData.map(item => item.event_details?.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.event_details?.name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Event Description',
      dataIndex: 'event_details.description',
      render: (text, record) => record?.event_details?.description || "",
    },
    {
      title: 'Company',
      render: (text, record) => {
        if (record.company_org_details) {
          return record.company_org_details
            .map((item) => item.company_org_type_details?.name || "")
            .filter((name) => name)
            .join(", ");
        }
        return "";
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
         {userRole === 'Administrator' && (
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
         )}
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
    const { name, event, company_org } = values;

    if (!name || !event || !company_org) {
      message.error('Please fill in all required fields.');
      return;
    }

    const updatedData = { name, event, company_org };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingBooth[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateBooth(updatingBooth.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Booth updated successfully');
      fetchBooths();
    } catch (error) {
      console.error('Error updating Booth:', error);
      message.error('Failed to update Booth');
    }
  };

  const handleCreate = async (values) => {
    const { name, event, company_org } = values;

    if (!name || !event || !company_org) {
      message.error('Please fill in all required fields.');
      return;
    }

    const newBooth = { name, event, company_org };

    try {
      await createBooth(newBooth, csrfToken);
      setCreateVisible(false);
      message.success('Booth created successfully');
      fetchBooths();
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating booth:', error);
      message.error('Failed to create booth');
    }
  };

  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Booth</h1>
        <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Booth
          </Button>
          <Button
            icon={<ReloadOutlined />}
            type='primary'
            onClick={fetchBooths}
            className='buttonTableHeader'
          >
            Refresh
          </Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={boothData}
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
        title='Update Booth'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={updateForm}
          onFinish={handleUpdate}
          initialValues={{
            name: updatingBooth ? updatingBooth.name : '',
          }}
        >
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please input name!' }]}
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
          <Form.Item>
            <Button type='primary' className='buttonCreate' htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Create Booth'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
        <Form form={createForm} onFinish={handleCreate} className='mt-10'>
          <Form.Item
            label='Booth Name'
            name='name'
            rules={[{ required: true, message: 'Please input name!' }]}
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

export default Booth;
