import React, { useContext, useState, useEffect } from 'react';
import Title from './Title';
import DarkModeContext from './DarkModeContext';
import Browser from './Browser';
import home from '../home.json'
import TextAnimation from './Text';


function Home() {
    const { isDarkMode } = useContext(DarkModeContext);
    const [isAnimationComplete, setAnimationComplete] = useState(false);
    const [openedBrowsers, setOpenedBrowsers] = useState([]); // Step 1
    const isMobile = window.innerWidth <= 768;
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screensWidth, setScreenWidth] = useState(window.innerWidth);
    const [browserVisibility, setBrowserVisibility] = useState({});
    const [activeBrowser, setActiveBrowser] = useState(null);
    // Define different copies for each title


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

    const openBrowser = (title) => {
        // Check if a browser with the same title is already opened
        if (!openedBrowsers.some((browser) => browser.title === title)) {
            let copy;
            switch (title) {
                case 'projects':
                    copy = home.projects;
                    break;
                case 'work':
                    copy = home.work;
                    break;
                case 'market':
                    copy = home.market;
                    break;
                case 'about':
                    copy = home.about;
                    break;
                default:
                    copy = ''; // Set a default value or handle additional titles
            }


            setOpenedBrowsers((prevBrowsers) => [
                ...prevBrowsers,
                { title, codeString: copy },
              ]);
        
              setActiveBrowser(title);
            } else {
              setActiveBrowser(title); // If the browser is already opened, set it as active
            }
          };
        
          const closeBrowser = (title) => {
            setOpenedBrowsers((prevBrowsers) =>
              prevBrowsers.filter((browser) => browser.title !== title)
            );
        
            setActiveBrowser(null);
          };
    return (
        <div className='home' style={{ position: 'relative', minHeight: '100vh' }}>
            <Title isDarkMode={isDarkMode} onAnimationComplete={() => setAnimationComplete(true)} />
            <TextAnimation isAnimationComplete={isAnimationComplete} onTitleClick={openBrowser} />
            {openedBrowsers.map((browser, index) => (
                <Browser
                    key={index}
                    isDarkMode={isDarkMode}
                    codeString={browser.codeString}
                    initialPosition={
                        isMobile
                            ? { x: screensWidth / 10, y: screenHeight - screenHeight / 1.1 }
                            : { x: screensWidth / 2, y: screenHeight - screenHeight / 1.1 }
                    }
                    isAnimationComplete={isAnimationComplete}
                    isVisible={activeBrowser === browser.title}
                    onClose={() => closeBrowser(browser.title)}
                />
            ))}
        </div>
    );
}

export default Home;