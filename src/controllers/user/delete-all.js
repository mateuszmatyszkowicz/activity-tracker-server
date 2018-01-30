const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const { User} = require('../../models');

module.exports = (req, res, next) => {
    User.remove({})
        .exec()
        .then(result => res.sendStatus(HttpStatus.OK))
        .catch(error => boom.internal(error));
};
