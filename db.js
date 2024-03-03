// This whole file db.js is for database connection only

const mongoose = require('mongoose');

// Define the mongodb connection URL
const mongoURL = "mongodb://localhost:27017/hotels"; // replace myDatabase with your database name

// setup mongodb connection
mongoose.connect(mongoURL, {
    // useNewUrlParser : true,
    // useUnifiedTopology : true
});

// get the default connection 
// mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// Event Listeners
db.on('connected', function(){
    console.log("Connected to Mongo DB server");
})

db.on('disconnected', function(){
    console.log("Disconnected to Mongo DB server");
})

db.on('error', function(err){
    console.log("An error ocurred", err);
})

// export database connection
module.exports = db;
// this db object will be used in different nodejs files to interact with the database