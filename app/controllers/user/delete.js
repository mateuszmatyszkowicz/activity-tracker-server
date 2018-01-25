const { User } = require('../../models');
const HttpStauts = require('http-status-codes');

module.exports = (req, res, next) => {
    User.remove({ _id: req.params.id})
        .exec()
        .then((result) => {
            res.sendStatus(HttpStauts.OK);
        })
        .catch((err) => {
            console.log(err);
            res.status(HttpStauts.INTERNAL_SERVER_ERROR).json({
                error: err.message,
            });
        });
};
