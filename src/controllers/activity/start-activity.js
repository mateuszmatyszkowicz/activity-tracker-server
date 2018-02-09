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
                event: 'activity_start',
                activityId: req.params.id,
            };

            if (activity.type === 'freq') {
                activity.periods.push({
                    start_date: Date.now(),
                    end_date: Date.now(),
                });
            } else {
                if (activity.active_period.status === 'during') {
                    return res.sendStatus(HttpStatus.NOT_MODIFIED);
                }

                const activePeriod = {
                    start_date: new Date(req.body.start_date),
                    status: 'during',
                };

                activity.active_period = activePeriod;
            }

            activity.save()
                .then((result) => {
                    Log.findOne({ userId: req.userData.userId })
                        .exec()
                        .then(userLog => {
                            if (userLog) {
                                userLog.activitiesLog.push(createLog)

                                userLog.save()
                                    .then(result => logger.verbose(`activity_started: ${req.params.id}`))
                                    .catch(error => logger.error(error));
                            }
                        })

                    res.status(HttpStatus.OK).json({
                        result,
                    });
                })
                .catch(err => logger.error(err));
        })
        .catch(err => logger.error(err));
};
