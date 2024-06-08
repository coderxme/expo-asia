import  { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import useAdminStore from '../../../../../store/adminStore';
import useCsrfTokenStore from '../../../../../store/csrfTokenStore';


const Category = () => {
  const { myAccountData, participantCategoryData,  createParticipantCategory, deleteParticipantCategory, updateParticipantCategory, fetchParticipantCategory } = useAdminStore();
  const csrfToken = useCsrfTokenStore((state) => state.csrfToken)
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingCategory, setUpdatingCategory] = useState(null);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm(); 
  const [isLoading, setIsLoading] = useState(false);

  const totalCount = participantCategoryData.length;
  const userRole = myAccountData?.roles[0] || ""


  useEffect(() => {
    if (updatingCategory) {
      form.setFieldsValue(updatingCategory);
    }
  }, [updatingCategory, form]);

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
      filters: participantCategoryData.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      onFilter: (value, record) => record.name.includes(value),
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
            title='Are you sure to delete this category?'
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
    setUpdatingCategory(forum);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteParticipantCategory(id, csrfToken);
      message.success('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting Category:', error);
      message.error('Failed to delete Category');
    }
  };

  const handleUpdate = async (values) => {
    setIsLoading(true);
    if (!values.name) {
      message.error('Please enter category.');
      return;
    }

    const updatedData = { name: values.name };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingCategory[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateParticipantCategory(updatingCategory.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Category updated successfully');
      fetchParticipantCategory()
    } catch (error) {
      console.error('Error updating Category:', error);
      message.error('Failed to update Category');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (values) => {
    if (!values.name) {
      message.error('Please fill in name.');
      return;
    }

    setIsLoading(true);

    const newParticipantCategory = { name: values.name };

    try {
      await createParticipantCategory(newParticipantCategory, csrfToken);
      setCreateVisible(false);
      message.success('Forum created successfully');
      fetchParticipantCategory();
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating Forum:', error);
      message.error('Failed to create Forum');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Category</h1>
        <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Category
          </Button>
          <Button
            icon={<ReloadOutlined />}
            type='primary'
            onClick={fetchParticipantCategory}
            className='buttonTableHeader'
          >
            Refresh
          </Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={participantCategoryData}
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
        title='Update Category'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleUpdate}
          initialValues={{
            name: updatingCategory ? updatingCategory.name : '',
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
            <Button loading={isLoading} type='primary' className='buttonCreate' htmlType='submit'>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Create Category'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
        <Form form={createForm} onFinish={handleCreate} className='mt-10'>
          <Form.Item
            label='Category Name'
            name='name'
            rules={[{ required: true, message: 'Please input name!' }]}
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

export default Category;
