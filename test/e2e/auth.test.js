const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Auth API', () => {
    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('profiles'));

    let token = null;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                email: 'me@me.com',
                name: 'tester',
                password: 'abc'
            })
            .then(({ body }) => token = body.token);
    });

    it('will signup a user', () => {
        assert.ok(token);
    });
});