// CountdownTimer Component for flash sales and limited-time offers
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ 
  endDate, 
  onTimeUp = () => {}, 
  className = '',
  showLabels = true,
  size = 'md' 
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setIsExpired(true);
        onTimeUp();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, onTimeUp]);

  if (isExpired) {
    return (
      <div className={`text-red-500 font-semibold ${className}`}>
        Offer Expired
      </div>
    );
  }

  // Size variants
  const sizeClasses = {
    sm: {
      container: 'gap-1',
      timeBox: 'w-8 h-8 text-xs',
      separator: 'text-sm',
      label: 'text-xs'
    },
    md: {
      container: 'gap-2',
      timeBox: 'w-10 h-10 text-sm',
      separator: 'text-lg',
      label: 'text-sm'
    },
    lg: {
      container: 'gap-3',
      timeBox: 'w-12 h-12 text-lg',
      separator: 'text-xl',
      label: 'text-base'
    }
  };

  const sizes = sizeClasses[size];

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className={`${sizes.timeBox} bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold`}>
        {value.toString().padStart(2, '0')}
      </div>
      {showLabels && (
        <span className={`${sizes.label} text-gray-600 mt-1`}>
          {label}
        </span>
      )}
    </div>
  );

  return (
    <div className={`flex items-center ${sizes.container} ${className}`}>
      {timeLeft.days > 0 && (
        <>
          <TimeBox value={timeLeft.days} label="Days" />
          <span className={`${sizes.separator} text-gray-400 font-bold`}>:</span>
        </>
      )}
      <TimeBox value={timeLeft.hours} label="Hours" />
      <span className={`${sizes.separator} text-gray-400 font-bold`}>:</span>
      <TimeBox value={timeLeft.minutes} label="Min" />
      <span className={`${sizes.separator} text-gray-400 font-bold`}>:</span>
      <TimeBox value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

export default CountdownTimer;