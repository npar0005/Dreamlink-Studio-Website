$(function() {
  $("[data-open='true']").css({display: 'block'});
  let prevSelector = '';
  $("[data-expand]").click(function() {
    const selector = $(this).data('expand');
    const $info = $(selector);
    const $info_wrapper = $info.closest(".product-info-wrapper");
    const wrapper_open = $info_wrapper.attr('data-open') === "true";
    
    if(!wrapper_open || prevSelector === selector) {
      $info_wrapper.stop().slideToggle();
      $info_wrapper.attr('data-open', !wrapper_open);
    } 
    // If user click on a different expandable than the one they're currently viewing
    if(prevSelector !== selector) { 
      prevSelector = selector;
      $('.show').hide().removeClass('show');
      $info.stop().fadeIn();
      $info.addClass('show');
    }
  });
});