var span = function() {
    $(".modal").css("display", "none");
  };
  var modal = function() {
    $(".index_login").css("display", "block");
  };
  // eslint-disable-next-line camelcase
  var new_task = function() {
    $(".new_task_form").css("display", "block");
  };
  $("#log").on("touchstart click", modal);
  $(".close").on("touchstart click", span);
  $("#new_task").on("touchstart click", new_task);