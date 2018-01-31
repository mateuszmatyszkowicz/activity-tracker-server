const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Action,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    Action.findOneAndRemove({ _id: req.params.id }).exec()
        .then(result => res.sendStatus(HttpStatus.OK))
        .catch(error => next(boom.notAcceptable(error)));
};
