// Create a function to load Google Maps API asynchronously
function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAgRsfOWrGJep_O1rSRRE7azvv61TGb8jU&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// Call the function to load the Google Maps API
loadGoogleMapsScript();
