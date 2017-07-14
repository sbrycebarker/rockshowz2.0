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
  },
  // this.getVenueData = function() {
  //   return $http({
  //     method: 'GET',
  //     url: 
  //   })
  // }
  this.getLocation = function() {
    return $http({
      method: 'POST',
      url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAisRSShuY4yJB-8XCv9jYMyp4WLTmD9tQ',
      controller: 'mainCtrl'
    })
  }
})
