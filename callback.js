
// function callback(){
//     console.log("This is a callback function");
// }

function add(a,b,callback){
    var result = a+b;
    console.log("Result : "+ result); // work of main function completed
    callback(); // after that callback function is called
}

// add(3,4,callback);

// add(2,3, function(){
//     console.log("This is also callback function");
// });

add(2,3, () => console.log("This is also callback function"));



// POST route to add a person
// app.post('/person', function(req,res){
//     const data = req.body;   // assuming the request body contains the person data

//     // create a person document using the mongoose model and initialize it with data
//     const newPerson = new Person(data);
//     // newPerson.name = data.name;

//     // save person data in database
//     // save function takes a callback function in argument
//     newPerson.save(function(error, savedData){
//       if(error){
//         console.log("Error in saving the data");
//         // 500 is for server error
//         res.status(500).json(error , "Internal server error");
//       }
//       else{
//         console.log("Data saved successfully");
//         // 200 is for successfully data saved 
//         res.status(200).json(savedData);
//       }
//     })
    
// });