import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Home from './components/Home';
import DarkModeContext from './components/DarkModeContext';
import InteractiveCircles from './components/Circles';


function App() {
    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const changeHandler = (event) => setIsDarkMode(event.matches);

        mediaQuery.addEventListener('change', changeHandler);
        return () => mediaQuery.removeEventListener('change', changeHandler);
    }, []);


    return (
        <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            <Router>
                <div className="App">
                    <InteractiveCircles />
                    <Navbar isDarkMode={isDarkMode} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                    </Routes>
                </div>
            </Router>
        </DarkModeContext.Provider>
    );
}

export default App;
