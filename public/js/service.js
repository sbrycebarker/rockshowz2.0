angular.module('myApp').service('service', function($http) {

  this.getBandEvents = function() {
    return $http({
      method: 'GET',
      url: 'https://rest.bandsintown.com/artists/incubus/events?app_id=rockshowz',
      controller: 'mainCtrl'
    })
  },
  this.getBandData = function() {
    return $http({
      method: 'GET',
      url: 'https://rest.bandsintown.com/artists/incubus?app_id=rockshowz',
      controller: 'mainCtrl'
    })
  }
})
