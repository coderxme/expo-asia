import { Button } from 'antd'
import { IoKeySharp } from "react-icons/io5";

export default function ButtonChangedPass({ showPasswordModal }) {
  return (
    <Button icon={<IoKeySharp/>} className=' font-opensans text-xs' type="primary" onClick={showPasswordModal}>
    Changed Password
  </Button>
  )
}
