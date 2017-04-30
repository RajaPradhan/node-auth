var userService = require('../services/userService');

var sendJSONResponse = function(res, responseObj) {
    res.status(responseObj.status);
    res.json(responseObj.jsonResult);
},

getUserById = function(req, res) {
    var _id = req.params.id;
    console.log('_id:' + _id);
    if(!_id) {
        var responseObj = {"status": 404, "jsonResult": {"result": "Id not found"}};
        sendJSONResponse(res, responseObj);
    } else {
        userService.getUserById(_id)
        .then(function(responseObj) {
            console.log('responseObj', responseObj);
            sendJSONResponse(res, responseObj);
        })
        .catch(function(responseObj) {
            sendJSONResponse(res, responseObj);
        });
    }
},
    
updateUserInfo = function(req, res) {
    var _id = req.params.id;
    if(!_id) {
        var responseObj = {"status": 404, "jsonResult": {"result": "Id not found"}};
        sendJSONResponse(res, responseObj);
    } else {
        var userInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };
        userService.updateUserInfo(_id, userInfo)
        .then(function(responseObj) {
            sendJSONResponse(res, responseObj);
        })
        .catch(function(responseObj) {
            sendJSONResponse(res, responseObj);
        });
    }
},
    
deleteUserById = function(req, res) {
    var _id = req.params.id;
    console.log('_id:' + _id);
    if(!_id) {
        var responseObj = {"status": 404, "jsonResult": {"result": "Id not found"}};
        sendJSONResponse(res, responseObj);
    } else {
        userService.deleteUserById(_id)
        .then(function(responseObj) {
            console.log('responseObj', responseObj);
            sendJSONResponse(res, responseObj);
        })
        .catch(function(responseObj) {
            sendJSONResponse(res, responseObj);
        });
    }
},
    
getAllUsers = function(req, res) {
    userService.getAllUsers()
    .then(function(responseObj) {
        console.log('responseObj', responseObj);
        sendJSONResponse(res, responseObj);
    })
    .catch(function(responseObj) {
        sendJSONResponse(res, responseObj);
    });
};

exports.getUserById = getUserById;
exports.updateUserInfo = updateUserInfo;
exports.deleteUserById = deleteUserById;
exports.getAllUsers = getAllUsers;