const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Activity,
    Log,
    User,
} = require('../../models');

module.exports = (req, res) => {
    Activity.findById(req.params.id)
        .exec()
        .then((activity) => {
            const createLog = {
                event: 'stop',
                activityId: req.params.id,
                name: activity.name,
                type: activity.type,
            };

            if (activity.active_period.status === 'finished') {
                return res.sendStatus(HttpStatus.NOT_MODIFIED);
            }

            if (req.body.end_date) {
                activity.active_period.end_date = req.body.end_date;
                activity.active_period.status = 'finished';

                activity.periods.push({
                    start_date: activity.active_period.start_date,
                    end_date: req.body.end_date,
                    duration: new Date(req.body.end_date) - new Date(activity.active_period.start_date),
                });

                activity.save()
                    .then((result) => {
                        Log.findOne({ userId: req.userData.userId })
                        .exec()
                        .then(userLog => {
                            if (userLog) {
                                userLog.activitiesLog.push(createLog)

                                userLog.save()
                                    .then(result => logger.verbose(`activity_stopped: ${req.params.id}`))
                                    .catch(error => logger.error(error));
                            }
                        })

                        res.status(HttpStatus.OK).json({
                            result,
                        });
                    })
                    .catch(err => logger.error(err));
            } else {
                return res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
            }
        })
        .catch(err => logger.error(err));
};
