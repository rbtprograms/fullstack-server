const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema (
    {
        players: {
            type: [Schema.Types.ObjectId],
            ref: 'Profile',
            required: true,
            default: void 0
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

module.exports = mongoose.model('Matches', schema);