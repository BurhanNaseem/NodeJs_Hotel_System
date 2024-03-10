const express = require('express');
const app = express();
const db = require('./db'); // database connection
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // the data sent from the client side will be saved in req.body
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', localAuthMiddleware, function (req, res) {
  res.send("Welcome to our Hotel")
});

// import the router files
const PersonRoutes = require('./Routes/PersonRoutes');
const MenuRoutes = require('./Routes/MenuRoutes');

// use the routers 
app.use("/",localAuthMiddleware,PersonRoutes);
app.use("/",localAuthMiddleware, MenuRoutes);

const port = process.env.port || 3000;

app.listen(port, function(){
    console.log("server running on port 3000");
});