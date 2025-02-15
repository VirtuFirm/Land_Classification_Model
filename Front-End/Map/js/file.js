// Define Egypt's bounding box
const egyptBounds = [
    [22.0, 25.0], 
    [31.6, 36.9]  
];

const map = L.map('map', {
    center: [26.8206, 30.8025], // Egypt center
    zoom: 6,
    maxBounds: egyptBounds, // Restrict map to Egypt
    maxBoundsViscosity: 1.0, // Strict enforcement
});

// Add satellite tiles
L.tileLayer('https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=XANnwLyOkpjBovOqPgZk', {
    attribution: '&copy; MapTiler',
    minZoom: 5,
    maxZoom: 10 // Restrict zooming out too far
}).addTo(map);

// Capture Button Handling
const captureBtn = document.getElementById('captureBtn');

map.on('zoomend', function () {
    if (map.getZoom() === 8) { // Enable button only at zoom 8
        captureBtn.disabled = false;
        captureBtn.style.cursor = "pointer";
    } else {
        captureBtn.disabled = true;
        captureBtn.style.cursor = "not-allowed";
    }
});

captureBtn.addEventListener("click", () => {
    html2canvas(document.querySelector("#map"), { useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        // Send to backend
        fetch('/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imgData })
        })
        .then(response => response.json())
        .then(data => alert("Image saved successfully!"))
        .catch(error => console.error("Error:", error));
    });
});