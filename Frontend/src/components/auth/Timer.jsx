import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const Timer = ({ time, setIsExpire }) => {
  const [targetTime, setTargetTime] = useState(null);

  useEffect(() => {
    if (time && !targetTime) {
      setTargetTime(Date.now() + time);
    }
  }, [time, targetTime]);

  return (
    <div className='timer'>
      {targetTime && (
        <Countdown
          onComplete={() => setIsExpire(true)}
          date={targetTime}
        />
      )}
    </div>
  );
};

export default Timer;
