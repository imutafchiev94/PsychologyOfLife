const mongoose = require('mongoose');

const config = require('./config');

module.exports = (app) => {

    mongoose.connect(config.connectionString, {useNewUrlParser: true, useUnifiedTopology: true})

    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log("Database connected");
    });
}

