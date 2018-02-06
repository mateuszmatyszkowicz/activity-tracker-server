const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Activity,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    if (req.body.id) {
        Activity.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .exec()
            .then(action => res.status(HttpStatus.OK).json({ action: action }))
            .catch(error => next(boom.internal(error)));
    } else {
        res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
    }
};
