const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION } = require('../../../config/config').JWT;

const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.findOne({ 'local.email': req.body.email })
        .exec()
        .then((user) => {
            logger.info(`Attempt to LOGIN as ${req.body.email}`);

            if (!user) {
                return next(boom.unauthorized());
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

                    logger.verbose(`New token: ${token}`);

                    return res.status(HttpStatus.OK).json({
                        token: token,
                    });
                })
                .catch(error => next(boom.unauthorized(error)));
        })
        .catch(error => next(boom.internal(error)));
};
