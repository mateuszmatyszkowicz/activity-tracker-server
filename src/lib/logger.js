const path = require('path');
const config = require('../../config/config').logger;

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const logFormat = printf(info => `${ info.timestamp } [${ info.label }] ${ info.level }: ${ info.message }`);

const Logger = createLogger({
    level: 'verbose',
    format: combine(
        label({ label: 'CODERS'}),
        timestamp(),
        logFormat,
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(config.path, 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(config.path, 'combined.log') }),
    ],
});

module.exports = Logger;
