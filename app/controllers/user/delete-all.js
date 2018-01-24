const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.remove({})
        .exec()
        .then((result) => {
            console.log(result);
            if (result.n) {
                return res.status(200).json({
                    message: 'Users deleted',
                });
            }

            res.status(409).json({
                message: 'Errors occured.',
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err.message,
            });
        });
};
