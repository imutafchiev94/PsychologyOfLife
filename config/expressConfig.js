const express = require('express');
const handlebars = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');


function setupExpress(app) {

    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');

    app.use(express.static('public'));
    app.use(express.urlencoded({extended: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret: "secreteraertfsdas"}));
}

module.exports = setupExpress