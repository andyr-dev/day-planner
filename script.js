// Wraps jQuery methods and code
$(function () {
  var currentHour = dayjs();

  //listens for clicks on the save button and stores the input in localStorage as hour:description key value pair
  $(".saveBtn").click (function () {
    var description = $(this).siblings(".description").val();
    var hour = $(this).closest(".time-block").attr("id");
    localStorage.setItem(hour, description);
  });

  // Stores the hour-# id as an int and checks of each number is before, same or neither to the current time
  // if before the current time then adds the past class, if the same then adds the present class,
  // if neither are true, then adds the future class
  $(".time-block").each(function(){
    var hourEl = parseInt($(this).attr("id").split("-")[1]);
    var time = dayjs().hour(hourEl);
  if(time.isBefore(currentHour, "hour")){
    $(this).addClass("past");
  } else if(time.isSame(currentHour, "hour")){
    $(this).addClass("present");
  } else {
    $(this).addClass("future");
  }
  });
  // Checks through each hour-# id and returns the locally stored description and if present, displays to the textarea
  $(".time-block").each(function(){
    var hour = $(this).attr("id");
    var description = localStorage.getItem(hour);
    if(description){
      $(this).find(".description").val(description);
    }
  });
});

// Displays the current DoW, Month name, Day and year and updates the time every second
function displayTime() {
  var currentTime = dayjs().format('dddd MMMM DD, YYYY hh:mm:ss a');
  $("#currentDay").text(currentTime);
  setInterval(displayTime, 1000);
}
displayTime();