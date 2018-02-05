const router = require('express').Router();
const logger = require('../lib/logger');
const boom = require('boom');

// Middlewares
const {
    isAuthenticated
} = require('../middleware');

// Models
const User = require('./user');
const Auth = require('./auth');
const Action = require('./action');

// Login Route,
router.use('/auth', Auth);

// User Router: CRUD
router.use('/users', User);

// Action Router: CRUD
router.use('/actions', isAuthenticated, Action);

// GLOBAL 404 500 ROUTES
router.use((req, res, next) => {
    next(boom.notFound());
});

router.use((err, req, res, next) => {

    if (err.outoup && err.output.statusCode >= 400 && err.output.statusCode < 500) {
        logger.warn(err);

        return res.sendStatus(err.output.statusCode);
    }

    if (process.env.NODE_ENV !== 'production') {
        logger.error(err);

        return res.status(500).json({
            error: `Unexpected error: ${err}`,
        });
    }

    res.sendStatus(boom.badImplementation());
});

module.exports = router;
