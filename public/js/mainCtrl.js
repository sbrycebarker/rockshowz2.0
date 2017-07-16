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
  }
  $scope.getVenueData = function(data){
    service.getVenueId(data).then(function(info) {
      let venueId = info.data.Venues[0].Id
      console.log('venueId',venueId)
      setTimeout( function() {
        service.getVenueData(venueId).then(function(venue){
          console.log(venue) })
        }, 2100)
  })
  }
    // $scope.getVenueData('uccu center')
    // only call when necessary
    $scope.getVenueId = function(data){
      service.getVenueId().then(function(venId){
        $scope.venueId = venId.data
      })
    }

  $scope.getCoOrd = function() {
    service.getCoOrd().then(function(latlng) {
      $scope.coord = latlng.data.location
      $scope.lat = latlng.data.location.lat
      $scope.lng = latlng.data.location.lng
      $scope.getLocation()
    })
  }
  $scope.getCoOrd()

    $scope.getLocation = function() {
      var lat = $scope.lat
      var lng = $scope.lng
      service.getLocation(lat, lng).then(function(result) {
        console.log(result.data.results[0].address_components[5].short_name)
        var loc = result.data.results[0].address_components[5].short_name
        $scope.location = loc
      })
    }
})
