var firebaseConfig = {
  apiKey: "AIzaSyC4CN2XQNC0Vl1kMUFgg6gC2io2fhX2s3M",
  authDomain: "fir-5a1d3.firebaseapp.com",
  databaseURL: "https://fir-5a1d3.firebaseio.com",
  projectId: "fir-5a1d3",
  storageBucket: "fir-5a1d3.appspot.com",
  messagingSenderId: "816965107525",
  appId: "1:816965107525:web:b1f98b8ccf06813d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
function nextArrival(frequency, firstTrain) {
  var freq = parseInt(frequency);

  return "work in progress";
}

function minAway(frequency, firstTrain) {
  var freq = parseInt(frequency);
  return "work in progress";
}

function addTrain(trainObject){
var newRow=$("<tr>")
newRow.append(`<td>${trainObject.trainName}</td>`)
newRow.append(`<td>${trainObject.destination}</td>`)
newRow.append(`<td>${trainObject.frequency}</td>`)
newRow.append(`<td>${trainObject.nextArrival}</td>`)
newRow.append(`<td>${trainObject.minAway}</td>`)

$("#trains").append(newRow)
}
$("#submitButton").on("click", function(event) {
  event.preventDefault();
  console.log("clicked");
  var trainName = $("#trainName")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var firstTrainTime = $("#firstTrainTime")
    .val()
    .trim();
  var frequency = $("#frequency")
    .val()
    .trim();

  database
    .ref()
    .child(trainName)
    .set({
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    });
});

database.ref().on("value", function(snapshot){
//console.log(snapshot.val())
for (var train in snapshot.val()){
console.log(snapshot.val()[train].destination)
var trainObject={
trainName:train,
destination:snapshot.val()[train].destination,
frequency:snapshot.val()[train].frequency,
nextArrival:nextArrival(snapshot.val()[train].frequency, snapshot.val()[train].firstTrainTime),
minAway:minAway(snapshot.val()[train].frequency, snapshot.val()[train].firstTrainTime)
}
addTrain(trainObject)
}
} )
