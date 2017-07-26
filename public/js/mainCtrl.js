angular.module('myApp').controller('mainCtrl', function ($scope, service, auth0Service, faveService) {

// <<====================================API CALLS============================>>
  $scope.getBandEvents = function(events) {
    service.getBandEvents(events).then(function(result){
      $scope.bandEventData = result.data
      console.log("band events", result.data)

    })
  }

  $scope.getBandData = function(data) {
    console.log("getband",data)
    service.getBandData(data).then(function(band){
      console.log('bandData', band.data)
      $scope.bandData = band
      // console.log("Band data", band.data)
    })
  }
  $scope.getVenueData = function(data){
    console.log("sent", data)
    service.getVenueId(data).then(function(info) {
      let venueId = info.data.Venues[0].Id
      console.log('venueId',venueId)
      setTimeout( function() {
        service.getVenueData(venueId).then(function(venue){
          console.log("venueEvent", venue.data.Events)
          $scope.venueEvent = venue.data.Events
        })
        }, 2100)
  })
  }
    // $scope.getVenueData('uccu center')
    // only call when necessary
    $scope.getVenueId = function(venuename){
      service.getVenueId(venuename).then(function(venuedata){
        console.log(venuedata.data.Venues)
        $scope.venues = venuedata.data.Venues
      })
    }

  $scope.getCoOrd = function() {
    service.getCoOrd().then(function(latlng) {
      $scope.lat = latlng.data.location.lat
      $scope.lng = latlng.data.location.lng
      $scope.getZip()
    })
  }
  $scope.getCoOrd()
    // only call when needed
    $scope.getZip = function() {
      var lat = $scope.lat
      var lng = $scope.lng
      service.getZip(lat, lng).then(function(result) {
        console.log("zip",result.data.results[0].address_components[7])
        var loc = result.data.results[0].address_components[7].short_name
        $scope.location = loc
      })
    }

    $scope.getLocal = function() {
      var zip = $scope.location
      console.log('zipcode', zip)
      service.getLocal(zip).then(function(local){
        console.log('byZIP', local.data.Events)
        $scope.local = local.data.Events
      })
    }
    function getUser() {
      auth0Service.getUser().then(function(user) {
        console.log("user", user)
        if (user) { $scope.user = user;
        } else {
          $scope.user = 'LOG IN!';
        }
      })
    }
// <<====================================API CALLS=================================>>
// <<=============================FAVORITE CALLS===================================>>

$scope.getfaveBands = function(user) {
  user = $scope.user
  console.log("fave of", user)
  faveService.getfaveBands(user).then(function(faves){
    if (faves) { $scope.favebands = faves.data;
    } else {
      $scope.favebands = 'LOG IN!';
    }
  })
}

  user = $scope.user
$scope.getfaveVenues = function(user) {
  faveService.getfaveVenues(user).then(function(faves){
    if (faves) { $scope.favevenues = faves;
    } else {
      $scope.favevenues = 'LOG IN!';
    }
  })
}


$scope.addFaveBands = function(user) {
  faveService.addFaveBands(user).then(function(faves){
    $scope.faveBands = faves
  })
}
//
// $scope.addFaveVenues = function(user) {
//   faveService.addFaveVenues(user).then(function(faves){
//       $scope.faveVenues = faves
//   })
// }
//
// $scope.removeFaveBand = function(user) {
//   faveService.removeFaveBand(user).then(function(faves){
//     $scope.faveBands = faves
//   })
// }
//
// $scope.removeFaveVenue = function(user) {
//   faveService.removeFaveVenue(user).then(function(faves){
//     $scope.faveVenues = faves
//   })
// }



// <<====================================POPUPS====================================>>
    getUser();

    $scope.artistmatches = false
    $scope.venuematches = false
    $scope.pageSize = 5;
    $scope.currentPage = 1;
})

// <<=========================================POPUPS================================>>
