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
        // Logic to calculate and display the best route
        // This will be implemented later
    });

    // Add markers, draw security perimeter, and handle routing logic
    // This will be implemented later in the code
}
