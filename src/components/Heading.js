import React, { useState, useEffect } from "react";

function Heading({ isDarkMode, isAnimationComplete }) {


    const isMobile = window.innerWidth <= 768;
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    // // Word Transitioning Hook
    // useEffect(() => {
    //   if (isAnimationComplete) return;
    // )
  
  
    const completedStyle = isAnimationComplete ? {
        opacity: 1,
        filter: "blur(0px)", // Adjust for more or less blur
        transition: "opacity 2s ease, transform 1s ease, filter 2s ease"
    } : {};

    return (
        <div
            className="heading"
            style={{
                opacity: 1,
                display: "flex",  // Added Flexbox
                alignItems: "center",  // Center aligned items vertically
                color: isDarkMode ? "white" : "black",
                filter: "blur(5px)",
                fontSize: isMobile ? screenHeight / 22 : screenHeight / 25,
                ...completedStyle
            }}
        >
            <span>
                Ben Sack
            </span>
        </div>
    );
}

export default Heading;
