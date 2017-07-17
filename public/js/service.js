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
    console.log('name', data)
    return $http({
      method: 'GET',
      url: 'http://api.jambase.com/venues?name=' + 'SAP Center' + '&page=0&api_key=m852p45q4hjqk85q6ety49zq',
    })
  }
  this.getVenueData = function(venueId) {
    console.log('venid', venueId)
    return $http({
      method: 'GET',
      url: 'http://api.jambase.com/events?artistId=' + venueId + '&page=0&api_key=m852p45q4hjqk85q6ety49zq',
    })
  }
  this.getCoOrd = function() {
    return $http({
      method: 'POST',
      url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAisRSShuY4yJB-8XCv9jYMyp4WLTmD9tQ',
    })
  }
  this.getLocation = function(lat, lng) {
    console.log(lat)
    console.log(lng)
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=false',
      controller: 'mainCtrl'
    })
  }
  this.getLocal = function(zip) {
    console.log(zip)
    return $http({
      method: 'GET',
      url: 'http://api.jambase.com/events?zipCode=' + zip + '&page=0&api_key=53tkjbp2d36gw7bqguzvga9d'
    })
  }
})
