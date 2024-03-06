// This whole file db.js is for database connection only

const mongoose = require('mongoose');
require('dotenv').config();

// Define the mongodb connection URL (Local URL)
//const mongoURL = process.env.db_url_local; // replace myDatabase with your database name

// online mongodb atlas server
const mongoURL = process.env.db_url_online;

// setup mongodb connection
mongoose.connect(mongoURL, {S
    // useNewUrlParser : true,S
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