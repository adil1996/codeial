const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/codeial_developement')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'There is a connection error'))

db.once(
    'open', function(){
        console.log('Succcessfully connected to the database.')
    }
)

module.exports = db;