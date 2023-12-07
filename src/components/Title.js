import React, { useState, useEffect } from "react";

function Title({ isDarkMode, onAnimationComplete }) {
    const [translateY] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [iterations, setIterations] = useState(0);
    const [isAnimationComplete, setAnimationComplete] = useState(false);

    const words = ["software", "data", "web", "systems", "devOps", "full-stack", "infra", "cloud"];
    const colors = ["#f69851", "#9b63f5", "#ee7271", "#4da7ed", "#f69851", "#9b63f5", "#ee7271", "#4da7ed"];
    const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");
    const longestWordWidth = longestWord.length * 22.5; // Assuming an average width of 15px per character; you might need to adjust this.
    const isMobile = window.innerWidth <= 768;
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    // Word Transitioning Hook
    useEffect(() => {
      if (isAnimationComplete) return;

      const baseSpeed = 100;  // 1/10th of a second
      const slowDownFactor = 1 + (0.2 * currentWordIndex);  // Increase by 20% for each word
      const adjustedSpeed = baseSpeed * slowDownFactor;

      const timeoutId = setTimeout(() => {
          setCurrentWordIndex((prevIndex) => {
              if (prevIndex < words.length - 1) {
                  return prevIndex + 1;
              } else {
                  setIterations((prevIterations) => prevIterations + 1);
                  return 0; // Reset to the first word
              }
          });
      }, adjustedSpeed);

      return () => clearTimeout(timeoutId);
    }, [currentWordIndex, isAnimationComplete, words.length]);

    // Animation Completion Check Hook
    useEffect(() => {
      if (iterations >= 4) {
          onAnimationComplete();
          setAnimationComplete(true);
      }
    }, [iterations, onAnimationComplete]);
  
  
  const completedStyle = isAnimationComplete ? {
      opacity: 0,
      filter: "blur(5px)", // Adjust for more or less blur
      transition: "opacity 2s ease, transform 1s ease, filter 2s ease"
  } : {};


    return (
        <div
            className="title"
            style={{
                display: "flex",  // Added Flexbox
                alignItems: "center",  // Center aligned items vertically
                color: isDarkMode ? "white" : "black",
                fontSize: isMobile ? screenHeight / 22 : screenHeight / 25,
                ...completedStyle
            }}
        >
            <span 
                className="current" 
                style={{
                    color: colors[currentWordIndex],
                    backgroundColor: isDarkMode ? "white" : "none",

                    transform: `translateY(${translateY}px)`,
                    minWidth: isMobile ? `135px` : `${longestWordWidth}px`, // Set the width dynamically

                }}
            >
                {words[currentWordIndex]}
            </span>
            <span className="engineer" style={{ marginLeft: '0' }}>
                Engineer
            </span>
        </div>
    );
}

export default Title;
