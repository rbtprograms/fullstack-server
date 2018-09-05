const { assert } = require('chai');
const Profile = require('../../lib/models/Profile');
// const { getErrors } = require('./helpers');

describe('Profile model', () => {
    it('is a valid good model', () => {
        const data = {
            name: 'tester'
        };
        const expected = {
            name: 'tester',
            avatar: 'https://i.imgur.com/ChAFdeZ.png',
            rank: 'Captain',
            location: ''
        };
        const profile = new Profile(data);

        expected._id = profile._id;
        assert.deepEqual(profile.toJSON(), expected);
    });
});