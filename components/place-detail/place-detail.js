(function() {
'use strict';

angular
  .module('app.placeDetail', [])
  .controller('PlaceDetailController', ['$scope', 'globalState', 'mapMarkerStore', PlaceDetailController])
  .filter('range', function() {
    return (function(n) {
      var res = [];
      for (var i = 0; i < n; ++i) {
        res.push(i);
      }
      return res;
    });
  });

function PlaceDetailController($scope, globalState, mapMarkerStore) {
  var self = this;
  this.places = {};

  var rightPaneElem = document.querySelector('.right-pane');

  globalState.addListener(function() {
    // clear
    self.places = {};

    for (var letter in mapMarkerStore.markers) {
      self.places[letter] = mapMarkerStore.markers[letter].placeResult;
      self.places[letter].letter = letter;
      self.places[letter].isActive = false;
      if (self.places[letter].price_level) {
        self.places[letter].price_level_str = Array(self.places[letter].price_level).join('$');
      }
    }
    
    $scope.$applyAsync();
    
  });

  function setCardActive(activeLetter) {
    for (var letter in self.places) {
      self.places[letter].isActive = false;
    }
    self.places[activeLetter].isActive = true;
  };

  this.cardClicked = function(letter) {
    setCardActive(letter);
    mapMarkerStore.centerOnMarker(letter);
    mapMarkerStore.bounceMarker(letter);
  }


}

})();
