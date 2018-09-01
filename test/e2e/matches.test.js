// const { assert } = require('chai');
// const { dropCollection } = require('./db');
// const request = require('./request');

// const checkOk = res => {
//     assert.equal(res.status, 200, 'expected 200 http status code');
//     return res;
// };

// let match;

// const testMatch = {
//     players: ['player1', 'player2'],
//     game: {
//         player1: {
//             troops: 2,
//             wins: 2
//         },
//         player2: {
//             troops: 1,
//             wins: 1
//         },
//         winner: 'player1'
//     }
// };

// const save = (path, data, token = null) => {
//     return request
//         .post(`/api/${path}`)
//         .send(data)
//         .then(checkOk)
//         .then(({ body }) => body);
// };

