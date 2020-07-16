$(function() {
  $("#contact-form").submit(function(e) {
    e.preventDefault(); // stop page refresh
    // Validate Recaptcha

    const $data = $("#contact-form").serialize();
    // Send data to server to be emailed using $.ajax

  });
});