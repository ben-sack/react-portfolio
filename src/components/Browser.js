import React, { useEffect, useState, useCallback } from "react";
import BrowserContent from "./BrowserContent";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


// import {
//   materialOceanic,
//   materialLight,
// } from "react-syntax-highlighter/dist/esm/styles/prism";

function Browser({
  title,
  isDarkMode,
  codeString,
  initialPosition = { x: 0, y: 0 },
  isAnimationComplete,
  isVisible, 
  onClose,
}) {
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hasBeenDragged, setHasBeenDragged] = useState(false);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screensWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = window.innerWidth <= 768;

  const handleDotClick = () => {
    // Call the onClose handler when the red dot is clicked
    onClose();
  };


  const handleDragMove = useCallback((event) => {
    if (!dragging) return;

    const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;

    const newPosition = {
      x: Math.max(0, Math.min(window.innerWidth - 300, clientX - offset.x)), // Adjust 300 based on your browser width
      y: Math.max(0, Math.min(window.innerHeight - 200, clientY - offset.y)), // Adjust 200 based on your browser height
    };

    setPosition(newPosition);
  }, [dragging, offset]);

  const handleDragEnd = () => {
    setDragging(false);
    document.removeEventListener('touchmove', preventDefault);
    document.body.style.overflow = 'auto'; // Enable body scrolling
  };


  const handleDragStart = (event) => {
    const clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
    const clientY = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY;

    setOffset({ x: clientX - position.x, y: clientY - position.y });
    setDragging(true);
    document.addEventListener('touchmove', preventDefault, { passive: false });
    document.body.style.overflow = 'hidden'; // Disable body scrolling
  };

  const preventDefault = useCallback((e) => e.preventDefault(), []);

  useEffect(() => {
    const events = {
      'mousemove': handleDragMove,
      'mouseup': handleDragEnd,
      'touchmove': handleDragMove,
      'touchend': handleDragEnd
    };

    
    for (const [event, handler] of Object.entries(events)) {
      window.addEventListener(event, handler);
    }

    return () => {
      for (const [event, handler] of Object.entries(events)) {
        window.removeEventListener(event, handler);
      }
    };
  }, [handleDragMove, handleDragEnd]);

  const browserStyle = isAnimationComplete ? {
      opacity: 1,
      transform: `translateY(0)`,
      filter: "blur(0px)",
      transition: "opacity 1s ease, transform 1s ease, filter 1s ease"
  } : {
      opacity: 0,
      transform: `translateY(50px)`, // Move it slightly down for melt effect
      filter: "blur(5px)", // Apply blur
      transition: "opacity 1s ease, transform 1s ease, filter 1s ease"
  };


  return (
    <div
      className="browser-window"
      style={{
        ...browserStyle,
        backgroundColor: isDarkMode ? "#253237" : "#f9f9f9",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        maxWidth: screenHeight/1.5,
        height: isMobile ? screenHeight/1.3 : screenHeight/1.5,
        display: isVisible ? 'block' : 'none', // Set display based on visibility
        touchAction: 'none',
      }}
    >

      {/* Browser Header */}
      <div className={`browser-header ${dragging ? 'dragging' : ''}`} 
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}>
        <div className="browser-dot red-dot" onClick={handleDotClick}></div>
        
        <div className="browser-dot yellow-dot"></div>
        <div className="browser-dot green-dot"></div>
      </div>
      <div className="custom-svg" style={{ position: 'fixed', width: '100%', right: '3vw'}}>
        <svg
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          fill="rgba(53, 182, 191, 0.318)"
          transform="translate(0, 0)" // You may adjust the translation based on your design
        >
          <path d="M39.1,-62.1C51.2,-53.1,62,-43.1,68.6,-30.7C75.3,-18.3,77.9,-3.4,71.2,6.9C64.6,17.2,48.7,22.8,38.9,33C29,43.3,25.2,58.1,15.1,69C5,80,-11.3,87.1,-23.3,82.3C-35.4,77.5,-43,60.7,-45.9,46.1C-48.8,31.4,-46.8,18.9,-50.9,5.9C-55,-7.2,-65.2,-20.8,-61.8,-28.3C-58.5,-35.9,-41.7,-37.4,-29.2,-46.3C-16.6,-55.1,-8.3,-71.4,2.6,-75.5C13.5,-79.5,27,-71.2,39.1,-62.1Z" />
        </svg>
      </div>
      {/* Browser Content */}
      <div className="browser-content">
      <BrowserContent title={title} copy={codeString} />
        {/* <SyntaxHighlighter
          language="python"
          lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
          wrapLines={true} 
          style={isDarkMode ? materialOceanic : materialLight}
          customStyle={{ 
            height: isMobile ? screenHeight/1.3 : screenHeight/1.5,
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflowWrap: "break-word",
        }}
          className="code-block"
        >
            {codeString.trim()}
        </SyntaxHighlighter> */}
      </div>
    </div>
  );
}

export default Browser;
