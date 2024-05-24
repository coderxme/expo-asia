import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken';
import useAdminStore from '../../../../store/adminStore';

const CompanyType = () => {
  const { companyTypeData, fetchCompanyType, deleteCompanyType, updateCompanyType, createCompanyType, setCsrfToken } = useAdminStore();
  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingType, setUpdatingType] = useState(null);
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm(); 

  useEffect(() => {
    fetchCompanyType();
    setCsrfToken(csrfToken);
  }, [fetchCompanyType, setCsrfToken, csrfToken]);

  useEffect(() => {
    if (updatingType) {
      updateForm.setFieldsValue(updatingType);
    }
  }, [updatingType, updateForm]);


  const totalCount = companyTypeData.length;

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
      filters: Array.from(new Set(companyTypeData.map(item => item.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Key',
      dataIndex: 'key',
      filters: companyTypeData.map((item) => ({
        text: item.key,
        value: item.key,
      })),
      onFilter: (value, record) => record.key.includes(value),
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
            title='Are you sure to delete this company type?'
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

  const handleEdit = (company) => {
    setUpdatingType(company);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompanyType(id, csrfToken);
      message.success('Company type deleted successfully');
    } catch (error) {
      console.error('Error deleting company type:', error);
      message.error('Failed to delete company type');
    }
  };

  const handleUpdate = async (values) => {
    const {
      name,
    
    } = values;

    if (!name ) {
      message.error('Please input company type name.');
      return;
    }

    const updatedData = {
      name,
    };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingType[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateCompanyType(updatingType.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Company type updated successfully');
    } catch (error) {
      console.error('Error updating company type:', error);
      message.error('Failed to update company type');
    }
  };


  const handleCreate = async (values) => {
    const { name } = values;

    if (!name ) {
      message.error('Please input company type name.');
      return;
    }

    const newCompany = { name };

    try {
      await createCompanyType(newCompany, csrfToken);
      setCreateVisible(false);
      message.success('Company type created successfully');
      fetchCompanyType()
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating company type:', error);
      message.error('Failed to create company type');
    }
  };

  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Company Type</h1>
        <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Company Type
          </Button>
          <Button
            icon={<ReloadOutlined />}
            type='primary'
            onClick={fetchCompanyType}
            className='buttonTableHeader'
          >
            Refresh
          </Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={companyTypeData}
        scroll={{ x: 1300 }}
        footer={() => (
          <div style={{ textAlign: 'left' }}>
            <p className='total'>
              Total: <b>{totalCount}</b>
            </p>
          </div>
        )}
      />
      <Modal
        title='Update Company Type'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={updateForm}
          onFinish={handleUpdate}
          initialValues={{
            name: updatingType ? updatingType.name : '',
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
            <Button className='buttonCreate' type='primary' htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Create Company Type'
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
            label='Name'
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

export default CompanyType;
