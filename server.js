const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const routes = require('./controllers/index');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connections');
const getFirstImageURL = require('./utils/helpers/getFirstImageURL')
const shortenDescription = require('./utils/helpers/shortenDescription');

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001;
const models = require('./models');
const hbs = exphbs.create({
    helpers: {
        getFirstImageURL,
        shortenDescription
    }
});

const session = require('express-session');
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port: http://localhost:${PORT}`));
});