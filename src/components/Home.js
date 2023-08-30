import React, { useContext, useRef } from 'react';
import Title from './Title';
import InteractiveCircles from './Circles';
import DarkModeContext from './DarkModeContext';
import ParallaxSection from './ParallaxSection';
import HomeContext from './HomeContext';

function Home() {
    const { isDarkMode } = useContext(DarkModeContext);
    const topRef = useRef(null);
    
    return (
        <HomeContext.Provider value={topRef}>
            <div style={{position: 'relative', minHeight: '100vh'}}>
                <Title isDarkMode={isDarkMode}/>
                <ParallaxSection isDarkMode={isDarkMode} />
                <InteractiveCircles />
            </div>
        </HomeContext.Provider>
    );
}

export default Home;
