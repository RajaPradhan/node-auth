var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    q = require('q');

var register = function(user) {
    console.log('Inside register service', user);
    var deferred = q.defer();
    var currentUser = new User();
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;
    currentUser.setPassword(user.password);

    currentUser.save(function(err) {
        if(err) {
            console.log('Registration failed');
            deferred.reject({"status": 500, "jsonResult": {"result": err}});
        } else {
            console.log('Registered successfully');
            var jwtToken = currentUser.generateJwt();
            console.log('jwtToken = ' + jwtToken);
            deferred.resolve({"status": 200, "jsonResult": {"result": jwtToken}});
        }
    });
    return deferred.promise;
},

login = function(credentials) {
    var deferred = q.defer();
    User.findOne({email: credentials.email}).exec(function(err, user) {
        if(err) {
            console.log('Server error');
            deferred.reject({"status": 500, "jsonResult": {"result": err}});
        } else if(user){
            if(user.isValidPassword(credentials.password)) {
                console.log('valid password');
                var jwtToken = user.generateJwt();
                deferred.resolve({"status": 200, "jsonResult": {"result": jwtToken}});
            } else {
                console.log('Invalid password');
                deferred.resolve({"status": 404, "jsonResult": {"result": "Invalid username or password"}});
            }
        } else {
            deferred.resolve({"status": 404, "jsonResult": {"result": "Invalid username or password"}});
        }
    });
    return deferred.promise;
};

exports.register = register;
exports.login = login;
