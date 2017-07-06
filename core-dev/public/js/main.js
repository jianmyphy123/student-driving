"use strict";

jQuery(document).ready(function ($) {
  $('.rateYoLesson').each(function (i, e) {
    $(e).hide();
    var ratingFull = $(e).rateYo({
      rating : $(this).data('rating')
    }).on("rateyo.set", function (event, data) {
      var dataPost = {};
      dataPost.rating = data.rating;
      dataPost.videoId = $(e).data('id-for-video');
      $.ajax({
        url        : '/change-rating',
        method     : 'POST',
        data       : dataPost,
        beforeSend : function (request) {
          request.setRequestHeader("X-CSRF-TOKEN", "${_csrf.token}");
        }
      })
    });
  });
  $('.rateYoLesson').first().show();

  $('.rateYo').each(function (i, e) {
    var ratingFull = $(e).rateYo({
      rating : $(this).data('rating')
    }).on("rateyo.set", function (event, data) {
      var dataPost = {};
      dataPost.rating = data.rating;
      dataPost.videoId = $(e).data('id-for-video');
      $.ajax({
        url        : '/change-rating',
        method     : 'POST',
        data       : dataPost,
        beforeSend : function (request) {
          request.setRequestHeader("X-CSRF-TOKEN", "${_csrf.token}");
        }
      })
    });
  });

  // Hide button after video started
  $(".video-overlay-play-button").click(function () {
    $(".video-headline").hide();
  });

  $(".play-btn-wrapper").click(function () {
    $(".play-btn").toggleClass("visibility");
    $(".play-btn-wrapper").toggleClass("is-height");
  })


  $(window).load(function () {
    $(".loaded").fadeOut();
    $(".preloader").delay(1000).fadeOut("slow");
  });

  // Change button state
  $('input[name="accountType"]').on('change', function () {
    if ($(this).val() == 'update') {

      //change to "show update"
      $(".cont").text("Submit");

    } else {
      $(".cont").text("Find a Student");
    }
  });

  $('input[name="accountType"]').on('change', function () {
    if($(this).val() == 'update') {
      $(".age").addClass("not-show");
    } else {
      $('input[name="accountType"]').on('change', function () {
        if($(this).val() == 'overwritten') {
          $(".age").removeClass("not-show");
        }
      })
    }
  })

  var sliderVideo = $('.slider').slick({
    arrows   : false,
    dots     : true,
    infinite : true,
    speed    : 500,
    fade     : true,
    swipe    : false,
    cssEase  : 'linear'
  });

  sliderVideo.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.rateYo').hide();
    $('.rateYo[data-rating-index="' + nextSlide + '"]').show()
  });

  // Landing Video
  var videoPlayButton,
      videoWrapper = document.getElementsByClassName('video-wrapper')[ 0 ],
      video = document.getElementsByTagName('video')[ 0 ],
      videoMethods = {
        renderVideoPlayButton : function () {
          if (videoWrapper.contains(video)) {
           this.formatVideoPlayButton()
           video.classList.add('has-media-controls-hidden')
           videoPlayButton = document.getElementsByClassName('video-overlay-play-button')[ 0 ]
           videoPlayButton.addEventListener('click', this.hideVideoPlayButton)
           }
        },


        formatVideoPlayButton : function () {
          videoWrapper.insertAdjacentHTML('beforeend', '\
                <svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video">\
                    <circle cx="100" cy="100" r="90" fill="#3b4349"/>\
                    <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                </svg>\
            ')
        },

        hideVideoPlayButton : function () {
          video.play()
          videoPlayButton.classList.add('is-hidden')
          video.classList.remove('has-media-controls-hidden')
          video.setAttribute('controls', 'controls')
          $(".video-headline").hide();
        }
      }

  videoMethods.renderVideoPlayButton()

  // Mobile menu
  $('#navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop : (target.offset().top - 40)
        }, 1000);
        if ($('.navbar-toggle').css('display') != 'none') {
          $(this).parents('.container').find(".navbar-toggle").trigger("click");
        }
        return false;
      }
    }
  });

  // Scroll Total Navbar
  $('body').scrollspy({
    target : '.navbar',
    offset : 160
  });


  // * FAQ Toggle
  $('.faqtoggle').click(function () {
    var id = this.name;
    if ($('.' + id).css('display') == 'none') {
      $(".question").removeClass('fa-minus');
      $(".question").addClass('fa-plus');
      $(".hidea").hide();
      $('.' + id).show();
      $("i", this).removeClass('fa-plus');
      $("i", this).addClass('fa-minus');
    } else {
      $('.' + id).hide();
      $("i", this).removeClass('fa-minus');
      $("i", this).addClass('fa-plus');
    }
    return false;
  });


  // Scroll Up
  $(window).scroll(function () {
    if ($(this).scrollTop() > 600) {
      $('.scrollup').fadeIn('slow');
    } else {
      $('.scrollup').fadeOut('slow');
    }
  });

  $('.scrollup').click(function () {
    $("html, body").animate({ scrollTop : 0 }, 1000);
    return false;
  });

  // STICKY scroll

  $.localScroll();

  // WOW

//        var wow = new WOW({
//            mobile: false // trigger animations on mobile devices (default is true)
//        });
//        wow.init();

  //End
});
function playPause() {
  var myVideo = document.getElementById("video1");
  if (myVideo.paused)
    myVideo.play();
  else
    myVideo.pause();
}
