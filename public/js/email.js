$(function() {
  const $submitBtn = $("#contact-form .submit-btn");
  const oldBtnText = $submitBtn.text();
  $("#contact-form").submit(function(e) {
    e.preventDefault(); // stop page refresh

    const data = $(this).serialize();
    // Validity will be reported back and checked on the sever.
    if(this.checkValidity()) { // If form valid
      $submitBtn.attr('disabled', true);
      $submitBtn.text('Sending...');
      $.post("/sendmail", data, ({error, msg}) => {
        $submitBtn.attr('disabled', false);
        $submitBtn.text(oldBtnText);
        if(error) {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: msg
          });
        } else {
          // Show success popup.
          Swal.fire(
            'Sent!',
            'Email successfuly sent!',
            'success'
          );
          // Clear input fields on form once email sent
          $(":input").val("");
          $(this).removeClass('was-validated');
        }
      });
    } else { // If form invalid
      // Show the user what is invalid with their form input.
      $(this).addClass('was-validated');
    } 
  });
});