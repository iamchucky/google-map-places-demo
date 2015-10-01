(function() {
'use strict';

// Declare app level module which depends on views, and components
angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    'app.placeDetail',
    'app.queryBar',
    'app.googleMap',
    'app.globalStateService'
  ])
  .controller('AppController', ['$state', 'globalState', AppController])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '/',
        views: {
          querybar: {
            templateUrl: 'components/query-bar/query-bar.html',
          },
          map: {
            templateUrl: 'components/google-map/google-map.html',
          },
          right: {
            templateUrl: 'components/place-detail/place-detail.html',
          }
        }
      })
    
  });

function AppController($state, globalState) {
  var self = this;
  this.globalState = globalState;

}

})();
