// Define initMap function
function initMap() {
    // Create a map object and specify the DOM element for display
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, // New York City coordinates
        zoom: 12 // Zoom level
    });
}
 
