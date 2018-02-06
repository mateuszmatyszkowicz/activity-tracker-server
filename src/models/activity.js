const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const activitySchema = Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    color: {
        type: String,
        match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        default: '#ffffff',
        required: true,
    },
    icon: {
        type: String,
    },
    type: {
        type: String,
        enum: ['freq', 'time'],
        required: true,
    },
    active_period: {
        start_date: {
            type: Date,
        },
        end_date: {
            type: Date,
        },
        status: {
            type: String,
        }
    },
    periods: [{
        start_date: {
            type: Date,
        },
        end_date: {
            type: Date,
        },
        duration: {
            type: Number,
        },
    }],
    removed_at: {
        type: Date,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

activitySchema.post('save', function(err, doc, next) {
    const errors = {};

    Object.keys(err.errors).forEach(key => {
        errors[key] = {
            message: err.errors[key].message,
        };
    })

    next(errors);
});

activitySchema.method('toJSON', function() {
    const obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
});

module.exports = mongoose.model('Action', activitySchema);
