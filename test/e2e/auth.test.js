const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Auth API', () => {
    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('profiles'));

    let token, profile;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                email: 'me@me.com',
                name: 'tester',
                password: 'abc'
            })
            .then(({ body }) => {
                token = body.token;
                profile = body.profile;
            });
    });

    it('will signup a user', () => {
        assert.ok(token);
        assert.equal(profile.name, 'tester');
    });

    it('verifies', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body.verified);
            });
    });

    it('signs in', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'me@me.com',
                password: 'abc'
            })
            .then(({ body }) => {
                assert.ok(body.token);
            });
    });
});