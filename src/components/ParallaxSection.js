import React, { useEffect, useState, useCallback } from 'react';
import Browser from './Browser';

function ParallaxSection({ isDarkMode }) {
    const [opacity, setOpacity] = useState(0);
    const [translateY, setTranslateY] = useState(-200);
    const [controlledScrollY, setControlledScrollY] = useState(0);
    const isMobile = window.innerWidth <= 768;
    const codeString1 = `
    def about(work: Dict[str, int], play: Any):

        work = {
            Farmers: 0.5,
            Progressive: 4.5,
            Disney: 0.9,
        }

        play = {"Soccer", "Music", ...}
    `;

    const codeString2 = `
    def about(work: Dict[str, int], play: Any):

        work = {
            Farmers: 0.5,
            Progressive: 4.5,
            Disney: 0.9,
        }

        play = {"Soccer", "Music", ...}
    `;

    const handleScroll = useCallback(() => {
        const { scrollY } = window;
        const fadeStart = isMobile ? 250 : 500;
        const maxScrollSpeed = isMobile ? 10 : 9; 
    
        let deltaY = scrollY - controlledScrollY;
        if (Math.abs(deltaY) > maxScrollSpeed) {
            deltaY = (deltaY > 0 ? 1 : -1) * maxScrollSpeed;
        }
    
        const newY = controlledScrollY + deltaY;
    
        setControlledScrollY(newY);
        window.scrollTo(0, newY);
    
        setOpacity(Math.min((newY - fadeStart + 100) / 100, 1));
        setTranslateY(isMobile ? 0 : 50 - Math.min((newY - fadeStart + 100) / 2, 50));
    }, [controlledScrollY, isMobile]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        if (isMobile) {
            const scrollToBottom = setInterval(() => {
                window.scrollTo(0, document.body.scrollHeight);
            }, 1000); // Adjust speed as needed
            return () => {
                window.removeEventListener("scroll", handleScroll);
                clearInterval(scrollToBottom);
            }
        } else {
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll, isMobile]);

    return (
        <div 
            className="parallax-section" 
            style={{ 
                color: isDarkMode ? "white" : "black",
                opacity: opacity,
                
                transform: `translateY(${translateY}px)`
            }}
        >
            <Browser isDarkMode={isDarkMode} codeString={codeString1} initialPosition={isMobile ? { x: 60, y: 550 } : { x: 400, y: 400 }} />
            {!isMobile && (
                <Browser 
                    isDarkMode={isDarkMode} 
                    codeString={codeString2} 
                    initialPosition={{ x: 900, y: 300 }} 
                />
            )}
        </div>
    );
}

export default ParallaxSection;