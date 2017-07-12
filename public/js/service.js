angular.module('myApp').service('service', function($http, $stateParams) {

  this.getBandEvents = function(events) {
    console.log("server", events.text)
    return $http({
      method: 'GET',
      url: 'https://rest.bandsintown.com/artists/' + events.text +'/events?app_id=rockshowz',
      controller: 'mainCtrl'
    })
  },
  this.getBandData = function(data) {
    return $http({
      method: 'GET',
      url: 'https://rest.bandsintown.com/artists/' + data.text + '?app_id=rockshowz',
      controller: 'mainCtrl'
    })
  }
})
