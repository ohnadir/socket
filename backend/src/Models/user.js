const { mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({  
    name: {
      type: String,
      required: [true, 'Please enter your name']
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Your password must be longer than 6 characters']
    }
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);