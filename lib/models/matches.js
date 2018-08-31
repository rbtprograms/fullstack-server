const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
    game_id: {
        type: String,
        required: true
    },
    game: {
        type: Object,
        required: true   
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Matches', schema);