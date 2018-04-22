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
    // Add smooth scrolling on all links inside the navbar
    $("a").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
     console.log("Everything is Awesome!");
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        let hash = this.hash;
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top - 50
        }, 1000, function(){
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash;
          console.log(window.location.hash)
        });
      }
    });

})
