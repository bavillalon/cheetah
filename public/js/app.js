var $task_name = $("#taskName");
var $quantity = $("#quantity");
var $description = $("#description");
var $dueDate = $("#dueDate");
var $estimatedTime = $("#estimatedTime");
var $submitBtn = $(".submit");
var API = {
  saveTask: function (Task) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/newtask",
      data: JSON.stringify(Task)
    }); 
  },
  getTask: function() {
    return $.ajax({
      url: "api/edittask",
      type: "GET"
    });
  },
  deleteTask: function(id) {
    return $.ajax({
      url: "api/task/:id" + id,
      type: "DELETE"
    });
  }
};
var NewTaskSubmit = function (event) {
  event.preventDefault();

  var task = {
    task_name: $task_name.val().trim(),
    quantity: $quantity.val().trim(),
    description: $description.val().trim(),
    dueDate: $dueDate.val().trim(),
    estimatedTime: $estimatedTime.val().trim(),
  };

  //if (!(teacher.text && example.description)) {
  //  alert("You must enter an example text and description!");
  //sreturn;
  //}

  API.saveTask(task).then(function () {});
  $(".new_task_form").css("display", "none");
  $(".new_task_saved").css("display","block");
  $task_name.val("");
  $quantity.val("");
  $description.val("");
  $dueDate.val("");
  $estimatedTime.val("");
};
var EditTask = function(event){
  event.preventDefault();
  API.getTask(task).then(function(){

  })
}
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
  $(".new_task_saved").css("display","none");
  $(".new_task_form").css("display", "block");
};
var close_save_task = function(){
  $(".new_task_saved").css("display","none");
}
$("#log").on("touchstart click", modal);
$(".close").on("touchstart click", span);
$("#new_task").on("touchstart click", new_task);
$(".submit").on("touchstart click", NewTaskSubmit);
$("#edit_task").on("touchstart click",EditTask);
$(".task_new").on("touchstart click", new_task);
$(".task_done").on("click", close_save_task);