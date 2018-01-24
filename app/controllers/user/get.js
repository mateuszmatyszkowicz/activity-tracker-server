const { User } = require('../../models');

module.exports = (req, res, next) => {
    console.log(req.userData);
    res.status(200).json({
        user: req.params.id,
    });
};
