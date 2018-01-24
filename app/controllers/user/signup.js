const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    User.find({ 'local.email': req.body.email })
        .exec()
        .then((users) => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: 'Adress email exists.'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = new User({
                            'local.email': req.body.email,
                            'local.password': hash,
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
                })
            }
        });
};
