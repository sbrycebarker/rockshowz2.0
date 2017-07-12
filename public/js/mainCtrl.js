angular.module('myApp').controller('mainCtrl', function ($scope, service, $stateParams) {

  $scope.getBandEvents = function(events) {
    service.getBandEvents(events).then(function(result){
      $scope.eventData = result.data
      console.log("Event data", result.data)
    })
  }

  $scope.getBandData = function(data) {
    service.getBandData(data).then(function(band){
      $scope.bandData = band.data
      // console.log("Band data", band.data)
    })
  }
})
