/* eslint-disable react/prop-types */
import { Modal, Spin, Alert } from 'antd';

const ModalLoader = ({ visible }) => {
  return (
    <Modal
      visible={visible}
      footer={null}
      closable={false}
      centered
    >
      <div className='flex flex-col items-center'>
        <Alert 
          message="Warning"
          description="You are currently offline. Please check your internet connection."
          type="warning"
          showIcon
          style={{ marginBottom: '20px' }}
        />
      <Spin size="large" />
      </div>

    </Modal>
  );
};

export default ModalLoader;
