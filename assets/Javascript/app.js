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





});