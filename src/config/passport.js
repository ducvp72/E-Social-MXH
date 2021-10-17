const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const path = require('path');
const fs = require('fs');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');

const privateKey = fs.readFileSync(path.join(__dirname, '../key/public-key.pem'));
const jwtOptions = {
    secretOrKey: privateKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async(payload, done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type');
        }
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};