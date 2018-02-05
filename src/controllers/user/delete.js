const HttpStauts = require('http-status-codes');
const boom = require('boom');

const { User } = require('../../models');

module.exports = (req, res, next) => {
    if (req.params.id) {
        User.findByIdAndRemove(req.params.id)
            .exec()
            .then(result => res.sendStatus(HttpStauts.OK))
            .catch(error => next(boom.internal(error)));
    } else {
        res.sendStatus(HttpStauts.NOT_ACCEPTABLE);
    }
};
