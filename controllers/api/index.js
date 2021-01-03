const router = require('express').Router();
// access to the user and post routes
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

// prefix user-routes with /users path
router.use('/users', userRoutes);
// prefix post-routes with /posts path
router.use('/posts', postRoutes);

module.exports = router;