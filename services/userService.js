var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    q = require('q');

var getUserById = function(_id) {
    var deferred = q.defer();
    User.findById(_id).exec(function(err, user) {
        if(err) {
            deferred.reject({"status": 500, "jsonResult": {"result": err}});
        } else if(!user) {
            deferred.reject({"status": 404, "jsonResult": {"result": "User not found"}});
        } else {
            console.log('user by id: ', user);
            deferred.resolve({"status": 200, "jsonResult": {"result": user}});
        }
    });
    return deferred.promise;
},
    
updateUserInfo = function(_id, userInfo) {
    var deferred = q.defer();
    User.findById(_id).exec(function(err, user) {
        if(err) {
            deferred.reject({"status": 500, "jsonResult": {"result": err}});
        } else if(!user) {
            deferred.reject({"status": 404, "jsonResult": {"result": "User not found"}});
        } else {
            user.firstName = userInfo.firstName;
            user.lastName = userInfo.lastName;
            user.email = userInfo.email;
            user.password = user.setPassword(userInfo.password);
            
            user.save(function(err, user) {
                if(err) {
                    deferred.reject({"status": 500, "jsonResult": {"result": err}});  
                } else {
                    deferred.resolve({"status": 200, "jsonResult": {"result": user}});
                }
            });
        }
    });
    return deferred.promise;
},
    
deleteUserById = function(_id) {
    var deferred = q.defer();
    User.findByIdAndRemove(_id).exec(function(err, user) {
        if(err) {
            deferred.reject({"status": 500, "jsonResult": {"result": err}});
        } else if(!user) {
            deferred.reject({"status": 404, "jsonResult": {"result": "User not found"}});
        } else {
            console.log('user by id: ', user);
            deferred.resolve({"status": 200, "jsonResult": {"result": "User deleted successfully"}});
        }
    });
    return deferred.promise;
},
    
getAllUsers = function() {
    var deferred = q.defer();
    User.find().exec(function(err, users) {
        if(err) {
            deferred.reject({"status": 500, "jsonResult": {"result": err}});
        } else if(!users) {
            deferred.reject({"status": 404, "jsonResult": {"result": "User not found"}});
        } else {
            console.log('users =', users);
            deferred.resolve({"status": 200, "jsonResult": {"result": users}});
        }
    });
    return deferred.promise;
};

exports.getUserById = getUserById;
exports.updateUserInfo = updateUserInfo;
exports.deleteUserById = deleteUserById;
exports.getAllUsers = getAllUsers;