import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { IUser } from '../models/User';

// Extend Express Request type
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

// Local Strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email: string, password: string, done: (error: any, user?: IUser | false, options?: { message: string }) => void) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your-secret-key'
};

passport.use(new JwtStrategy(jwtOptions, async (payload: { id: string }, done: (error: any, user?: IUser | false) => void) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

// Google OAuth Strategy (only if credentials are provided)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: IUser | false) => void) => {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      // Create new user
      const newUser = await User.create({
        googleId: profile.id,
        email: profile.emails?.[0]?.value,
        username: profile.emails?.[0]?.value?.split('@')[0] || `user${Date.now()}`,
        displayName: profile.displayName,
        avatar: profile.photos?.[0]?.value
      });

      done(null, newUser);
    } catch (error) {
      done(error, false);
    }
  }));
}

// Serialization
passport.serializeUser((user: IUser, done: (error: any, id?: string) => void) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: (error: any, user?: IUser | null) => void) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
