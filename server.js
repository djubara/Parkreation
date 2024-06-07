// Purpose: This file is the entry point for the application. 
// It sets up the server and the connection to the database. 
// It also sets up the session and the handlebars engine.

// Dependencies
// Import the express module
const express = require('express');

const session = require('express-session');

// Import the dotenv package
require('dotenv').config();

// Import the sequelize package
const Sequelize = require('sequelize');

// Import the routes folder
// const routes = require('./routes');
const sequelize = require('./config/connections');

// Import the express-session and connect-session-sequelize packages
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import the express-handlebars package
const exphbs = require('express-handlebars');

// Create an instance of the express module
const app = express();

// Create an instance of the express-handlebars package
const hbs = exphbs.create({});

// Use the handlebars engine
app.engine('handlebars', hbs.engine);

// Set the handlebars engine
app.set('view engine', 'handlebars');

// Import the helpers module
const helpers = require('./utils/helpers');

// path module is a built-in Node.js module that provides utilities for working with file and directory paths
const path = require('path');

// Create a session object

const sess = {
    secret: 'Super secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

// Set up the middleware for the express module
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(routes);

// Set up the handlebars engine
const PORT = process.env.PORT || 3001;

// listen to the port
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port: ${PORT}!`));
});

