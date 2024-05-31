import { Tooltip, Button } from "antd"

export default function ButtonUpdate({ handleSubmitUpdate }) {
  return (
    <Tooltip title="Click save if personal infomation has changed">
        <Button className=' font-opensans text-xs' onClick={handleSubmitUpdate} >
        Save
        </Button>
    </Tooltip>
   
  )
}
