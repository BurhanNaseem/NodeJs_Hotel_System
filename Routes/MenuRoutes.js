const express = require('express');
const router = express.Router();
const Menu = require('../Models/Menu');  // mongoose model of menu

// post request on /menu
router.post("/menu", async(req,res) =>{
    try{
        const data = req.body;
        const newMenu = new Menu(data);

        const response = await newMenu.save();

        console.log("Menu Data Saved successfully");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
});

// get request on /menu
router.get("/menu", async(req,res) => {
    try{
      const response = await Menu.find();
      console.log("Data fetched successfully");
      res.status(200).json(response);
    }
    catch(err){
        console.log("Data not fetched");
        res.status(500).json({error : "Internal server error"});
    }
});


// Parameterized routes depending upn the taste of the dish
router.get("/menu/:tasteType", async(req,res) => {
    const tasteType = req.params.tasteType;

    try{
        if(tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy"){
            const response = await Menu.find({taste : tasteType});
            console.log("Data fetched succesfully" + tasteType);
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error : "Invalid taste type"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
});

// update menu
router.put("/menu/:id", async(req,res) => {
    try{
        const personId = req.params.id;
        const upadatedPersonData = req.body;

        const response = await Menu.findByIdAndUpdate(personId, upadatedPersonData, {
            new : true,
            runValidators : true
        });

        if(!response){
            return res.status(404).json({error : "Menu not found"});
        }

        console.log("Menu updated successfully");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
});

// delete menu
router.delete("/menu/:id", async(req,res) => {
    try{
        const personId = req.params.id;
        const response = await Menu.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error : "Menu not found"});
        }

        console.log("Menu deleted successfully");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
});

// comment added for github testing purpose

module.exports = router;