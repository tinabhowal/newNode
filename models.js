const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema for individual cakes
let cakeSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Ingredients: [String],
    Theme: [String],
    ImagePath: String,
    Veg: Boolean
});
  
// Schema for the shopping cart items
let cartItemSchema = mongoose.Schema({
  cakeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake', required: true },
  quantity: { type: Number, required: true, default: 1 },
  customization: {
    base: [String],
    sprinklers: [String],
    instructions: String
  }
});


// Schema for users
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    Cart: [cartItemSchema] // Array to store cart items
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};


userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

// Create models
let Cake = mongoose.model('Cake', cakeSchema);
let User = mongoose.model('User', userSchema);

module.exports.Cake = Cake;
module.exports.User = User;
