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

        // Initialize map after a short delay to ensure DOM is ready
        const timer = setTimeout(initMap, 100);

        // Cleanup function
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
                    // Convert blob to base64 string for localStorage
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        // Save the base64 image data to localStorage
                        localStorage.setItem('capturedMapImage', reader.result);
                        // Save coordinates as well
                        localStorage.setItem('mapCoordinates', JSON.stringify({
                            latitude: center.lat,
                            longitude: center.lng
                        }));
                    };
                    reader.readAsDataURL(blob);

                    const formData = new FormData();
                    formData.append("latitude", center.lat);
                    formData.append("longitude", center.lng);
                    formData.append("image", blob, "map_image.png");

                    // Replace with your actual API endpoint
                    fetch("/api/analyze-land", {
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
                        console.log("Image successfully uploaded:", data);
                        // Handle successful analysis here
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
                <a href="/" className="nav-btn-map">Go to Another Page</a>
            </div>
        </div>
    );
};

export default Map;
