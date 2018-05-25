angular.module('rockShowz').controller('mainCtrl', function($scope, service, $state){

    $scope.navOpen = function() {
      var header = document.getElementById('header');
      if (header.style.width == '0px' || header.style.width == 0 ) {
        // console.log('OPEN')
      header.style.width = '100px'
    } else {
      header.style.width = '0px';
    }
    }

    $scope.navClose = function() {
      var cartside = document.getElementById('cart-side');
        cartside.style.width = '0px';
    }

    $(document).scroll(function (event) {
    });

    $("a").on('click', function(event) {

     console.log("Everything is Awesome!");
      if (this.hash !== "") {

        event.preventDefault();


        let hash = this.hash;

        $('html, body').animate({
          scrollTop: $(hash).offset().top - 48
        }, 1000, function(){

          window.location.hash;
          console.log(window.location.hash)
        });
      }
    });


    // =================================== DATA ======================================

    $scope.getBandEvents = function(events) {
      service.getBandEvents(events).then(function(result){
        $scope.bandEventData = result.data
        console.log("band events", result.data)

      })
    }

    $scope.getBandData = function( band_name ) {
      console.log("getband", band_name)
      service.getBandData(band_name).then(function(band){
        console.log('returnData', band.data)
        $scope.bandData = band

      })
    }
    $scope.getVenueData = function(venue){
      console.log("sent", venue)
      service.getVenueId(venue).then(function(venid) {
        $scope.vendata = venid.data.Venues[0]
        let venueId = venid.data.Venues[0].Id
        console.log('venueId',venueId)
        setTimeout( function() {
          service.getVenueData(venueId).then(function(venue){
            console.log("venueEvent", venue.data)
            $scope.venueEvent = venue.data.Events
          })
          }, 2100)
    })
    }

      $scope.getVenueId = function(venue){
        console.log("pizza", venue)
        service.getVenueId(venue).then(function(venuedata){
          console.log("pizza",venuedata.data.Venues)
          if (venuedata) {
            var place = venuedata.data.Venues
            $scope.venues = place;
          } else {
            $scope.venues = "Search for a venue";
          }
        })
      }

    $scope.getCoOrd = function() {
      service.getCoOrd().then(function(latlng) {
        $scope.lat = latlng.data.location.lat
        $scope.lng = latlng.data.location.lng
        console.log("lat", $scope.lat, "lng", $scope.lng)
        $scope.getZip()
      })
    }
    $scope.getCoOrd()

      $scope.getZip = function() {
        var lat = $scope.lat
        var lng = $scope.lng
        service.getZip(lat, lng).then(function(result) {
          let loc = result.data.results[0].address_components[5].short_name
          if (!loc) {
          console.log("zip",result.data.results[0].address_components[5].short_name)
          $scope.location = result.data.results[0].address_components[7].short_name
        }
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



      $scope.getUser = function() {
        auth0Service.getUser().then(function(user) {
          console.log("user", user)
          if (user) {
            $scope.user = user[0].username;
            $scope.userid = user[0].user_id
            console.log("userinfo", $scope.user)
            $scope.getfaveBands();
            $scope.getfaveVenues()
          } else {
            $scope.user = 'LOG IN!';
          }
        })
      }
  // <<====================================API CALLS=================================>>
  // <<=============================FAVORITE CALLS===================================>>

  $scope.getfaveBands = function(user) {
    user = $scope.userid
    faveService.getfaveBands(user).then(function(faves){
      if (faves) {
        $scope.favebands = faves.data;
      } else {
        $scope.favebands = 'LOG IN!';
      }
    })
  }


  $scope.getfaveVenues = function(user) {
    user = $scope.userid
    faveService.getfaveVenues(user).then(function(faves){
      if (faves) {
        console.log("thisthing",faves)
        $scope.favevenues = faves.data;
      } else {
        $scope.favevenues = 'LOG IN!';
      }
    })
  }


  $scope.addFaveBands = function(band) {
    console.log("addfaveband", band)
    faveService.addFaveBands(band)
      $scope.favebands.push(band)
      console.log($scope.favebands)
  }

  $scope.addFaveVenues = function(venue) {
    faveService.addFaveVenues(venue)
        $scope.favevenues.push(venue)
        console.log($scope.favevenues)
  }

  $scope.removeFaveBand = function(band, i) {
    var removedItem = $scope.favebands.splice(i, 1)
    faveService.removeFaveBand(band).then(function(){

    }, function(err) {
        $scope.favebands.splice(i, 0, removedItem[0]);
      })
  }

  $scope.removeFaveVenue = function(venue, i) {
    var removedItem = $scope.favevenues.splice(i, 1)
    faveService.removeFaveVenue(venue).then(function(){

    }, function(err) {
        $scope.favevenues.splice(i, 0, removedItem[0]);
      })
  }


})
