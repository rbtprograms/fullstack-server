const { assert } = require('chai');
const Profile = require('../../lib/models/Profile');
// const { getErrors } = require('./helpers');

describe('Profile model', () => {
    it('is a valid good model', () => {
        const data = {
            name: 'tester'
        };

        const profile = new Profile(data);

        data._id = profile._id;
        assert.deepEqual(profile.toJSON(), data);
    });
});