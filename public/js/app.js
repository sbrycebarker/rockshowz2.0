angular.module('myApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider, $stateParams) {
  $urlRouterProvider.when('', '/');
          $stateProvider
          .state('home', {
            url: '/',
            templateUrl: "../views/main.html",
            controller: 'mainCtrl'
          })
          .state('user', {
            url: '/' + $stateParams.userId
          })
})
