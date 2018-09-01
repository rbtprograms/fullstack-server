const { assert } = require('chai');
const { dropCollection } = require('./db');
const request = require('./request');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

const testUser = {
    email: 'me@me.com',
    name: 'tester',
    password: 'abc'
};
const testUser2 = {
    email: 'otherme@me.com',
    name: 'tester2',
    password: '123'
};

const save = (path, data) => {
    return request
        .post(`/api/${path}`)
        .send(data)
        .then(checkOk)
        .then(({ body }) => body);
};

describe.only('the Matches API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('profiles'));

    let token, token2, profile, profile2, match;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(testUser)
            .then(checkOk)
            .then(({ body }) => {
                token = body.token;
                profile = body.profile;
                console.log('**TOKEN1', token);
            });
    });
    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(testUser2)
            .then(checkOk)
            .then(({ body }) => {
                token2 = body.token;
                profile2 = body.profile;
                console.log('**TOKEN2', token2);
            });
    });

    beforeEach(() => {
        return save('matches', {
            players: [profile._id, profile2._id],
            game: {
                player1: {
                    troops: 2,
                    wins: 2
                },
                player2: {
                    troops: 1,
                    wins: 1
                },
            },
            winner: profile._id
        })
            .then(data => {
                console.log('**DATA**', data);
                match = data;
            });
    });

    it('posts shit', () => {
        console.log('**Match**', match);
    });
});