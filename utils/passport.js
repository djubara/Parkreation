const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const { User } = require('../models');
passport.use("local", new LocalStrategy({ usernameField: "email" }, async (email, password, callback) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        console.log(email, password, user)
        if (!user) {
            callback(null, false, { message: 'Incorrect email or password' })
            return
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            callback(null, false, { message: 'Incorrect email or password' })
            return
        }
        callback(null, user)
    } catch (err) {
        callback(err)
    }
}));
passport.serializeUser((user, callback) => {
    callback(null, user.id)
});
passport.deserializeUser(async (id, callback) => {
    try {
        const user = await User.findByPk(id)
        callback(null, user)
    } catch (err) {
        callback(err)
    }
});

