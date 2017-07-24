angular.module('myApp').service('auth0Service', function($http) {
  // this.loginLocal = function(credentials) {
  //   return $http({
  //     method: "POST",
  //     url: '/auth/local',
  //     data: credentials
  //   })
  //   .then(function(res) {
  //     return res.data;
  //   })
  //   .catch(function(err) {
  //     console.log('ERROR LOGGING IN!', err);
  //   })
  // }

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
