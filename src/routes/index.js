const HttpStatus = require('http-status-codes');
const config = require('../../config/config');

// Api Versions
const v1 = require('./v1');

module.exports = (app) => {
    app.get('/dispatcher', (req, res) => {
        res.status(HttpStatus.OK).json({
            version: config.api.version,
            api: `${ config.server.host }:${ config.server.port }${config.api.url}`,
        });
   });

    app.use(process.env.API_ENDPOINT_URL, v1);
    app.use('/', v1);
};
