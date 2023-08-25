const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose')
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 8120


//session and cookies
const session  = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo'); 


//static folder set
app.use(express.static('./assets'))
app.use(expressLayouts);
app.use(express.urlencoded())
app.use(cookieParser())

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


//set up the view engine
app.set('view engine', 'ejs')
app.set('views','./views')

app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_developement'
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes/index'))


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }

    console.log(`Server is running on port: ${port}`)
})