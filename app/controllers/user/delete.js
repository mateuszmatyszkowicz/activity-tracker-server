const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.remove({ _id: req.params.id})
        .exec()
        .then((result) => {
            console.log(result);
            if (result.n) {
                return res.status(200).json({
                    message: 'User deleted',
                });
            }

            res.status(409).json({
                message: 'User not found',
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err.message,
            });
        });
};
