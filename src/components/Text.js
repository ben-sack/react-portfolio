import React, { useState, useEffect } from 'react';

const titles = [
    { name: 'Projects', description: 'Check out my projects' },
    { name: 'Photos', description: 'View my photography' },
    { name: 'Interests', description: 'Learn about my interests' },
    { name: 'Work', description: 'See my professional work' }
  ];
 
  const TextAnimation = ({ isAnimationComplete }) => {
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
    }, [currentTitleIndex, isAnimationComplete]);
 
    return (
      <div className="text-animation-container">
        {titles.map((titleObj, index) => (
          <div key={index} className="title-container tooltip">
            <div
              id={`title-${index}`}
              className={`text ${index < currentTitleIndex ? 'show' : ''}`}
            >
              {titleObj.name.split('').map((letter, letterIndex) => (
                <span key={letterIndex} style={{ animationDelay: `${index * 0.5}s, ${letterIndex * 0.1}s` }}>
                  {letter}
                </span>
              ))}
            </div>
            <span className="tooltiptext">{titleObj.description}</span>
          </div>
        ))}
      </div>
    );
  };
 
  export default TextAnimation;