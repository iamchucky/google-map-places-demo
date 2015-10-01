(function() {
'use strict';

angular
  .module('app.queryBar', [])
  .controller('QueryBarController', ['globalState', 'mapMarkerStore', QueryBarController]);

function QueryBarController(globalState, mapMarkerStore) {
  var self = this;
  this.globalState = globalState;

  this.query = '';
  var places, autocomplete;
  var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';

  // init the autocomplete when the google sdk is loaded
  initMapCallbacks.push(function() {
    var queryBox = document.getElementById('query-bar');
    autocomplete = new google.maps.places.Autocomplete(queryBox, { types: ['(cities)'] });
    autocomplete.addListener('place_changed', onPlaceChanged);

    places = new google.maps.places.PlacesService(map);
  });

  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      globalState.showRightPane(true)
        .then(function() {
          map.panTo(place.geometry.location);
          map.setZoom(15);
          search();
        });
    }
  }

  function search() {
    var q = {
      bounds: map.getBounds(),
      types: ['lodging']
    };

    places.nearbySearch(q, function(results, status) {
      // clear result
      mapMarkerStore.clearMarkers();

      for (var i = 0; i < results.length; ++i) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        mapMarkerStore.markers[markerLetter] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
        });
        mapMarkerStore.markers[markerLetter].placeResult = results[i];
        setTimeout(mapMarkerStore.dropMarker(markerLetter), i * 100);
      }

      // update the place detail pane
      globalState.update();

    });
  }


  this.sendQuery = function() {
    if (self.query.trim() === '') return;

    onPlaceChanged();
  }

}

})();
