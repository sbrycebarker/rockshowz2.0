angular.module('myApp').service('service', function($http) {

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
  this.getVenueId = function(data) {
    return $http({
      method: 'GET',
      url: 'http://api.jambase.com/venues?name=' + 'SAP Center' + '&page=0&api_key=53tkjbp2d36gw7bqguzvga9d',
    })
  }
  this.getVenueData = function(venueId) {
    return $http({
      method: 'GET',
      url: 'http://api.jambase.com/venues?venueId=' + 'venueId' + '+&page=0&api_key=62zdhmggqdhbbnsca78bvd6y',
    })
  }
  this.getLocation = function() {
    return $http({
      method: 'POST',
      url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAisRSShuY4yJB-8XCv9jYMyp4WLTmD9tQ',
      controller: 'mainCtrl'
    })
  }
})
