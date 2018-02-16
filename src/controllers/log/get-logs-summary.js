const HttpStatus = require('http-status-codes');
const boom = require('boom');
const mongoose = require('mongoose');
const {
    Activity,
} = require('../../models');

module.exports = (req, res, next) => {
    if (!req.query.date) {
        res.sendStatus(HttpStatus.NOT_ACCEPTABLE);

        return;
    }

    const date = new Date(req.query.date);

    /*
        Potrzebujemy zgrupować logi po id projektu, a te zaś po określonych okresach czasowych (1d, 1w, 1msc, 1year)
        [
            id_aktywnosci: {
                day: [
                    {0},
                    {1}
                ],
                weeek: [
                    {0},
                    {1},
                ]
            },
            id_aktywnosci: {
                day...
                week...
                month...
                year...
            }
        ]
    */

    Activity.find().exec().then(res => res.forEach(doc => {
        doc._id = new mongoose.SchemaTypes.ObjectId(doc._id);
        //doc.userId = new mongoose.SchemaTypes.ObjectId(doc.userId);
        doc.periods.forEach(period => {
          //  console.log(period);
            period.start_date = new Date(period.start_date);
            period.stop_date = new Date(period.stop_date)
        })
        doc.save();
    }))

    Activity.aggregate([
        {
            $unwind: '$periods',
        },
        {
            $project: {
                periods: 1,
            }
        },
        // {
        //     $sort: {
        //         'periods.start_time': 1,
        //     }
        // },
        // {
        //     $match: {
        //         'periods.start_date': {
        //             $gte: date,
        //         }
        //     }
        // },
        {
            $group: {
                _id: {
                    activityId: '$_id',
                    'year': { $year: '$periods.start_date' },
                    'month': { $month: '$periods.start_date' },
                    'day': { $dayOfMonth: '$periods.start_date' }
                },
                periods: {
                    $push: {
                        id: '$_id',
                        date: '$periods.start_date',
                    }
                }
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
                                }, '-',
                                {
                                    $substrBytes: ["$_id.month", 0, 2]
                                }, '-',
                                {
                                    $substrBytes: ["$_id.day", 0, 2]
                                }
                            ],
                        },
                        count: {
                            $size: '$periods',
                        }
                    }
                }
            }
        }
        // {
        //     $group: {
        //         _id: {
        //             'year': { $year: '$periods.start_date' },
        //             'month': { $month: '$periods.start_date' },
        //             'day': { $dayOfMonth: '$periods.start_date' }
        //         },
        //         periods: {
        //             $push: {
        //                 //id: '$periods._id', // It's period ID
        //                 activity_id: '$_id',
        //                 date: '$periods.start_date',
        //             },
        //         }
        //     }
        // },
        // {
        //     $group: {
        //         _id: '$_id',
        //         count: { $sum: 1 }
        //     }
        // }
    ]).then((result) => {

        res.status(200).json({
            date: req.query.date,
            result,
        });
    })
};
