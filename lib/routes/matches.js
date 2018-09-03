const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Match = require('../models/Match');

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
    ));