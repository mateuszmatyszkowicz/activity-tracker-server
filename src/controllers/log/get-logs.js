const boom = require('boom');
const HttpStatus = require('http-status-codes');

const {
    Log,
} = require('../../models');

module.exports = (req, res, next) => {
    Log.find({ userId: req.userData.userId}).exec()
        .then(logs => res.status(HttpStatus.OK).json({
            logs: logs,
        }));
};
