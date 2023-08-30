import React, { useEffect, useState, useCallback } from 'react';
import Browser from './Browser';

function ParallaxSection({ isDarkMode }) {
    const [opacity, setOpacity] = useState(0);
    const [translateY, setTranslateY] = useState(-200);
    const [controlledScrollY, setControlledScrollY] = useState(0);

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
        const fadeStart = 550;
        const maxScrollSpeed = 9; // This will control the maximum speed

        let deltaY = scrollY - controlledScrollY;
        if (Math.abs(deltaY) > maxScrollSpeed) {
            deltaY = (deltaY > 0 ? 1 : -1) * maxScrollSpeed;
        }

        const newY = controlledScrollY + deltaY;

        setControlledScrollY(newY);
        window.scrollTo(0, newY);

        setOpacity(Math.min((newY - fadeStart + 100) / 100, 1));
        setTranslateY(50 - Math.min((newY - fadeStart + 100) / 2, 50));
    }, [controlledScrollY]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div 
            className="parallax-section" 
            style={{ 
                color: isDarkMode ? "white" : "black",
                opacity: opacity,
                transform: `translateY(${translateY}px)`
            }}
        >
            <Browser isDarkMode={isDarkMode} codeString={codeString1} initialPosition={{ x: 900, y: 300 }} />
            <Browser isDarkMode={isDarkMode} codeString={codeString2} initialPosition={{ x: 400, y: 400 }} />
        </div>
    );
}

export default ParallaxSection;
