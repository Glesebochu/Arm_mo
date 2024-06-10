import React, { useState, useEffect } from 'react';

const BlinkingCursor = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500); // Adjust blinking speed here (in milliseconds)

    return () => clearInterval(intervalId);
  }, []);

  return <span className="text-normal h-full font-semibold mr-[-4px]" style={{visibility: isVisible ? 'visible' : 'hidden'}}>|</span>;
};

export default BlinkingCursor;