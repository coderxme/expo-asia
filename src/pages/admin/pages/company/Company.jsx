import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken';
import useAdminStore from '../../../../store/adminStore';

const Company = () => {
  const { companyData, fetchCompany, deleteCompany, updateCompany, createCompany, setCsrfToken, fetchCompanyType, companyTypeData } = useAdminStore();
  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingCompany, setUpdatingCompany] = useState(null);
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm(); 

  useEffect(() => {
    fetchCompany();
    fetchCompanyType()
    setCsrfToken(csrfToken);
  }, [fetchCompany, fetchCompanyType, setCsrfToken, csrfToken]);

  useEffect(() => {
    if (updatingCompany) {
      updateForm.setFieldsValue(updatingCompany);
    }
  }, [updatingCompany, updateForm]);

  const totalCount = companyData.length;

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
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: Array.from(new Set(companyData.map(item => item.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      filters: companyData.map((item) => ({
        text: item.email,
        value: item.email,
      })),
      onFilter: (value, record) => record.email.includes(value),
      filterSearch: true,
    },
    {
      title: 'Type Name',
      dataIndex: 'company_org_type_details.name',
      render: (text, record) => record.company_org_type_details?.name || "",
      filters: companyData.map((item) => ({
        text: item.company_org_type_details?.name || "",
        value: item.company_org_type_details?.name || "",
      })),
      onFilter: (value, record) => record.company_org_type_details.name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Telephone No',
      dataIndex: 'telephone',
    },
    {
      title: 'Website',
      dataIndex: 'website',
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
            title='Are you sure to delete this company?'
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
    setUpdatingCompany(company);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id, csrfToken);
      message.success('Company deleted successfully');
    } catch (error) {
      console.error('Error deleting company:', error);
      message.error('Failed to delete company');
    }
  };

  const handleUpdate = async (values) => {
    const {
      name,
      email,
      address,
      phone,
      telephone,
      website,
    } = values;

    if (!name || !email || !address || !phone || !telephone || !website) {
      message.error('Please fill in all required fields.');
      return;
    }

    const updatedData = {
      name,
      email,
      address,
      phone,
      telephone,
      website,
    };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingCompany[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateCompany(updatingCompany.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Company updated successfully');
    } catch (error) {
      console.error('Error updating company:', error);
      message.error('Failed to update company');
    }
  };


  const handleCreate = async (values) => {
    const { name, email, address, phone, telephone, website, company_org_type } = values;

    if (!name || !email || !address || !phone || !telephone || !website || !company_org_type) {
      message.error('Please fill in all required fields.');
      return;
    }

    const newCompany = { name, email, address, phone, telephone, website, company_org_type };

    try {
      await createCompany(newCompany, csrfToken);
      setCreateVisible(false);
      message.success('Company created successfully');
      fetchCompany()
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating company:', error);
      message.error('Failed to create company');
    }
  };


 
  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Company</h1>
        <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Company
          </Button>
          <Button
            icon={<ReloadOutlined />}
            type='primary'
            onClick={fetchCompany}
            className='buttonTableHeader'
          >
            Refresh
          </Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={companyData}
        scroll={{ x: 1300, y:450}}
        footer={() => (
          <div className='totalBox'>
            <p className='total'>
              Total: <b>{totalCount}</b>
            </p>
          </div>
        )}
      />
      <Modal
        title='Update Company'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={updateForm}
          onFinish={handleUpdate}
          initialValues={{
            name: updatingCompany ? updatingCompany.name : '',
            email: updatingCompany ? updatingCompany.email : '',
            address: updatingCompany ? updatingCompany.address : '',
            phone: updatingCompany ? updatingCompany.phone : '',
            telephone: updatingCompany ? updatingCompany.telephone : '',
            website: updatingCompany ? updatingCompany.website : '',
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
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Invalid email format!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Address'
            name='address'
            rules={[{ required: true, message: 'Please input address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Phone No'
            name='phone'
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Telephone' name='telephone'>
            <Input />
          </Form.Item>
          <Form.Item label='Website' name='website'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button className='buttonCreate' type='primary' htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Form Create  */}
      <Modal
        title='Create Company'
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
          <Form.Item
            label='Address'
            name='address'
            rules={[{ required: true, message: 'Please input address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Phone No'
            name='phone'
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Telephone' name='telephone'>
            <Input />
          </Form.Item>
          <Form.Item label='Website' name='website'>
            <Input />
          </Form.Item>
          <Form.Item
            label='Company Type'
            name='company_org_type'
            rules={[{ required: true, message: 'Please select company type!' }]}
          >
            <Select placeholder="Select a company type">
              {companyTypeData.map((type) => (
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

export default Company;
