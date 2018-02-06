const HttpStatus = require('http-status-codes');
const boom = require('boom');
const logger = require('../../lib/logger');

const {
    Activity,
    User,
} = require('../../models');

module.exports = (req, res) => {
    Activity.findById(req.params.id)
        .exec()
        .then((activity) => {
            if (activity.active_period.status === 'finished') {
                return res.sendStatus(HttpStatus.BAD_REQUEST);
            }

            const stop_time = new Date;
            activity.active_period.end_time = stop_time;
            activity.active_period.status = 'finished';

            activity.periods.push({
                start_time: activity.active_period.start_time,
                end_time: stop_time,
                duration: stop_time - activity.active_period.start_time,
            });

            activity.save()
                .then(result => res.status(HttpStatus.OK).json({
                    result,
                }))
                .catch(err => logger.error(err));
        })
        .catch(err => logger.error(err));
};
