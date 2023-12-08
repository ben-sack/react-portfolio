import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // const handleElementHover = () => {
    //   setIsHoveringLink(true);
    // };

    // const handleElementLeave = () => {
    //   setIsHoveringLink(false);
    // };

    const handleHover = (e) => {
        if (e.target.closest('.dock-item, img, a, .close, .text')) {
          setIsHoveringLink(true);
        }
      };
 
      const handleLeave = (e) => {
        if (e.target.closest('.dock-item, img, a, .close, .text')) {
          setIsHoveringLink(false);
        }
      };

    const checkIfMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };

    document.addEventListener('mousemove', updateCursorPosition);

    // const elements = document.querySelectorAll('a');
    // elements.forEach((element) => {
    //   element.addEventListener('mouseenter', handleElementHover);
    //   element.addEventListener('mouseleave', handleElementLeave);
    // });
    // elements.forEach((element) => {

    document.body.addEventListener('mouseover', handleHover);
    document.body.addEventListener('mouseout', handleLeave);

    checkIfMobile(); // Check if the device is mobile initially

    window.addEventListener('resize', checkIfMobile); // Update on window resize

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      
      document.body.removeEventListener('mouseover', handleHover);
      document.body.removeEventListener('mouseout', handleLeave);
    //   elements.forEach((element) => {
    //     element.removeEventListener('mouseenter', handleElementHover);
    //     element.removeEventListener('mouseleave', handleElementLeave);
    //   });

      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Only render the cursor on non-mobile devices
  if (isMobile) {
    return null;
  }

  const gradientAnimation = isHoveringLink
    ? 'moveGradient 1.5s linear infinite'
    : 'none';

  const cursorStyle = {
    left: cursorPosition.x,
    top: cursorPosition.y,
    background: isHoveringLink
      ? 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)'
      : 'transparent',
    height: isHoveringLink ? '30px' : '20px',
    width: isHoveringLink ? '30px' : '20px',
    backgroundSize: isHoveringLink ? '1000% 100%' : 'auto',
    animation: gradientAnimation,
  };

  return <div className="custom-cursor" style={cursorStyle} />;
};

export default CustomCursor;
