import React from 'react';
import { Badge, Calendar } from 'antd';
import useAdminStore from '../../../../store/adminStore';
import moment from 'moment';

const EventCalendar = () => {
  const { eventData } = useAdminStore();

  const getListData = (value) => {
    const dateString = value.format('YYYY-MM-DD');
    return eventData.filter(event => moment(event.start_date_time).format('YYYY-MM-DD') === dateString);
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            <Badge status="warning" text={item.name} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} className='p-10'  />;
};

export default EventCalendar;