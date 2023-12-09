import React, { useEffect, useState, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


import {
  materialOceanic,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

function Browser({
  isDarkMode,
  codeString,
  initialPosition = { x: 0, y: 0 },
  isAnimationComplete,
  isVisible, // Receive visibility prop
  onClose, // Receive onClose prop
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

      {/* Browser Content */}
      <div className="browser-content">
        <SyntaxHighlighter
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
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default Browser;
