import React, { useState, useEffect } from 'react';

const TextAnimation = ({ isAnimationComplete, onTitleClick }) => {
  const titles = ['about', 'projects', 'market', 'work'];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    if (isAnimationComplete && currentTitleIndex < titles.length) {
      const titleAnimation = () => {
        setTimeout(() => {
          setCurrentTitleIndex(currentTitleIndex + 1);
        }, 300);
      };

      titleAnimation();
    }
  }, [currentTitleIndex, titles, isAnimationComplete]);

  return (
    <div className="text-animation-container">
      {titles.map((title, index) => (
        <div key={index} className="title-container">
          <div
            id={`title-${index}`}
            className={`text ${index < currentTitleIndex ? 'show' : ''}`}
            onClick={() => onTitleClick(title)} // Step 2
          >
            {title.split('').map((letter, letterIndex) => (
              <span key={letterIndex} style={{ animationDelay: `${index * 0.5}s, ${letterIndex * 0.1}s` }}>
                {letter}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextAnimation;
