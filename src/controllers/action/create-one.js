const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Action,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    const action = new Action({
        icon: req.body.icon,
        userId: req.userData.userId,
        color: req.body.color,
        description: req.body.description,
        type: req.body.type,
    });

    action.save()
        .then(result => res.status(HttpStatus.CREATED).json({
            id: result.id,
        }))
        .catch(error => next(boom.internal(error)))
};
