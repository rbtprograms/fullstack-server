const { assert } = require('chai');
const { Types } = require('mongoose');
const Profile = require('../../lib/models/Profile');
// const { getErrors } = require('./helpers');

describe('Profile model', () => {
    it('is a valid good model', () => {
        const data = {
            userId: Types.ObjectId(),
            avatar: 'awesomeLlama.jpg',
            location: 'Portland',
            money: 700,
            rank: 'diamond',
            roles: ['User']
        };

        const profile = new Profile(data);

        data._id = profile._id;
        assert.deepEqual(profile.toJSON(), data);
    });
});