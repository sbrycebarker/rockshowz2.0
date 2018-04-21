$(document).ready(function(){
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
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top


      }, 1000, function(){


        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash;
      });
    }
  });
});
