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
                
                // Define icon path based on location type
                let iconPath;
                switch(row.type) {
                    case 'Hotel':
                        iconPath = 'google-maps-route-planner-gpt/icons/hotel-icon.png';
                        hotels.push({ name: row['properties/Name'], position: { lat, lng } });
                        break;
                    case 'Venue':
                        iconPath = 'google-maps-route-planner-gpt/icons/cocktail.png';
                        venues.push({ name: row['properties/Name'], position: { lat, lng } });
                        break;
                    case 'OVH':
                        iconPath = 'google-maps-route-planner-gpt/icons/PSA-icon.png';
                        preCER.push({ name: row['properties/Name'], position: { lat, lng } });
                        break;
                }

                // Create custom icon
                const icon = {
                    url: iconPath,
                    scaledSize: new google.maps.Size(32, 32) // Adjust size if needed
                };

                // Create marker for each location
                const marker = new google.maps.Marker({
                    position: { lat, lng },
                    map: map,
                    title: row['properties/Name'],
                    icon: icon
                });
            });

            // Populate dropdown menus
            populateDropdown('hotels', hotels.map(hotel => hotel.name));
            populateDropdown('venues', venues.map(venue => venue.name));
            populateDropdown('preCER', preCER.map(pcer => pcer.name));
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

// Call the function to populate dropdown menus when the page loads
populateDropdownMenus();

}
