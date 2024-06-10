const router = require('express').Router();
const UserController = require('../../controllers/userController');
router.post('/', async (req, res) => {
    try {
        const user = await UserController.createUser(req.body);
        // TODO create session variables based on the logged in user
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }



});

router.post('/login', async (req, res) => {
    try {
        const user = await UserController.getUserByEmail(req.body.email);
        if (!user) {
            res.status(404).json({ message: 'No user with that email address!' });
            return;
        }
        const validPassword = false // TODO await user.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        // TODO create session variables based on the logged in user
        res.status(201).json({ message: 'You are now logged in!' });
    } catch (err) {
        res.status(500).json(err);
    }

});
module.exports = router;