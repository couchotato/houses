(function($) {
  
  "use strict";

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });

    /*
   One Page Navigation & wow js
   ========================================================================== */
    //Initiat WOW JS
    new WOW().init();

    // one page navigation
    $('.main-navigation').onePageNav({
            currentClass: 'active'
    });

    $(window).on('load', function() {

        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        });

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 200) {
                $('.fixed-top').addClass('menu-bg');
            } else {
                $('.fixed-top').removeClass('menu-bg');
            }
        });

    });

    // Slick Nav
    $('.mobile-menu').slicknav({
      prependTo: '.navbar-header',
      parentTag: 'span',
      allowParentLinks: true,
      duplicate: false,
      label: '',
    });


/*
   CounterUp
   ========================================================================== */
    $('.counter').counterUp({
      time: 1000
    });

/*
   MixitUp
   ========================================================================== */
  $('#portfolio').mixItUp();

/*
   Touch Owl Carousel
   ========================================================================== */
    var owl = $(".touch-slider");
    owl.owlCarousel({
      navigation: false,
      pagination: true,
      slideSpeed: 1000,
      stopOnHover: true,
      autoPlay: true,
      items: 2,
      itemsDesktop : [1199,2],
      itemsDesktopSmall: [1024, 2],
      itemsTablet: [600, 1],
      itemsMobile: [479, 1]
    });

    $('.touch-slider').find('.owl-prev').html('<i class="fa fa-chevron-left"></i>');
    $('.touch-slider').find('.owl-next').html('<i class="fa fa-chevron-right"></i>');

/*
   Sticky Nav
   ========================================================================== */
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.header-top-area').addClass('menu-bg');
        } else {
            $('.header-top-area').removeClass('menu-bg');
        }
    });

/*
   VIDEO POP-UP
   ========================================================================== */
    $('.video-popup').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });


  /*
   SMOOTH SCROLL
   ========================================================================== */
    var scrollAnimationTime = 1200,
        scrollAnimation = 'easeInOutExpo';

    $('a.scrollto').on('bind', 'click.smoothscroll', function (event) {
        event.preventDefault();
        var target = this.hash;

        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top
        }, scrollAnimationTime, scrollAnimation, function () {
            window.location.hash = target;
        });
    });

/*
   Back Top Link
   ========================================================================== */
    var offset = 200;
    var duration = 500;
    $(window).scroll(function() {
      if ($(this).scrollTop() > offset) {
        $('.back-to-top').fadeIn(400);
      } else {
        $('.back-to-top').fadeOut(400);
      }
    });

    $('.back-to-top').on('click',function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    })

/* Nivo Lightbox
  ========================================================*/
   $('.lightbox').nivoLightbox({
    effect: 'fadeScale',
    keyboardNav: true,
  });


/* stellar js
  ========================================================*/
  $.stellar({
    horizontalScrolling: true,
    verticalOffset: 40,
    responsive: true
  });

/*
   Page Loader
   ========================================================================== */
  $('#loader').fadeOut();

  $('.address_1 a').on('click', e => {
      e.preventDefault();
      $(".address_1 a").hide();
      $('.address_1 input').show();
  });

  $('.address-search input, .address-search-main input').on('transitionend', e => {
      $('#address').val($(e.target).val())
  })

  $('#get-offer').on('click', e => {
      e.preventDefault();
      let name = $('#lead-name').val();
      let contact = $('#lead-contact').val();
      let unit = $('#lead-unit').val();
      let address = $('#address').val();
      if (name && contact && address) {
          let endpoint = "https://ndtpkwdtgipg2t3alc2ucg6xga0bkyay.lambda-url.us-east-1.on.aws/";
          $.post(endpoint, JSON.stringify({name, contact, address, unit}));
      }
  });

  $('#submit').on('click', e => {
      e.preventDefault();
      let name = $('#name').val();
      let email = $('#email').val();
      let message = $('#message').val();
      if (name && email && message) {
          let endpoint = "https://ndtpkwdtgipg2t3alc2ucg6xga0bkyay.lambda-url.us-east-1.on.aws/";
          $.post(endpoint, JSON.stringify({name, email, message}));
      }
  });

}(jQuery));

function initAutocomplete() {
    return (function($) {
        let searchFields = $('.address-search input, .address-search-main input');
        searchFields.each(idx => {
            new google.maps.places.Autocomplete(searchFields[idx], {
                componentRestrictions: { country: ["us"] },
                fields: ["address_components", "geometry"],
                types: ["address"],
            });
        })

        $('.address-search-main a, .address-search a').on('click', function() {

            $('#hidden-map').show()

            let geocoder = new google.maps.Geocoder();
            let latlng = new google.maps.LatLng(-34.397, 150.644);
            let mapOptions = {
                zoom: 18,
                center: latlng
            }

            let map = new google.maps.Map(document.getElementById('map'), mapOptions);

            let address = $("#address").val();
            geocoder.geocode( { 'address': address}, (results, status) => {
                if (status === 'OK') {

                    let myAddress = address.split(',')
                    let address_line_1 = myAddress[0]
                    let address_rest = myAddress.slice(1, myAddress.length).join(',')


                    $('.address_1 span').text(address_line_1)
                    $('.address_2').text(address_rest)

                    map.setCenter(results[0].geometry.location);
                    new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        })

    })(jQuery)
}



