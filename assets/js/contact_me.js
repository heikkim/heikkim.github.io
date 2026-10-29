---
---
$(function() {

  $('#contactForm input[required="required"],#contactForm textarea[required="required"]').jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour

      if($("#companyIdNumber").val() !== "" || $("input#_gotcha").val() !== "") {
        return;
      }

      // get values from FORM
	    var url = $form.attr('action');
      var name = $form.find("input[name=name]").val();
      var username = $form.find("input[name=username]").val();
      var email = $form.find("input[name=email]").val();
      var phone = $form.find("input[name=phone]").val();
      var message = $form.find("textarea[name=message]").val();
      var pageFrom = $form.find("input[name=pageFrom]").val();
      var firstName = name; // For Success/Failure Message
      
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
          
      if(username !== ''){ // Disable's form submit if hidden input(username) has been filled
        return;
      }

      $this = $("#sendContactFormBtn");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

      $.ajax({
        url: url,
        type: "POST",
	      dataType: "json",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message,
          pageFrom: pageFrom,
          access_key: spc_getContactFormAcW()
        },
        cache: false,

		success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },

        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that the mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },

        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
