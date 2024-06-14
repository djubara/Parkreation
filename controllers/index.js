/* Describe all the path that we need to use in the application 

1. /signin - GET - This route will render the signin.handlebars template
2. /api/users/ - POST - This route will render the signup.handlebars template
3. /api/users/login - POST - This route will sign in the user
4. /states/:stateName - GET - This route will render the state.handlebars template
5. TODO method and path - This route will render the homepage.handlebars template
6. TODO method and path - This route will render the homepage.handlebars template
*/




const router = require('express').Router();
const { getParksByStateCode } = require('../services/nps');
const { getUserByID } = require('../services/userController');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  try {
    res.render('homepage', { signedIn: req.session.signedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signin', async (req, res) => {
  try {
    if (req.session.signedIn) {
      res.redirect('/')
      return
    }
    else {
      res.render('login');
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/state/:stateCode', async (req, res) => {
  try {
    if (!req.session.signedIn) {
      res.redirect('/signin')
      return
    }
    const [user, parks] = await Promise.all([
      getUserByID(req.session.user_id),
      getParksByStateCode(req.params.stateCode)
    ])
    const { visited, wishlist } = user.get({ plain: true });
    console.log(user.get({ plain: true }));
    res.render('state', { parks, visited, wishlist, signedIn: req.session.signedIn })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/register', async (req, res) => {
  try {
    if (req.session.signedIn) {
      res.redirect('/')
    }
    else {
      res.render('register');
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;