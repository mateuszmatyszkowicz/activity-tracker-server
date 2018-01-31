const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Action,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    if (req.params.id) {
        Action.findById(req.params.id).exec()
            .then(result => {
                res.status(HttpStatus.OK).json(result)
            })
            .catch(error => next(boom.internal(error)));
    } else {
        res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
    }
};
