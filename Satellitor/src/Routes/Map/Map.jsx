import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Map.css";
import L from "leaflet";
import leafletImage from "leaflet-image";
import "leaflet/dist/leaflet.css";

const Map = () => {
    const mapRef = useRef(null);
    const navigate = useNavigate();
    const [captureDisabled, setCaptureDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    
    
    useEffect(() => {
        const initMap = () => {
            if (mapRef.current) return;
            
            const egyptBounds = [
                [22.0, 25.0],
                [31.6, 36.9]
            ];

            const map = L.map("map", {
                center: [26.8206, 30.8025],
                zoom: 5,
                maxBounds: egyptBounds,
                maxBoundsViscosity: 1.0
            });

            L.tileLayer("https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=XANnwLyOkpjBovOqPgZk", {
                attribution: '&copy; MapTiler',
                minZoom: 5,
                maxZoom: 15
            }).addTo(map);

            map.on("zoomend", () => {
                setCaptureDisabled(map.getZoom() !== 15);
            });

            mapRef.current = map;
        };

        const timer = setTimeout(initMap, 100);

        return () => {
            clearTimeout(timer);
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    const handleCapture = async () => {
        if (!mapRef.current || captureDisabled || isLoading) return;

        setIsLoading(true);
        const center = mapRef.current.getCenter();

        try {
            leafletImage(mapRef.current, (err, canvas) => {
                if (err) {
                    console.error("Error capturing map:", err);
                    setIsLoading(false);
                    return;
                }

                canvas.toBlob((blob) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        localStorage.setItem('capturedMapImage', reader.result);
                    };
                    reader.readAsDataURL(blob);

                    const formData = new FormData();
                    formData.append("latitude", center.lat);
                    formData.append("longitude", center.lng);
                    formData.append("image", blob, "image.png");

                    fetch("http://13.51.134.174:5000/process", {
                        method: "POST",
                        body: formData
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        localStorage.setItem('mapAnalysisData', JSON.stringify({
                            coordinates: {
                                latitude: center.lat,
                                longitude: center.lng
                            },
                            analysis: data
                        }));
                        console.log("Data stored in localStorage:", data);
                    })
                    .catch(error => {
                        console.error("Error uploading image:", error);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
                }, "image/png");
            });
        } catch (error) {
            console.error("Error in handleCapture:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="main-map">
            <div className="stars-container">
                {[...Array(50)].map((_, i) => {
                    const delay = Math.random() * 2;
                    const duration = 1.5 + Math.random() * 1;
                    return (
                        <span 
                            key={i} 
                            style={{
                                "--i": i,
                                "--delay": `${delay}s`,
                                "--duration": `${duration}s`
                            }} 
                            className="map-star"
                        ></span>
                    );
                })}
            </div>
            
            <div className="container">
                <div id="map"></div>
            </div>

            <div className="content-map">
                <div className="head-map">Map</div>
                <button 
                    onClick={() => {
                        handleCapture();
                        navigate("/results");
                    }}
                    disabled={captureDisabled || isLoading}
                    id="captureBtn-map"
                    style={{ 
                        cursor: (captureDisabled || isLoading) ? "not-allowed" : "pointer",
                        opacity: (captureDisabled || isLoading) ? 0.6 : 1
                    }}
                    className="capture-btn-map"
                >
                    {isLoading ? "Analyzing..." : "Start analysing"}
                </button>
                <div className="nav-container">
                    <a href="/" className="nav-btn-map">Go to Home</a>
                    <div className="space">
                        <span style={{"--i": 31}} className="star"></span>
                        <span style={{"--i": 12}} className="star"></span>
                        <span style={{"--i": 57}} className="star"></span>
                        <span style={{"--i": 93}} className="star"></span>
                        <span style={{"--i": 23}} className="star"></span>
                        <span style={{"--i": 70}} className="star"></span>
                        <span style={{"--i": 6}} className="star"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Map;
