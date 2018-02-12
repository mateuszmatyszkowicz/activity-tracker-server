const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Activity,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    Activity
        .findById(req.params.id)
        .exec()
        .then((activity) => {
            activity.delete(() => {
                res.sendStatus(HttpStatus.OK);
            });
        })
        .catch(error => next(boom.internal(error)));
};
