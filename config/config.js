const dev = {
    server: {
        host: 'localhost',
        port: 3000,
    },
    jwt: {
        secret: 'eyJlbWFpbCI6ImFAYy5jb21tIiwidXNlcklkIjoiNWE2ODUwOTczNTI2ZGM3ODdiNWNjYzFkIiwiaWF0IjoxNTE2Nzg2NDQzLCJleHAiOjE1MTY3ODY0NzN9',
    },
};

const prod = {
};

module.exports = process.env === 'prod' ? prod : dev;
