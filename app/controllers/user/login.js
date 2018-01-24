const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../../config/config').jwt.secret;

module.exports = (req, res, next) => {
    console.log(req.body.email)
    User.find({ 'local.email': req.body.email })
        .exec()
        .then((users) => {
            console.log(users);
            if (users.length < 1) {
                return res.status(404).json({
                    message: 'Please provide correct email address',
                });
            }
            bcrypt.compare(req.body.password, users[0].local.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed',
                    });
                }

                if (result) {
                    const token = jwt.sign({
                        email: users[0].local.email,
                        userId: users[0]._id,
                    },
                        JWT_KEY
                    , {
                        expiresIn: '30m',
                    });

                    console.log(`Auth successful new TOKEN ${token}`);
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                    });
                }

                res.status(401).json({
                    message: 'Auth failed',
                });
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err.message,
            });
        });
};
