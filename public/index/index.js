
/*
$('body').animate({
    scrollTop: "0px"
}, 1);
*/

$(window).load(function() {
  var doc = $(window);
  var pos = 0;

  var start = $('#main-section').offset().top - 50;
  var navbar = $('.navbar-inverse');

  $(".pre").removeClass("pre");

  $(window).resize(function() {
    start = $('#main-section').offset().top - 50;
  });

  doc.on('scroll', _.throttle(function() {
      pos = doc.scrollTop();
      if (pos >= start) {
        navbar.css('background-color', '#222');
      } else {
        navbar.css('background-color', 'rgba(0, 0, 0, 0)');
      }
  }, 100, { leading: true }));

});

var btnToggle = $('#btn-navbar-top-toggle');
var icon = $('#nav-icon');
var navbarHeader = $('.navbar-header');

btnToggle.click(function() {
  if (navbarHeader.hasClass('open')) {
    setTimeout(function() {
      navbarHeader.removeClass('open');
    }, 322);
  } else {
    navbarHeader.addClass('open');
  }

  icon.toggleClass('open');
});























/*
*/
