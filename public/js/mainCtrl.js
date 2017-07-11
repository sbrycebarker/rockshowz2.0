angular.module('myApp').controller('mainCtrl', function () {

  $scope.getBandData() = function(data) {
    mainService.getBandData().then(function(results){
      $scope.bandData = results
    })
  }
  getBandData()
})
