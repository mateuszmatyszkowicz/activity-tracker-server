const HttpStatus = require('http-status-codes');
const logger = require('../lib/logger');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config').JWT;

module.exports = (req, res, next) => {
    let token;

    try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userData = decoded;
        next();
    } catch (err) {
        if (err.message === 'jwt expired') {
            logger.info(`Token expired ${token}`)
        }
        return res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
};
