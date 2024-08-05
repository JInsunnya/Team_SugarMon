import React, { useEffect, useRef, useState } from 'react'
import "./FoodLoop.css"

const FoodLoop = ({items, gi}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        container.scrollTop = 0;
      } else {
        container.scrollTop += 1;
      }
    };

    const intervalId = setInterval(scroll, 20);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
    {gi ? <div className="infinite-scroll-container" ref={containerRef}>
    <div className="scroll-content">
      {items.map((item, index) => (
        <div key={index} className="scroll-item" style={{fontSize:'25px', marginRight:'10px'}}>
          {item}
        </div>
      ))}
      {items.map((item, index) => (
        <div key={index + items.length} className="scroll-item" style={{fontSize:"25px", marginRight:'10px'}}>
          {item}
        </div>
      ))}
    </div>
  </div>
  :
    <div className="infinite-scroll-container" ref={containerRef}>
      <div className="scroll-content">
        {items.map((item, index) => (
          <div key={index} className="scroll-item">
            {item}
          </div>
        ))}
        {items.map((item, index) => (
          <div key={index + items.length} className="scroll-item">
            {item}
          </div>
        ))}
      </div>
    </div>}
    </>
  );
}

export default FoodLoop;