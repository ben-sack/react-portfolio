import React, { useContext, useState, useEffect } from 'react';
import Title from './Title';
import DarkModeContext from './DarkModeContext';
import Browser from './Browser';
import AnimatedText from './Writing';
import TextAnimation from './Text';

// TODO: Make this text dynamic for code block
const copy = `
yo!

welcome to my version of a "portfolio" site. 😅

i'll say a few brief words then ramble all the _interesting_
bits of knowledge i've come to learn over my short-stint in
tech :)

personel...



proffessional...



links to the deeeeeper site 🥹
`


function Home() {
    const { isDarkMode } = useContext(DarkModeContext);
    const [isAnimationComplete, setAnimationComplete] = useState(false);
    const isMobile = window.innerWidth <= 768;
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screensWidth, setScreenWidth] = useState(window.innerWidth);



    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
            setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
            <div className='home' style={{position: 'relative', minHeight: '100vh'}}>
                <Title isDarkMode={isDarkMode} onAnimationComplete={() => setAnimationComplete(true)} />
                <TextAnimation isAnimationComplete={isAnimationComplete}></TextAnimation>
                {/* <Browser 
                    style={isAnimationComplete ? { opacity: 1, transform: 'translateY(0)' } : { opacity: 0 }}
                    isDarkMode={isDarkMode} 
                    codeString={copy} 
                    initialPosition={isMobile ? { x: screensWidth/10, y: screenHeight-(screenHeight/1.1) } : { x:  screensWidth/4, y: screenHeight- (screenHeight/1.1) }} 
                    isAnimationComplete={isAnimationComplete}
                /> */}
            </div>
    );
}

export default Home;