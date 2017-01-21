$('body').animate({
    scrollTop: "0px"
}, 1);

$(window).load(function() {
  $('.banner-title').removeClass('pre');
  $('.banner-subtitle').removeClass('pre');
  $('.banner-scrolldown').removeClass('pre');
  $('.navbar').removeClass('pre');
  $('.title-position').removeClass('pre');

  var doc = $(window);
  var pos = 0;

  var start = $('#main-section').offset().top - 50;
  var navbar = $('.navbar-inverse');

  $(window).resize(function() {
    start = $('#main-section').offset().top - 50;
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
});
