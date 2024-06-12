const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connections');


const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

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

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port: http://localhost:${PORT}`));
});

