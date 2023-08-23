const express = require('express')

const router = express.Router();

console.log('Routes Loaded')

const userController = require('../controllers/user_controller')

router.get('/profile', userController.profiles)

router.get('/sign-up', userController.signUp)

router.get('/sign-in', userController.signIn)

router.post('/create', userController.create)

router.post('/createSession', userController.createSession);

router.get('/signOut', userController.signOut);

module.exports = router