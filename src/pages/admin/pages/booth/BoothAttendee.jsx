import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined  } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';
import ExportFiles from './export/ExportFilesAttendee';
import { PiFilesDuotone } from "react-icons/pi";

const BoothAttendee = () => {
  const { 
    boothData,
    boothAttendeeData,
    participantData,
    deleteBoothAttendee, 
    updateBoothAttendee,
    createBoothAttendee, 
    myAccountData,

    fetchBoothAttendee
  } = useAdminStore();
  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatetingBooth, setUpdatingBooth] = useState(null);
  const [form] = Form.useForm();

  const userRole = myAccountData?.roles[0] || ""



  const totalCount = boothAttendeeData.length;

  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'created_at',
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      key: 'created_at',
      render: (text, record) => {
        const date = new Date(record.created_at);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
      },
    },
    {
      title: 'Name',
      dataIndex: 'participant_details.name',
      render: (text, record) => record.participant_details.name,
    },

    
    {
      title: 'Booth',
      dataIndex: 'booth_details.name',
      render: (text, record) => record.booth_details?.name || "",
      filters: Array.from(new Set(boothAttendeeData.map(item => item.booth_details.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.booth_details.name.includes(value),
      filterSearch: true,
    },


      
    {
      title: 'Attendance',
      dataIndex: 'booth_details.is_in',
      render: (text, record) => record.booth_details?.is_in ? "Yes" : "No",
      filters: [
        { text: 'Yes', value: true },
        { text: 'No', value: false },
      ],
      onFilter: (value, record) => record.booth_details?.is_in === value,
      filterSearch: true,

    },
    
    {
      title: 'Email',
      dataIndex: 'participant_details.email',
      render: (text, record) => record.participant_details.email,
    },

    {
      title: 'Phone No',
      dataIndex: 'participant_details.phone_no',
      render: (text, record) => record.participant_details?.phone_no || "",
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
         {userRole === 'Administrator' && (
          <Popconfirm
            title='Are you sure to delete this booth attendee?'
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
      await deleteBoothAttendee(id, csrfToken);
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
      await updateBoothAttendee(updatetingBooth.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Booth updated successfully');
      fetchBoothAttendee()
    } catch (error) {
      console.error('Error updating Booth:', error);
      message.error('Failed to update Booth');
    }
  };


  const handleCreate = async (values) => {
    const { is_in, booth, participant } = values;


    if (!is_in || !booth || !participant ) {
      message.error('Please fill in all required fields.');
      return;
    }

    const newBoothAttendee = { is_in, booth, participant };

    try {
      await createBoothAttendee(newBoothAttendee, csrfToken);
      setCreateVisible(false);
      message.success('Booth Attendee created successfully');
      fetchBoothAttendee();
      form.resetFields();
    } catch (error) {
      console.error('Error creating booth attendee:', error);
      message.error('Failed to create booth attendee');
    }
  };

  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Booth Attendee</h1>
        <div className="flex gap-2">
         <Button
            hidden
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Booth Attendee
          </Button>
        <Button
          icon={<ReloadOutlined />}
          type='primary'
          onClick={fetchBoothAttendee}
          className='buttonTableHeader'
        >
          Refresh
        </Button>
        </div>
      </div>
      <Table
       bordered
        columns={columns}
        dataSource={boothAttendeeData}
        scroll={{ x: 1300, y:450 }}
        footer={() => (
          <div className='totalBox'>
            <p className='total'>
              Total: <b>{totalCount}</b>
            </p>
            <p className="exportWrapper">
               <span className="exportText">
               <PiFilesDuotone /> Export:   
               </span>
               <ExportFiles 
                 totalOfAttendee={totalCount}
                 boothAttendeeData={boothAttendeeData}
               />
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
        <Form form={form} onFinish={handleCreate} className='mt-10' >
        <Form.Item
            label='Attendance (is in ?)'
            name='is_in'
            rules={[{ required: true, message: 'Please select attendance status!' }]}
          >
            <Select placeholder="Select attendance status">
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label='Booth'
            name='booth'
            rules={[{ required: true, message: 'Please select booth!' }]}
          >
            <Select placeholder="Select a booth">
              {boothData.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Participant'
            name='participant'
          >
            <Select placeholder="Select a participant">
              {participantData.map((type) => (
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

export default BoothAttendee;
