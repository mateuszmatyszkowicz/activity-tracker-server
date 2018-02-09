const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    activitiesLog: [{
        activityId: mongoose.SchemaTypes.ObjectId,
        event: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    accountLog: [{
        event: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

logSchema.post('save', function(err, doc, next) {
    const errors = {};

    Object.keys(err.errors).forEach(key => {
        errors[key] = {
            message: err.errors[key].message,
        };
    })

    next(errors);
});

module.exports = mongoose.model('Log', logSchema);
