const path = require('path');

const dev = {
    server: {
        host: 'localhost',
        port: 3000,
    },
    JWT: {
        JWT_SECRET: 'eyJlbWFpbCI6ImFAYy5jb21tIiwidXNlcklkIjoiNWE2ODUwOTczNTI2ZGM3ODdiNWNjYzFkIiwiaWF0IjoxNTE2Nzg2NDQzLCJleHAiOjE1MTY3ODY0NzN9',
        JWT_EXPIRATION: '3h',
    },
    logger: {
        path: path.join(__dirname, '../log'),
    },
};

const prod = {
};

module.exports = process.env === 'prod' ? prod : dev;
