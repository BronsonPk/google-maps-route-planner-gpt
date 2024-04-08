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

    // Read and parse CSV file
    Papa.parse("data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            // Once CSV is parsed, you can access the data in `results.data`
            const csvData = results.data;
            console.log(csvData);

            // Now you can use csvData to populate dropdown menus and handle routing
            // We'll implement this part in the next steps
        }
    });

    // Add event listener for Get Best Route button
    document.getElementById('getBestRoute').addEventListener('click', function() {
        // Logic to calculate and display the best route
        // This will be implemented later
    });

    // Function to calculate route using Directions Service
    // This will be implemented later in the code

    // Function to add markers to the map
    // This will be implemented later in the code

    // Function to draw security perimeter
    // This will be implemented later in the code
}
