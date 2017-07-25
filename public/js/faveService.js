angular.module('myApp').service('faveService', function($http) {


  this.getfaveBands = function(user) {
    // console.log("faveservice", user.user_id)
    return $http({
      method: 'GET',
      url: '/favorites/bands/' + user
    })
  }
  this.getfaveVenues = function (user) {
    console.log("user", user)
    return $http({
      method: 'GET',
      url: '/favorites/venues/' + user
    })
  }
  this.addFaveBands = function(user) {
    console.log("user", user)
    return $http({
      method: 'POST',
      url: '/favorites/bands'
    })
  }
  this.addFaveVenues = function (user) {
    console.log("user", user)
    return $http({
      method: 'POST',
      url: '/favorites/venues'
    })
  }
  this.removeFaveBand = function (user) {
    console.log("user", user)
    return $http({
      method: 'DELETE',
      url: '/favorites/:userId/:bandId'
    })
  }
  this.removeFaveVenue = function (user) {
    console.log("user", user)
    return $http({
      method: 'DELETE',
      url: '/favorites/:userId/:venueId'
    })
  }

})
