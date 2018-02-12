const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Activity,
    Log,
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
        .then(result => {
            Log.findOne({ userId: req.userData.userId })
                .exec()
                .then(userLog => {
                    userLog.activitiesLog.push({
                        activityId: result.id,
                        event: 'activity_create',
                    });

                    userLog.save()
                        .then(() => logger.info('activity_created'))
                        .catch(error => next(error));
                });

            res.status(HttpStatus.CREATED).json({
                id: result.id,
            });
        })
        .catch(error => res.status(HttpStatus.NOT_ACCEPTABLE).json({
            errors: error,
        }))
};
