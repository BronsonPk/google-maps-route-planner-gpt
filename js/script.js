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

    // Add event listener for Get Best Route button
    document.getElementById('getBestRoute').addEventListener('click', function() {
        // Get selected hotel, venue, and Pre-CER Hospitality (OVH)
        const selectedHotel = document.getElementById('hotels').value;
        const selectedVenue = document.getElementById('venues').value;
        const selectedOVH = document.getElementById('preCER').value;

        // Calculate route using Directions Service
        calculateRoute(selectedHotel, selectedOVH, selectedVenue);
    });

    // Function to calculate route using Directions Service
    function calculateRoute(hotel, ovh, venue) {
        // Logic to calculate and display the route
        // This will be implemented later
    }

    // Add markers, draw security perimeter, and handle routing logic
    // This will be implemented later in the code
}
