const router = require('express').Router();
const userRoutes = require('./users');
const wishlistRoutes = require('./wishlist')
const visitlistRoutes = require('./visitlist')
const parkRoutes = require('./parks')

router.use('/users', userRoutes);
router.use('/parks', parkRoutes);
router.use('/wishlist', wishlistRoutes)
router.use('/visitlist', visitlistRoutes)

module.exports = router;