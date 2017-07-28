angular.module('myApp').service('faveService', function($http) {


  this.getfaveBands = function(user) {
    // console.log("faveservice", user.user_id)
    return $http({
      method: 'GET',
      url: '/favorites/bands/' + user
    })
  }
  this.getfaveVenues = function (user) {
    console.log("addband", user)
    return $http({
      method: 'GET',
      url: '/favorites/venues/' + user
    })
  }
  this.addFaveBands = function(band) {
    console.log("addband", band)
    return $http({
      method: 'POST',
      url: '/favorites/bands',
      data: band
    })
  }
  this.addFaveVenues = function (venue) {
    console.log("addVen", venue)
    return $http({
      method: 'POST',
      url: '/favorites/venues',
      data: venue
    })
  }
  this.removeFaveBand = function (band) {
    console.log("user", band)
    return $http({
      method: 'DELETE',
      url: '/favorites/bands/' + band.user + '/' + band.band_name ,
    })
  }
  this.removeFaveVenue = function (venue) {
    console.log("user", venue)
    return $http({
      method: 'DELETE',
      url: '/favorites/venues/' + venue.user + '/' + venue.venue_name
    })
  }

})
