import { Spin } from "antd"

export default function Loader() {
  return (
    <div className="flex flex-col items-center font-opensans gap-5  py-20">
        <Spin tip="Sending OTP" size="large" />
        <h2>Sending OTP to your email...</h2>
    </div>
  )
}
