const express = require('express')

const router = express.Router();

const passport = require('passport');

console.log('Routes Loaded')

const userController = require('../controllers/user_controller')

router.get('/profile', passport.checkAuthentication ,userController.profiles)

router.get('/sign-up', userController.signUp)

router.get('/sign-in', userController.signIn)

router.post('/create', userController.create)


//use passport as middleware
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),userController.createSession);

router.get('/sign-out', userController.destroySession)

module.exports = router