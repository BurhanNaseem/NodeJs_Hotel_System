const express = require('express');
const app = express();
const db = require('./db'); // database connection
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // the data sent from the client side will be saved in req.body

app.get('/', function (req, res) {
  res.send("Welcome to our Hotel")
});

// import the router files
const PersonRoutes = require('./Routes/PersonRoutes');
const MenuRoutes = require('./Routes/MenuRoutes');

// use the routers 
app.use("/", PersonRoutes);
app.use("/", MenuRoutes);

const port = process.env.port || 3000;

app.listen(port, function(){
    console.log("server running on port 3000");
});
