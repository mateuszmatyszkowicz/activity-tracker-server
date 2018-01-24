const User = require('./user');

module.exports = (app) => {
    // UserRouter: signup | login | :id
    app.use('/user', User);


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
