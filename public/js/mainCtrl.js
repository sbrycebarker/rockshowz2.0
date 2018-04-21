angular.module('rockShowz').controller('mainCtrl', function($scope, service){

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

})
