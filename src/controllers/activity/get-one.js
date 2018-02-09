const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Activity,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    if (req.params.id) {
        Activity.findOne({ _id: req.params.id}).exec()
            .then(result => {
                if (result) {
                    return res.status(HttpStatus.OK).json(result)
                }
                return res.sendStatus(HttpStatus.NO_CONTENT);
            })
            .catch(error => next(boom.internal(error)));
    } else {
        res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
    }
};
