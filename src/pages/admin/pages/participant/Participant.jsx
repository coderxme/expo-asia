import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined  } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';
import { useFetchData } from '../../../../hooks/participantHook'; 
import CreateForm from './form/CreateForm';
import UpdateForm from './form/UpdateForm';

const Participant = () => {
  const { 
      participantData,
      militaryBranchData,
      deleteParticipant, 
      updateParticipant,
      createParticipant,
      companyData,
      forumData,
      fetchParticipants
  } = useAdminStore();

  useFetchData()

  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingParticipant, setUpdatingParticipant] = useState(null);
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm()
  const csrfToken = GetToken();


  useEffect(() => {
    if (updatingParticipant) {
      updateForm.setFieldsValue(updatingParticipant);
    }
  }, [updatingParticipant, updateForm]);


  const totalCount = participantData.length;

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
      width:"200px"

    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      filters: Array.from(new Set(participantData.map(item => item.first_name))).map(first_name => ({
        text: first_name,
        value: first_name,
      })),
      onFilter: (value, record) => record.first_name.includes(value),
      filterSearch: true,
      width:"150px"
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      filters: Array.from(new Set(participantData.map(item => item.last_name))).map(last_name => ({
        text: last_name,
        value: last_name,
      })),
      onFilter: (value, record) => record.last_name.includes(value),
      filterSearch: true,
      width:"150px"

    },
    {
      title: 'Email',
      dataIndex: 'email',
      filters: participantData.map((item) => ({
        text: item.email,
        value: item.email,
      })),
      onFilter: (value, record) => record.email.includes(value),
      filterSearch: true,
      width:"200px"

    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      filters: Array.from(new Set(participantData.map(item => item.designation))).map(designation => ({
        text: designation,
        value: designation,
      })),
      onFilter: (value, record) => record.designation.includes(value),
      filterSearch: true,
      width:"200px"

    },
    {
      title: 'Unit/Organization/Company',
      render: (text, record) => record.company_org_details?.name || record?.company_org_other || ""  ,

      width:"200px"
    },
    {
      title: 'Military Branch',
      dataIndex: 'military_branch',
      filters: Array.from(new Set(participantData.map(item => item.military_branch))).map(military_branch => ({
        text: military_branch,
        value: military_branch,
      })),
      onFilter: (value, record) => record.military_branch.includes(value),
      filterSearch: true,
      width:"200px"

    },
    {
      title: 'Contact Number',
      dataIndex: 'phone_no',
      width:"200px"

    },
   
    {
      width:"200px",
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      render: (_, record) => (
        <span className='flex gap-2 flex-col items-center'>
          <Button
            icon={<EditOutlined />}
            size='small'
            onClick={() => handleEdit(record)}
          >
            Update
          </Button>
          <Popconfirm
            title='Are you sure to delete this participant?'
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
    setUpdatingParticipant(participant);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteParticipant(id, csrfToken);
      message.success('Participant deleted successfully');
    } catch (error) {
      console.error('Error deleting participant:', error);
      message.error('Failed to delete participant');
    }
  };

  const handleUpdate = async (values) => {
    const {
      first_name,
      last_name,
      middle_name,
      email,
      designation,
      company_org_other,
      company_org,
      military_branch,
      military_branch2,
      phone_no,

    } = values;

    if (
      !first_name ||
      !last_name ||
      !middle_name ||
      !email ||
      !designation ||
      !phone_no 
    ) {
      message.error('Please fill in all required fields.');
      return;
    }

    const updatedData = {
      first_name,
      last_name,
      middle_name,
      email,
      designation,
      company_org_other,
      company_org,
      military_branch,
      military_branch2,
      phone_no,
    };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingParticipant[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateParticipant(updatingParticipant.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Participant updated successfully');
    } catch (error) {
      console.error('Error updating participant:', error);
      message.error('Failed to update participant');
    }
  };


  const handleCreate = async (values) => {
    const {
      first_name,
      last_name,
      middle_name,
      email,
      designation,
      company_org_other,
      company_org,
      military_branch,
      military_branch2,
      phone_no,
      preferred_attendance,
      forum
 
    } = values;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !designation ||
      !phone_no
    ) {
      message.error('Please fill in all required fields.');
      return;
    }

    const newParticipant = { 
      first_name,
      last_name,
      middle_name,
      email,
      designation,
      company_org_other,
      company_org,
      military_branch,
      military_branch2,
      phone_no,
      preferred_attendance,
      forum
     };

    try {
      await createParticipant(newParticipant, csrfToken);
      setCreateVisible(false);
      message.success('Participant created successfully');
      fetchParticipants()
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating Participant:', error);
      message.error('Failed to create Participant');
    }
  };


  return (
    <div className='tableContainer'>
      <div className="tableHeader">
      <h1 className='tableTitle'>Participants</h1>
      <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Participant
          </Button>
        <Button
          icon={<ReloadOutlined />}
          type='primary'
          onClick={fetchParticipants}
          className="buttonTableHeader"
        >
          Refresh
        </Button>
      </div>
      </div>
      <Table
       bordered
        columns={columns}
        dataSource={participantData}
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
        title='Update Participant'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
       <UpdateForm
          updateForm={updateForm}
          handleUpdate={handleUpdate}
          updatingParticipant={updatingParticipant}
          companyData={companyData}
          militaryBranchData={militaryBranchData}
          forumData={forumData}

       />
      </Modal>


      {/* Create Participant Form */}
      <Modal
        title='Create Participant'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
       <CreateForm  
        onFinish={handleCreate} 
        companyData={companyData}  
        createForm={createForm}
        militaryBranchData={militaryBranchData}
        forumData={forumData}

        />
      </Modal>
    </div>
  );
};

export default Participant;
