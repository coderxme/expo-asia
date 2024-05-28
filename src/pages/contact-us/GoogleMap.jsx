import React from 'react';

const GoogleMap = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.2031589890526!2d121.06076297492368!3d14.587496485897264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c810bdc60c3d%3A0x81c2b2cef364f4a6!2sMarco%20Polo%20Ortigas%20Manila!5e0!3m2!1sen!2sph!4v1716255658221!5m2!1sen!2sph"
      className='w-full h-[300px] lg:h-[400px] '
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}

export default GoogleMap;
