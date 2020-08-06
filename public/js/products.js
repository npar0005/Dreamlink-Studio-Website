$(function() {
  $("[data-open='true']").css({display: 'block'});
  $("[data-expand]").click(function() {
    const selector = $(this).data('expand');
    const $info = $(selector);
    const $info_wrapper = $info.closest(".product-info-wrapper");
    
    if(!$info_wrapper.data('open')) {
      $info_wrapper.slideToggle();
      $info_wrapper.data('open', true);
    }
    $('.show').hide().removeClass('show');
    $info.stop().fadeIn();
    $info.addClass('show');
  });
});