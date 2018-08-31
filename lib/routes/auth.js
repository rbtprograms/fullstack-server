const router = require('express').Router();
const { respond } = require('./route-helpers');
const User = require('../models/User');
const Profile = require('../models/Profile');
const { sign } = require('../util/token-service');
const createEnsureAuth = require('../util/ensure-auth');

const hasEmailAndPassword = ({ body }, res, next) => {
    const { email, password } = body;
    if(!email || !password) {
        throw {
            status: 400,
            error: 'Email and password are required'
        };
    }
    next();
};

module.exports = router
    .get('/verify', createEnsureAuth(), respond (
        () => Promise.resolve({ verified: true })
    ))

    .post('/signup', hasEmailAndPassword, respond(
        ({ body }) => {
            const { email, name, password } = body;
            delete body.password;


            return User.exists({ email })
                .then(exists => {
                    if(exists) {
                        throw {
                            status: 400,
                            error: 'Email exists'
                        };
                    }
                    const user = new User(body);

                    const profile = new Profile({ name });
                    user.profileId = profile._id;

                    user.generateHash(password);
                    return Promise.all([user.save(), profile.save()]);
                })
                .then(([user, profile]) => {
                    
                    return { token: sign(user) };
                });
        }
    ));