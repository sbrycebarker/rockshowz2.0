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
            return function(data, start) {
              if (data == null) {
                return "No Venue Entered"
              } else {
              return data.slice(start);
            }
            }
          })
