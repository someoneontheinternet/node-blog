

































// Other
$('.navbar-inverse').css("background-color", "#222");
$('.navbar-inverse').css("border-radius", "0px");
$('.navbar-inverse').removeClass("navbar-fixed-top");

$('body').animate({
    scrollTop: "0px"
}, 1);

$(window).load(function() {
  var doc = $(window);
  var pos = 0;

  $(".pre").removeClass("pre");

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
