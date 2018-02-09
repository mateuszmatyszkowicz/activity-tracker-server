const boom = require('boom');
const HttpStatus = require('http-status-codes');

const {
    User,
    Log,
} = require('../../models');

module.exports = (req, res, next) => {
    if (req.body.email) {
        User.findOne({ 'local.email': req.body.email })
            .exec()
            .then((user) => {
                if (user) {
                    return next(boom.conflict());
                } else {
                    const user = new User({
                        'local.email': req.body.email,
                        'local.password': req.body.password,
                    });

                    user.save()
                        .then((result) => {
                            const userLog = new Log({
                                userId: result.id,
                                accountLog: [{ event: 'created_at', date: Date.now }],
                            });

                            userLog.save()
                                .catch(error => next(error));

                            return res.sendStatus(HttpStatus.CREATED);
                        })
                        .catch(error => res.status(HttpStatus.NOT_ACCEPTABLE).json({
                            errors: error,
                        }));
                }
            })
            .catch(error => next(boom.internal(error)));
    } else {
        return res.status(HttpStatus.NOT_ACCEPTABLE).json({
            errors: {
                email: {
                    message: `Email address is required`,
                },
            },
        })
    }
};
