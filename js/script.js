// Initialize map
function initMap() {
    // Map options
    const mapOptions = {
        center: { lat: 48.864716, lng: 2.349014 }, // Paris coordinates
        zoom: 13
    };

    // Create map
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Custom icons
    const icons = {
        hotel: {
            url: 'icons/hotel-icon.png',
            scaledSize: new google.maps.Size(32, 32)
        },
        venue: {
            url: 'icons/cocktail.png',
            scaledSize: new google.maps.Size(32, 32)
        },
        checkpoint: {
            url: 'icons/scan-code.png',
            scaledSize: new google.maps.Size(32, 32)
        },
        psa: {
            url: 'icons/PSA-icon.png',
            scaledSize: new google.maps.Size(32, 32)
        }
        // Add more custom icons as needed
    };

    // Read and parse CSV file
Papa.parse("csv/full json map csv.csv", {
    download: true,
    header: true,
    complete: function(results) {
        // Once CSV is parsed, you can access the data in `results.data`
        const csvData = results.data;
        console.log(csvData);

        // Draw security perimeter
        const perimeterCoordinates = []; // Array to store coordinates of the perimeter

        csvData.forEach(row => {
            if (row.type === 'PSA') {
                // Add PSA coordinates to perimeterCoordinates array
                const lat = parseFloat(row['geometry/coordinates/1']);
                const lng = parseFloat(row['geometry/coordinates/0']);
                perimeterCoordinates.push({ lat, lng });
            }
        });

        // Draw polyline for security perimeter
        const perimeterPolyline = new google.maps.Polyline({
            path: perimeterCoordinates,
            geodesic: true,
            strokeColor: '#FF0000', // Red color
            strokeOpacity: 0.8,
            strokeWeight: 2
        });
        perimeterPolyline.setMap(map);
    }
});

    // Populate dropdown menus and other logic
    // This code was implemented in the previous step
}
