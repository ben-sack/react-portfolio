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
    const [openedBrowsers, setOpenedBrowsers] = useState([]); // Step 1
    const isMobile = window.innerWidth <= 768;
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screensWidth, setScreenWidth] = useState(window.innerWidth);
    const [browserVisibility, setBrowserVisibility] = useState({});

  // Define different copies for each title
  const projectCopy = "Here are my projects";
  const photosCopy = "Check out my photo gallery";
  const interestsCopy = "Learn about my interests";
  const workCopy = "Explore my professional work";

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
        case 'Projects':
          copy = projectCopy;
          break;
        case 'Photos':
          copy = photosCopy;
          break;
        case 'Interests':
          copy = interestsCopy;
          break;
        case 'Work':
          copy = workCopy;
          break;
        default:
          copy = ''; // Set a default value or handle additional titles
      }

      setOpenedBrowsers((prevBrowsers) => [
        ...prevBrowsers,
        { title, codeString: copy },
      ]);

      // Update visibility state for the opened browser
      setBrowserVisibility((prevVisibility) => ({
        ...prevVisibility,
        [title]: true,
      }));
    }
  };

  const closeBrowser = (title) => {
    setOpenedBrowsers((prevBrowsers) =>
      prevBrowsers.filter((browser) => browser.title !== title)
    );

    // Update visibility state for the closed browser
    setBrowserVisibility((prevVisibility) => ({
        ...prevVisibility,
        [title]: false,
        }));
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
                : { x: screensWidth / 4, y: screenHeight - screenHeight / 1.1 }
            }
            isAnimationComplete={isAnimationComplete}
            isVisible={browserVisibility[browser.title]}
            onClose={() => closeBrowser(browser.title)}
            />
        ))}
      </div>
    );
  }
  
  export default Home;