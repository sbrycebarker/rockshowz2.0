angular.module('myApp').service('mainService', function($http, $StateParams) {

  this.getBandData = function() {
    return $http({
      method: 'GET',
      url: 'https://rest.bandsintown.com/artists/incubus/events?app_id=rockshowz',
      controller: 'mainCtrl'
    })
  }
})
