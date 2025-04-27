let map;

function initMap() {
  //Addded defaultLocation to SJSU
  const defaultLocation = { lat: 37.3387, lng: -121.8853 };

  // Try to get the user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        createMap(userLocation);
      },
      () => {
        console.warn("Geolocation failed. Using default location.");
        createMap(defaultLocation);
      }
    );
  } else {
    console.warn("Browser doesn't support geolocation. Using default location.");
    createMap(defaultLocation);
  }
}

function createMap(location) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 15,
  });
}

window.initMap = initMap; 
