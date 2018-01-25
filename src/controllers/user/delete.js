const HttpStauts = require('http-status-codes');
const logger = require('../../lib/logger');

const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.remove({ _id: req.params.id})
        .exec()
        .then((result) => {
            res.sendStatus(HttpStauts.OK);
        })
        .catch((err) => {
            logger.error(err);
            res.status(HttpStauts.INTERNAL_SERVER_ERROR).json({
                error: err.message,
            });
        });
};
