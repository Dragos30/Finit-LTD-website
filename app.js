function myFunction() {
     var x = document.getElementById("myTopnav");
     if (x.className === "topnav") {
       x.className += " responsive";
     } else {
       x.className = "topnav";
     }
   }
  
 var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 3000); // Change image every 3 seconds
}
anime.timeline({loop: true})
  .add({
    targets: '.ml15 .word',
    scale: [2,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  }).add({
    targets: '.ml15',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
  
$(document).ready(function () {
  $("#submit_btn").click(function () {

    var proceed = true;
    //simple validation at client's end
    //loop through each field and we simply change border color to red for invalid fields       
    $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function () {
      $(this).css('border-color', '');
      if (!$.trim($(this).val())) { //if this field is empty 
        $(this).css('border-color', 'red'); //change border color to red   
        proceed = false; //set do not proceed flag
      }
      //check invalid email
      var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
        $(this).css('border-color', 'red'); //change border color to red   
        proceed = false; //set do not proceed flag              
      }
    });

    if (proceed) //everything looks good! proceed...
    {
      //get input field values data to be sent to server
      post_data = {
        'user_name': $('input[name=name]').val(),
        'user_email': $('input[name=email]').val(),
        'phone_number': $('input[name=phone2]').val(),
        'subject': $('select[name=subject]').val(),
        'msg': $('textarea[name=message]').val()
      };

      //Ajax post data to server
      $.post('contact_me.php', post_data, function (response) {
        if (response.type == 'error') { //load json data from server and output message     
          output = '<div class="error">' + response.text + '</div>';
        } else {
          output = '<div class="success">' + response.text + '</div>';
          //reset values in all input fields
          $("#contact_form  input[required=true], #contact_form textarea[required=true]").val('');
          $("#contact_form #contact_body").slideUp(); //hide form after success
        }
        $("#contact_form #contact_results").hide().html(output).slideDown();
      }, 'json');
    }
  });

  //reset previously set border colors and hide all message on .keyup()
  $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function () {
    $(this).css('border-color', '');
    $("#contact_results").slideUp();
  });
});
// ===== Scroll to Top ==== 
$(window).scroll(function () {
  if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
    $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } else {
    $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});
$('#return-to-top').click(function () {      // When arrow is clicked
  $('body,html').animate({
    scrollTop: 0
  }, 100);
});