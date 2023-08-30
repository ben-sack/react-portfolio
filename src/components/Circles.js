import React from 'react';

function InteractiveCircles() {
    const circleCount = 10; // Number of circles
    const circles = [];

    for (let i = 0; i < circleCount; i++) {
        const size = 10 + Math.random() * 40; // Varying circle size
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`; // Random color with opacity

        circles.push(
            <div
                key={i}
                className="floatingCircle" // Add class for floating effect
                style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: color,
                    left: `${x}px`,
                    top: `${y}px`,
                    animationDuration: `${5 + Math.random() * 10}s`, // Random duration between 5 to 15 seconds
                    animationDelay: `${Math.random() * 5}s` // Random delay between 0 to 5 seconds
                }}
            />
        );
    }

    return <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>{circles}</div>;
}

export default InteractiveCircles;
