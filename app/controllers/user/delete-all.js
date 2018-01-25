const { User} = require('../../models');
const HttpStatus = require('http-status-codes');

module.exports = (req, res, next) => {
    User.remove({})
        .exec()
        .then((result) => {
            res.sendStatus(HttpStatus.OK);
        })
        .catch((err) => {
            console.log(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err.message,
            });
        });
};
