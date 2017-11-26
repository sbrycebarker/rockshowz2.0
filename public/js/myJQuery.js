$(document).ready(function(){
  $("#artistinput").keyup(function(event){
    if(event.keyCode == 13){
      console.log("getting band")
        $("#getband").click();
    }
});
//
$("#venueinput").keyup(function(event){
  if(event.keyCode == 13){
      $("#getvenue").click();
  }
});
  // Add scrollspy to <body>
 $('body').scrollspy({target: ".navbar", offset: 50});
    $(window).scroll(function(){
            if ($(this).scrollTop() > 200) {
                $('#myNavbar').fadeIn(500);
            } else {
                $('#myNavbar').fadeOut(500);
            }
        });
  $('body').scrollspy({target: ".navbar", offset: 50});
    $(window).scroll(function(){
            if ($(this).scrollTop() > 500) {
                $('#myLocal').fadeIn(1000);
            } else {
                $('#myLocal').fadeOut(1000);
            }
        });
  $('body').scrollspy({target: ".navbar", offset: 100});
    $(window).scroll(function(){
            if ($(this).scrollTop() > 1200) {
                $('#myArtist').fadeIn(1200);
            } else {
                $('#myArtist').fadeOut(1200);
            }
        });
  $('body').scrollspy({target: ".navbar", offset: 100});
    $(window).scroll(function(){
            if ($(this).scrollTop() > 2100) {
                $('#myVenue').fadeIn(2000);
            } else {
                $('#myVenue').fadeOut(2000);
            }
        });


  // Add smooth scrolling on all links inside the navbar
  $("#myNavbar a").on('click', function(event) {
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
  $("#start a").on('click', function(event) {
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
  $("#favevenue a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
   console.log("getting fave!");
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
