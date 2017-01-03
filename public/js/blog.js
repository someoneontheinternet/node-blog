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

var blog = $('.main p');
var meta = $('.meta');
var title = $('#blog-title');

$.ajax({
  url: '/db/blog/my-blog-2',
  type: 'GET',
  success: function(data) {
    // setting blog content
    console.log(data);
    title.append(data.title);
    blog.append(data.body);
    meta.append('<a>Date: ' + data.created + '</a>');
    meta.append('<a>| Author: ' + data.author + '</a>');

    //  seting comments
    var commentID = data.comments;

    for (var i = 0; i < commentID.length; i++) {
      setComment(commentID[i]);
    }
  }
});

function setComment(comment) {
  var commentSection = $('#com-section');

  console.log(comment);

  var link = "/db/comment/" + comment.id;

  $.ajax({
    url: link,
    type: 'GET',
    success: function(data) {
      if (data.id != "0") {

        var comment = '<div class="comment">' + '<h3>' + data.title + ' <a> - by ' + data.username + ': ' + data.date + '</a>' + '</h3>' + '<p>' + data.comment + '</p>' + '</div>';

        commentSection.append(comment);

      }
    }
  });
}




































//
