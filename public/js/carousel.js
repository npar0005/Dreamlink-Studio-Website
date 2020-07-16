$(function(){
  const $owlProfile = $('.owl-profile-carousel');
  $owlProfile.owlCarousel({
    loop: true,
    margin: 20,
    stagePadding: 30,
    nav: true,
    dots: false,
    navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    responsive:{
      0:{
          items:1
      },
      600:{
          items:2
      },
      1000:{
          items: 4
      }
    }
  });

  $owlProducts = $(".owl-products-carousel");
  $owlProducts.owlCarousel({
    loop: true,
    center: true,
    smartSpeed: 1000,
    nav: true,
    dots: false,
    navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    mouseDrag: false,
    responsive:{
      0:{
        items: 1,
      },
      600:{
          items:1
      },
      1000:{
          items: 3
      }
    }
  });
});