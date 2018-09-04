const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Match = require('../models/Match');
// const ensureAuth = require('../util/ensure-auth.js')();

module.exports = router
    .param('id', getParam)
    .get('/', respond(
        ({ query }) => Match.getByQuery(query)
    ))
    .get('/:id', respond(
        ({ id }) => Match.getDetailById(id)
    ))
    .post('/', respond(
        ({ body }) => Match.create(body) 
    ))

    .get('/stats/:id', (req, res, next) => {
        Match.statsById(req.id)
            .then(([results]) => {
                const totalWins = results.totalWins[0] ? results.totalWins[0].totalWins : 0;
                const totalGames = results.totalGames[0] ? results.totalGames[0].totalGames : 0;
                return { totalWins, totalGames };
            })
            .then(results => res.json(results))
            .catch(next);
    })

    // eslint-disable-next-line
    .get('/leaderboard', (req, res, next) => {
        Match.leaderboard()
            .then((results) => {
                console.log(results);
                res.json(results);
            });
    });