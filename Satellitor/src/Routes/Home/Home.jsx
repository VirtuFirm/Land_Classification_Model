import React, { useEffect, useState } from 'react';
import './Home.css';
import urbanDev from "./asserts/28559_sat.jpg"
import landUse from "./asserts/386892_sat.jpg"
import agriculture from "./asserts/386993_sat.jpg"


const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        setIsSticky(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header id="header" className={isSticky ? 'sticky' : ''}>
                <a href="/" className="logo">Satellitor</a>
                <div className="nav">
                    <div className="nav-path">
                        <a href="#about" className="nav-link">About</a>
                        <a href="#how" className="nav-link">How to use</a>
                        <a href="#start" className="nav-link">Get Start</a>
                        <a href="#contact" className="nav-link">Contact Us</a>
                    </div>
                </div>
                <button className="menu-button" id="menuButton" onClick={toggleSidebar}>☰</button>
            </header>
            
            <div id="sidebar" className={isSidebarOpen ? 'sidebar open' : 'sidebar'}>
                <button className="close-button" id="closeButton" onClick={toggleSidebar}>✕</button>
                <nav className="sidebar-nav">
                    <a href="#about" className="nav-link">About</a>
                    <a href="#how" className="nav-link">How to use</a>
                    <a href="#start" className="nav-link">Get Start</a>
                    <a href="#contact" className="nav-link">Contact Us</a>
                </nav>
            </div>
            
            <div className="home">
                <div className="head">Satellitor</div>
                <div className="sublog">Explore the Earth Surface</div>
                <div className="owner">Made by Alpha 5</div>
                <a href="#about" className="arrow"></a>
            </div>
            
            <div className="about" id="about">
                <div className="content">
                    <h2 className="about-head">About Satellitor</h2>
                    <p className="text">
                        Satellitor is an advanced platform that allows users to explore and analyze specific regions of Earth 
                        using satellite imagery. By selecting an area on the map, our system performs object detection to provide 
                        insights about land.
                    </p>
                </div>
                <div className="cards">
                    <div className="place urban">
                        <div className="icon">
                            <i className="fa-solid fa-eye"></i>
                        </div>
                        <h3 className="place-head">Visionary Analysis</h3>
                        <p className="place-content">Utilizing segmentation masks and class boundaries, our AI-powered system 
                            provides precise land classification. Identify urban zones, vegetation, 
                            and barren lands for smarter environmental analysis.</p>
                    </div>
                    <div className="place agriculture">
                        <div className="icon">
                            <i className="fas fa-seedling"></i>
                        </div>
                        <h3 className="place-head">Crop Recommendation</h3>
                        <p className="place-content"> Using AI and satellite data, we analyze soil, climate, and rainfall to 
                            suggest the best crops for your land. Maximize yield and farm smarter 
                            with data-driven insights.</p>
                    </div>
                    <div className="place barren">
                        <div className="icon">
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <h3 className="place-head">Numerical Analysis</h3>
                        <p className="place-content">Our AI-driven numerical analysis provides insights on percentage data, 
                            soil pH, climate conditions, and fragmentation index. Make informed 
                            decisions with precise environmental data.</p>
                    </div>
                </div>
            </div>
            <div className="desc">
                <div className="card">
                    <img src={urbanDev} alt="Urban Development" />
                    <div className="card-content urban">
                        <h3>Urban Development</h3>
                        <p>See insights about urban development in a specific area, including the density of buildings, roads, and more.</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content barren">
                        <h3>Land Use Analysis</h3>
                        <p>See The Precentage of The Land That is around you that needs for reclamation</p>
                    </div>
                    <img src={landUse} alt="Land Use Analysis" />
                </div>
                
                <div className="card">
                    <img src={agriculture} alt="Agriculture Analysis" />
                    <div className="card-content agriculture">
                        <h3>Agriculture Analysis</h3>
                        <p>See What you Can plant in your land for free with no efforts</p>
                    </div>
                </div>
            </div>

            <div className="how" id="how">
                <h2 className="how-head">How to Use Satellitor</h2>
                <div className="how-container">
                    <iframe 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        title="YouTube Video Player" 
                        frameBorder="0" 
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
            <hr />
            <div className="start" id="start">
                <h2 className="start-head">Get Started with Satellitor</h2>
                <p className="start-text">Start Discover you word</p>
                <div className="box">
                    <button className="button">Start</button>
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
    );
};

export default Home;
