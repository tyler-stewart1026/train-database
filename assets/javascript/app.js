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