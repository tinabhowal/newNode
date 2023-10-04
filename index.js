// const express = require('express'),
// morgan = require('morgan'),
// fs = require('fs'), 
// path = require('path'),
// cors = require('cors'),
// bodyParser = require('body-parser');
// const { check, validationResult } = require('express-validator');

// const mongoose = require('mongoose');
// const Models = require('./models.js');

// const Cakes = Models.Cake;
// const Users = Models.User;

// const app = express();
// app.use(morgan('common'));
// app.use(express.static('public'));
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// let auth = require('./auth')(app);
// const passport = require('passport');
// require('./passport');

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
// // setup the logger
// app.use(morgan('combined', {stream: accessLogStream}));

// // const connectionUri = process.env.CONNECTION_URI;

// // // Configure MongoDB options
// // const mongoOptions = {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // };

// // // Connect to MongoDB Atlas
// // mongoose
// //   .connect(connectionUri, mongoOptions)
// //   .then(() => {
// //     console.log('Connected to MongoDB Atlas');
// //   })
// //   .catch((error) => {
// //     console.error('Error connecting to MongoDB Atlas:', error);
// //   });



// let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'https://mybakeaffair.onrender.com'];

// app.use(cors({
//   origin: (origin, callback) => {
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//       let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
//       return callback(new Error(message ), false);
//     }
//     return callback(null, true);
//   }
// }));

// mongoose.connect('mongodb+srv://chikighosh80:Tina5@cluster0.2fnxanz.mongodb.net/myBakeAffair?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  
//   // GET requests
//   app.get('/',  (req, res) => {
//     res.send('Welcome to MyBakeaffair');
//   });
  
// //   app.get('/documentation', (req, res) => {                  
// //     res.sendFile('/documentation.html', { root: __dirname });
// //   });
  
//   app.get('/cakes', async (req, res) => {
//     try {
//       const cakes = await Cakes.find();
//       res.json(cakes);
//       console.log(cakes); 
//     }catch (error){
//       console.error(error);
//       res.status(500).send('Error:' + error);
//     }
    
//   });
  
//   // Getting a cake by name
// app.get('/cakes/by-name/:name', async (req, res) => {
//   try {
//     const { name } = req.params;
//     const regex = new RegExp(name, 'i'); // 'i' flag makes it case-insensitive
//     const cakes = await Cakes.find({ Name: regex });
    
//     if (!cakes || cakes.length === 0) {
//       return res.status(404).json({ message: `No cakes found with the name ${name}.` });
//     }
  
//     res.json(cakes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error:' + error);
//   } 
// });

  
//   //getting a cake by ingredient
//   app.get('/cakes/by-ingredient/:ingredient', async (req, res) => {
//     try{
//       const {ingredient} = req.params;
//       const regex = new RegExp(ingredient, 'i');
//       const cakesWithIngredient = await Cakes.find({ Ingredients: regex });
    
//       if (cakesWithIngredient.length === 0) {
//         return res.status(404).json({ message: 'No cakes found with the specified ingredient.' });
//       }
    
//       res.json(cakesWithIngredient);
//     }catch(error){
//       console.error(error);
//       res.status(500).send('Error:' + error);
//     }
    
//   });
  
//   //getting a cake by theme
//   app.get('/cakes/by-theme/:theme', async (req, res) => {
//     try{
//     const {theme} = req.params;
//     const regex = new RegExp(theme, 'i');
//     const cakesWithTheme = await Cakes.find({ Theme: regex });
  
//     if (cakesWithTheme.length === 0) {
//       return res.status(404).json({ message: `No cake found for the theme of ${theme}` });
//     }
  
//     res.json(cakesWithTheme);
//   }catch(error){
//     console.error(error);
//     res.status(500).send('Error:' + error);
//   }
//   });

//   //getting cake by veg
//   app.get('/cakes/by-veg/:veg', async (req, res) => {
//     try {
//       const { veg } = req.params;
//       const keywords = veg.split(' ');
//       let isVeg=true;
//       if (keywords.includes('with') && (keywords.includes('egg') || keywords.includes('eggs') || keywords.includes('non') || keywords.includes('veg'))) {
//         isVeg = false;
//       }
      
//       const cakes = await Cakes.find({ Veg: isVeg });
  
//       if (cakes.length === 0) {
//         return res.status(404).json({ message: `No cakes found for the specified search.` });
//       }
  
//       res.json(cakes);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error:' + error);
//     }
//   });
  
  
  
//   // Get all users
// app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   await Users.find()
//     .then((users) => {
//       res.status(201).json(users);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     });
// });

// // Get a user by username
// app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   await Users.findOne({ Username: req.params.Username })
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     });
// });

// //Update a user's info, by username
// app.put('/users/:Username', passport.authenticate('jwt', { session: false }), 

// [
//   check('Username', 'Username is required').isLength({ min: 5 }),
//   check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//   check('Password', 'Password is required').not().isEmpty(),
//   check('Email', 'Email does not appear to be valid').isEmail()
// ],


// async (req, res) => {
  
//   // Check the validation object for errors
//    const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//      return res.status(422).json({ errors: errors.array() });
//    }

//   // CONDITION TO CHECK ADDED HERE
//   if(req.user.Username !== req.params.Username){
//       return res.status(400).send('Permission denied');
//   }
//   // CONDITION ENDS
//   await Users.findOneAndUpdate({ Username: req.params.Username }, {
//       $set:
//       {
//           Username: req.body.Username,
//           Password: req.body.Password,
//           Email: req.body.Email,
//           Birthday: req.body.Birthday
//       }
//   },
//       { new: true }) // This line makes sure that the updated document is returned
//       .then((updatedUser) => {
//           res.json(updatedUser);
//       })
//       .catch((err) => {
//           console.log(err);
//           res.status(500).send('Error: ' + err);
//       })
// });

  
// // Add a cake to the user's cart with customization options
// app.post('/users/:Username/cart', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     const username = req.params.Username;
//     const cakeId = req.body.cakeId;
//     const quantity = parseInt(req.body.quantity) || 1;
//     const customization = req.body.customization || {};

//     // Validation: Ensure the cakeId is valid and the cake exists in the database
//     const cake = await Cakes.findById(cakeId);
//     if (!cake) {
//       return res.status(404).json({ message: 'Cake not found.' });
//     }

//     // Find the user in the database
//     const user = await Users.findOne({ Username: username });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Check if the cake already exists in the cart
//     const existingCartItem = user.Cart.find((item) => item.cakeId.equals(cakeId));

//     if (existingCartItem) {
//       // If the cake exists, increment the quantity and update customization options
//       existingCartItem.quantity += quantity;
//       existingCartItem.customization = customization;
//     } else {
//       // If the cake does not exist, add it as a new cart item with customization options
//       user.Cart.push({ cakeId: cakeId, quantity: quantity, customization: customization });
//     }

//     await user.save();
//     res.status(200).json(user.Cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error: ' + error);
//   }
// });



// // Remove a cake from the user's cart
// app.delete('/users/:Username/cart', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     const username = req.params.Username;
//     const cakeId = req.body.cakeId;

//     // Find the user in the database
//     const user = await Users.findOne({ Username: username });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Check if the cake already exists in the cart
//     const existingCartItemIndex = user.Cart.findIndex((item) => item.cakeId.equals(cakeId));

//     if (existingCartItemIndex !== -1) {
//       // If the cake exists, decrement the quantity and update customization options
//       const existingCartItem = user.Cart[existingCartItemIndex];
//       existingCartItem.quantity -= 1;

//       // If the quantity becomes zero or less, remove the item from the cart
//       if (existingCartItem.quantity <= 0) {
//         user.Cart.splice(existingCartItemIndex, 1);
//       }
//     } else {
//       // If the cake does not exist in the cart, return an error
//       return res.status(404).json({ message: 'Cake not found in cart.' });
//     }

//     await user.save();
//     res.status(200).json(user.Cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error: ' + error);
//   }
// });





  
  
//   //add a new user
//   app.post('/users',
  
//   //express validator to validate input on the server side
//   [
//     check('Username', 'Username is required').isLength({min: 5}),
//     check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//     check('Password', 'Password is required').not().isEmpty(),
//     check('Email', 'Email does not appear to be valid').isEmail()
//   ],
  
//   async (req, res) => {
    
//     // check the validation object for errors
//     let errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }

    
//     let hashedPassword = Users.hashPassword(req.body.Password);
//     await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
//       .then((user) => {
//         if (user) {
//         //If the user is found, send a response that it already exists
//           return res.status(400).send(req.body.Username + ' already exists');
//         } else {
//           Users
//             .create({
//               Username: req.body.Username,
//               Password: hashedPassword,
//               Email: req.body.Email,
//               Birthday: req.body.Birthday
//             })
//             .then((user) => { res.status(201).json(user) })
//             .catch((error) => {
//               console.error(error);
//               res.status(500).send('Error: ' + error);
//             });
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send('Error: ' + error);
//       });
//   });











//   // Delete a user by username
// app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   await Users.findOneAndRemove({ Username: req.params.Username })
//     .then((user) => {
//       if (!user) {
//         res.status(400).send(req.params.Username + ' was not found');
//       } else {
//         res.status(200).send(req.params.Username + ' was deleted.');
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     });
// });

//   // error handler
//   app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');;
//   });
  
//   // listen for requests
//   // app.listen(8080, () => {
//   //   console.log('Your app is listening on port 8080.');
//   // });

//   const port = process.env.PORT || 8080;
//   app.listen(port, '0.0.0.0',() => {
//   console.log('Listening on Port ' + port);
//   });





//After including Google oauth
const express = require('express'),
morgan = require('morgan'),
fs = require('fs'), 
path = require('path'),
cors = require('cors'),
bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Cakes = Models.Cake;
const Users = Models.User;

const app = express();
app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));


let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'https://mybakeaffair.onrender.com'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

mongoose.connect('mongodb+srv://chikighosh80:Tina5@cluster0.2fnxanz.mongodb.net/myBakeAffair?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  


//adding Google oauth
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
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
        let user = await Users.findOne({ GoogleID: profile.id });

        if (user) {
          // If the user exists, update their information or return the user
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

//GET req using Google OAuth2 authentication
// Define a route for initiating the Google OAuth2 authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Define a route for handling the Google OAuth2 callback
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Redirect the user after successful authentication
  res.redirect('/'); 
});

  // GET requests
  app.get('/',  (req, res) => {
    res.send('Welcome to MyBakeaffair');
  });
  
//   app.get('/documentation', (req, res) => {                  
//     res.sendFile('/documentation.html', { root: __dirname });
//   });
  
  app.get('/cakes', async (req, res) => {
    try {
      const cakes = await Cakes.find();
      res.json(cakes);
      console.log(cakes); 
    }catch (error){
      console.error(error);
      res.status(500).send('Error:' + error);
    }
    
  });
  
  // Getting a cake by name
app.get('/cakes/by-name/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const regex = new RegExp(name, 'i'); // 'i' flag makes it case-insensitive
    const cakes = await Cakes.find({ Name: regex });
    
    if (!cakes || cakes.length === 0) {
      return res.status(404).json({ message: `No cakes found with the name ${name}.` });
    }
  
    res.json(cakes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error:' + error);
  } 
});

  
  //getting a cake by ingredient
  app.get('/cakes/by-ingredient/:ingredient', async (req, res) => {
    try{
      const {ingredient} = req.params;
      const regex = new RegExp(ingredient, 'i');
      const cakesWithIngredient = await Cakes.find({ Ingredients: regex });
    
      if (cakesWithIngredient.length === 0) {
        return res.status(404).json({ message: 'No cakes found with the specified ingredient.' });
      }
    
      res.json(cakesWithIngredient);
    }catch(error){
      console.error(error);
      res.status(500).send('Error:' + error);
    }
    
  });
  
  //getting a cake by theme
  app.get('/cakes/by-theme/:theme', async (req, res) => {
    try{
    const {theme} = req.params;
    const regex = new RegExp(theme, 'i');
    const cakesWithTheme = await Cakes.find({ Theme: regex });
  
    if (cakesWithTheme.length === 0) {
      return res.status(404).json({ message: `No cake found for the theme of ${theme}` });
    }
  
    res.json(cakesWithTheme);
  }catch(error){
    console.error(error);
    res.status(500).send('Error:' + error);
  }
  });

  //getting cake by veg
  app.get('/cakes/by-veg/:veg', async (req, res) => {
    try {
      const { veg } = req.params;
      const keywords = veg.split(' ');
      let isVeg=true;
      if (keywords.includes('with') && (keywords.includes('egg') || keywords.includes('eggs') || keywords.includes('non') || keywords.includes('veg'))) {
        isVeg = false;
      }
      
      const cakes = await Cakes.find({ Veg: isVeg });
  
      if (cakes.length === 0) {
        return res.status(404).json({ message: `No cakes found for the specified search.` });
      }
  
      res.json(cakes);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error:' + error);
    }
  });
  
  
  
  // Get all users
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Update a user's info, by username
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), [

  check('Username', 'Username is required').isLength({ min: 5 }),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Email', 'Email does not appear to be valid').isEmail()

], async (req, res) => {

  // Check if the user has a password (i.e., a local account)
  if (req.user.Password) {
    
    // Validate the request for local account updates
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // CONDITION TO CHECK ADDED HERE
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS

    // Update the user's information for local accounts
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
      $set: {
        Username: req.body.Username,
        Email: req.body.Email,
        // Update with your desired fields
      },
    }, { new: true })
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error: ' + err);
      });

  } else {
    // Update the user's information for Google OAuth accounts

    // Find the user in your database based on their Google ID (which you stored during the OAuth authentication)
    const googleId = req.user.GoogleID;

    if (googleId) {
      Users.findOneAndUpdate(
        { GoogleID: googleId },
        {
          $set: {
            FirstName: req.body.FirstName, // Update with your desired fields
            LastName: req.body.LastName,
            Email: req.body.Email,
            // Add other fields you want to update here
          },
        },
        { new: true }
      )
        .then((updatedUser) => {
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
          }
          res.json(updatedUser);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
        });
    }
  }
});


  
// Add a cake to the user's cart with customization options
app.post('/users/:Username/cart', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const username = req.params.Username;
    const cakeId = req.body.cakeId;
    const quantity = parseInt(req.body.quantity) || 1;
    const customization = req.body.customization || {};

    // Validation: Ensure the cakeId is valid and the cake exists in the database
    const cake = await Cakes.findById(cakeId);
    if (!cake) {
      return res.status(404).json({ message: 'Cake not found.' });
    }

    // Find the user in the database
    const user = await Users.findOne({ Username: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the cake already exists in the cart
    const existingCartItem = user.Cart.find((item) => item.cakeId.equals(cakeId));

    if (existingCartItem) {
      // If the cake exists, increment the quantity and update customization options
      existingCartItem.quantity += quantity;
      existingCartItem.customization = customization;
    } else {
      // If the cake does not exist, add it as a new cart item with customization options
      user.Cart.push({ cakeId: cakeId, quantity: quantity, customization: customization });
    }

    await user.save();
    res.status(200).json(user.Cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});



// Remove a cake from the user's cart
app.delete('/users/:Username/cart', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const username = req.params.Username;
    const cakeId = req.body.cakeId;

    // Find the user in the database
    const user = await Users.findOne({ Username: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the cake already exists in the cart
    const existingCartItemIndex = user.Cart.findIndex((item) => item.cakeId.equals(cakeId));

    if (existingCartItemIndex !== -1) {
      // If the cake exists, decrement the quantity and update customization options
      const existingCartItem = user.Cart[existingCartItemIndex];
      existingCartItem.quantity -= 1;

      // If the quantity becomes zero or less, remove the item from the cart
      if (existingCartItem.quantity <= 0) {
        user.Cart.splice(existingCartItemIndex, 1);
      }
    } else {
      // If the cake does not exist in the cart, return an error
      return res.status(404).json({ message: 'Cake not found in cart.' });
    }

    await user.save();
    res.status(200).json(user.Cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});





  
  
  //add a new user
  app.post('/users',
  
  //express validator to validate input on the server side
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ],
  
  async (req, res) => {
    
    // check the validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    
    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
        //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });






  // Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

  // error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');;
  });
  
  // listen for requests
  // app.listen(8080, () => {
  //   console.log('Your app is listening on port 8080.');
  // });

  const port = process.env.PORT || 8080;
  app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
  });