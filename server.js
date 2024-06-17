// Purpose: Main entry point for the application. This file is responsible for setting up the server and connecting to the database. It also sets up the express-handlebars view engine and the express-session middleware. It also sets up the routes for the application.

require('dotenv').config()
require("./utils/passport")
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const routes = require('./controllers/index');
const sequelize = require('./config/connections');
const getFirstImageURL = require('./utils/helpers/getFirstImageURL')
const shortenDescription = require('./utils/helpers/shortenDescription');


const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({
    helpers: {
        getFirstImageURL,
        shortenDescription
    }
});

const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    store: new SequelizeStore({
        db: sequelize
    }),

    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session(sess));
app.use(passport.authenticate("session"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port: http://localhost:${PORT}`));
});