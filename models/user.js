'use strict'; 

const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise; 

const UserSchema = mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    }, 
    lastName: {
        type: String, 
        required: true
    }, 
    username: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    }
}); 

UserSchema.methods.apiRepr = function() {
    return {
        firstName: this.firstName, 
        lastName: this.lastName, 
        username: this.username, 
        id: this._id
    }
}

const User = mongoose.model('User', UserSchema);

module.exports = { User }; 