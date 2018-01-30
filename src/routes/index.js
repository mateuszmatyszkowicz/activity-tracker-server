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

module.exports = (app) => {
    // Login Route,
    app.use('/auth', Auth)

    // User Router: CRUD
    app.use('/users', User);

    // Action Router: CRUD
    app.use('/action', isAuthenticated, Action);

    // GLOBAL 404 500 ROUTES
    app.use((req, res, next) => {
        next(boom.notFound());
    });

    app.use((err, req, res, next) => {

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
};
