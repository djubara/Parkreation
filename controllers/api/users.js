const User = require('../../models/users');
const { createUser } = require('../userController');
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
        req.session.signed_in = true
        res.status(200).redirect('/')
    })
})

router.post('/signin', async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    const userData = user.dataValues

    if (await bcrypt.compare(req.body.password, userData.password)) {
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.signed_in = true
            res.redirect('/')
        })
        return
    } else {
        res.status(500).send('Password does not match!')
        return
    }

    res.status(500).send('An unknown error occured. Please try again!')
})

// const UserController = require('../userController');
// router.post('/', async (req, res) => {
//     try {
//         const user = await UserController.createUser(req.body);
//         // TODO create session variables based on the logged in user
//         res.status(201).json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }



// });

// router.post('/login', async (req, res) => {
//     try {

//         const user = await UserController.getUserByEmail(req.body.email);
//         if (!user) {
//             res.status(404).json({ message: 'No user with that email address!' });
//             return;
//         }
//         const validPassword = false // TODO await user.checkPassword(req.body.password);
//         if (!validPassword) {
//             res.status(400).json({ message: 'Incorrect password!' });
//             return;
//         }
//         // TODO create session variables based on the logged in user
//         res.status(201).json({ message: 'You are now logged in!' });
//     } catch (err) {
//         res.status(500).json(err);
//     }

// });
module.exports = router;


// // CREATE new user
// router.post('/', async (req, res) => {
//     try {
//         const dbUserData = await User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//         });

//         // Set up sessions with a 'loggedIn' variable set to `true`
//         req.session.save(() => {
//             req.session.loggedIn = true;

//             res.status(200).json(dbUserData);
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });


// // Logout
// router.post('/logout', (req, res) => {
//     // When the user logs out, destroy the session
//     if (req.session.loggedIn) {
//         req.session.destroy(() => {
//             res.status(204).end();
//         });
//     } else {
//         res.status(404).end();
//     }
// });