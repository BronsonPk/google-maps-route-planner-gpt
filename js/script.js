// Define initMap function
function initMap() {
    // Create a map object and specify the DOM element for display
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.8566, lng: 2.3522 }, // Centered on Paris
        zoom: 12 // Zoom level adjusted for Paris
    });

    // Arrays to store unique locations of each type
    const hotels = [];
    const venues = [];
    const preCER = []; // OVH locations for Pre-CER Hospitality

    // Read and parse CSV file
    Papa.parse("csv/full json map csv2.csv", {
        download: true,
        header: true,
        complete: function(results) {
            const csvData = results.data;
            csvData.forEach(row => {
                // Extract latitude and longitude from CSV data
                const lat = parseFloat(row['geometry/coordinates/1']);
                const lng = parseFloat(row['geometry/coordinates/0']);
                
                // Create marker for each location
                const marker = new google.maps.Marker({
                    position: { lat, lng },
                    map: map,
                    title: row['properties/Name']
                });

                // Check type and add to respective array
                switch(row.type) {
                    case 'Hotel':
                        hotels.push(row['properties/Name']);
                        break;
                    case 'Venue':
                        venues.push(row['properties/Name']);
                        break;
                    case 'OVH':
                        preCER.push(row['properties/Name']);
                        break;
                }
            });

            // Populate dropdown menus
            populateDropdown('hotels', hotels);
            populateDropdown('venues', venues);
            populateDropdown('preCER', preCER);
        }
    });
}

// Function to populate dropdown menu
function populateDropdown(id, locations) {
    const dropdown = document.getElementById(id);
    locations.forEach(location => {
        const option = document.createElement('option');
        option.text = location;
        dropdown.add(option);
    });
}
