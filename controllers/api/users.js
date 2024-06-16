const User = require('../../models/users');
const { createUser } = require('../../services/userController');
const bcrypt = require('bcrypt')

const router = require('express').Router();

router.post('/register', async (req, res) => {
    const createdUser = await createUser({
        id: null,
        email: req.body.email,
        password: req.body.password
    })

    req.session.save(() => {
        req.session.user_id = createdUser.dataValues.id
        req.session.signedIn = true
        res.status(200).redirect('/')
    })
})

router.post('/signin', async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (!user) {
        res.status(404).send('No user with that email address!')
        return
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
        req.session.save(() => {
            req.session.user_id = user.id
            req.session.signedIn = true
            res.redirect('/')
        })
        return
    } else {
        res.status(500).send('Password does not match!')
        return
    }

    res.status(500).send('An unknown error occured. Please try again!')
});

router.get("/logout", async (req, res) => {
    if (req.session.signedIn) {
        req.session.destroy(() => {
            // 204 is "no content"
            res.status(204).end()
        })
    } else {
        res.send(404).end()
    }
})

module.exports = router;

