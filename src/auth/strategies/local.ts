import { Strategy as LocalStrategy } from 'passport-local';

const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  (email: string, password: string, done) => {
    //   User.findOne({ username: username }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false); }
    //     if (!user.verifyPassword(password)) { return done(null, false); }
    //     return done(null, user);
    //   });
    try {
      if (email === 'johndoe@gmail.com' && password === 'doe') {
        return done(null, {
          email,
          firstName: 'John',
          lastName: 'Doe',
        });
      }

      return done(null, false);
    } catch (error) {
      return done(error);
    }
  }
);

export default localStrategy;
