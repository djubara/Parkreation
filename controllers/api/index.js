const router = require('express').Router();
const userRoutes = require('./users');
const wishlistRoutes = require('./wishlist')
router.use('/users', userRoutes);
router.use('/wishlist', wishlistRoutes)
module.exports = router;