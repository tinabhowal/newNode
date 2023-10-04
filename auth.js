// const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

// const jwt = require('jsonwebtoken'),
//   passport = require('passport');
  

// require('./passport'); // Your local passport file


// let generateJWTToken = (user) => {
//   return jwt.sign(user, jwtSecret, {
//     subject: user.Username, // This is the username you’re encoding in the JWT
//     expiresIn: '7d', // This specifies that the token will expire in 7 days
//     algorithm: 'HS256' // This is the algorithm used to “sign” or encode the values of the JWT
//   });
// }


// /* POST login. */
// module.exports = (router) => {
//   router.post('/login', (req, res) => {
//     passport.authenticate('local', { session: false }, (error, user, info) => {
//       if (error || !user) {
//         return res.status(400).json({
//           message: 'Something is not right',
//           user: user
//         });
//       }
//       req.login(user, { session: false }, (error) => {
//         if (error) {
//           res.send(error);
//         }
//         let token = generateJWTToken(user.toJSON());
//         return res.json({ user, token });
//       });
//     })(req, res);
//   });
// }






//after including Google oauth
const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Import Google OAuth2 strategy

require('./passport'); // Your local passport file

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // This is the username you’re encoding in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256', // This is the algorithm used to “sign” or encode the values of the JWT
  });
};

/* POST login. */
module.exports = (router) => {
  // Local authentication route
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });

  // Google OAuth2 authentication route
  router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  // Google OAuth2 callback route
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
      const token = generateJWTToken(req.user.toJSON());
      res.json({ user: req.user, token });
    }
  );
};
