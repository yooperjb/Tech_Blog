const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// receive 404 error for any non-existent endpoint
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;