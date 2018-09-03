const router = require('express').Router();
const { respond } = require('./route-helpers');
const Match = require('../models/Match');
// const ensureAuth = require('../util/ensure-auth.js')();

module.exports = router
    .post('/', respond(
        ({ body }) => Match.create(body) 
    ));