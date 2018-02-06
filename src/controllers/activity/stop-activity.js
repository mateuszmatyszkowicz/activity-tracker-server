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
                    .then(result => res.status(HttpStatus.OK).json({
                        result,
                    }))
                    .catch(err => console.log(err) && logger.error(err));
            } else {
                return res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
            }
        })
        .catch(err => logger.error(err));
};
