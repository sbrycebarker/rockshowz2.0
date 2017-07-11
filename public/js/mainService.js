angular.module('myApp').service('mainService', function($http) {

  this.getBandData = function(data) {
    return $http({
      method: 'GET',
      url: '/artists/incubus/events'
    })
  }
})
