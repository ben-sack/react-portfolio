import React, { useState, useEffect } from 'react';

function InteractiveCircles() {
    const [circles, setCircles] = useState([]);
    const [clickCircles, setClickCircles] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        // Generate random circles on initial load
        generateRandomCircles();
    }, []); // Run only on mount

    // Generate random circles function
    const generateRandomCircles = () => {
        const circleCount = 10;
        const newCircles = [];

        for (let i = 0; i < circleCount; i++) {
            const size = 10 + Math.random() * 40;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`;

            newCircles.push({
                size,
                color,
                left: `${x}px`,
                top: `${y}px`,
                animationDuration: `${5 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`,
            });
        }

        setCircles(newCircles);
    };

    // Handle mouse down or touch start event
    const handleDown = () => {
        setIsMouseDown(true);
    };

    // Handle mouse up or touch end event
    const handleUp = () => {
        setIsMouseDown(false);
    };

    // Handle mouse move or touch move event
    const handleMove = (event) => {
        if (isMouseDown || event.touches) {
            handleClick(event);
        }
    };

    // Handle click or touch event
    const handleClick = (event) => {
        const { clientX, clientY } = event.touches ? event.touches[0] : event;
        const size = 10 + Math.random() * 40;
        const color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`;

        // Add a new circle based on the click position
        setClickCircles((prevClickCircles) => [
            ...prevClickCircles,
            {
                size,
                color,
                left: `${clientX - size / 2}px`,
                top: `${clientY - size / 2}px`,
            },
        ]);
    };

    return (
        <div
            onMouseDown={handleDown}
            onMouseUp={handleUp}
            onMouseMove={handleMove}
            onTouchStart={handleDown}
            onTouchEnd={handleUp}
            onTouchMove={handleMove}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}
        >
            {/* Render circles from initial load */}
            {circles.map((circle, index) => (
                <div
                    key={index}
                    className="floatingCircle"
                    style={{
                        position: 'absolute',
                        width: circle.size,
                        height: circle.size,
                        borderRadius: '50%',
                        backgroundColor: circle.color,
                        left: circle.left,
                        top: circle.top,
                        animationDuration: circle.animationDuration,
                        animationDelay: circle.animationDelay,
                    }}
                />
            ))}

            {/* Render circles from click events */}
            {clickCircles.map((circle, index) => (
                <div
                    key={index}
                    className="clickCircle"
                    style={{
                        position: 'absolute',
                        width: circle.size,
                        height: circle.size,
                        borderRadius: '50%',
                        backgroundColor: circle.color,
                        left: circle.left,
                        top: circle.top,
                        animationDuration: '1s', // Adjust animation duration as needed
                    }}
                />
            ))}
        </div>
    );
}

export default InteractiveCircles;
