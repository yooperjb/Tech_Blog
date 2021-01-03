const router = require('express').Router();
// access to the user and post routes
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// prefix user-routes with /users path
router.use('/users', userRoutes);
// prefix post-routes with /posts path
router.use('/posts', postRoutes);
// prefix comment-routes with /comments path
router.use('/comments', commentRoutes);

module.exports = router;