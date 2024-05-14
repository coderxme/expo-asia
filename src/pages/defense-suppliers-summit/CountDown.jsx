/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';


function DateTimeConverter({ dateString }) {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const countdownDate = new Date(dateString);
    const now = new Date();

    const difference = countdownDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeRemaining({ days, hours, minutes, seconds });

    const timer = setInterval(() => {
      const now = new Date();
      const difference = countdownDate - now;
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });

    }, 1000);

    return () => clearInterval(timer);
  }, [dateString]);

  return (
    <div className='dds-countDownBox'>
      {timeRemaining && (
        <div className='dds-countDownCard'>
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
      <DateTimeConverter dateString="2024-08-24T14:15:22Z" />
  );
}

export default App;
