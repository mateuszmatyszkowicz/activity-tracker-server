const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Activity,
    User,
} = require('../../models');

module.exports = (req, res, next) => {
    const activity = new Activity({
        name: req.body.name,
        icon: req.body.icon,
        userId: req.userData.userId,
        color: req.body.color,
        description: req.body.description,
        type: req.body.type,
    });

    activity.save()
        .then(result => res.status(HttpStatus.CREATED).json({
            id: result.id,
        }))
        .catch(error => res.status(HttpStatus.NOT_ACCEPTABLE).json({
            errors: error,
        }))
};
