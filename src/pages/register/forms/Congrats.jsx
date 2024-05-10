import React, { useState, useEffect } from 'react';
import image from '../../../assets/congrats-check.svg';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Congrats({ qrCode }) {
  const [qrCodeSrc, setQRCodeSrc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!qrCode) return; // Ensure qrCode is not empty

    // Convert the raw PNG image data to a data URL
    const bytes = new Uint8Array(qrCode.length);
    for (let i = 0; i < qrCode.length; i++) {
      bytes[i] = qrCode.charCodeAt(i);
    }
    const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode.apply(null, bytes))}`;
    setQRCodeSrc(dataUrl);
  }, [qrCode]);

  const handleFinish = () => {
    navigate("/home");
  };

  return (
    <div className="congratsForm">
      <img src={image} alt="" />
      <h2>Congratulations! <br /> You're now registered.</h2>
      <h4>Your unique QR code will be sent to your email shortly. <br />
        You can use it to check in at the event venue.</h4>
      {qrCodeSrc && <img src={qrCodeSrc} alt="QR Code" />}
      <Button className='btn2' type="primary" onClick={handleFinish}>
        Finish
      </Button>
    </div>
  );
}
