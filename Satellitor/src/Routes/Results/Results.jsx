import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/AlphaV nobg.png';
import './Results.css';
import { FaBars, FaTimes, FaWater, FaTemperatureHigh, FaCloudRain, FaFlask } from 'react-icons/fa';

const Results = () => {
    const [apiData, setApiData] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [resultImage, setResultImage] = useState(false);
    const [opacity, setOpacity] = useState(0.7);

    useEffect(() => {
      axios.get("https://satellitor-test1.onrender.com/process1")
        .then((response) => {
          setApiData(response.data);
          setTimeout(() => setIsLoading(false), 1000);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
    return (
        <>
        {isLoading ? (
            <div className="loading-screen">
                <div className="loading-content">
                    <img src={logo} alt="Loading Logo" className="loading-logo" />
                    <p className="loading-text">Launching Satellitor...</p>
                    <div className="loading-spinner"></div>
                </div>
            </div>
        ) : (
        <>
            <nav className={isSticky ? "results-navbar sticky" : "results-navbar"}>
                <NavLink to="/" className="results-logo">
                    <img src={logo} alt="Logo" className="results-logo-img" />
                    <p className="results-title">Satellitor</p>
                </NavLink>

                <div className="results-menu">
                    
                    <ul className='results-nav-items'>
                        <li><NavLink to="/" className="results-nav-item">Home</NavLink></li>
                        <li><NavLink to="/Map" className="results-nav-item">New Analysis</NavLink></li>
                        <li><NavLink to="#contact" className="results-nav-item">Contact Us</NavLink></li>
                    </ul>
                </div>
            </nav>

            <div className={isSticky ? "results-mobile-header sticky" : "results-mobile-header"}>
                <NavLink to="/" className="results-logo">
                    <img src={logo} alt="Logo" className="results-logo-img" />
                    <p className="results-title">Satellitor</p>
                </NavLink>
                <button className="results-menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <nav className={isOpen ? "results-sidebar open" : "results-sidebar"}>
                <div className="results-menu-icon" onClick={() => setIsOpen(false)}>
                    <FaTimes />
                </div>
                <ul className='results-nav-items'>
                    <li><NavLink to="/" className="results-nav-item" onClick={() => setIsOpen(false)}>Home</NavLink></li>
                    <li><NavLink to="/Map" className="results-nav-item" onClick={() => setIsOpen(false)}>New Analysis</NavLink></li>
                    <li><NavLink to="#contact" className="results-nav-item" onClick={() => setIsOpen(false)}>Contact Us</NavLink></li>
                </ul>
            </nav>

            <div className="Results">
                <h1 className="results-head">Results</h1>
                <hr className="results-line" />
                <div className="result-content">
                    <div className="result-info">
                        <h2 className="result-info-head">Analysis Information</h2>
                        <div className="result-info-content">
                            <ul className="result-info-list">
                                <li>
                                    <span className="result-info-type">
                                        <FaWater className="info-icon" /> Humidity
                                    </span>
                                    <span className="result-info-text">{apiData?.humidity || 'N/A'}%</span>
                                </li>
                                <li>
                                    <span className="result-info-type">
                                        <FaTemperatureHigh className="info-icon" /> Temperature
                                    </span>
                                    <span className="result-info-text">{apiData?.temperature || 'N/A'}°C</span>
                                </li>
                                <li>
                                    <span className="result-info-type">
                                        <FaCloudRain className="info-icon" /> Rainfall
                                    </span>
                                    <span className="result-info-text">{apiData?.rainfall || 'N/A'} mm</span>
                                </li>
                                <li>
                                    <span className="result-info-type">
                                        <FaFlask className="info-icon" /> PH
                                    </span>
                                    <span className="result-info-text">{apiData.ph !== -1 ? apiData.ph : 'N/A'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="result-container">
                        <div className="result-img">
                            <img src="/AlphaV nobg.png" alt="result Logo" className="background" />
                            {resultImage ? (
                                <img 
                                    src={`https://satellitor-test1.onrender.com${apiData.mask_image}`} 
                                    alt="Result Image" 
                                    className="overlay" 
                                    style={{ opacity: opacity }}
                                />
                            ) : (
                                <img 
                                    src={`https://satellitor-test1.onrender.com${apiData.boundaries_image}`} 
                                    alt="result Logo" 
                                    className="overlay" 
                                />
                            )}
                        </div>
                        <div className="buttons">
                            <button className="boundry-btn" onClick={() => setResultImage(!resultImage)}>
                                {resultImage ? "Show Boundaries" : "Show Mask Image"}
                            </button>
                            {resultImage && (
                                <div className="opacity-control">
                                    <span className="opacity-label">Adjust Mask Opacity</span>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="1" 
                                        step="0.1" 
                                        value={opacity} 
                                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                        className="opacity-slider"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
        )}
        
    </>
    
  );
  
};

export default Results;
