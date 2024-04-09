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
    
    // Array to store all markers
    let markers = [];

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
                
                // Define icon path based on location type
                let iconPath;
                switch(row.type) {
                    case 'Hotel':
                        iconPath = 'google-maps-route-planner-gpt/icons/hotel-icon.png';
                        hotels.push({ name: row['properties/Name'], position: { lat, lng }, icon: iconPath });
                        break;
                    case 'Venue':
                        iconPath = 'google-maps-route-planner-gpt/icons/cocktail.png';
                        venues.push({ name: row['properties/Name'], position: { lat, lng }, icon: iconPath });
                        break;
                    case 'OVH':
                        iconPath = 'google-maps-route-planner-gpt/icons/PSA-icon.png';
                        preCER.push({ name: row['properties/Name'], position: { lat, lng }, icon: iconPath });
                        break;
                }
            });

            // Populate dropdown menus
            populateDropdown('hotels', hotels.map(hotel => hotel.name));
            populateDropdown('venues', venues.map(venue => venue.name));
            populateDropdown('preCER', preCER.map(pcer => pcer.name));
            
            // Event listener for dropdown change
            document.getElementById('hotels').addEventListener('change', function() {
                updateMarkers(hotels);
            });
            document.getElementById('venues').addEventListener('change', function() {
                updateMarkers(venues);
            });
            document.getElementById('preCER').addEventListener('change', function() {
                updateMarkers(preCER);
            });
        }
    });

    // Function to update markers based on dropdown selection
    function updateMarkers(locations) {
        // Clear all markers from the map
        markers.forEach(marker => {
            marker.setMap(null);
        });
        markers = [];

        // Loop through selected locations
        locations.forEach(location => {
            if (location.name === document.getElementById('hotels').value ||
                location.name === document.getElementById('venues').value ||
                location.name === document.getElementById('preCER').value) {
                // Create marker for selected location
                const marker = new google.maps.Marker({
                    position: location.position,
                    map: map,
                    title: location.name,
                    icon: location.icon
                });
                markers.push(marker);
            }
        });
    }
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
