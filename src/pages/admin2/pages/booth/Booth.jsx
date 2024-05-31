import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';
import CreateForm from './form/CreateForm';
import UpdateForm from './form/UpdateForm';
import CreateButton from './button/CreateButton';
import RefreshButton from './button/RefreshButton'

const { Option } = Select; 

const Booth = () => {
  const { usersData, myAccountData, companyData, boothData, deleteBooth, updateBooth, createBooth, eventData, fetchBooths } = useAdminStore();
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
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
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
      render: (text, record) => record?.event_details?.description || "N/A",
    },
    {
      title: 'Company',
      render: (text, record) => {
        if (record.company_org_details) {
          return record.company_org_details
            .map((item) => item?.name || "N/A")
            .filter((name) => name)
            .join(", ");
        }
        return "";
      },
    },

    {
      title: 'User Manager',
      render: (text, record) => {
        if (record.user_manager_details) {
          return record.user_manager_details
            .map((item) => item?.username || "N/A")
            .filter((username) => username)
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
    const { name, event, company_org, user_manager } = values;

    if (!name || !event || !company_org || !user_manager) {
      message.error('Please fill in all required fields.');
      return;
    }

    const updatedData = { name, event, company_org, user_manager };

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
    const { name, event, company_org, user_manager} = values;

    if (!name || !event || !company_org || !user_manager) {
      message.error('Please fill in all required fields.');
      return;
    }

    const newBooth = { name, event, company_org, user_manager };

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
           <CreateButton setCreateVisible={setCreateVisible} />
           <RefreshButton fetchBooths={fetchBooths} />
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
       <UpdateForm 
         updateForm={updateForm}
         handleUpdate={handleUpdate}
         eventData={eventData}
         companyData={companyData}
         usersData={usersData}
       />
      </Modal>
      <Modal
        title='Create Booth'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
       <CreateForm
         createForm={createForm}
         handleCreate={handleCreate}
         eventData={eventData}
         companyData={companyData}
         usersData={usersData}
       />
      </Modal>
    </div>
  );
};

export default Booth;
