import React from 'react';
import Heading from './Heading';


const Contact = ({ isAnimationComplete }) => {
     const isMobile = window.innerWidth <= 768;

    const completedStyle = isAnimationComplete ? {
        opacity: 1,
        filter: "blur(0px)", // Adjust for more or less blur
        transition: "opacity 2s ease, transform 1s ease, filter 2s ease"
    } : {};
    console.log(isAnimationComplete)
  return (
    
    <div className="contact-container" style={{
        width: isMobile ? '90%' : '50%',
        ...completedStyle
    }}>
      <Heading isAnimationComplete={true}></Heading>

      <div className="contact-tile"
        style={{
            gridColumnStart: 1,
            gridColumnEnd: 2,
            // gridRowStart: 1,
            // gridRowEnd: 3,
        }}>
        <i className="fa-solid fa-person-snowboarding"></i>

      </div>
      <div className="contact-tile" 
        style={{
            gridColumnStart: 2,
            gridColumnEnd: 5,
            // gridRowStart: 1,
            // gridRowEnd: 3,
            }}>
        <i className="fa-regular fa-comments"></i>
        <hr style={{opacity: 0.2, width: '90%'}}></hr>
        <p>enter text some more text</p>
        <p>enter text here</p>
        <p>enter text here</p>
        <p>enter text here</p>

      </div>
      <div className="contact-tile">
        <i className="fab fa-twitter contact-media-icon"></i>
      </div>
      
      <div className="contact-tile">
        <i className="fab fa-linkedin-in contact-media-icon"></i>
      </div>
      <div className="contact-tile">
        <i className="fab fa-instagram contact-media-icon"></i>
      </div>
      <div className="contact-tile">
        <i className="fab fa-linkedin-in contact-media-icon"></i>
      </div>

    </div>
  );
};

export default Contact;
