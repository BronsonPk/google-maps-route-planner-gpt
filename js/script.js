// Define initMap function
function initMap() {
    // Create a map object and specify the DOM element for display
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, // New York City coordinates
        zoom: 12 // Zoom level
    });

// Read and parse CSV file
Papa.parse("csv/full json map csv.csv", {
    download: true,
    header: true,
    complete: function(results) {
        // Once CSV is parsed, you can access the data in `results.data`
        const csvData = results.data;
        console.log(csvData);

        // Check if CSV data is empty or not
        if (csvData.length === 0) {
            console.error("No data found in the CSV file.");
            return;
        }

        // Loop through each row of the CSV data
        csvData.forEach(row => {
            // Extract coordinates
            const lat = parseFloat(row['geometry/coordinates/1']);
            const lng = parseFloat(row['geometry/coordinates/0']);

            // Check if coordinates are valid
            if (isNaN(lat) || isNaN(lng)) {
                console.error("Invalid coordinates for row:", row);
                return; // Skip this row
            }

            // Create marker for each location
            const marker = new google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: row.type // Use type as marker title
            });
        });
    }
});

