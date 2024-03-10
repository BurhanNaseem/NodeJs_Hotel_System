const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Define the person schema
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    work : {
        type : String,
        enum : ['chef', 'waiter', 'manager'],
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String
    },
    salary : {
        type : Number,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

personSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')){
        return next();
    }

    try{
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // generate hashed password
        const hashedPassword = await bcrypt.hash(person.password,salt);
        
        // override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
});

personSchema.methods.comparePassword = async function(enteredPassword){
    try{
        // use bcrypt to compare the entered passowrd with the stored hashed
        // password
        const isMatched = await bcrypt.compare(enteredPassword, this.password);
        return isMatched;
    }
    catch(err){
        throw err;
    }
}

// Create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;