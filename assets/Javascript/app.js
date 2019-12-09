$(document).ready(function(){
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC-xq_xfvfQBBz8I5JNDn7yXN3297Kwpn4",
    authDomain: "fire-project-7f704.firebaseapp.com",
    databaseURL: "https://fire-project-7f704.firebaseio.com",
    projectId: "fire-project-7f704",
    storageBucket: "fire-project-7f704.appspot.com",
    messagingSenderId: "17943389109",
    appId: "1:17943389109:web:d3b95edc0a407fe4"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  // Moment.js for the current time
    function currentTime() {
    var current = moment().format('LT');
    $("#currentTime").html(current);
    setTimeout(currentTime, 1000);
  };

// Variable for Firebase database
    var database = firebase.database();

    var trainName;
    var destination;
    var startTime;
    var frequency = 0;

    $(".form-field").on("keyup", function() {
        var trainfields = $("#train-name").val().trim();
        var cityfields = $("#destination").val().trim();
        var timefields = $("#first-train").val().trim();
        var freqfields = $("#frequency").val().trim();

        sessionStorage.setItem("train", trainfields);
        sessionStorage.setItem("city", cityfields);
        sessionStorage.setItem("time", timefields);
        sessionStorage.setItem("freq", freqfields);
      });

    $("#train-name").val(sessionStorage.getItem("train"));
    $("#destination").val(sessionStorage.getItem("city"));
    $("#first-train").val(sessionStorage.getItem("time"));
    $("#frequency").val(sessionStorage.getItem("freq"));

    $("#submit").on("click", function(event) {
    event.preventDefault();

    if ($("#train-name").val().trim() === "" ||
        $("#destination").val().trim() === "" ||
        $("#first-train").val().trim() === "" ||
        $("#frequency").val().trim() === "") {

    alert("Please fill in all details to add new train");

  } 
  
    else {

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    startTime = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    $(".form-field").val("");

    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      startTime: startTime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    sessionStorage.clear();
  }

});

database.ref().on("child_added", function(childSnapshot) {
    var startTimeConverted = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
    var timeRemain = timeDiff % childSnapshot.val().frequency;
    var minToArrival = childSnapshot.val().frequency - timeRemain;
    var nextTrain = moment().add(minToArrival, "minutes");
    var key = childSnapshot.key;
  
    var newrow = $("<tr>");
    newrow.append($("<td>" + childSnapshot.val().trainName + "</td>"));
    newrow.append($("<td>" + childSnapshot.val().destination + "</td>"));
    newrow.append($("<td class='text-center'>" + childSnapshot.val().frequency + "</td>"));
    newrow.append($("<td class='text-center'>" + moment(nextTrain).format("LT") + "</td>"));
    newrow.append($("<td class='text-center'>" + minToArrival + "</td>"));
    newrow.append($("<td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key='" + key + "'>X</button></td>"));
  
    if (minToArrival < 6) {
      newrow.addClass("info");
    }
  
    $("#train-table-rows").append(newrow);
  
  });

    $(document).on("click", ".arrival", function() {
    keyref = $(this).attr("data-key");
    database.ref().child(keyref).remove();
    window.location.reload();
  });
  
    currentTime();
  
    setInterval(function() {
    window.location.reload();
  }, 60000);

});