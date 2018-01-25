const { spawn } = require('child_process');
const  fs = require('fs');
const logger = require('./src/lib/logger');

const { path } = require('./config/config').mongod;

if (!fs.existsSync(path)) {
    logger.error(`Please make sure that this path ${ path } is correct.`);

    process.exit(0);
}

const mongod = spawn(
    'mongod',
    [
        '--dbpath',
        path,
    ]);

mongod.stdout.on('data', data => logger.info(data.toString()));
mongod.stderr.on('data', data => loger.error(data.toString()));
