import React, { useState, useEffect } from "react";

function Title({ isDarkMode }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const isMobile = window.innerWidth <= 768;
  const words = ["Software", "Data", "Web", "Systems"];
  const colors = ["#f69851", "#9b63f5", "#ee7271", "#4da7ed"]; // Add your desired colors here

  const fadeThreshold = isMobile ? 200 : 350;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      const newWordIndex = Math.min(Math.floor(scrollY / (isMobile ? 25 : 100)), words.length - 1);
      setCurrentWordIndex(newWordIndex);

      if (newWordIndex === words.length - 1) {
        const excessScroll = scrollY - (newWordIndex * (isMobile ? 25 : 100));
        setTranslateY(-excessScroll);
      } else {
        setTranslateY(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [words.length, isMobile]);

  // Calculate the opacity between 0 and the fadeThreshold
  const titleOpacity = Math.max(1 - Math.abs(translateY) / fadeThreshold, 0);

  return (
    <div
      className="title"
      style={{
        color: isDarkMode ? "white" : "black",
        transform: `translate(-50%, ${translateY - 50}%)`,
        opacity: titleOpacity,
      }}
    >
      <span className="current" style={{ color: colors[currentWordIndex] }}>{words[currentWordIndex]}</span>
      <span className="engineer">Engineer</span>
    </div>
  );
}

export default Title;

