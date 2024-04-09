// Initialize map
function initMap() {
    // Create a map object and specify the DOM element for display
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2 // Adjust the zoom level as needed
    });

    // Read and parse CSV file
    Papa.parse("csv/full json map csv2.csv", {
        download: true,
        header: true,
        complete: function(results) {
            // Once CSV is parsed, you can access the data in `results.data`
            const csvData = results.data;
            console.log(csvData);

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
