const HttpStatus = require('http-status-codes');
const logger = require('../../lib/logger');

const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.find({ 'local.email': req.body.email })
        .exec()
        .then((users) => {
            if (users.length >= 1) {
                return res.sendStatus(HttpStatus.CONFLICT);
            } else {
                const user = new User({
                    'local.email': req.body.email,
                    'local.password': req.body.password,
                });

                user.save()
                    .then((result) => {
                        logger.verbose(`USERS#CREATE ${user.local.email}`)
                        res.sendStatus(HttpStatus.CREATED);
                    })
                    .catch((err) => {
                        logger.error(err);
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: err.message,
                        });
                    });
            }
        })
        .catch((err) => {
            logger.error(err);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        });
};
