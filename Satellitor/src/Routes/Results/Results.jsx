import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/AlphaV nobg.png';
import './Results.css';
import { FaBars, FaTimes, FaWater, FaTemperatureHigh, FaCloudRain, FaFlask } from 'react-icons/fa';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

const Results = () => {
    const [apiData, setApiData] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [resultImage, setResultImage] = useState(false);
    const [opacity, setOpacity] = useState(0.7);
    const [visibleCrops, setVisibleCrops] = useState(3);
    const capturedMapImage = localStorage.getItem('capturedMapImage');    
    const storedData = localStorage.getItem('mapAnalysisData');
    const analysisData = storedData ? JSON.parse(storedData) : null;

    const regionColors = {
        "Urban": "#ff0000",
        "Barren": "#d2b48c",
        "Agriculture": "#00ff00",
        "Water Surface": "#0000ff",
        "Forest": "#006400",
    };

    useEffect(() => {
        if (analysisData) {
            const timer = setTimeout(() => {
                setApiData(analysisData.analysis);
                setIsLoading(false);
            }, 3000);
            
            return () => clearTimeout(timer);
        }
        else{
            setIsLoading(true);
        }
    }, [analysisData]);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const processData = (data) => {
        if (!data) return null;
        
        // Filter out zero values and create new objects
        const filteredPercentage = Object.fromEntries(
            Object.entries(data.percentage || {}).filter(([_, value]) => value !== 0 && _ != "Background")
        );
        
        const filteredFI = Object.fromEntries(
            Object.entries(data.normalized_FI || {}).filter(([key, value]) => filteredPercentage[key] !== 0)
        );

        const themeColors = [
            '#6A0DAD', // Deep Purple
            '#8A2BE2', // Blue Violet
            '#9370DB', // Medium Purple
            '#BA55D3', // Medium Orchid
            '#DA70D6', // Orchid
            '#DDA0DD', // Plum
            '#EE82EE', // Violet
            '#FF00FF', // Magenta
            '#FF69B4', // Hot Pink
            '#FFB6C1'  // Light Pink
        ];

        return {
            barData: {
                labels: Object.keys(filteredPercentage),
                datasets: [
                    {
                        label: "Normalized Fragmentation Index",
                        data: Object.values(filteredFI),
                        backgroundColor: themeColors[0],
                        borderColor: themeColors[1],
                        borderWidth: 1,
                    },
                ],
            },
            pieData: {
                labels: Object.keys(filteredPercentage),
                datasets: [
                    {
                        data: Object.values(filteredPercentage),
                        backgroundColor: themeColors,
                        borderColor: '#fff',
                        borderWidth: 1,
                    },
                ],
            }
        };
    };

    const chartData = processData(apiData);
    
    const barOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top", labels: { color: "white" } },
            title: { display: true, text: "Fragmentation Index by Land Type", color: "white" },
        },
        scales: {
            x: { 
                stacked: true, 
                ticks: { color: "white" },
                grid: {
                    display: false
                }
            },
            y: { 
                stacked: true, 
                ticks: { color: "white" },
                grid: {
                    display: false
                }
            },
        },
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: { position: "right", labels: { color: "white" } },
            title: { display: true, text: "Land Type Distribution", color: "white" },
        },
    };
    
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
                            <img src={capturedMapImage} alt="result Logo" className="background" />
                            {resultImage ? (
                                <img 
                                    src={`http://13.51.134.174:5000${apiData.mask_image}`} 
                                    alt="Result Image" 
                                    className="overlay" 
                                    style={{ opacity: opacity }}
                                />
                            ) : (
                                <img 
                                    src={`http://13.51.134.174:5000${apiData.boundaries_image}`} 
                                    alt="result Logo" 
                                    className="overlay" 
                                />
                            )}
                        </div>
                        {resultImage && (
                            <div className="color-legend-row">
                                {Object.entries(apiData?.percentage || {}).map(([region, value]) => {
                                    if (value > 0 && region !== "Background") {
                                        return (
                                            <div key={region} className="color-legend-item">
                                                <div 
                                                    className="color-swatch" 
                                                    style={{ backgroundColor: regionColors[region] }}
                                                ></div>
                                                <span className="color-label">{region}</span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        )}
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
                <h1 className="results-head">Analysis Chart</h1>
                <hr className="results-line" />
                <div className="chart-container">
                    <div className="chart-title">
                    
                    </div>
                    <div className="chart-content">
                        <div className="chart-wrapper">
                            {chartData ? (
                                <>
                                    <div className="bar-chart">
                                        <Bar data={chartData.barData} options={barOptions} />
                                    </div>
                                    <div className="pie-chart">
                                        <Pie data={chartData.pieData} options={pieOptions} />
                                    </div>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
                
                <h1 className="results-head">Crop Recommendation</h1>
                <hr className="results-line" />
                <div className="crops-content">
                    <div className="best-crop">
                        <h2 className="best-crop-head">Best Crop for your Land</h2>
                        {apiData?.best_crops && apiData.best_crops.length > 0 ? (
                            apiData.best_crops.map((crop) => (
                                <div className="crop-item" key={crop.crop_name}>
                                    <h3 className="crop-name">{crop.crop_name}</h3>
                                    <div className="crop-details">
                                        <strong>Temperature Range:</strong>
                                        <span>{crop.crop_data.temp_min}°C - {crop.crop_data.temp_max}°C</span>
                                    </div>
                                    <div className="crop-details">
                                        <strong>Optimal Temperature:</strong>
                                        <span>{crop.crop_data.temp_opt_min}°C - {crop.crop_data.temp_opt_max}°C</span>
                                    </div>
                                    <div className="crop-details">
                                        <strong>Rainfall Range:</strong>
                                        <span>{crop.crop_data.rainfall_min}mm - {crop.crop_data.rainfall_max}mm/year</span>
                                    </div>
                                    <div className="crop-details">
                                        <strong>Optimal Rainfall:</strong>
                                        <span>{crop.crop_data.rainfall_opt_min}mm - {crop.crop_data.rainfall_opt_max}mm/year</span>
                                    </div>
                                    <div className="crop-details">
                                        <strong>PH Range:</strong>
                                        <span>{crop.crop_data.ph_min} - {crop.crop_data.ph_max}</span>
                                    </div>
                                    <div className="crop-details">
                                        <strong>Optimal PH Range:</strong>
                                        <span>{crop.crop_data.ph_opt_min} - {crop.crop_data.ph_opt_max}</span>
                                    </div>
                                    <div className="crop-details">
                                        <strong>Scientific Name:</strong>
                                        <span>{crop.crop_data.scientific_name}</span>
                                    </div>
                                    <div className="crop-details">
                                        <strong>Category:</strong>
                                        <span>{crop.crop_data.category}</span>
                                    </div>
                                    <div className="crop-details">
                                        <strong>Characteristics:</strong>
                                        <span>{crop.crop_data.notes}</span>
                                    </div>
                                    <div className="crop-desc">
                                        <strong>Important Notes:</strong> {crop.crop_notes}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state best-crop-empty">
                                <div className="empty-state-icon"></div>
                                <h3 className="empty-state-title">No Optimal Crops Found</h3>
                                <p className="empty-state-message">
                                    Based on the current land conditions, we couldn't find any crops that would be optimal for cultivation. This could be due to extreme weather conditions, soil composition, or other environmental factors.
                                </p>
                                <div className="empty-state-suggestion">
                                    Consider improving soil conditions or exploring alternative land use options
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="normal-crops">
                        <h2 className="normal-crops-head">Alternative Crops</h2>
                        <div className="crop-container-normal">
                            {apiData?.normal_crops && apiData.normal_crops.length > 0 ? (
                                <>
                                    {apiData.normal_crops.slice(0, visibleCrops).map((crop, index) => (
                                        <div className="normal-crop-item" key={index}>
                                            <h3 className="normal-crop-name">{crop.crop_name}</h3>
                                            <span className="normal-crop-category">{crop.crop_data.category}</span>
                                            <div className="normal-crop-grid">
                                                <div className="normal-crop-detail">
                                                    <span className="normal-crop-detail-title">Temperature Range</span>
                                                    <span className="normal-crop-detail-value">{crop.crop_data.temp_min}°C - {crop.crop_data.temp_max}°C</span>
                                                </div>
                                                <div className="normal-crop-detail">
                                                    <span className="normal-crop-detail-title">Rainfall Range</span>
                                                    <span className="normal-crop-detail-value">{crop.crop_data.rainfall_min}mm - {crop.crop_data.rainfall_max}mm/year</span>
                                                </div>
                                                <div className="crop-details">
                                                    <strong>PH Range:</strong>
                                                    <span>{crop.crop_data.ph_min} - {crop.crop_data.ph_max}</span>
                                                </div>
                                                <div className="crop-details">
                                                    <strong>Scientific Name:</strong>
                                                    <span>{crop.crop_data.scientific_name}</span>
                                                </div>
                                            </div>
                                            <div className="normal-crop-notes">
                                                <p className="normal-crop-notes-title">Important Notes</p>
                                                <p className="normal-crop-notes-text">{crop.crop_notes}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {visibleCrops < apiData.normal_crops.length && (
                                        <button 
                                            className="show-more-btn"
                                            onClick={() => setVisibleCrops(prev => Math.min(prev + 3, apiData.normal_crops.length))}
                                        >
                                            Show More
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="empty-state normal-crops-empty">
                                    <div className="empty-state-icon"></div>
                                    <h3 className="empty-state-title">No Alternative Crops Available</h3>
                                    <p className="empty-state-message">
                                        We couldn't find any suitable alternative crops for your land at this time. This might be due to specific environmental conditions or limitations in the current analysis.
                                    </p>
                                    <div className="empty-state-suggestion">
                                        Try adjusting your search parameters or consult with agricultural experts
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact" id="contact">
                <h2 className="contact-title">Contact Us</h2>
                
                <p className="contact-text">Have any questions or feedback? Feel free to reach out to us.</p>
                
                <div className="contact-container">
                    <form className="contact-form">
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
            
                    <div className="contact-info">
                        <p>Email: <a href="mailto:satalitor@gmail.com">virtufirm.org@gmail.com</a></p>
                        <p>Phone: +20 128 696 4627</p>
                    </div>
                </div>
                <p className="last">This Team is a Part of <a href="https://www.linkedin.com/company/virtufirm" className="virtu">VirtuFirm </a></p>
            </div>
        </>
        )}    
    </>
  );
};

export default Results;
