const HttpStatus = require('http-status-codes');
const logger = require('../../lib/logger');

const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION } = require('../../../config/config').JWT;

const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.findOne({ 'local.email': req.body.email })
        .exec()
        .then((user) => {
            logger.info(`TRY$ LOGIN ${req.body.email}`);

            if (!user) {
                return res.sendStatus(HttpStatus.UNAUTHORIZED);
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

                    logger.verbose(`USER#NEW_TOKEN ${token}`);
                    return res.status(HttpStatus.OK).json({
                        token: token,
                    });
                })
                .catch(error => res.sendStatus(HttpStatus.UNAUTHORIZED));
        })
        .catch((err) => {
            logger.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err.message,
            });
        });
};
