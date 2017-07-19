angular.module('myApp', ['ui.router','ui.bootstrap']).config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
          $stateProvider
          .state('home', {
            url: '/',
            templateUrl: "./views/main.html",
            controller: 'mainCtrl'
          })
          .state('user', {
            url: '/user/:id' //+ $stateParams.userId
          })
}).filter('startFrom', function() {
            return function(venueId, start) {
              return venueId.slice(start);
            }
          })
