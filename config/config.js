const path = require('path');

const dev = {
    server: {
        host: 'localhost',
        port: 3000,
    },
    database: {
        host: 'mongo',
        port: 27017,
        name: 'coders',
    },
    mongod: {
        path: path.join(__dirname, '../data/db'),
    },
    JWT: {
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRATION: '3h',
    },
    logger: {
        path: path.join(__dirname, '../log'),
    },
};

const prod = {
};

module.exports = process.env.NODE_ENV === 'prod' ? prod : dev;
