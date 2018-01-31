const HttpStauts = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.remove({ _id: req.params.id})
        .exec()
        .then(result => res.sendStatus(HttpStauts.OK))
        .catch(error => next(boom.internal(error)));
};
