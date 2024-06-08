import  { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import useAdminStore from '../../../../store/adminStore';
import { PiFilesDuotone } from "react-icons/pi";
import ExportFiles from './export/ExportFiles';
import useCsrfTokenStore from '../../../../store/csrfTokenStore';

const Company = () => {
  const {  myAccountData, companyData,  deleteCompany, updateCompany, createCompany, companyTypeData, fetchCompany } = useAdminStore();
  const csrfToken = useCsrfTokenStore(state => state.csrfToken);
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingCompany, setUpdatingCompany] = useState(null);
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm(); 
  const userRole = myAccountData?.roles[0] || ""
  const [isLoading, setIsLoading] = useState(false);


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
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      render: (text, record) => {
        const date = new Date(record.created_at);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
      },
      width:"200px"

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
      width:"200px"

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
      width:"200px"

    },
    {
      title: 'Type Name',
      dataIndex: 'company_org_type_details.name',
      render: (text, record) => record.company_org_type_details?.name || "N/A",
      filters: Array.from(new Set(companyData.map(item => item.company_org_type_details?.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => {
        const name = record.company_org_type_details?.name;
        return name ? name.includes(value) : false;
      },
      filterSearch: true,
      width: "200px"
    },
    
    {
      title: 'Address',
      dataIndex: 'address',
      width:"200px"
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width:"200px"
    },
    {
      title: 'Telephone No',
      dataIndex: 'telephone',
      width:"200px"
    },
    {
      title: 'Website',
      dataIndex: 'website',
      width:"200px"
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width:"200px",
      fixed: 'right',
      render: (_, record) => (
        <span className='flex gap-11 flex-col items-center'>
          <Button
            icon={<EditOutlined />}
            size='small'
            onClick={() => handleEdit(record)}
          >
            Update
          </Button>
         {userRole === 'Administrator' && (
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
         )}
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
    setIsLoading(true);
    const {
      name,
      email,
      address,
      phone,
      telephone,
      website,
       company_org_type
    } = values;

 

    const updatedData = {
      name,
      email,
      address,
      phone,
      telephone,
      website,
       company_org_type
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
      fetchCompany()
    } catch (error) {
      console.error('Error updating company:', error);
      message.error('Failed to update company');
    } finally {
      setIsLoading(false);
    }
  };


  const handleCreate = async (values) => {
    const { name, email, address, phone, telephone, website, company_org_type } = values;

    const newCompany = { name, email, address, phone, telephone, website, company_org_type };
    setIsLoading(true);
    try {
      await createCompany(newCompany, csrfToken);
      setCreateVisible(false);
      message.success('Company created successfully');
      fetchCompany()
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating company:', error);
      message.error('Faile to create company');
    } finally {
      setIsLoading(false);
    }
  };


 
  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Sponsor/Exhibitor</h1>
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

            <p className='exportWrapper'>
              <span className='exportText'>
                <PiFilesDuotone /> Export:</span>
            <ExportFiles 
              totalOfCompany={totalCount} 
              companyData={companyData} 
            />
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
            company_org_type: updatingCompany ? updatingCompany.company_org_type : '',
          }}
        >
          <Form.Item
            label='Company Name'
            name='name'
             rules={[
              { required: true, message: 'Please input name!' },
              { min: 3, message: 'Company name must be at least 3 characters long!' },
              { max: 20, message: 'Company name must be at most 20 characters long!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Invalid email format!' }, // Check email format
              { min: 6, message: 'Email must be at least 6 characters long!' },
              { max: 50, message: 'Email must be at most 50 characters long!' },
              {
                validator(_, value) {
                  if (value && !value.includes('@')) {
                    return Promise.reject('Email must contain "@" symbol!');
                  } else {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Address'
            name='address'
             rules={[
              { required: true, message: 'Please input address!' },
              { min: 3, message: 'Address must be at least 4 characters long!' },
              { max: 60, message: 'Address must be at most 60 characters long!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Phone No'
            name='phone'
              rules={[
              { required: true, message: 'Please input phone number!' },
              { min: 11, message: 'Phone number must be at least 11 digits' },
              { max: 15, message: 'Phone number must be at most 15 digits' }
            ]}
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
            <Button loading={isLoading} className='buttonCreate' type='primary' htmlType='submit'>
               {isLoading ? 'Updating...' : 'Update'}	
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
            label='Company Name'
            name='name'
            rules={[
              { required: true, message: 'Please input name!' },
              { min: 3, message: 'Company name must be at least 3 characters long!' },
              { max: 20, message: 'Company name must be at most 20 characters long!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Invalid email format!' }, // Check email format
              { min: 6, message: 'Email must be at least 6 characters long!' },
              { max: 50, message: 'Email must be at most 50 characters long!' },
              {
                validator(_, value) {
                  if (value && !value.includes('@')) {
                    return Promise.reject('Email must contain "@" symbol!');
                  } else {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label='Address'
            name='address'
            rules={[
              { required: true, message: 'Please input address!' },
              { min: 3, message: 'Address must be at least 4 characters long!' },
              { max: 60, message: 'Address must be at most 60 characters long!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Phone No'
            name='phone'
            rules={[
              { required: true, message: 'Please input phone number!' },
              { min: 11, message: 'Phone number must be at least 11 digits' },
              { max: 15, message: 'Phone number must be at most 15 digits' }
            ]}
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
            <Button loading={isLoading} className='buttonCreate' type='primary' htmlType='submit'>
              {isLoading ? 'Creating...' : 'Create'}	
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Company;
