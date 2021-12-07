const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const path = require('path');
const fs = require('fs');
const { tokenTypes } = require('./tokens');
const { User, Admin } = require('../models');

const privateKey = fs.readFileSync(path.join(__dirname, '../key/public-key.pem'));
const jwtOptions = {
  secretOrKey: privateKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    const admin = await Admin.findById(payload.sub);
    if (!user && !admin) {
      return done(null, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, admin);
    }
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
