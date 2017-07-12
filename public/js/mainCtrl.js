angular.module('myApp').controller('mainCtrl', function ($scope, service) {

  $scope.getBandEvents = function() {
    service.getBandEvents().then(function(events){
      $scope.eventData = events.data
      console.log("Event data", events.data)
    })
  }
  $scope.getBandEvents()

  $scope.getBandData = function() {
    service.getBandData().then(function(band){
      $scope.bandData = band.data
      console.log("Band data", band.data)
    })
  }
  $scope.getBandData()
})
