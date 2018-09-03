const { assert } = require('chai');
const { dropCollection } = require('./db');
const request = require('./request');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

const testUser = {
    email: 'me@me.com',
    name: 'tester1',
    password: 'abc'
};
const testUser2 = {
    email: 'otherme@me.com',
    name: 'tester2',
    password: '123'
};

const save = (path, data, token) => {
    return request
        .post(`/api/${path}`)
        .set('Authorization', token)
        .send(data)
        .then(checkOk)
        .then(({ body }) => body);
};

describe.only('the Matches API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('matches'));
    beforeEach(() => dropCollection('profiles'));

    let token1, token2, profile1, profile2, match;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(testUser)
            .then(checkOk)
            .then(({ body }) => {
                token1 = body.token;
                profile1 = body.profile;
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
            });
    });

    beforeEach(() => {
        const player1Id = profile1._id;
        const player2Id = profile2._id;
        const data = {
            players: [player1Id, player2Id],
            game: {
                [player1Id]: {
                    troops: 2,
                    wins: 2
                },
                [player2Id]: {
                    troops: 1,
                    wins: 1
                },
            },
            winner: player1Id
        };
        return save('matches', data, token1)
            .then(data => {
                match = data;
            });
    });


    it('posts shit', () => {
        assert.equal(match.players.length, 2);
    });
});