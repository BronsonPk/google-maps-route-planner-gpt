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
        // Create DirectionsService object
        const directionsService = new google.maps.DirectionsService();
        
        // Define route options
        const request = {
            origin: hotel,  // Selected hotel
            destination: venue,  // Selected venue
            waypoints: [
                {
                    location: ovh,  // Selected Pre-CER Hospitality (OVH)
                    stopover: true
                }
            ],
            travelMode: google.maps.TravelMode.WALKING
        };

        // Send request to DirectionsService
        directionsService.route(request, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                // Display route on map
                const directionsRenderer = new google.maps.DirectionsRenderer({
                    map: map,
                    polylineOptions: {
                        strokeColor: '#0000FF', // Blue color for hotel to PSA route
                        strokeWeight: 5
                    },
                    suppressMarkers: true // Suppress default markers
                });
                directionsRenderer.setDirections(response);

                // Display travel time hotel to PSA
                const hotelToPsaRoute = response.routes[0];
                const travelTimeHotelToPsa = hotelToPsaRoute.legs[0].duration.text;
                console.log("Travel time from hotel to PSA:", travelTimeHotelToPsa);

                // Display travel time PSA to venue
                const psaToVenueRoute = response.routes[0];
                const travelTimePsaToVenue = psaToVenueRoute.legs[1].duration.text;
                console.log("Travel time from PSA to venue:", travelTimePsaToVenue);

                // Add markers to the map
                addMarkersToMap(hotel, ovh, venue);
            } else {
                console.error('Directions request failed due to ' + status);
            }
        });
    }

    // Function to add markers to the map
    function addMarkersToMap(hotel, ovh, venue) {
        // Add hotel marker
        const hotelMarker = new google.maps.Marker({
            position: hotel,
            map: map,
            icon: icons.hotel
        });

        // Add OVH marker
        const ovhMarker = new google.maps.Marker({
            position: ovh,
            map: map,
            icon: icons.venue
        });

        // Add venue marker
        const venueMarker = new google.maps.Marker({
            position: venue,
            map: map,
            icon: icons.venue
        });

        // Logic to add PCH/PSE markers (if needed)
        // This will be implemented later
    }

    // Add markers, draw security perimeter, and handle routing logic
    // This will be implemented later in the code
}
