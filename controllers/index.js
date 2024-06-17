// Description: This file contains the routes for the homepage, signin, state, park, and register pages. It also contains the route for the API routes.
const router = require('express').Router();
const passport = require('passport');
const { getParksByStateCode } = require('../services/nps');
const { getParkByParkCode } = require('../services/parks');
const { getUserByID } = require('../services/userController');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  try {
    res.render('homepage', { signedIn: req.user != null });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signin', async (req, res) => {
  try {
    if (req.user) {
      res.redirect('/');
      return;
    }

    res.render('login');


  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/state/:stateCode', async (req, res) => {
  try {
    if (!req.user) {
      res.redirect('/signin');
      return;
    }
    const [user, parks] = await Promise.all([
      getUserByID(req.user.id),
      getParksByStateCode(req.params.stateCode)
    ])
    const { visited, wishlist } = user.get({ plain: true });
    console.log(user.get({ plain: true }));
    res.render('state', { parks: parks, visited, wishlist, signedIn: true })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/park/:parkCode', async (req, res) => {
  try {
    if (!req.user) {
      res.redirect('/signin');
      return;
    }
    const park = (await getParkByParkCode(req.params.parkCode)).get({ plain: true });
    if (!park) {
      res.redirect("/")
      return
    }
    console.log(park);
    res.render('park', { park, comments: park.comments ?? [], signedIn: true })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/register', async (req, res) => {
  try {
    if (req.user) {
      res.redirect('/');
      return;
    }
    res.render('register');

  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;