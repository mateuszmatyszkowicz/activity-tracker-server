const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = Schema({
    name: String,
    type: String,
});

module.exports = mongoose.model('Event', eventSchema);
