const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.find({})
        .exec()
        .then((users) => {
            if (users) {
                return res.status(HttpStatus.OK).json({
                    users: users,
                });
            }

            res.status(HttpStatus.NO_CONTENT);
        })
        .catch(error => next(boom.internal(error)));
};
