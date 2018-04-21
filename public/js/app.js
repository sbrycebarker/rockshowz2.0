angular.module('rockShowz', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/main.html',
      controller: 'mainCtrl'
    })

})
