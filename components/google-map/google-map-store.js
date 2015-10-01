(function() {
'use strict';

angular.module('app.googleMap') 
  .service('mapMarkerStore', [MapMarkerStoreService]);

function MapMarkerStoreService() {
  var self = this;
  this.markers = {};

  this.initGoogleMap = function() {
  };

  this.clearMarkers = function() {
    for (var id in self.markers) {
      var m = self.markers[id];
      if (m) {
        m.setMap(null);
      }
    }
    self.markers = {};
  };

  this.bounceMarker = function(idToBounce) {
    for (var id in this.markers) {
      var ani = null;
      if (id == idToBounce) {
        ani = google.maps.Animation.BOUNCE;
      }
      this.markers[id].setAnimation(ani);
    }
  };

  this.dropMarker = function(letter) {
    self.markers[letter].setMap(map);
  };

  this.centerOnMarker = function(idToCenter) {
    if (!this.markers[idToCenter]) return;
    map.panTo(this.markers[idToCenter].getPosition());
  };

  this.fitBoundOnMarker = function(idToFitBound) {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(this.markers[idToFitBound].getPosition());
    map.fitBounds(bounds);
  };

}

})();
