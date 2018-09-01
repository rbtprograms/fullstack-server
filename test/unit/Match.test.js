const { assert } = require('chai');
const Match = require('../../lib/models/Match');
const { getErrors } = require('./helpers');

describe('Match Model', () => {
    it('validates a good match model', () => {
        const data = {
            players: ['player1', 'player2'],
            game: {
                player1: {
                    troops: 2,
                    wins: 2
                },
                player2: {
                    troops: 1,
                    wins: 1
                },
                winner: 'player1'
            }
        };

        const match = new Match(data);

        data._id = match._id;
        assert.deepEqual(match.toJSON(), data);
    });

    it('validates that fields are required', () => {
        const match = new Match({});

        const errors = getErrors(match.validateSync(), 1);
        assert.equal(errors.players.kind, 'required');
        assert.equal(errors.game.kind, 'required');
    });
});