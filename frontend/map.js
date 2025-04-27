let map;
let selectedLatLng = null;
let marker = null;

function initMap() {
  const defaultLocation = { lat: 37.3387, lng: -121.8853 };

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
    mapId: MAP_ID
  });

  map.addListener('click', function(e) {
    selectedLatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    console.log('Selected Location:', selectedLatLng);

    if (marker) {
      marker.position = selectedLatLng;
    } else {
      marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: selectedLatLng,
        title: "Selected Cleanup Spot"
      });
    }
  });
}

window.initMap = initMap;