// Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDD1Q9hsi2TygFLfkioaVQM5COQTDyPZS8",
  authDomain: "traindatabaseproject.firebaseapp.com",
  databaseURL: "https://traindatabaseproject.firebaseio.com",
  projectId: "traindatabaseproject",
  storageBucket: "",
  messagingSenderId: "426068987347",
  appId: "1:426068987347:web:68c52c2537ad1c55e1b326"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Global Variables
var database = firebase.database();
var now = moment();
var minsAway = 0;
// Click function set to the input values of the search bars
$(document).on('click', '#addBtn', function (event) {
  event.preventDefault;

  // User data
  var trainName = $('#trainName').val().trim();
  var trainDestination = $('#destination').val().trim();
  var trainFirstTime = $('#firstTime').val().trim();
  var trainFrequency = $('#frequency').val().trim();

  // holds user inputs temporarily
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTime: trainFirstTime,
    frequency: trainFrequency
  }
  // uploads data to database
  database.ref().push(newTrain);

  // testing
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTime);
  console.log(newTrain.frequency);

  // reset search bars
  $('#trainName').val('');
  $('#destination').val('');
  $('#firstTime').val('');
  $('#frequency').val('');
});


database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // store data into variables 
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirstTime = childSnapshot.val().firstTime;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirstTime);
  console.log(trainFrequency);




  // Calculations using moment.js for "next arrival" and "minutes away"
  var timeArr = trainFirstTime.split(":");
  console.log(timeArr);
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  console.log(trainTime);
  var maxMoment = moment.max(moment(), trainTime);
  console.log(maxMoment);


  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMin = trainTime.diff(moment(), "minutes");
  } else {
    var difTime = moment().diff(trainTime, "minutes");
    var tRemain = difTime % childSnapshot.val().frequency;
    tMin = childSnapshot.val().frequency - tRemain;
    tArrival = moment().add(tMin, "m").format("hh:mm A");
  }
  console.log(tArrival);
  console.log(tMin);
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFirstTime),
    $("<td>").text(trainFrequency),
    $("<td>").text(tArrival),
    $("<td>").text(tMin)
  );


  $(".trainTable > tbody").append(newRow);
});