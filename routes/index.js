/* Describe all the path that we need to use in the application 

1. /signin - GET - This route will render the signin.handlebars template
2. /api/users/ - POST - This route will render the signup.handlebars template
3. /api/users/login - POST - This route will sign in the user
4. /states/:stateName - GET - This route will render the state.handlebars template
5. TODO method and path - This route will render the homepage.handlebars template
6. TODO method and path - This route will render the homepage.handlebars template
*/




const router = require('express').Router();
const apiRoutes = require('./api');
const StateController = require('../controllers/stateController');
// const withAuth = require('../utils/auth');
// const { User, Post, Comment } = require('../models');
router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signin', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/states/:stateName', async (req, res) => {
  try {
    const stateData = await StateController.getStateByName(req.params.stateName)
    res.render('state', { ...stateData });
  } catch (err) {
    res.status(500).json(err);

  }
});

module.exports = router;