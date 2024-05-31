import {  PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function CreateButton({ setCreateVisible }) {
  return (
    <Button  icon={<PlusOutlined />} type='primary' onClick={() => setCreateVisible(true)} className='buttonTableHeader' >
        Create Booth
    </Button>
  )
}
