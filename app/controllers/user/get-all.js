const { User } = require('../../models');
const HttpStatus = require('http-status-codes');

module.exports = (req, res, next) => {
    User.find({})
        .exec()
        .then((users) => {
            if (users) {
                return res.status(HttpStatus.OK).json({
                    users: users,
                });
            }

            res.status(HttpStatus.NO_CONTENT);
        })
        .catch((err) => {
            console.log(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err.message,
            });
        });
};
