import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/AlphaV nobg.png';
import './Results.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Results = () => {
    const [apiData, setApiData] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      axios.get("https://satellitor-test1.onrender.com/process2")
        .then((response) => {
          setApiData(response.data);
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
        {/* Large Screen Navbar */}
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
        
    </>
    // <div>
    //   <h2>Normal Crops</h2>
    //   {apiData?.normal_crops?.length > 0 ? (
    //     <table border="1">
    //       <thead>
    //         <tr>
    //           <th>Crop Name</th>
    //           <th>Category</th>
    //           <th>Scientific Name</th>
    //           <th>PH Range</th>
    //           <th>Rainfall Range (mm)</th>
    //           <th>Temperature Range (°C)</th>
    //           <th>Notes</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {apiData.normal_crops.map((crop, index) => (
    //           <tr key={index}>
    //             <td>{crop.crop_name}</td>
    //             <td>{crop.crop_data.category}</td>
    //             <td>{crop.crop_data.scientific_name}</td>
    //             <td>{crop.crop_data.ph_min} - {crop.crop_data.ph_max}</td>
    //             <td>{crop.crop_data.rainfall_min} - {crop.crop_data.rainfall_max}</td>
    //             <td>{crop.crop_data.temp_min} - {crop.crop_data.temp_max}</td>
    //             <td>{crop.crop_notes}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : (
    //     <p>No normal crops available.</p>
    //   )}
    // </div>
  );
  
};

export default Results;
