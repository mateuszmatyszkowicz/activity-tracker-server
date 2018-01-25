const User = require('./user');
const Auth = require('./auth');

module.exports = (app) => {
    // Login Route,
    app.use('/auth', Auth)

    // User Router: CRUD
    app.use('/users', User);

    // GLOBAL 404 500 ROUTES
    app.use((req, res, next) => {
        res.status(404).json({
            error: 'Endpoint not found',
        });
    });
    app.use((err, req, res, next) => {
        if (process.env.NODE_ENV !== 'production') {
            return res.status(500).json({
                error: `Unexpected error: ${err}`,
            });

            next(err);
        }
    });
};
