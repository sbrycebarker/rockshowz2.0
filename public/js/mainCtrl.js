angular.module('myApp').controller('mainCtrl', function ($scope, service) {

  $scope.getBandEvents = function(events) {
    service.getBandEvents(events).then(function(result){
      $scope.eventData = result.data
      console.log("band events", result.data)
    })
  }

  $scope.getBandData = function(data) {
    service.getBandData(data).then(function(band){
      console.log('band', band)
      $scope.bandData = band.data
      // console.log("Band data", band.data)
    })
  },
  $scope.getVenueData = function(data){
    service.getVenueId(data).then(function(info) {
      let venueId = info.data.Venues[0].Id
      setTimeout(function() {
        service.getVenueData(venueId).then(function(venue){
          console.log('pizza') }, 4000)
        })
  })
  }
    // $scope.getVenueData() only call when necessary

  $scope.getLocation = function() {
    service.getLocation().then(function(location) {
      $scope.location = location.data.location
    })
  }
    $scope.getLocation()
})
