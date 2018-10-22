angular.module('rockShowz').service('service', function($http) {

  let googleKey = 'AIzaSyAhORdmX32XU1m4Ois-6TV4t4nsDBKdSI8'

  this.getBandEvents = function(events) {
  console.log("server", events.artist)
  return $http({
    method: 'GET',
    url: 'https://rest.bandsintown.com/artists/' + events.artist +'/events?app_id=rockshowz',
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
    url: 'http://api.jambase.com/venues?name=' + venue.name + '&page=0&api_key=53tkjbp2d36gw7bqguzvga9d',
  })
}
// <<==========================================API KEYS==================================================>>
// 1 -------- m852p45q4hjqk85q6ety49zq
// 2 -------- 62zdhmggqdhbbnsca78bvd6y
// 3 -------- 53tkjbp2d36gw7bqguzvga9d
// 4 -------- VB42FFURNN2V35SUPZUECHDY
// 5 SongKick api VZ7O9xRojK8PaJfo 13560 p3E7efHMqREf9kLPEkVtTin3QYy5vp

let songkick = 'VZ7O9xRojK8PaJfo'
// <<============================================API KEYS================================================>>

this.getVenueData = function(data) {
  console.log('venid', data)
  return $http({
    method: 'GET',
    url: 'http://api.jambase.com/events?venueId=' + data + '&page=0&api_key=53tkjbp2d36gw7bqguzvga9d',
  })
}

this.getCoOrd = function() {
  return $http({
    method: 'POST',
    url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + googleKey,
  })
}

this.getZip = function(lat, lng) {
  return $http({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + googleKey ,
    controller: 'mainCtrl'
  })
}

this.getLocal = function(lat, lng) {
  return $http({
    method: 'GET',
    url: 'https://api.songkick.com/api/3.0/search/locations.json?location=geo:' + lat + ',' + lng + '&apikey=' + songkick
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
