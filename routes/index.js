var express = require('express'),
    router = express.Router(),
    authenticationController = require('../controllers/authenticationController'),
    userController = require('../controllers/userController');

// Register a new user
router.post('/register', authenticationController.register);

// Login an existing user
router.post('/login', authenticationController.login);

// Get user info
router.get('/users/:id', userController.getUserById);

// Update user info
router.put('/users/:id', userController.updateUserInfo);

// Delete a user
router.delete('/users/:id', userController.deleteUserById);

// Get all users
router.get('/users', userController.getAllUsers);

module.exports = router;

