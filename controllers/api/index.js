const router = require('express').Router();
const userRoutes = require('./users');
const wishlistRoutes = require('./wishlist')
const visitlistRoutes = require('./visitlist')

router.use('/users', userRoutes);
router.use('/wishlist', wishlistRoutes)
router.use('/visitlist', visitlistRoutes)

module.exports = router;