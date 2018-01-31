const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Action,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    Action.find({ userId: req.userData.userId }).exec()
        .then(result =>
            res.status(HttpStatus.OK).json({
                actions:result
            })
        )
        .catch(error => next(boom.internal(error)));
};
