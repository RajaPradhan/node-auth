var authenticationService = require('../services/authenticationService');

var sendJSONResponse = function(res, responseObj) {
    console.log('responseObj=>', responseObj);
    res.status(responseObj.status);
    res.json(responseObj.jsonResult);
},

register = function(req, res) {
    if(!req.body.firstName
      || !req.body.lastName
      || !req.body.email
      || !req.body.password) {
        sendJSONResponse(res, {"status": 400, "jsonResult": {"result": "All fields required."}});
    } else {
        console.log('Inside register controller');
        authenticationService.register({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        .then(function(responseObj) {
            console.log('Promise resolved');
            sendJSONResponse(res, responseObj);
        })
        .catch(function(responseObj) {
            console.log('Promise rejected');
            sendJSONResponse(res, responseObj);
        });
    }
};

login = function(req, res) {
    if(!req.body.email
      || !req.body.password) {
        sendJSONResponse(res, {"status": 400, "jsonResult": {"result": "All fields required"}});
    } else {
        authenticationService.login({
            email: req.body.email,
            password: req.body.password
        })
        .then(function(responseObj) {
            console.log('Promise resolved');
            sendJSONResponse(res, responseObj);
        }).catch(function(responseObj) {
            console.log('Promise rejected');
            sendJSONResponse(res, responseObj);
        });
    }
};

exports.register = register;
exports.login = login;
