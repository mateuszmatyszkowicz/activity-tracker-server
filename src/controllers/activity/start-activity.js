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
            if (activity.active_period.status === 'during') {
                return res.sendStatus(HttpStatus.NOT_MODIFIED);
            }
            const activePeriod = {
                start_time: req.body.start_time || new Date,
                status: (new Date(req.body.start_time) - new Date()) > 10000 ? 'upcoming' : 'during',
            };

            activity.active_period = activePeriod;

            activity.save()
                .then(result => res.status(HttpStatus.OK).json({
                    result,
                }))
                .catch(err => logger.error(err));
        })
        .catch(err => logger.error(err));
};
