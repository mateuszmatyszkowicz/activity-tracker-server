const boom = require('boom');

const GlobalCtrl = {
    notImplemented: (req, res, next) => {
        next(boom.notImplemented());
    },
};

module.exports = {
    ActionCtrl: require('./action'),
    AuthCtrl: require('./auth'),
    UserCtrl: require('./user'),
    GlobalCtrl,
};
