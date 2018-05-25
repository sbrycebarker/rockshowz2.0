angular.module('rockShowz').service('service', function($http) {

  this.getBandEvents = function(events) {
  console.log("server", events.text)
  return $http({
    method: 'GET',
    url: 'https://rest.bandsintown.com/artists/' + events.text +'/events?app_id=rockshowz',
    controller: 'mainCtrl'
  })
}

this.getBandData = function(data) {
  console.log('banddata', data )
  return $http({
    method: 'GET',
    url: 'https://rest.bandsintown.com/artists/' + data.band_name + '?app_id=rockshowz',
    controller: 'mainCtrl'
  })
},

this.getVenueId = function(venue) {
  console.log('venuename', venue)
  return $http({
    method: 'GET',
    url: 'http://api.jambase.com/venues?name=' + venue.text + '&page=0&api_key=m852p45q4hjqk85q6ety49zq',
  })
}
// <<==========================================API KEYS==================================================>>
// 1 -------- m852p45q4hjqk85q6ety49zq
// 2 -------- 62zdhmggqdhbbnsca78bvd6y
// 3 -------- 53tkjbp2d36gw7bqguzvga9d
// 4 -------- VB42FFURNN2V35SUPZUECHDY
// 5 SongKick api VZ7O9xRojK8PaJfo
// <<============================================API KEYS================================================>>

this.getVenueData = function(data) {
  console.log('venid', data)
  return $http({
    method: 'GET',
    url: 'http://api.jambase.com/events?venueId=' + data + '&page=0&api_key=m852p45q4hjqk85q6ety49zq',
  })
}
this.getCoOrd = function() {
  return $http({
    method: 'POST',
    url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAisRSShuY4yJB-8XCv9jYMyp4WLTmD9tQ',
  })
}
this.getZip = function(lat, lng) {
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
    url: 'http://api.jambase.com/events?zipCode=' + zip + '&page=0&api_key=m852p45q4hjqk85q6ety49zq'
  })
}

//  ======================================= LOGIN =====================================================
this.getUser = function(res) {
  return $http({
    method: 'GET',
    url: '/auth/me'
  })
  .then(function(res) {
    return res.data;
  })
  .catch(function(err) {
    console.log("Log In")
  })
}

this.logout = function() {
  return $http({
    method: 'GET',
    url: '/auth/logout'
  })
  .then(function(res) {
    return res.data;
  })
  .catch(function(err) {
    console.log(err);
  })
}
})
