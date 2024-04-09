// Initialize map
function initMap() {
    // Define the coordinates for Paris
    const parisCoordinates = { lat: 48.8566, lng: 2.3522 };

    // Create a map object and specify the DOM element for display
    const map = new google.maps.Map(document.getElementById('map'), {
        center: parisCoordinates,
        zoom: 12 // Zoom level adjusted to focus on Paris
    });

    // Read and parse CSV file
    Papa.parse("csv/full json map csv2.csv", {
    download: true,
    header: true,
    complete: function(results) {
        const csvData = results.data;
        csvData.forEach(row => {
            // New code snippet for extracting location data and populating dropdowns
        });
    }
});
            // Loop through each row in the CSV data
            csvData.forEach(row => {
                // Extract latitude and longitude coordinates from the CSV data
                const latitude = parseFloat(row['geometry/coordinates/1']);
                const longitude = parseFloat(row['geometry/coordinates/0']);

                // Create a marker for each location
                const marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                    title: row['properties/Name'] // Use the location name as the marker title
                });
            });
        }
    });
}
