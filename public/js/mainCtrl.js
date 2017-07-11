angular.module('myApp').controller('mainCtrl', function ($scope, mainService, $StateParams) {

  $scope.getBandData() = function(data) {
    mainService.getBandData().then(function(results){
      $scope.bandData = results
      console.log("band data",results)
    })
  }
  getBandData()
})
