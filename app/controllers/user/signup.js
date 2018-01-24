const { User } = require('../../models');

module.exports = (req, res, next) => {
    User.find({ 'local.email': req.body.email })
        .exec()
        .then((users) => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: 'Adress email exists.'
                });
            } else {
                const user = new User({
                    'local.email': req.body.email,
                    'local.password': req.body.password,
                });

                user.save()
                    .then((result) => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created',
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            error: err.message,
                        });
                    });
            }
        });
};
