const User = require('../models/user')

module.exports.profiles = (req, res) => {
    console.log(req.cookies)
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id).then(
            data => {
                if (data) {
                    return res.render('user_profile', {
                        title: 'User Profile',
                        user: data
                    })

                } else {
                    return res.redirect('/users/sign-in')
                }
            }
        ).catch(
            err => {
                console.log('error while loading gthe profile page')
            }
        )
    } else {
        return res.redirect('/users/sign-in')
    }
}


module.exports.signUp = (req, res) => {
    return res.render('user_sign_up', {
        title: "Codeial ! Sign Up"
    })
}


module.exports.signIn = (req, res) => {

    if (!req.cookies.user_id) {
        return res.render('user_sign_in', {
            title: "Codeial ! Sign In"
        })
    }
    else {
        return res.redirect('/users/profile')
    }
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

    User.findOne({ email: req.body.email }).then(
        data => {
            if (data) {
                if (data.password != req.body.password) {
                    return res.redirect('back')
                }

                res.cookie('user_id', data.id)
                return res.redirect('/users/profile')

            }
            else {
                return res.redirect('back');
            }
        }
    ).catch(
        err => {
            console.log("error while finding user in signin")
            return
        }
    )
}