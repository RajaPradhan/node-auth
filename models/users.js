var mongoose = require('mongoose'),
    crypto = require('crypto'), // crypto is built-in node module
    jwt = require('jsonwebtoken'),
    config = require('../config/config.json');

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    hash: String,
    salt: {
        type: String,
        required: true
    }
});

// The password is stored as a hashed value generated using the password input
// and a salt
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

// Validate the password by comparing the stored hash with the newly generated hash
// using the password in the request and the stored salt value
userSchema.methods.isValidPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

// This method generates a JWT to be sent to the client
userSchema.methods.generateJwt = function() {
    console.log('Inside generateJwt' + this.firstName);
    var expiry = new Date();
    // Set the JWT expiry date to 7 days from today
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        expiry: parseInt(expiry.getTime() / 1000)
    }, config.secretCode);
};

mongoose.model('User', userSchema);
