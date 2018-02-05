const HttpStatus = require('http-status-codes');
const boom = require('boom');

const { User } = require('../../models');

module.exports = (req, res, next) => {
    if (req.body.id) {
        User.findById(req.body.id)
            .exec()
            .then(user => res.status(HttpStatus.OK).json({ user: user }))
            .catch(error => next(boom.internal(error)));
    } else {
        res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
    }
};
