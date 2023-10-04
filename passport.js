// const passport = require('passport'),
//   LocalStrategy = require('passport-local').Strategy,
//   Models = require('./models.js'),
//   passportJWT = require('passport-jwt'),
  

// let Users = Models.User,
//   JWTStrategy = passportJWT.Strategy,
//   ExtractJWT = passportJWT.ExtractJwt;


//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: 'Username',
//         passwordField: 'Password',
//       },
//       async (username, password, callback) => {
//         console.log(`${username} ${password}`);
//         await Users.findOne({ Username: username })
//         .then((user) => {
//           if (!user) {
//             console.log('incorrect username');
//             return callback(null, false, {
//               message: 'Incorrect username or password.',
//             });
//           }
//           if (!user.validatePassword(password)) {
//             console.log('incorrect password');
//             return callback(null, false, { message: 'Incorrect password.' });
//           }
//           console.log('finished');
//           return callback(null, user);
//         })
//         .catch((error) => {
//           if (error) {
//             console.log(error);
//             return callback(error);
//           }
//         })
//       }
//     )
//   );


// passport.use(new JWTStrategy({
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'your_jwt_secret'
// }, async (jwtPayload, callback) => {
//   return await Users.findById(jwtPayload._id)
//     .then((user) => {
//       return callback(null, user);
//     })
//     .catch((error) => {
//       return callback(error)
//     });
// }));


//passport with both Google and local strategy


//importing the necessary modules
const passport = require('passport');
const Models = require('./models.js');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

let Users = Models.User;
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// Configure the Local Strategy (for username/password login)
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log('incorrect username');
            return callback(null, false, {
              message: 'Incorrect username or password.',
            });
          }
          if (!user.validatePassword(password)) {
            console.log('incorrect password');
            return callback(null, false, { message: 'Incorrect password.' });
          }
          console.log('finished');
          return callback(null, user);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            return callback(error);
          }
        });
    }
  )
);

// Configure the JWT Strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    async (jwtPayload, callback) => {
      return await Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);

// Configure the Google OAuth2 Strategy
passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: '801502169924-8e0nek6qt37bprinhf4p38uv9fn4m1q1.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://mybakeaffair.onrender.com/auth/google/callback', 
       // Access Token URL (standard Google OAuth2 URL)
       tokenURL: 'https://accounts.google.com/o/oauth2/token',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if a user with this Google profile already exists in your database
        let user = await Users.findOne({ 'GoogleID': profile.id });

        if (user) {
          // If the user exists,  update their information or return the user
          // Update user information (if needed)
          user.FirstName = profile.name.givenName;
          user.LastName = profile.name.familyName;
          // Save updated user data to the database
          user = await user.save();
        } else {
          // If the user doesn't exist, create a new user in your database
          user = new Users({
            FirstName: profile.name.givenName,
            LastName: profile.name.familyName,
            Username: profile.emails[0].value,
            Email: profile.emails[0].value,
            GoogleID: profile.id,
          });
          // Saving the new user to the database
          user = await user.save();
        }

        // using 'user' as the authenticated user in your application
        return done(null, user);
      } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        return done(error, false);
      }
    }
  )
);

