const router = require('express').Router();
const { respond } = require('./route-helpers');
const Match = require('../models/Match');

module.exports = router
    .post('/', respond(
        ({ body }) => Match.create(body) 
    ));