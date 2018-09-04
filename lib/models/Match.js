const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const { Schema } = mongoose;


const schema = new Schema (
    {
        players: {
            type: [Schema.Types.ObjectId],
            ref: 'Profile',
            required: true,
        },
        game: {
            type: Object,
            required: true
        }, 
    },
    {
        timestamps: true
    }
);

schema.statics.statsById = function(userId) {
    return this.aggregate([
        { $facet: {
            'totalWins': [
                { $match: { 'game.winner': userId } },
                { $count: 'totalWins' }
            ],

            'totalGames': [
                { $match: { players: ObjectId(userId) } },
                { $count: 'totalGames' }
            ]
        } }
    ]);
};

module.exports = mongoose.model('Matches', schema);