const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.find({})
        .exec()
        .then((users) => {
            if (users) {
                return res.status(200).json({
                    users: users,
                });
            }

            res.status(404).json({
                message: 'Collection empty',
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err.message,
            });
        });
};
