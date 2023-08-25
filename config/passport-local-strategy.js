const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done){
    User.findOne({email: email}).
    then(
        user => {
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user)
        }
    ).catch(
        err => {
            console.log('Error in finding user ===> Passport');
            return done(err);
        }
    )
}

));

//serializing the uer to decide which key is to kept in the cookies

passport.serializeUser(function(user, done){
    done(null, user.id);
})

//deserializing the user from the key in the cookies

passport.deserializeUser(function(id, done){
    User.findById(id).then(
        data => {
            return done(null, data);
        }
    ).catch(
        err => {
            console.log('Error in finding user ===> Passport');
            return done(err);
        }
    )
})

passport.checkAuthentication = (req, res, next) => {
    //if the user is signed in 
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user
        res.locals.user = req.user;
    }

    next()
}

module.exports = passport