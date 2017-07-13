angular.module('myApp').controller('mainCtrl', function ($scope, service, $stateParams) {

  $scope.getBandEvents = function(events) {
    service.getBandEvents(events).then(function(result){
      $scope.eventData = result.data
      console.log("Event data", result.data)
    })
  }

  $scope.getBandData = function(data) {
    service.getBandData(data).then(function(band){
      console.log('band', band)
      $scope.bandData = band.data
      // console.log("Band data", band.data)
    })
  },
  $scope.getLocation = function() {
    service.getLocation().then(function(location) {
      $scope.location = location.data.location
    })
  }
    $scope.getLocation()
})
