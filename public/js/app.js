var $task_name = $("#taskName");
var $quantity = $("#quantity");
var $description = $("#description");
var $dueDate = $("#dueDate");
var $estimatedTime = $("#estimatedTime");
var $submitBtn = $(".submit");
var API = {
  saveTask: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/newtask",
      data: JSON.stringify(example)
    });
  },
};
var NewTaskSubmit = function (event) {
  event.preventDefault();

  var task = {
    task_name: $task_name.val().trim(),
    quantity: $quantity.val().trim(),
    description: $description.val().trim(),
    dueDate: $dueDate.val().trim(),
    estimatedTime: $estimatedTime.val().trim(),
    state: "Unassigned"
  };

  //if (!(teacher.text && example.description)) {
  //  alert("You must enter an example text and description!");
  //sreturn;
  //}

  API.saveTask(task).then(function () {
    alert("new task saved");
  });
  $task_name.val("");
  $quantity.val("");
  $description.val("");
  $dueDate.val("");
  $estimatedTime.val("");
};
//date Picker for Due Date
$(function () {
  $('input[name="datetimes"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'), 10),
    timePicker: true,
    locale: {
      format: 'M/DD hh:mm A'
    }
  });
});
var span = function () {
  $(".modal").css("display", "none");
};
var modal = function () {
  $(".index_login").css("display", "block");
};
// eslint-disable-next-line camelcase
var new_task = function () {
  $(".new_task_form").css("display", "block");
};
$("#log").on("touchstart click", modal);
$(".close").on("touchstart click", span);
$("#new_task").on("touchstart click", new_task);
$(".submit").on("click", NewTaskSubmit);