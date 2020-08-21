let offset = 100;
let arrowShown = false;
$(function() {
  $('[data-scroll="true"]').click("click", function() {
    offset = $(this).data("offset") || offset;
    $("html, body").animate({ scrollTop: $($(this).data("to")).offset().top - offset }, "slow");
  });

  if(typeof AOS !== "undefined" && AOS) {
    AOS.init({
      disable: 'phone'
    });
  }

  // Set up popovers for scroll top navigation
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover'
  });
});

$(window).scroll(function() {
  const scroll  = $(this).scrollTop();
  if (scroll > 20 && !arrowShown) {
    $("#scroll-top").stop().fadeIn(600);
    arrowShown = !arrowShown;
  } else if (scroll <= 20 && arrowShown) {
    $("#scroll-top").stop().fadeOut(500);
    arrowShown = !arrowShown;
  }
});

