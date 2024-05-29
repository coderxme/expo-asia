import { Table, Button, Popconfirm, message, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';

const Invite = () => {
  const { inviteData,  deleteInvite } = useAdminStore();
  const csrfToken = GetToken();



  const totalCount = inviteData.length;

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
      filters: Array.from(new Set(inviteData.map(item => item.event_details.name))).map(name => ({
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
          <Popconfirm
            title='Are you sure to delete this invitation?'
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



  const handleDelete = async (id) => {
    try {
      await deleteInvite(id, csrfToken);
      message.success('Invite deleted successfully');
    } catch (error) {
      console.error('Error deleting Invite:', error);
      message.error('Failed to delete Invite');
    }
  };

  

  return (
    <div className='tableContainer'>
      <div className="tableHeader">
        <h1 className='tableTitle'>Invite</h1>
        <Button
          icon={<ReloadOutlined />}
          type='primary'
          // onClick={fetchInvite}
          className='buttonTableHeader'
        >
          Refresh
        </Button>
      </div>
      <Table
       bordered
        columns={columns}
        dataSource={inviteData}
        scroll={{ x: 1300, y:450 }}
        footer={() => (
          <div style={{ textAlign: 'left' }}>
            <p className='total'>
              Total: <b>{totalCount}</b>
            </p>
          </div>
        )}
      />

    </div>
  );
};

export default Invite;
