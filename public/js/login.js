$(function() {
  $(".login_btn").on("click", function(event) {
    event.preventDefault();
  });

  $(".cancel_btn").on("click", function(event) {
    event.preventDefault();

    window.location.replace("/");
  });
});
