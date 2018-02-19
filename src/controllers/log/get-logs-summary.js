const HttpStatus = require('http-status-codes');
const boom = require('boom');
const mongoose = require('mongoose');
const {
    Activity,
} = require('../../models');

module.exports = (req, res, next) => {
    if (!req.query.date || !req.query.type) {
        res.sendStatus(HttpStatus.NOT_ACCEPTABLE);

        return;
    }

    const date = new Date(req.query.date);
    const type = req.query.type;
    // Activity.find().exec().then(res => res.forEach(doc => {
    //     doc._id = new mongoose.SchemaTypes.ObjectId(doc._id);
    //     //doc.userId = new mongoose.SchemaTypes.ObjectId(doc.userId);
    //     doc.periods.forEach(period => {
    //       //  console.log(period);
    //         period.start_date = new Date(period.start_date);
    //         period.stop_date = new Date(period.stop_date)
    //     })
    //     doc.save();
    // }))
    mongoose.set('debug', true);

    const periods = {
        daily: {
            id: {
                year: { $year: '$periods.start_date' },
                month: { $month: '$periods.start_date' },
                day: { $dayOfMonth: '$periods.start_date' }
            }
        },
        monthly: {
            id: {
                year: { $year: '$periods.start_date' },
                month: { $month: '$periods.start_date' },
            }
        },
        annual: {
            id: {
                year: { $year: '$periods.start_date' },
            }
        }
    };

    Activity.aggregate([
        {
            $unwind: '$periods',
        },
        {
            $match: {
                'periods.start_date': {
                    $gte: date,
                }
            }
        },
        {
            $group: {
                _id: {
                    activityId: '$_id',
                    ...periods[type].id,
                },
                periods: {
                    $push: {
                        id: '$_id',
                        date: '$periods.start_date',
                    }
                },
                duration: { $sum :'$periods.duration'},
            }
        },
        {
            $sort: {
                _id: 1,
            }
        },
        {
            $group: {
                _id: '$_id.activityId',
                periods: {
                    $push: {
                        date: {
                            $concat: [
                                {
                                    $substrBytes: ["$_id.year", 0, 4]
                                }
                                , '-',
                                {
                                    $substrBytes: ["$_id.month", 0, 2]
                                }, '-',
                                {
                                    $substrBytes: ["$_id.day", 0, 2]
                                }
                            ],
                        },
                        count: { $size: '$periods' },
                        duration: '$duration',
                    }
                }
            }
        }
    ]).then((result) => {
        // On the SPA side diagram should be default filled 0 values, and then the values should be rewrite.
        res.status(200).json({
            date: req.query.date,
            result,
        });
    })
};
