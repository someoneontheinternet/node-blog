
var subMeta = $('.sub-meta').children();
var sub = [];

var out = "{";

for (var i = 0; i < subMeta.length; i++) {
  var c = subMeta[i];
  out = out + '"user": ' + '"' + c.name + '",';
}

out = out.substring(0, out.length - 1);
out = out + "}";

console.log(out);

var data = JSON.parse(out);

console.log(data);

$.ajax('http://localhost:3000/api/sub', {
  type: 'POST',
  data: data,
  success: function(back) {
    console.log(back);
  }
});































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
