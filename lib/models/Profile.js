const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { RequiredString } = require('./required-types');

const schema = new Schema({
    name: RequiredString,
    avatar: String,
    location: String,
    rank: String,
});

module.exports = mongoose.model('Profile', schema);