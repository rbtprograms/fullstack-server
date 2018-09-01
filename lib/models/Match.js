const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({

    players: {
        type: [Schema.Types.ObjectId],
        ref: 'Profile',
        required: true,
    },
    game: {
        type: Object,
        required: true
    },
    winner: {
        type: Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Matches', schema);