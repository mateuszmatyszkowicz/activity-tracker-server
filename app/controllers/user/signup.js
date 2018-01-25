const { User } = require('../../models');
const HttpStatus = require('http-status-codes');

module.exports = (req, res, next) => {
    User.find({ 'local.email': req.body.email })
        .exec()
        .then((users) => {
            if (users.length >= 1) {
                return res.sendStatus(HttpStatus.CONFLICT);
            } else {
                const user = new User({
                    'local.email': req.body.email,
                    'local.password': req.body.password,
                });

                user.save()
                    .then((result) => {
                        console.log(result);
                        res.status(HttpStatus.CREATED);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: err.message,
                        });
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        });
};
