import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';

const Participant = () => {
  const { participantData, fetchParticipants, deleteParticipant, updateParticipant, setCsrfToken } = useAdminStore();
  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);

  useEffect(() => {
    fetchParticipants();
    setCsrfToken(csrfToken);
  }, [fetchParticipants, setCsrfToken, csrfToken]);

  const totalCount = participantData.length;

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      filters: Array.from(new Set(participantData.map(item => item.first_name))).map(first_name => ({
        text: first_name,
        value: first_name,
      })),
      onFilter: (value, record) => record.first_name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      filters: Array.from(new Set(participantData.map(item => item.last_name))).map(last_name => ({
        text: last_name,
        value: last_name,
      })),
      onFilter: (value, record) => record.last_name.includes(value),
      filterSearch: true,
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
    },
    {
      title: 'Unit/Organization/Company',
      dataIndex: 'company_org_other',
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
    },
    {
      title: 'Mobile No',
      dataIndex: 'phone_no',
    },
    {
      title: 'Viber No',
      dataIndex: 'viber_no',
    },
    {
      title: 'Whatsapp No',
      dataIndex: 'whatsapp_no',
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
            title='Are you sure to delete this participant?'
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

  const handleEdit = (participant) => {
    setEditingParticipant(participant);
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
      military_branch,
      phone_no,
      viber_no,
      whatsapp_no,
    } = values;

    if (
      !first_name ||
      !last_name ||
      !middle_name ||
      !email ||
      !designation ||
      !company_org_other ||
      !military_branch ||
      !phone_no ||
      !viber_no ||
      !whatsapp_no
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
      military_branch,
      phone_no,
      viber_no,
      whatsapp_no,
    };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== editingParticipant[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateParticipant(editingParticipant.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Participant updated successfully');
    } catch (error) {
      console.error('Error updating participant:', error);
      message.error('Failed to update participant');
    }
  };

  return (
    <div>
      <div className="flex justify-between">
      <h1 className='font-montserrat text-lg'>Participants</h1>
      <Button
        icon={<ReloadOutlined />}
        type='primary'
        onClick={fetchParticipants}
        style={{ marginBottom: 16 }}
      >
        Refresh
      </Button>
      </div>
      <Table
        columns={columns}
        dataSource={participantData}
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
            first_name: editingParticipant ? editingParticipant.first_name : '',
            last_name: editingParticipant ? editingParticipant.last_name : '',
            middle_name: editingParticipant ? editingParticipant.middle_name : '',
            email: editingParticipant ? editingParticipant.email : '',
            designation: editingParticipant ? editingParticipant.designation : '',
            company_org_other: editingParticipant
              ? editingParticipant.company_org_other
              : '',
            military_branch: editingParticipant
              ? editingParticipant.military_branch
              : '',
            phone_no: editingParticipant ? editingParticipant.phone_no : '',
            viber_no: editingParticipant ? editingParticipant.viber_no : '',
            whatsapp_no: editingParticipant ? editingParticipant.whatsapp_no : '',
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
          <Form.Item label='Middle Name' name='middle_name'>
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
            label='Designation'
            name='designation'
            rules={[{ required: true, message: 'Please input designation!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Unit/Organization/Company Name'
            name='company_org_other'
          >
            <Input />
          </Form.Item>
          <Form.Item label='Military Branch' name='military_branch'>
            <Input />
          </Form.Item>
          <Form.Item
            label='Mobile No'
            name='phone_no'
            rules={[{ required: true, message: 'Please input Mobile Number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Viber Number' name='viber_no'>
            <Input />
          </Form.Item>
          <Form.Item label='WhatsApp Number' name='whatsapp_no'>
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

export default Participant;
