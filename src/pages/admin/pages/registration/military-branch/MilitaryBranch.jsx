import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import useAdminStore from '../../../../../store/adminStore';
import useCsrfTokenStore from '../../../../../store/csrfTokenStore';

const MilitaryBranch = () => {
  const { myAccountData, militaryBranchData,  deleteMilitaryBranch, updateMilitaryBranch,  createMilitaryBranch, fetchMilitaryBranch } = useAdminStore();
  const csrfToken = useCsrfTokenStore((state) => state.csrfToken)
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingMilitaryBranch, setUpdatingMilitaryBranch] = useState(null);
  const [UpdateForm] = Form.useForm();
  const [createForm] = Form.useForm(); 
  const [isLoading, setIsLoading] = useState(false);
  const totalCount = militaryBranchData.length;
  const userRole = myAccountData?.roles[0] || ""

 

  useEffect(() => {
    if (updatingMilitaryBranch) {
      UpdateForm.setFieldsValue(updatingMilitaryBranch);
    }
  }, [updatingMilitaryBranch, UpdateForm]);

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
      title: 'Abbreviation',
      dataIndex: 'abrv',
      filters: militaryBranchData.map((item) => ({
        text: item.abrv,
        value: item.abrv,
      })),
      onFilter: (value, record) => record.abrv.includes(value),
      filterSearch: true,
    },

    {
      title: 'Description',
      dataIndex: 'desc',
      filters: militaryBranchData.map((item) => ({
        text: item.desc,
        value: item.desc,
      })),
      onFilter: (value, record) => record.desc.includes(value),
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
          {userRole === 'Administrator' && (
             <Popconfirm
             title='Are you sure to delete this military branch?'
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

  const handleEdit = (forum) => {
    setUpdatingMilitaryBranch(forum);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMilitaryBranch(id, csrfToken);
      message.success('Military branch deleted successfully');
    } catch (error) {
      console.error('Error deleting Military branch:', error);
      message.error('Failed to delete Military branch');
    }
  };

  const handleUpdate = async (values) => {
    setIsLoading(true);
    if (!values.abrv) {
      message.error('Please enter military branch.');
      return;
    }

    const updatedData = { abrv: values.abrv, desc: values.desc };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingMilitaryBranch[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateMilitaryBranch(updatingMilitaryBranch.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Military branch updated successfully');
      fetchMilitaryBranch();
    } catch (error) {
      console.error('Error updating Military branch:', error);
      message.error('Failed to update Military branch');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (values) => {
    setIsLoading(true);
    if (!values.abrv) {
      message.error('Please fill in abbreviation');
      return;
    }

    const newMilitaryBranch = { abrv: values.abrv, desc:values.desc };

    try {
      await createMilitaryBranch(newMilitaryBranch, csrfToken);
      setCreateVisible(false);
      message.success('Military branch created successfully');
      fetchMilitaryBranch();
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating Military branch:', error);
      message.error('Failed to create Military branch');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Military Branch</h1>
        <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Military Branch
          </Button>
          <Button
            icon={<ReloadOutlined />}
            type='primary'
            onClick={fetchMilitaryBranch}
            className='buttonTableHeader'
          >
            Refresh
          </Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={militaryBranchData}
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
        title='Update Military Branch'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={UpdateForm}
          onFinish={handleUpdate}
          initialValues={{
            abrv: updatingMilitaryBranch ? updatingMilitaryBranch.abrv : '',
            desc: updatingMilitaryBranch ? updatingMilitaryBranch.desc : '',
          }}
        >
          <Form.Item
            label='Abbreviation'
            name='abrv'
            rules={[{ required: true, message: 'Please input abbreviation!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Description'
            name='desc'
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type='primary' className='buttonCreate' htmlType='submit'>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Create Military Branch'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
        <Form form={createForm} onFinish={handleCreate} className='mt-10'>
          <Form.Item
            label='Abbreviation'
            name='abrv'
            rules={[{ required: true, message: 'Please input abbreviation!' }]}
          >
            <Input className='uppercase'/>
          </Form.Item>
          <Form.Item
            label='Description'
            name='desc'
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input />
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

export default MilitaryBranch;
