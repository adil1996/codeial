const User = require('../models/user')

module.exports.profiles = (req, res) => {
      
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


module.exports.signUp = (req, res) => {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up', {
        title: "Codeial ! Sign Up"
    })
}


module.exports.signIn = (req, res) => {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }


        return res.render('user_sign_in', {
            title: "Codeial ! Sign In"
        })
    
}

module.exports.create = (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }).then(
        data => {
            if (!data) {
                User.create(req.body).then(
                    data => {
                        return res.redirect('/users/sign-in')
                    }
                ).catch(
                    err => {
                        console.log("error while ceating user while signing up");
                        return;
                    }
                )
            } else {
                return res.redirect('back');
            }
        }
    ).catch(
        err => {
            console.log("error in finding user in signing up.")
            return;
        }
    )

}

module.exports.createSession = (req, res) => {
    return res.redirect('/')
}

module.exports.destroySession = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    
}