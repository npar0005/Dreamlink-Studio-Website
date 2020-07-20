$(function() {
  $("#contact-form").submit(function(e) {
    e.preventDefault(); // stop page refresh
    // Validate Recaptcha

    const data = $(this).serialize();
    // Send data to server to be emailed using $.post
    // Validity will be reported back and checked on the sever.
    $.post("/sendMail", data, function(response) {
      console.log(response);
    });
  });
});