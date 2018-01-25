const { User } = require('../../models');
const HttpStatus = require('http-status-codes');

module.exports = (req, res, next) => {
    res.status(HttpStatus.OK).json({
        user: req.userData,
    });
};
