// Define global variables to store map and markers
let map;
let markers = {};

// Function to initialize the map
function initMap() {
    // Initialize map centered at a default location
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.864716, lng: 2.349014 },
        zoom: 12
    });
}
// Arrays to store unique locations of each type
    const hotels = [];
    const venues = [];
    const preCER = []; // OVH locations for Pre-CER Hospitality

// Function to handle dropdown selection
function handleDropdownSelection() {
    // Get the selected location from the dropdown
    const locationType = document.getElementById('locationType').value;

    // Check if the marker already exists for the selected location
    if (markers[locationType]) {
        markers[locationType].setMap(map); // Show existing marker on the map
        map.setCenter(markers[locationType].getPosition()); // Center map on marker
    } else {
        // Marker doesn't exist, fetch coordinates from CSV
        getLocationCoordinates(locationType);
    }
}

// Function to extract coordinates from CSV data based on selected location
function getLocationCoordinates(locationType) {
    // Read and parse CSV file
    Papa.parse("google-maps-route-planner-gpt/csv/full json map csv2.csv", {
        download: true,
        header: true,
        complete: function(results) {
            // Once CSV is parsed, find coordinates for the selected location
            const csvData = results.data;
            for (let i = 0; i < csvData.length; i++) {
                if (csvData[i]['type'] === locationType) {
                    const lat = parseFloat(csvData[i]['geometry/coordinates/1']);
                    const lng = parseFloat(csvData[i]['geometry/coordinates/0']);
                    const locationName = csvData[i]['properties/Name'];
                    // Create marker for the location
                    createMarker(lat, lng, locationName);
                    break; // Stop searching after finding the first match
                }
            }
        }
    });
}

// Function to create marker for a location
function createMarker(lat, lng, locationName) {
    // Create a marker with custom icon
    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: locationName,
        icon: {
            url: getMarkerIconURL(locationName),
            scaledSize: new google.maps.Size(32, 32)
        }
    });
    // Store marker in markers object
    markers[locationName] = marker;
    // Center map on marker
    map.setCenter(marker.getPosition());
}

// Function to get marker icon URL based on location name
function getMarkerIconURL(locationName) {
    let iconName;
    switch(locationName) {
        case 'PSA':
            iconName = 'PSA icon.png';
            break;
        case 'Hotel':
            iconName = 'hotel icon.png';
            break;
        case 'Venue':
            iconName = 'cocktail.png';
            break;
        case 'PCH':
            iconName = 'scan-code.png';
            break;
        default:
            iconName = ''; // Default icon or handle other cases
    }
    // Assuming icons are stored in the 'icons/' directory
    return 'google-maps-route-planner-gpt/icons/' + iconName;

    // Function to populate dropdown menus with options from CSV data
function populateDropdownMenus() {
    // Read and parse CSV file
    Papa.parse("google-maps-route-planner-gpt/csv/full json map csv2.csv", {
        download: true,
        header: true,
        complete: function(results) {
            // Once CSV is parsed, extract unique location types
            const csvData = results.data;
            const locationTypes = new Set(); // Using Set to store unique values
            for (let i = 0; i < csvData.length; i++) {
                locationTypes.add(csvData[i]['type']);
            }
         // Populate dropdown menus
            populateDropdown('hotels', hotels);
            populateDropdown('venues', venues);
            populateDropdown('preCER', preCER);
        }
    });
        }
    });
}

// Call the function to populate dropdown menus when the page loads
populateDropdownMenus();

}
