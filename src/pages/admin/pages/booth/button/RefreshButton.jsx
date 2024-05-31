import { ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function RefreshButton({ fetchBooths }) {
  return (
    <Button icon={<ReloadOutlined />} type='primary' onClick={fetchBooths} className='buttonTableHeader' >
      Refresh
    </Button>
  )
}
