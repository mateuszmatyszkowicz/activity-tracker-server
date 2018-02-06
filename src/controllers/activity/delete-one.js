const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Activity,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    if (req.body.id) {
        Activity.findById(req.params.id).exec()
            .then(result => res.sendStatus(HttpStatus.OK))
            .catch(error => next(boom.internal(error)));
    } else {
        res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
    }
};
