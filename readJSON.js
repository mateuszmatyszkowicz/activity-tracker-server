const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const config = require('./config/config');
const {
    Activity,
} = require('./src/models');

const jsonFile = require('../mocks/test.json');

mongoose.set('debug', true)
mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.name}`).then(() => {
    mongoose.connection.db.dropCollection('actions');

    for (const activity of jsonFile)
    {
        const periods = activity.periods.map(period => ({
            ...period,
            '_id': new mongoose.Types.ObjectId(period.id),
            'start_date': new Date(period.start_date),
            'stop_date': new Date(period.stop_date),
        }));

        const a = new Activity({
            ...activity,
            'userId': new mongoose.Types.ObjectId("5a7d6534df97ff2970968632"),
            periods,
        })

        a.save().catch(err => console.log(err))
    };

    Activity.find({}).exec().then(res => console.log(res)).catch(err => console.log(err))
});
