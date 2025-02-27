window.onload = function () {
    const egyptBounds = [
        [22.0, 25.0], 
        [31.6, 36.9]  
    ];

    const map = L.map('map', {
        center: [26.8206, 30.8025],
        zoom: 16,
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
        // for(let i = 0; i < 1; i++) {
            // setTimeout(() => {
                // const lat = 22.0 + Math.random() * (31.6 - 22.0);
                // const lon = 25.0 + Math.random() * (36.9 - 25.0);
                // console.log("The image",i," Diminision is",lat, lon);
                // map.setView([lat, lon], 15);
            
                leafletImage(map, function (err, canvas) {
                    if (err) {
                        console.error("Error capturing map:", err);
                        return;
                    }
                    const imgData = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.download = `New_map_.png`;
                    link.href = imgData;
                    link.click();
                });
            // },10000);
        // }
    });
};
