var map;

var googleSDKLoaded = false;
var initMapCallbacks = [];

window.initMap = function() {
  var mapCanvas = document.getElementById('map-canvas');

  if (mapCanvas) {
    map = new google.maps.Map(mapCanvas, {
      zoom: 15,
      center: { lat: 30.267153, lng: 262.257 },
      disableDefaultUI: true,
      streetViewControl: true
    });

    // google sdk is ready, so call initMapCallbacks
    for (var i = 0; i < initMapCallbacks.length; ++i) {
      initMapCallbacks[i]();
    }
    googleSDKLoaded = true;
  } else {
    setTimeout(initMap, 200);
  }
};

