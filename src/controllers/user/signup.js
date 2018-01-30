const logger = require('../../lib/logger');
const boom = require('boom');
const HttpStatus = require('http-status-codes');

const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.findOne({ 'local.email': req.body.email })
        .exec()
        .then((user) => {
            if (user) {
                return next(boom.conflict());
            } else {
                const user = new User({
                    'local.email': req.body.email,
                    'local.password': req.body.password,
                });

                user.save()
                    .then(result => res.sendStatus(HttpStatus.CREATED))
                    .catch(error => next(boom.internal(error)));
            }
        })
        .catch(error => next(boom.internal(error)));
};
