const express = require('express');
const router = express.Router();
const Person = require('../Models/Person'); // Mongoose model of a person

// post request on /person 
router.post('/person', async (req, res) => {
  try {
    // fetch the data from req.body 
    const data = req.body;
    // create an object of Person named as newPerson which contains the data fetched
    // from req.body
    const newPerson = new Person(data);

    // save the new object newPerson in the database and wait unitl the database 
    // processing is done
    const response = await newPerson.save();
    console.log("Data saved successfully");
    // send the status code 200 (successfully work done) and the response data in JSON format
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get request on /person
router.get("/person", async (req, res) => {
  try {
    // fetch the data from the database by using the Person model and find() keyword
    // and wait untill the data is fetched
    const data = await Person.find();
    console.log("Data Fetched successfully");
    res.status(200).json(data);
  }
  catch (err) {
    console.log("Data not saved");
    res.status(500).json({ error: "Internal server error" });
  }
});

// parameterized work type
router.get("/person/:workType", async (req, res) => {
  try {
    // fetch the parameter workType form the endpoint
    const workType = req.params.workType;

    // validation check for a proper work type
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("Data of fetched succesfully " + workType)
      res.status(200).json(response);
    }
    else {
      res.status(404).json({ error: "Invalid work type" });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update person data
router.put("/person/:id", async (req, res) => {
  try {
    // extract the id from the URL parameter
    const personId = req.params.id;

    // fetch the updated data of person
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // for returning the updated document
      runValidators: true // for running the mongoose validations based on the schema
    });

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data Updated Successfully");
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete the person data
router.delete("/person/:id", async(req,res) => {
  try{
    const personId = req.params.id;

    const deletedData = await Person.findByIdAndDelete(personId);

    if(!deletedData){
      return res.status(404).json({error : "Person not found"});
    }

    console.log("Data deleted successfully");
    res.status(200).json({message : "Person deleted successfully"});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error : "Internal server error"});
  }
})

module.exports = router;