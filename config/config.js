const path = require('path');

const dev = {
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,
    },
    database: {
        host: process.env.DATABASE_HOST || 'mongo',
        port: process.env.DATABASE_PORT || 27017,
        name: process.env.DATABASE_NAME || 'coders',
    },
    mongod: {
        path: path.join(__dirname, '../data/db'),
    },
    api: {
        version: process.env.API_VERSION || 1,
        url: process.env.API_ENDPOINT_URL || ''
    },
    JWT: {
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRATION: '10d',
    },
    logger: {
        path: path.join(__dirname, '../log'),
    },
};

const prod = {
};

module.exports = process.env.NODE_ENV === 'prod' ? prod : dev;
