const boom = require('boom');
const HttpStatus = require('http-status-codes');

const {
    Activity
} = require('../../models');

module.exports = (req, res, next) => {
    Activity.findById(req.params.id)
        .exec()
        .then(activiti => {
            res.status(HttpStatus.OK).json({
                logs: activiti.periods,
            });
        })
        .catch(error => next(boom.internal(error)));
};
