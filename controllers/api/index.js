const router = require('express').Router();
// access to the user-routes
const userRoutes = require('./user-routes.js');

// prefix user-routes with /users path
router.use('/users', userRoutes);

module.exports = router;