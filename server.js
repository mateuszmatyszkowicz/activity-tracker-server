const config = require('./config/config');
const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/coders');

app.use(morgan('dev'));
app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(flash());

require('./app/routes')(app);

app.listen(config.server.port, () => {
    console.log(`Server listening on ${config.server.port}`);
});
