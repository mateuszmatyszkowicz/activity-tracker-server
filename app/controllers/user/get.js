const { User } = require('../../models');
const HttpStatus = require('http-status-codes');

module.exports = (req, res, next) => {
    console.log(`User data ${req.userData}`);
    res.status(HttpStatus.OK).json({
        user: req.userData,
    });
};
