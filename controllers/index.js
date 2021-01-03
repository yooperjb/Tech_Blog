const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

// Path to api routes
router.use('/api', apiRoutes);
// Path to home page routes
router.use('/', homeRoutes);

// receive 404 error for any non-existent endpoint
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;