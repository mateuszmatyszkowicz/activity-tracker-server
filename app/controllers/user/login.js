const { User } = require('../../models');
const HttpStatus = require('http-status-codes');

const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION } = require('../../../config/config').JWT;

module.exports = (req, res, next) => {
    User.findOne({ 'local.email': req.body.email })
        .exec()
        .then((user) => {
            console.log(`Trying to log in as ${req.body.email}`);
            if (!user) {
                return res.sendStatus(HttpStatus.NOT_FOUND);
            }

            user.comparePassword(req.body.password)
                .then(() => {
                    const token = jwt.sign({
                        email: user.local.email,
                        userId: user._id,
                    },
                        JWT_SECRET
                    , {
                        expiresIn: JWT_EXPIRATION,
                    });

                    console.log(`Creating new TOKEN ${token}`);
                    return res.status(HttpStatus.OK).json({
                        message: 'Auth successful',
                        token: token,
                    });
                })
                .catch((error) => {
                    res.sendStatus(HttpStatus.UNAUTHORIZED);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err.message,
            });
        });
};
