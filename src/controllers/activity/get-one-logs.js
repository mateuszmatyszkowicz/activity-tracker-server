const boom = require('boom');
const HttpStatus = require('http-status-codes');

const {
    Activity
} = require('../../models');

module.exports = (req, res, next) => {
    Activity.findById(req.params.id)
        .exec()
        .then(activity => {
            if (activity) {
                return res.status(HttpStatus.OK).json({
                    logs: activity.periods,
                    count: activity.periods.length,
                });
            }
            return res.sendStatus(HttpStatus.NO_CONTENT);
        })
        .catch(error => next(boom.internal(error)));
};
