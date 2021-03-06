$(window).on('load', function() {
  $('#page-home').addClass('fadeIn');

  $('.js-scrollTo').on('click', function() { // Au clic sur un élément
    var page = $(this).attr('href'); // Page cible
    var speed = 750; // Durée de l'animation (en ms)
    $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
    return false;
  });

  $('#start').on('click', function() {
    $('#page-quickstart').fadeOut(function(){
      location.href='start.html';
    });
  });

  $('#video-mobile').on('click', function(){
    this.play();
  });
});
