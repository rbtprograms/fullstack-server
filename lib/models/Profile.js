const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    avatar: String,
    location: String,
    money: Number,
    rank: String,
    roles: [String]
});

module.exports = mongoose.model('Profile', schema);