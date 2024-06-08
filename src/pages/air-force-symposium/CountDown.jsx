/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function DateTimeConverter({ dateString }) {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [eventStarted, setEventStarted] = useState(false);

  useEffect(() => {
    const countdownDate = new Date(dateString).getTime();
    
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const difference = countdownDate - now;

      if (difference <= 0) {
        setEventStarted(true);
        const days = 0;
        const hours = 0;
        const minutes = 0;
        const seconds = 0;
        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    calculateTimeRemaining(); // Initial call
    const timer = setInterval(calculateTimeRemaining, 1000); // Update every second

    return () => clearInterval(timer);
  }, [dateString]);

  return (
    <div className='af-countDownBox'>
      {eventStarted && (
        <div className='af-eventStartNow'>
          <h3 className='font-semibold font-opensans text-lg text-center'>The event starts now</h3>
        </div>
      )}
      {timeRemaining && (
        <div className='af-countDownCard'>
          <span>
            <h3>{timeRemaining.days}</h3>
            <h5>Days</h5>
          </span>
          <span>
            <h3>{timeRemaining.hours}</h3>
            <h5>Hours</h5>
          </span>
          <span>
            <h3>{timeRemaining.minutes}</h3>
            <h5>Minutes</h5>
          </span>
          <span>
            <h3>{timeRemaining.seconds}</h3>
            <h5>Seconds</h5>
          </span>
        </div>
      )}
    </div>
  );
}

// Usage
function App() {
  return (
    <DateTimeConverter dateString="2024-06-14T09:00:00+08:00" />
  );
}

export default App;
