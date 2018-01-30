const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Action,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    Action.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
        .then(result => res.status(HttpStatus.OK).json(result))
        .catch(error => next(boom.notAcceptable(error)));
};
