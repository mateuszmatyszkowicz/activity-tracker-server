const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Activity,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    if (req.userData.userId) {
        Activity.find({ userId: req.userData.userId })
            .exec()
            .then(actions => res.status(HttpStatus.OK).json({ actions: actions }))
            .catch(error => next(boom.internal(error)));
    } else {
        res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
    }
};
