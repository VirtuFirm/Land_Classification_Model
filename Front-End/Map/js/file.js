window.onload = function () {
    const egyptBounds = [
        [22.0, 25.0], 
        [31.6, 36.9]  
    ];

    const map = L.map('map', {
        center: [26.8206, 30.8025],
        zoom: 6,
        maxBounds: egyptBounds,
        maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=XANnwLyOkpjBovOqPgZk', {
        attribution: '&copy; MapTiler',
        minZoom: 5,
        maxZoom: 15 
    }).addTo(map);

    const captureBtn = document.getElementById('captureBtn');

    map.on('zoomend', function () {
        console.log("Current Zoom Level:", map.getZoom());
        if (map.getZoom() === 15) { 
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
    
};
