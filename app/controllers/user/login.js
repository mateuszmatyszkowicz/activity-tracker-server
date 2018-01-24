const { User } = require('../../models');

const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../../config/config').jwt.secret;

module.exports = (req, res, next) => {
    User.find({ 'local.email': req.body.email })
        .exec()
        .then((users) => {
            console.log(`Trying to log in as ${users[0].local.email}`);
            if (users.length < 1) {
                return res.status(404).json({
                    message: 'Please provide correct email address',
                });
            }

            users[0].comparePassword(req.body.password)
                .then(() => {
                    const token = jwt.sign({
                        email: users[0].local.email,
                        userId: users[0]._id,
                    },
                        JWT_KEY
                    , {
                        expiresIn: '30m',
                    });

                    console.log(`Creating new TOKEN ${token}`);
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                    });
                })
                .catch((error) => {
                    return res.status(401).json({
                        message: 'Auth failed',
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err.message,
            });
        });
};
