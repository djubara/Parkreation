const router = require('express').Router();
// const withAuth = require('../utils/auth');
// const { User, Post, Comment } = require('../models');


router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;