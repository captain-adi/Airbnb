import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import { User } from "../models/user_models.js";

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      return req.cookies?.accesstoken || null;
    }
  ]),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET || "testing",
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, false);
  }
};

passport.use(new JwtStrategy(options, jwtVerify));

export default passport;
