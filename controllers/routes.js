const router = require('express').Router();
const users = require('../models/users');


router.get('/', async (req, res) => {
    // const loggedIn = req.session.loggedIn;
    const usersData = await users.findAll().catch((err) => { res.json(err); });
    const users = usersData.map((user) => user.get({ plain: true }));
    res.render('homepage', { users });



});

router.get('/signin', async (req, res) => {
    res.render('login');
});

router.get('/register', async (req, res) => {
    res.render('register');
}
);

module.exports = router;