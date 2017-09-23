$(document).ready(function() {

  // Default pattern on page load
  var strPattern = 'abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789!@#$%^&*()-_=+';
  var arrayPattern = strPattern.split('');

  /* *** Checkbox Handler *** */
  $('input[type="checkbox"]').on('change', function() {
    strPattern = '';

    // Disable Generate button when there is no checkbox selected
    if ($('input:checked', '.checkbox-wrapper').length === 0) {
      $('.generate-btn').attr('disabled', true);
    } else {
      $('.generate-btn').attr('disabled', false);
    }

    // Create pattern according to checkboxes
    if ($('input[name="lower"]').is(':checked')) {
      strPattern = strPattern + 'abcdefghijklmnopqrstuvxyz';
    }
    if ($('input[name="upper"]').is(':checked')) {
      strPattern = strPattern + 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
    }
    if ($('input[name="number"]').is(':checked')) {
      strPattern = strPattern + '0123456789';
    }
    if ($('input[name="special"]').is(':checked')) {
      strPattern = strPattern + '!@#$%^&*()-_=+';
    }

    // Create array of each string pattern characters
    arrayPattern = strPattern.split('');
  });

  /* *** Generate Button Handler *** */
  $('.generate-btn').on('click', function() {
    // Get length value
    var passLength = $('select[name="length"]').val();

    // Empty password by default
    var password = '';

    // Generate password string
    for (n = 0; n < passLength; n++) {
      var randomChar = arrayPattern[Math.floor(Math.random() * arrayPattern.length)];
      password = password + randomChar;
    }

    // Display generated string to page
    $('.password-text').text(password);
  });

  /* *** Clipboard Handler *** */
  var clipboard = new Clipboard('.copy-btn');

  clipboard.on('success', function(e) {
    $classes = 'hint--bottom hint--always hint--rounded'; // Hint.css tooltip classes
    $ariaLabel = 'Copied!'; // Tooltip text

    $(e.trigger).addClass($classes);
    $(e.trigger).attr('aria-label', $ariaLabel);

    setTimeout(function() {
      $(e.trigger).removeClass($classes);
      $(e.trigger).removeAttr('aria-label');
      e.clearSelection(); // Remove selection from target text
    }, 2500); // Run after 2.5s
  });

});