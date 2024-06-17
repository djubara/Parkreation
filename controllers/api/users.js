const passport = require('passport');
const User = require('../../models/users');
const { createUser } = require('../../services/userController');
const bcrypt = require('bcrypt')

const router = require('express').Router();

router.post('/register', async (req, res) => {
    try {
        const createdUser = await createUser({
            id: null,
            email: req.body.email,
            password: req.body.password
        })

        req.login(createdUser, (err) => {
            if (err) {
                console.log(err)
                res.status(500).send(err.message)
                return
            }
            res.status(201).redirect('/')
        })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

router.post('/signin', passport.authenticate("local", { successReturnToOrRedirect: "/", failureMessage: true }));

router.get("/logout", async (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
            return
        }
        res.redirect('/')
    });
})

module.exports = router;

