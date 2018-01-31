const HttpStatus = require('http-status-codes');

const { User } = require('../../models');

module.exports = (req, res, next) => {
    res.status(HttpStatus.OK).json({
        user: req.userData,
    });
};
