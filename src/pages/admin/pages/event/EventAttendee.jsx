import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';

const EventAttendee = () => {
  const { myAccountData, eventAttendeeData,  deleteEventAttendee, updateEventAttendee } = useAdminStore();
  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [updatetingEventAttendee, setUpdatingEventAttendee] = useState(null);

  const totalCount = eventAttendeeData.length;
  const userRole = myAccountData?.roles[0] || ""

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
      title: 'Event Name',
      dataIndex: 'event_details.name',
      render: (text, record) => record.event_details.name,
      filters: Array.from(new Set(eventAttendeeData.map(item => item.event_details.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.event_details.name.includes(value),
      filterSearch: true,
    },
    
    
    {
      title: 'Name',
      dataIndex: 'participant_details.name',
      render: (text, record) => record.participant_details.name,
    },

    {
      title: 'Email',
      dataIndex: 'participant_details.email',
      render: (text, record) => record.participant_details.email,
    },

    {
      title: 'Phone No',
      dataIndex: 'participant_details.phone_no',
      render: (text, record) => record.participant_details.phone_no,
    },

    {
      title: 'Company',
      dataIndex: 'participant_details.company_org_details.name',
      render: (text, record) => record?.participant_details?.company_org_details?.name || "",
    },

   
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      render: (_, record) => (
        <span className='flex gap-3 flex-col items-center'>
          <Button
          hidden
            icon={<EditOutlined />}
            size='small'
            onClick={() => handleEdit(record)}
          >
            Update
          </Button>
       {userRole === "Administrator" && (
            <Popconfirm
            title='Are you sure to delete this event attendee?'
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

  const handleEdit = (eventAttendee) => {
    setUpdatingEventAttendee(eventAttendee);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEventAttendee(id, csrfToken);
      message.success('Event Attendee deleted successfully');
    } catch (error) {
      console.error('Error deleting Event Attendee:', error);
      message.error('Failed to delete Event Attendee');
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
      (key) => updatedData[key] !== updatetingEventAttendee[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateEventAttendee(updatetingEventAttendee.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Event attendee updated successfully');
    } catch (error) {
      console.error('Error updating Event attendee:', error);
      message.error('Failed to update Event attendee');
    }
  };

  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Booth</h1>
        <Button
          icon={<ReloadOutlined />}
          type='primary'
          // onClick={fetchEventAttendee}
          className='buttonTableHeader'
        >
          Refresh
        </Button>
      </div>
      <Table
       bordered
        columns={columns}
        dataSource={eventAttendeeData}
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
        <Form
          onFinish={handleUpdate}
          initialValues={{
            name: updatetingEventAttendee ? updatetingEventAttendee.name : '',
         
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
    </div>
  );
};

export default EventAttendee;
