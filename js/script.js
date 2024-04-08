// Define initMap function
function initMap() {
    // Create a map object and specify the DOM element for display
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

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
}
