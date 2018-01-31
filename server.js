const path = require('path');
const fs = require('fs');
const config = require('./config/config');
const app = require('express')();

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./src/lib/logger');

fs.existsSync(config.logger.path) || fs.mkdirSync(config.logger.path);

mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.name}`);

mongoose.connection.on('error', error => logger.error(error));
mongoose.connection.once('open', () => logger.info('Database successfully connected'));

const morganLogStream = fs.createWriteStream(path.join(config.logger.path, 'morgan.log'), { flags: 'a' });
app.use(morgan('combined', { stream: morganLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    next();
});

require('./src/routes')(app);

app.listen(config.server.port, () => logger.info(`Server started at ${ (new Date()).toISOString() } at ${config.server.host}:${config.server.port}`));

process.on('unhandledRejection', error => logger.error(error));
