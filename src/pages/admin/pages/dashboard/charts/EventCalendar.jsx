import React, { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import useAdminStore from '../../../../../store/adminStore';

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const { eventData } = useAdminStore();

  const events = useMemo(() => 
    eventData.map(event => ({
      title: event.name,
      start: new Date(event.start_date_time),
      end: new Date(event.end_date_time),
    })), 
    [eventData]
  );

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', margin: '20px' }}
      />
    </div>
  );
};

export default EventCalendar;
