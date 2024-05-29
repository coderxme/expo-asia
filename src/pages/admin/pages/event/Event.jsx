import React, { useEffect, useState } from 'react';
import { Select, Table, Button, Popconfirm, message, Modal, Form, Input, DatePicker, TimePicker } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken';
import useAdminStore from '../../../../store/adminStore';
import moment from 'moment';

const Event = () => {
  const { 
    companyData, 
    eventData, 
    deleteEvent, 
    updateEvent, 
    createEvent, 
    myAccountData,

    fetchEvent
  } = useAdminStore();

  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingEvent, setUpdatingEvent] = useState(null);
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm(); 
  const totalCount = eventData.length;
  const userRole = myAccountData?.roles[0] || ""


  useEffect(() => {
    if (updatingEvent) {
      updateForm.setFieldsValue({
        ...updatingEvent,
        start_date: updatingEvent ? moment(updatingEvent.start_date_time) : null,
        start_time: updatingEvent ? moment(updatingEvent.start_date_time) : null,
        end_date: updatingEvent ? moment(updatingEvent.end_date_time) : null,
        end_time: updatingEvent ? moment(updatingEvent.end_date_time) : null,
      });
    }
  }, [updatingEvent, updateForm]);

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
      filters: generateMonthFilters(),
      onFilter: (value, record) => new Date(record.created_at).getMonth() === value,
    },
    {
      title: 'Key',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      filters: Array.from(new Set(eventData.map(item => item.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Event Start',
      render: (text, record) => {
        const date = new Date(record.start_date_time);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
      },
      filters: generateMonthFilters(),
      onFilter: (value, record) => new Date(record.start_date_time).getMonth() === value,
    },
    {
      title: 'Event End',
      render: (text, record) => {
        const date = new Date(record.end_date_time);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
      },
      filters: generateMonthFilters(),
      onFilter: (value, record) => new Date(record.end_date_time).getMonth() === value,
    },
    {
      title: 'Venue',
      dataIndex: 'venue',
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
            title='Are you sure to delete this event?'
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

  function generateMonthFilters() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames.map((month, index) => ({
      text: month,
      value: index,
    }));
  }

  const handleEdit = (event) => {
    setUpdatingEvent(event);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id, csrfToken);
      message.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      message.error('Failed to delete event');
    }
  };

  const handleUpdate = async (values) => {
    const { name, description, start_date, start_time, end_date, end_time, venue, exclusive_to } = values;

    if (!name || !description || !start_date || !start_time || !end_date || !end_time || !venue) {
      message.error('Please fill in all required fields.');
      return;
    }

    const updatedData = {
      name,
      description,
      start_date_time: moment(start_date).format('YYYY-MM-DD') + ' ' + moment(start_time).format('HH:mm:ss'),
      end_date_time: moment(end_date).format('YYYY-MM-DD') + ' ' + moment(end_time).format('HH:mm:ss'),
      venue,
      exclusive_to
    };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingEvent[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }

    try {
      await updateEvent(updatingEvent.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Event updated successfully');
      fetchEvent();
    } catch (error) {
      console.error('Error updating event:', error);
      message.error('Failed to update event');
    }
  };

  const handleCreate = async (values) => {
    const { name, description, start_date, start_time, end_date, end_time, venue, exclusive_to } = values;

    if (!name || !description || !start_date || !start_time || !end_date || !end_time || !venue) {
      message.error('Please fill in all required fields.');
      return;
    }

    const newEvent = {
      name,
      description,
      start_date_time: moment(start_date).format('YYYY-MM-DD') + ' ' + moment(start_time).format('HH:mm:ss'),
      end_date_time: moment(end_date).format('YYYY-MM-DD') + ' ' + moment(end_time).format('HH:mm:ss'),
      venue,
      exclusive_to
    };

    try {
      await createEvent(newEvent, csrfToken);
      setCreateVisible(false);
      message.success('Event created successfully');
      fetchEvent();
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating event:', error);
      message.error('Failed to create event');
    }
  };

  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Event</h1>
        <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Event
          </Button>
          <Button
            icon={<ReloadOutlined />}
            type='primary'
            // onClick={fetchEvent}
            className='buttonTableHeader'
          >
            Refresh
          </Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={eventData}
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
        title='Update Event'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={updateForm}
          onFinish={handleUpdate}
          initialValues={{
            name: updatingEvent ? updatingEvent.name : '',
            description: updatingEvent ? updatingEvent.description : '',
            start_date: updatingEvent ? moment(updatingEvent.start_date_time) : null,
            start_time: updatingEvent ? moment(updatingEvent.start_date_time) : null,
            end_date: updatingEvent ? moment(updatingEvent.end_date_time) : null,
            end_time: updatingEvent ? moment(updatingEvent.end_date_time) : null,
            venue: updatingEvent ? updatingEvent.venue : '',
            exclusive_to: updatingEvent ? updatingEvent.exclusive_to : [],
          }}
          layout='vertical'
        >
          <Form.Item
            label='Event Name'
            name='name'
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Event Description'
            name='description'
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input />
          </Form.Item>
          <div className="flex gap-2">
            <Form.Item
              label='Event Start Date'
              name='start_date'
              rules={[{ required: true, message: 'Please select Event start date!' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label='Event Start Time'
              name='start_time'
              rules={[{ required: true, message: 'Please select Event start time!' }]}
            >
              <TimePicker />
            </Form.Item>
          </div>
          <div className="flex gap-2">
            <Form.Item
              label='Event End Date'
              name='end_date'
              rules={[{ required: true, message: 'Please select Event end date!' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label='Event End Time'
              name='end_time'
              rules={[{ required: true, message: 'Please select Event end time!' }]}
            >
              <TimePicker />
            </Form.Item>
          </div>
          <Form.Item
            label='Venue'
            name='venue'
            rules={[{ required: true, message: 'Please input venue!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Exclusive to'
            name='exclusive_to'
          >
            <Select mode='multiple' placeholder="Select a exclusive to">
              {companyData.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item >
            <Button className='buttonCreate' type='primary' htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Create Event'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
        <Form form={createForm} onFinish={handleCreate} className='mt-10' layout='vertical'>
          <Form.Item
            label='Event Name'
            name='name'
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Event Description'
            name='description'
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input />
          </Form.Item>
          <div className="flex gap-2">
            <Form.Item
              label='Event Start Date'
              name='start_date'
              rules={[{ required: true, message: 'Please select Event start date!' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label='Event Start Time'
              name='start_time'
              rules={[{ required: true, message: 'Please select Event start time!' }]}
            >
              <TimePicker />
            </Form.Item>
          </div>
          <div className="flex gap-2">
            <Form.Item
              label='Event End Date'
              name='end_date'
              rules={[{ required: true, message: 'Please select Event end date!' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label='Event End Time'
              name='end_time'
              rules={[{ required: true, message: 'Please select Event end time!' }]}
            >
              <TimePicker />
            </Form.Item>
          </div>
          <Form.Item
            label='Venue'
            name='venue'
            rules={[{ required: true, message: 'Please input venue!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Exclusive to'
            name='exclusive_to'
          >
            <Select mode='multiple' placeholder="Select a exclusive to">
              {companyData.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item >
            <Button className='buttonCreate' type='primary' htmlType='submit'>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Event;
