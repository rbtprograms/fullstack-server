const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
    player_1: [{
        profile_id: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: true
        },
        troops: {
            type: Number,
            required: true
        },
        wins: {
            type: Number,
            required: true
        }
    }],
    player_2: [{
        profile_id: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: true
        },
        troops: {
            type: Number,
            required: true
        },
        wins: {
            type: Number,
            required: true
        }
    }]
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Matches', schema);